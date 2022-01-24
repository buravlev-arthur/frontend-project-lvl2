import { Command } from 'commander';

export default () => {
  const program = new Command();

  program
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0', '-V, --version', 'output the version number')
    .helpOption('-h, --help', 'output usage information');

  program.parse();
};
