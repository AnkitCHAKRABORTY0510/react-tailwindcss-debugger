import { startSyncServer } from '../src/server/sync-server';
import { initProject } from '../src/cli/init';

const args = process.argv.slice(2);
const command = args[0];

if (command === 'serve') {
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
  startSyncServer(port);
} else if (command === 'init') {
  initProject();
} else {
  console.log('Usage:');
  console.log('  react-tailwindcss-debugger init    - Setup the project');
  console.log('  react-tailwindcss-debugger serve   - Start sync server');
}
