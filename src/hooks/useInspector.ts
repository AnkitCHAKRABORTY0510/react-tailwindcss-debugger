import { useState, useEffect, useRef } from "react";
import { getReactDebugSource, ReactSource } from "../utils/reactInspector";

export function useInspector() {
  const [isInspecting, setIsInspecting] = useState(false);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [sourceInfo, setSourceInfo] = useState<ReactSource | null>(null);

  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isInspecting) return;

    const move = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("#rve-panel")) return;

      const rect = target.getBoundingClientRect();

      if (!overlayRef.current) {
        const el = document.createElement("div");
        Object.assign(el.style, {
          position: "absolute",
          border: "2px solid #C6FF4D",
          background: "rgba(198,255,77,0.1)",
          pointerEvents: "none",
          zIndex: "9999",
        });
        document.body.appendChild(el);
        overlayRef.current = el;
      }

      Object.assign(overlayRef.current.style, {
        top: `${rect.top + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
      });
    };

    const click = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("#rve-panel")) return;

      e.preventDefault();
      e.stopPropagation();

      setSelectedElement(target);
      setIsInspecting(false);

      // Fast path: parse data-rve-source attribute injected by Babel plugin
      const attr = target.getAttribute("data-rve-source");
      if (attr) {
        const lastColon = attr.lastIndexOf(":");
        const fileName = attr.substring(0, lastColon);
        const lineNumber = Number(attr.substring(lastColon + 1));
        setSourceInfo({ fileName, lineNumber, columnNumber: 0 });
      } else {
        // Slow path: React fiber traversal
        setSourceInfo(getReactDebugSource(target));
      }

      overlayRef.current?.remove();
      overlayRef.current = null;
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("click", click, true);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", click, true);
    };
  }, [isInspecting]);

  return {
    isInspecting,
    setIsInspecting,
    selectedElement,
    setSelectedElement,
    sourceInfo,
  };
}
