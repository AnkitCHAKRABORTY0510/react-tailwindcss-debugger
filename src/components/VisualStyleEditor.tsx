import React, { useEffect } from "react";
import { useInspector } from "../hooks/useInspector";
import { useTailwindEditor } from "../hooks/useTailwindEditor";
import EditorPanel from "./EditorPanel";

export interface VisualStyleEditorProps {
  children?: React.ReactNode;
}

export const VisualStyleEditor: React.FC<VisualStyleEditorProps> = ({ children }) => {
  useEffect(() => {
    // Inject Tailwind CDN & Config for real-time JIT compilation
    if (!document.getElementById('tailwind-cdn-rve')) {
      const configScript = document.createElement('script');
      configScript.innerHTML = `
        window.tailwind = window.tailwind || {};
        window.tailwind.config = {
          theme: {
            extend: {
              colors: {
                neon: { green: "#C6FF4D", border: "#83B519" },
                dark: { bg: "#050810", card: "#121212" }
              },
              fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                anton: ['Anton', 'sans-serif']
              }
            }
          }
        };
      `;
      document.head.appendChild(configScript);

      const script = document.createElement('script');
      script.id = 'tailwind-cdn-rve';
      script.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(script);
    }
  }, []);

  const inspector = useInspector();
  const editor = useTailwindEditor(inspector.selectedElement);

  return (
    <>
      <div className={inspector.isInspecting ? "cursor-crosshair" : ""}>
        {children}
      </div>

      <EditorPanel
        {...inspector}
        {...editor}
      />
    </>
  );
}
