import type {
    FullConfig,
    FullResult,
    Reporter,
    Suite,
    TestCase,
    TestResult,
} from '@playwright/test/reporter';

type SummaryCounters = {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
};

class PrometheusReporter implements Reporter {
    private counters: SummaryCounters = {
        total: 0,
        passed: 0,
        failed: 0,
        skipped: 0,
    };

    private readonly testMetrics: string[] = [];

    private readonly summaryUrl = 'http://localhost:9091/metrics/job/playwright_summary';
    private readonly detailsUrl = 'http://localhost:9091/metrics/job/playwright_test_details';

    private readonly summaryName = 'playwright_test_summary';
    private readonly detailsName = 'playwright_test_details';

    private buildMetric(name: string, labels: Record<string, string>, value = 1) {
        const labelString = Object.entries(labels)
            .map(([k, v]) => `${k}="${v.replace(/"/g, '\\"')}"`)
            .join(',');
        return `${name}{${labelString}} ${value}`;
    }

    async onBegin(config: FullConfig, suite: Suite) {
        await this.resetMetrics();
    }

    onTestEnd(test: TestCase, result: TestResult) {
        this.counters.total++;
        const status = result.status;

        if (status === 'passed') this.counters.passed++;
        else if (status === 'failed') this.counters.failed++;
        else if (status === 'skipped') this.counters.skipped++;

        const name = test.title; // escape double quotes
        this.testMetrics.push(
            this.buildMetric(this.detailsName, {test_name: name, status}, 1)
        );
    }

    async onEnd(result: FullResult) {
        const summaryPayload = [
            this.buildMetric(this.summaryName, {status: 'total'}, this.counters.total),
            this.buildMetric(this.summaryName, {status: 'passed'}, this.counters.passed),
            this.buildMetric(this.summaryName, {status: 'failed'}, this.counters.failed),
            this.buildMetric(this.summaryName, {status: 'skipped'}, this.counters.skipped),
        ].join('\n') + '\n';

        const detailedPayload = this.testMetrics.join('\n') + '\n';

        console.log('[METRICS] Push summary to:', this.summaryUrl);
        console.log('[METRICS] Payload:\n' + summaryPayload);

        console.log('[METRICS] Push summary to:', this.detailsUrl);
        console.log('[METRICS] Payload:\n' + detailedPayload);

        try {
            await fetch(this.summaryUrl, {
                method: 'PUT',
                headers: {'Content-Type': 'text/plain'},
                body: summaryPayload,
            });

            await fetch(this.detailsUrl, {
                method: 'PUT',
                headers: {'Content-Type': 'text/plain'},
                body: detailedPayload,
            });
        } catch (err) {
            console.error('[METRICS] Error pushing metrics:', err);
        }
    }

    private async resetMetrics() {
        try {
            await Promise.all([
                fetch(this.summaryUrl, {method: 'DELETE'}),
                fetch(this.detailsUrl, {method: 'DELETE'}),
            ]);

            console.log('[METRICS] Cleared previous metrics');
        } catch (err) {
            console.error('[METRICS] Error clearing metrics:', err);
        }
    }
}

export default PrometheusReporter;
