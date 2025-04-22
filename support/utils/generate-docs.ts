import fs from 'fs';
import path from 'path';

const resultsDir = './allure-results';
const docsDir = './test-docs';

if (!fs.existsSync(docsDir)) {
	fs.mkdirSync(docsDir);
}

const files = fs.readdirSync(resultsDir).filter(file => file.endsWith('-result.json'));

for (const file of files) {
	const content = JSON.parse(fs.readFileSync(path.join(resultsDir, file), 'utf-8'));
	const testName = content.name || 'Test';
	const steps = content.steps || [];

	const mdLines: string[] = [`# ${testName}\n`];

	steps.forEach((step: any, index: number) => {
		mdLines.push(`## Шаг ${index + 1}: ${step.name}`);
		mdLines.push(`**Ожидаемый результат:** ${step.status.toUpperCase()}`);
		mdLines.push('');
	});

	const fileName = testName.toLowerCase().replace(/\s+/g, '_').replace(/[^\w\-]/g, '');
	fs.writeFileSync(path.join(docsDir, `${fileName}.md`), mdLines.join('\n'));
}
