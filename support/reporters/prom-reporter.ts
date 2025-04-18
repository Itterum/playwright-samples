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

	async onBegin(config: FullConfig, suite: Suite) {
		await this.resetMetrics();
	}

	onTestEnd(test: TestCase, result: TestResult) {
		this.counters.total++;
		const status = result.status;

		if (status === 'passed') this.counters.passed++;
		if (status === 'failed') this.counters.failed++;
		if (status === 'skipped') this.counters.skipped++;

		const name = test.title.replace(/"/g, '\\"'); // escape double quotes
		this.testMetrics.push(`${this.detailsName}{test_name="${name}",status="${status}"} 1`);
	}

	async onEnd(result: FullResult) {
		const summaryPayload = [
			`${this.summaryName}{status="total"} ${this.counters.total}`,
			`${this.summaryName}{status="passed"} ${this.counters.passed}`,
			`${this.summaryName}{status="failed"} ${this.counters.failed}`,
			`${this.summaryName}{status="skipped"} ${this.counters.skipped}`,
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
			await fetch(this.summaryUrl, {method: 'DELETE'});
			await fetch(this.detailsUrl, {method: 'DELETE'});

			console.log('[METRICS] Cleared previous metrics');
		} catch (err) {
			console.error('[METRICS] Error clearing metrics:', err);
		}
	}
}

export default PrometheusReporter;
