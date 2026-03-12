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

const cwd = process.cwd();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(__dirname);

export const defaultName = 'my-package';

export const templateOptions = [
  { value: 'main-react', label: 'MainApp（React）' },
  { value: 'sub-react', label: 'SubApp (React)' },
  {
    value: 'sub-react-postcss',
    label: 'SubApp (React + PostCSS)',
    hint: 'Qinkun style Isolation',
  },
  { value: 'sub-vue', label: 'SubApp (Vue)' },
] as const;

type TemplateOption = (typeof templateOptions)[number]['value'];

export interface Options {
  template?: TemplateOption;
  name?: string;
}

export type ResolvedOptions = Required<Options>;

/**
 * Create a project.
 */
export async function create(
  name: string | undefined,
  options: Options,
): Promise<void> {
  console.log();
  intro(`Create a micro frontend project...`);

  const resolved = await resolveOptions({ ...options, name });

  const s = spinner();
  s.start('Downloading the template...');

  await downloadTemplate(resolved.template, resolved.name);

  await writePackageJson(resolved.name);

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
  let name: Options['name'] | symbol = options.name;

  if (!name) {
    name =
      (await text({
        message: 'What is the name of your package?',
        placeholder: defaultName,
        validate(value) {
          const realName = value || defaultName;

          if (!/^[a-z0-9-_]+$/.test(realName)) {
            return 'Package name must contain lowercase letters, numbers, - or _';
          } else {
            return '';
          }
        },
      })) || defaultName;
    if (isCancel(name)) {
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

  return { name, template } as ResolvedOptions;
}

/**
 * Download the template from the template directory
 * @param template The template file name
 * @param targetDir The target directory
 */
export async function downloadTemplate(
  template: string,
  targetDir: string,
): Promise<void> {
  const sourcePath = path.join(root, 'templates', template);
  const targetPath = path.join(cwd, targetDir);

  if (fs.existsSync(targetPath)) {
    throw new Error(`The folder ${targetDir} already exists. 🤖`);
  }

  fs.cpSync(sourcePath, targetPath, { recursive: true });
}

/**
 * Write the package.json file
 * @param targetDir The target directory
 */
export async function writePackageJson(targetDir: string): Promise<void> {
  const pkgPath = path.join(cwd, targetDir, 'package.json');

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

  pkg.name = targetDir;

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
}
