const {mergeCoverageReportFiles} = require('lcov-result-merger');
const fs = require('fs');
const path = require('path');

// List of LCOV files to merge
const inputFiles = [
  path.join(__dirname, 'coverage/ngx-repository/lcov.info'),
  path.join(__dirname, 'coverage/ngx-http-repository/lcov.info'),
  path.join(__dirname, 'coverage/ngx-firestore-repository/lcov.info'),
  path.join(__dirname, 'coverage/utils/lcov.info'),

];

// Path to save the merged LCOV file
const outputFile = path.join(__dirname, 'coverage/merged/lcov.info');

// Ensure the output directory exists
const outputDir = path.dirname(outputFile);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, {recursive: true});
}

mergeCoverageReportFiles(inputFiles, {pattern: ''}).then(filePath => {
  fs.writeFileSync(outputFile, fs.readFileSync(filePath, 'utf8'), 'utf8');
});
console.log('Merged coverage reports into:', outputFile);
