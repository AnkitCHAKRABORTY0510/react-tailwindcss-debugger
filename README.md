# react-tailwindcss-debugger

A professional visual debugging tool for Tailwind CSS in React applications. Inspect, edit, and sync Tailwind classes directly from your browser to your source code.

## 🚀 Features

- **Visual Inspector**: Click any element to see its Tailwind classes.
- **Real-time Editing**: Modify spacing, colors, typography, and more with a GUI.
- **Source Sync**: Surgical patching of your `.jsx` or `.tsx` files.
- **Production Safe**: Automatically renders nothing in production builds.
- **Zero Config (Almost)**: Works with a simple Babel plugin.

## 📦 Installation

```bash
npm install react-tailwindcss-debugger
```

## 🛠️ Setup

### 1. Automatic Setup (Recommended)

Run the following command in your project root to automatically add the sync script:

```bash
npx react-tailwindcss-debugger init
```

### 2. Configure Babel Plugin

After running `init`, ensure your `vite.config.ts` (or equivalent) is using the Babel plugin to enable source tracking:

```javascript
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
```

### 3. Add the Debugger Component

Place the component at the root of your application (usually `App.tsx` or `main.tsx`).

```tsx
import { VisualDebugger } from 'react-tailwindcss-debugger';

function App() {
  return (
    <>
      <YourApp />
      <VisualDebugger />
    </>
  );
}
```

### 4. Start the Sync Server

Once setup is complete, start the sync server:

```bash
npm run debug:sync
```

## 📖 API

### `<VisualDebugger />`

The main component. It automatically handles element selection and the editor UI.

| Prop | Type | Description |
| --- | --- | --- |
| `children` | `ReactNode` | (Optional) Elements to wrap with a crosshair cursor during inspection. |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © Ankit Chakraborty
