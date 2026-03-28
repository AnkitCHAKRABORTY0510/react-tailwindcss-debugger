import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

/**
 * Automatically configures the host project for react-tailwindcss-debugger.
 */
export async function initProject() {
  const root = process.cwd();
  console.log(chalk.cyan(`[RVE] Initializing setup in ${root}...`));

  // 1. Update package.json scripts
  const pkgPath = path.join(root, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      pkg.scripts = pkg.scripts || {};
      
      if (!pkg.scripts['debug:sync']) {
        pkg.scripts['debug:sync'] = 'react-tailwindcss-debugger serve';
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
        console.log(chalk.green('✅ Added "debug:sync" script to package.json'));
      }
    } catch (e: any) {
      console.error(chalk.red(`❌ Failed to update package.json: ${e.message}`));
    }
  }

  // 2. Look for vite.config.(js|ts|mjs|mts)
  const viteConfigs = ['vite.config.ts', 'vite.config.js', 'vite.config.mjs', 'vite.config.mts'];
  let foundConfig = null;

  for (const config of viteConfigs) {
    if (fs.existsSync(path.join(root, config))) {
      foundConfig = config;
      break;
    }
  }

  if (foundConfig) {
    console.log(chalk.blue(`ℹ️ Found ${foundConfig}. Please ensure the Babel plugin is added manually or follow the README.`));
    console.log(chalk.yellow(`
To use the source-tracking feature, add this to your ${foundConfig}:

import react from '@vitejs/plugin-react';
import rvePlugin from 'react-tailwindcss-debugger/babel';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [rvePlugin]
      }
    })
  ]
});
    `));
  } else {
    console.log(chalk.yellow('⚠️ No vite.config found. Please follow the manual setup in the README.'));
  }

  console.log(chalk.magenta('\n🚀 Setup complete! Run "npm run debug:sync" to start the sync server.'));
}
