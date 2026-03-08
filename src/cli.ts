import process from 'node:process';

import { log } from '@clack/prompts';
import { cac } from 'cac';

import pkg from '../package.json';
import { create, Options, templateOptions } from './index.ts';

const cli = cac(pkg.name).version(pkg.version).help();

cli
  .command('[path]', 'Create a micro frontend project')
  .option(
    '-t, --template <template>',
    `Available templates: ${templateOptions.map((option) => option.value).join(', ')}`,
  )
  .action((path: string | undefined, options: Options) =>
    create(path, options),
  );

async function runCli() {
  cli.parse(process.argv, { run: false });

  try {
    await cli.runMatchedCommand();
  } catch (error) {
    log.error(String(error));
    process.exit(1);
  }
}

runCli();
