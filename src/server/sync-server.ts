import express from 'express';
import fs from 'fs';
import cors from 'cors';
import chalk from 'chalk';

/**
 * Starts the RVE Synchronization Server.
 * @param port The port to listen on.
 */
export function startSyncServer(port: number = 3001) {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.post('/update', (req, res) => {
    const { file, line, className } = req.body;

    if (!file || !line) {
      console.error(chalk.red('[RVE] ERROR: Missing file or line number.'));
      return res.status(400).json({ error: 'Missing file or line number' });
    }

    try {
      const code = fs.readFileSync(file, 'utf-8');
      const lines = code.split('\n');
      const lineIdx = Number(line) - 1;
      const targetLine = lines[lineIdx];

      if (!targetLine) {
        return res.status(400).json({ error: `Line ${line} not found in file` });
      }

      let newLine: string;

      if (targetLine.includes('className=')) {
        newLine = targetLine.replace(
          /className=(?:"[^"]*"|'[^']*'|`[^`]*`|\{`[^`]*`\})/,
          `className="${className}"`
        );
      } else {
        // Inject after the opening tag
        newLine = targetLine.replace(/(<\w[\w.]*\s*)/, `$1className="${className}" `);
      }

      if (newLine === targetLine) {
        console.warn(chalk.yellow(`[RVE] WARNING: No className match on line ${line}`));
        return res.status(400).json({ error: 'className not found on target line' });
      }

      lines[lineIdx] = newLine;
      fs.writeFileSync(file, lines.join('\n'));

      console.log(chalk.green(`[RVE] ✅ Patched ${file.split('/').pop()}:${line}`));
      res.json({ ok: true });
    } catch (err: any) {
      console.error(chalk.red(`[RVE] Patch failed: ${err.message}`));
      res.status(500).json({ error: err.message });
    }
  });

  app.listen(port, () => {
    console.log(chalk.cyan(`[RVE] Sync Server active on http://localhost:${port}`));
  });
}
