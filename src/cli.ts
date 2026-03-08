import { intro, outro } from '@clack/prompts';
import pc from 'picocolors';

import pkg from '../package.json';

async function run() {
  console.log();
  intro(`${pc.inverse(` ${pkg.name}@${pkg.version} `)}`);

  outro(`${pc.green('Done!')}`);
}

run();
