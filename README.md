# react-tailwindcss-debugger

A professional visual debugging tool for Tailwind CSS in React applications. Inspect, edit, and sync Tailwind classes directly from your browser to your source code.

## 🚀 Features

- **Visual Inspector**: Click any element to see its Tailwind classes in real-time.
- **Real-time Editing**: Modify spacing, colors, typography, and more with a intuitive GUI.
- **Source Sync**: Surgical patching of your `.jsx` or `.tsx` files using AST transformations.
- **Production Safe**: Automatically renders nothing in production builds to ensure no overhead.
- **Zero Config (Almost)**: Works with a simple Babel plugin that tracks source locations.

## 📦 Installation

```bash
npm install react-tailwindcss-debugger
```

## 🛠️ Setup

### 1. Automatic Setup (Recommended)

Run the following command in your project root to automatically add the sync script and necessary configurations:

```bash
npx react-tailwindcss-debugger init
```

### 2. Configure Babel Plugin

Ensure your `vite.config.ts` (or equivalent) is using the Babel plugin to enable source tracking. This is crucial for the "Sync to Source" feature.

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
      {process.env.NODE_ENV === 'development' && <VisualDebugger />}
    </>
  );
}
```

### 4. Start the Sync Server

The sync server handles the file system operations. Start it in a separate terminal:

```bash
npm run debug:sync
```

## 📖 API

### `<VisualDebugger />`

The main component. It handles element selection and provides the editor UI.

| Prop | Type | Description |
| --- | --- | --- |
| `children` | `ReactNode` | (Optional) Elements to wrap with a crosshair cursor during inspection. |
| `theme` | `'light' | 'dark' | 'auto'` | (Optional) Force a specific theme for the debugger UI. |

## 🤝 Contributing

We love contributions! Whether it's fixing a bug, improving documentation, or adding a new feature, your help is appreciated.

### How to Contribute

1. **Fork the Repository**: Create your own fork of the project.
2. **Clone Locally**: `git clone https://github.com/AnkitCHAKRABORTY0510/react-tailwindcss-debugger.git`
3. **Install Dependencies**: `npm install`
4. **Create a Branch**: `git checkout -b feature/your-feature-name`
5. **Make Changes**: Implement your feature or fix.
6. **Commit & Push**: `git commit -m "Add some feature"` and `git push origin feature/your-feature-name`
7. **Open a PR**: Submit a Pull Request to the `main` branch.

### 🗺️ Roadmap & Ideas for Contribution

We have a lot of ideas for the future! Here are some areas where you can help:

- **Autocomplete Engine**: Enhance `src/utils/tailwindSuggestions.ts` with smarter, context-aware completions.
- **Alternative CSS Frameworks**: Add support for alternatives like **UnoCSS**, **Windi CSS**, or **Panda CSS**.
- **Framework Adapters**: Improve compatibility with **Next.js (App Router)**, **Remix**, and **Astro**.
- **Mobile responsiveness**: Optimize the debugger UI for smaller screens and tablets.
- **Direct Layout Manipulation**: Add draggable handles to visually adjust margins and paddings.
- **Better Diffing**: Improve the AST patching logic for complex JSX structures.

## 📄 License

MIT © Ankit Chakraborty
