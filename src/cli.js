import { Command } from 'commander';
import genDiff from './index.js';

export default () => {
  const program = new Command();

  program
    .description('Compares two configuration files and shows a difference.')
    .helpOption('-h, --help', 'output usage information')
    .version('1.0.0', '-V, --version', 'output the version number')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format', 'stylish')
    .action((filepath1, filepath2, options) => {
      console.log(genDiff(filepath1, filepath2, options.format));
    });

  program.parse();
};
