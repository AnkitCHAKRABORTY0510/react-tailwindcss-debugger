import { PluginItem } from '@babel/core';
import * as t from '@babel/types';

/**
 * Babel plugin to inject data-rve-source="file:line" into JSX elements.
 */
export default function rveSourcePlugin(): PluginItem {
  return {
    name: 'rve-source-injector',
    visitor: {
      JSXOpeningElement(path: any, state: { filename?: string }) {
        const { node } = path;
        const id = state.filename || 'unknown';

        // Skip internal components or specific files if needed
        if (id.includes('EditorPanel') || id.includes('node_modules')) return;

        // Skip if already injected
        if (node.attributes.some((a: any) => t.isJSXAttribute(a) && a.name.name === 'data-rve-source')) return;

        const loc = node.loc;
        if (!loc) return;

        node.attributes.push(
          t.jsxAttribute(
            t.jsxIdentifier('data-rve-source'),
            t.stringLiteral(`${id}:${loc.start.line}`)
          )
        );
      }
    }
  };
}
