import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import {
  cancel,
  intro,
  isCancel,
  outro,
  select,
  spinner,
  text,
} from '@clack/prompts';
import pc from 'picocolors';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const templateOptions = [
  { value: 'main-react', label: 'MainApp（React）' },
  { value: 'sub-react', label: 'SubApp (React)' },
  { value: 'sub-react-postcss', label: 'SubApp (React + PostCSS)' },
  { value: 'sub-react-tailwindcss', label: 'SubApp (React + TailwindCSS)' },
  { value: 'sub-vue', label: 'SubApp (Vue)' },
] as const;

type TemplateOption = (typeof templateOptions)[number]['value'];

export interface Options {
  template?: TemplateOption;
  path?: string;
}

export type ResolvedOptions = Required<Options>;

/**
 * Create a project.
 */
export async function create(
  path: string | undefined,
  options: Options,
): Promise<void> {
  console.log();
  intro(`Create a micro frontend project...`);

  const resolved = await resolveOptions({ ...options, path });

  const s = spinner();
  s.start('Downloading the template...');

  await downloadTemplate(resolved.template, resolved.path);

  s.stop('Template cloned');

  outro(pc.green(`Successfully copied ${resolved.template}！🎉`));
}

/**
 * Resolve the user options and configs
 * @param options The user options
 * @returns The resolved options
 */
export async function resolveOptions(
  options: Options,
): Promise<ResolvedOptions> {
  let path: Options['path'] | symbol = options.path;

  if (!path) {
    const defaultPath = './my-package';
    path =
      (await text({
        message: 'What is the name of your package?',
        placeholder: defaultPath,
      })) || defaultPath;
    if (isCancel(path)) {
      cancel('Operation cancelled.');
      process.exit(1);
    }
  }

  let template: Options['template'] | symbol = options.template;
  if (template) {
    const templateOptionsValues = templateOptions.map((option) => option.value);
    if (!templateOptionsValues.includes(template)) {
      throw new Error(
        `Invalid template "${template}". Available templates: ${templateOptionsValues.join(', ')}`,
      );
    }
  } else {
    template = await select({
      message: 'Which template do you want to use?',
      options: [...templateOptions],
      initialValue: 'main-react',
    });

    if (isCancel(template)) {
      cancel('Operation cancelled.');
      process.exit(1);
    }
  }

  return {
    path,
    template,
  } satisfies ResolvedOptions;
}

/**
 * Download the template from the template directory
 * @param sourceDir The template file name
 * @param targetDir The target directory
 */
export async function downloadTemplate(
  sourceDir: string,
  targetDir: string,
): Promise<void> {
  const sourcePath = path.join(path.dirname(__dirname), 'templates', sourceDir);
  const targetPath = path.join(process.cwd(), targetDir);

  if (fs.existsSync(targetPath)) {
    throw new Error(`The folder ${targetDir} already exists. 🤖`);
  }

  fs.cpSync(sourcePath, targetPath, { recursive: true });
}
