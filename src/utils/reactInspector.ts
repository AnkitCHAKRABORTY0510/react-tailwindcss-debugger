export interface ReactSource {
  fileName: string;
  lineNumber: number;
  columnNumber: number;
}

export function initInspector() {
  const map = new WeakMap<Element, ReactSource>();

  document.querySelectorAll('*').forEach(el => {
    const source = getReactDebugSource(el);
    if (source && source.fileName) {
      map.set(el, source);
    }
  });

  return map;
}

export function startObserver(map: WeakMap<Element, ReactSource>) {
  let timeout: NodeJS.Timeout;

  const observer = new MutationObserver(mutations => {
    for (const m of mutations) {
      if (m.type === 'attributes' && m.attributeName === 'class') {
        const el = m.target as HTMLElement;
        // Check if Editor panel container logic triggered this (avoid loops)
        if (el.matches('#rve-panel, #rve-panel *')) continue;

        const source = map.get(el) || getReactDebugSource(el);
        if (!source || !source.fileName) continue;

        clearTimeout(timeout);
        timeout = setTimeout(() => {
          fetch('http://localhost:3001/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              file: source.fileName,
              line: source.lineNumber,
              className: el.className
            })
          }).catch(err => console.error("RVE Sync Error:", err));
        }, 500); // 500ms debounce
      }
    }
  });

  observer.observe(document.body, {
    attributes: true,
    subtree: true,
    attributeFilter: ['class']
  });
}

function getFiber(el: any) {
  const key = Object.keys(el).find(k =>
    k.startsWith('__reactFiber$') || k.startsWith('__reactInternalInstance$')
  );
  return key ? el[key] : null;
}

function getSourceFromFiber(fiber: any): ReactSource | null {
  if (!fiber) return null;

  // 1. Direct debug source
  if (fiber._debugSource) return fiber._debugSource;

  // 2. React 18 / Vite (__source injection)
  if (fiber.memoizedProps && fiber.memoizedProps.__source) return fiber.memoizedProps.__source;
  if (fiber.pendingProps && fiber.pendingProps.__source) return fiber.pendingProps.__source;

  // 3. HOC / wrapped component
  if (fiber.type && fiber.type.__source) return fiber.type.__source;

  // 4. Owner fallback
  if (fiber._debugOwner && fiber._debugOwner._debugSource) {
    return fiber._debugOwner._debugSource;
  }

  return null;
}

function resolveFiberSource(fiber: any): ReactSource | null {
  const visited = new Set();
  
  while (fiber && !visited.has(fiber)) {
    visited.add(fiber);
    
    const source = getSourceFromFiber(fiber);
    if (source) return source;

    // Go up the tree: prefer owner component over bare DOM parent
    fiber = fiber._debugOwner || fiber.return;
  }
  
  return null;
}

export function getReactDebugSource(el: Element): ReactSource | null {
  let scan: Element | null = el;
  while (scan) {
    // 1. Fast Path: Babel plugin injection
    const attr = (scan as HTMLElement).getAttribute?.("data-rve-source");
    if (attr) {
      const [fileName, lineNumber] = attr.split(":");
      return {
        fileName,
        lineNumber: Number(lineNumber),
        columnNumber: 0,
      };
    }

    // 2. Slow Path: Fiber traversal
    const fiber = getFiber(scan);
    if (fiber) {
      const source = resolveFiberSource(fiber);
      if (source) return source;
    }
    scan = scan.parentElement;
  }
  return null;
}
