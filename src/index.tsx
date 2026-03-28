import React from 'react';
import { VisualStyleEditor, VisualStyleEditorProps } from './components/VisualStyleEditor';

/**
 * VisualDebugger component that only renders in development.
 * This ensures the tool is never accidentally pushed to production.
 */
export const VisualDebugger: React.FC<VisualStyleEditorProps> = (props) => {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  return <VisualStyleEditor {...props} />;
};

export { VisualStyleEditor };
export type { VisualStyleEditorProps };
