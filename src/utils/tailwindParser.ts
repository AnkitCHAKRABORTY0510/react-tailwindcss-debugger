export interface TailwindProperty {
  id: string;
  label: string;
  type: 'select' | 'select-exact' | 'slider' | 'string' | 'arbitrary-slider';
  prefix?: string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  category: string;
}

export interface ParsedAttribute {
  id: string;
  label: string;
  type: string;
  prefix?: string;
  value: string | number;
  fullClass: string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export const TAILWIND_PROPERTIES: TailwindProperty[] = [
  // Layout
  { id: 'display', label: 'Display', type: 'select-exact', options: ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid', 'inline-grid', 'hidden'], category: 'Layout' },
  { id: 'position', label: 'Position', type: 'select-exact', options: ['static', 'fixed', 'absolute', 'relative', 'sticky'], category: 'Layout' },
  { id: 'zIndex', label: 'Z-Index (z)', prefix: 'z-', type: 'select', options: ['0', '10', '20', '30', '40', '50', 'auto'], category: 'Layout' },

  // Flexbox
  { id: 'flexDirection', label: 'Flex Direction', type: 'select-exact', options: ['flex-row', 'flex-row-reverse', 'flex-col', 'flex-col-reverse'], category: 'Flexbox' },
  { id: 'flexWrap', label: 'Flex Wrap', type: 'select-exact', options: ['flex-wrap', 'flex-wrap-reverse', 'flex-nowrap'], category: 'Flexbox' },
  { id: 'alignItems', label: 'Align Items', type: 'select-exact', options: ['items-start', 'items-end', 'items-center', 'items-baseline', 'items-stretch'], category: 'Flexbox' },
  { id: 'justifyContent', label: 'Justify Content', type: 'select-exact', options: ['justify-normal', 'justify-start', 'justify-end', 'justify-center', 'justify-between', 'justify-around', 'justify-evenly'], category: 'Flexbox' },

  // Typography
  { id: 'textSize', label: 'Text Size', prefix: 'text-', type: 'select', options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'], category: 'Typography' },
  { id: 'fontWeight', label: 'Font Weight', prefix: 'font-', type: 'select', options: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'], category: 'Typography' },

  // Spacing
  { id: 'padding', label: 'Padding (p)', prefix: 'p-', type: 'slider', min: 0, max: 96, category: 'Spacing' },
  { id: 'paddingX', label: 'Padding X (px)', prefix: 'px-', type: 'slider', min: 0, max: 96, category: 'Spacing' },
  { id: 'paddingY', label: 'Padding Y (py)', prefix: 'py-', type: 'slider', min: 0, max: 96, category: 'Spacing' },
  { id: 'paddingTop', label: 'Padding Top (pt)', prefix: 'pt-', type: 'slider', min: 0, max: 96, category: 'Spacing' },
  { id: 'paddingBottom', label: 'Padding Bottom (pb)', prefix: 'pb-', type: 'slider', min: 0, max: 96, category: 'Spacing' },
  { id: 'paddingLeft', label: 'Padding Left (pl)', prefix: 'pl-', type: 'slider', min: 0, max: 96, category: 'Spacing' },
  { id: 'paddingRight', label: 'Padding Right (pr)', prefix: 'pr-', type: 'slider', min: 0, max: 96, category: 'Spacing' },
  
  { id: 'margin', label: 'Margin (m)', prefix: 'm-', type: 'slider', min: 0, max: 96, category: 'Spacing' },
  { id: 'marginX', label: 'Margin X (mx)', prefix: 'mx-', type: 'slider', min: 0, max: 96, category: 'Spacing' },
  { id: 'marginY', label: 'Margin Y (my)', prefix: 'my-', type: 'slider', min: 0, max: 96, category: 'Spacing' },
  { id: 'marginTop', label: 'Margin Top (mt)', prefix: 'mt-', type: 'slider', min: 0, max: 96, category: 'Spacing' },
  { id: 'marginBottom', label: 'Margin Bottom (mb)', prefix: 'mb-', type: 'slider', min: 0, max: 96, category: 'Spacing' },
  { id: 'marginLeft', label: 'Margin Left (ml)', prefix: 'ml-', type: 'slider', min: 0, max: 96, category: 'Spacing' },
  { id: 'marginRight', label: 'Margin Right (mr)', prefix: 'mr-', type: 'slider', min: 0, max: 96, category: 'Spacing' },
  { id: 'gap', label: 'Gap (gap)', prefix: 'gap-', type: 'slider', min: 0, max: 96, category: 'Spacing' },

  // Sizing
  { id: 'width', label: 'Width (w)', prefix: 'w-', type: 'slider', min: 0, max: 96, category: 'Sizing' },
  { id: 'height', label: 'Height (h)', prefix: 'h-', type: 'slider', min: 0, max: 96, category: 'Sizing' },

  // Borders & Effects
  { id: 'borderRadius', label: 'Border Radius', prefix: 'rounded-', type: 'select', options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'], category: 'Borders' },
  { id: 'borderWidth', label: 'Border Width', prefix: 'border-', type: 'slider', min: 0, max: 8, category: 'Borders' },
  { id: 'opacity', label: 'Opacity', prefix: 'opacity-', type: 'slider', min: 0, max: 100, step: 5, category: 'Effects' },

  // Colors & Strings
  { id: 'backgroundColor', label: 'Background Color', prefix: 'bg-', type: 'string', category: 'Colors' },
  { id: 'textColor', label: 'Text Color', prefix: 'text-', type: 'string', category: 'Colors' },
  { id: 'borderColor', label: 'Border Color', prefix: 'border-', type: 'string', category: 'Colors' },
  { id: 'shadowColor', label: 'Shadow', prefix: 'shadow-', type: 'string', category: 'Effects' },

  // Custom User Classes
  { id: 'customGlow', label: 'Glow Effect', type: 'select-exact', options: ['glow-green', 'inner-glow-green', 'glow-text-white', 'glow-text-green'], category: 'Custom CSS' },
  { id: 'customTextStroke', label: 'Text Stroke', type: 'select-exact', options: ['text-stroke-black', 'text-stroke-black-lg'], category: 'Custom CSS' },
  { id: 'customBgGradient', label: 'Custom Gradients', type: 'select-exact', options: ['diagonal-bg', 'avatar-gradient', 'stats-box-gradient'], category: 'Custom CSS' },
  { id: 'customTextShadow', label: 'Figma Shadow', type: 'select-exact', options: ['figma-text-shadow'], category: 'Custom CSS' },
  { id: 'customTypography', label: 'Small Caps', type: 'select-exact', options: ['small-caps'], category: 'Custom CSS' },
];

export function parseClasses(classString: string) {
  const classes = (classString || "").split(" ").filter(Boolean);
  const parsed: ParsedAttribute[] = [];
  const unparsed: string[] = [];

  classes.forEach(cls => {
    let matched = false;
    
    for (const prop of TAILWIND_PROPERTIES) {
      if (prop.type === 'select-exact' && prop.options) {
        if (prop.options.includes(cls)) {
          parsed.push({ 
            id: prop.id, label: prop.label, type: prop.type, 
            value: cls, fullClass: cls, options: prop.options 
          });
          matched = true;
          break;
        }
      } else if (prop.prefix && cls.startsWith(prop.prefix)) {
        const valStr = cls.slice(prop.prefix.length);
        
        if (prop.type === 'select' && prop.options) {
          if (prop.options.includes(valStr)) {
            parsed.push({ 
              id: prop.id, label: prop.label, prefix: prop.prefix, 
              value: valStr, type: prop.type, fullClass: cls, options: prop.options
            });
            matched = true;
            break;
          } else if (valStr.startsWith('[') && valStr.endsWith(']')) {
             parsed.push({ 
               id: prop.id, label: prop.label + ' (Arbitrary)', prefix: prop.prefix, 
               value: valStr, type: 'string', fullClass: cls
             });
             matched = true;
             break;
          }
        } else if (prop.type === 'slider') {
          const num = parseFloat(valStr);
          if (!isNaN(num) && cls === `${prop.prefix}${valStr}`) {
            parsed.push({ 
              id: prop.id, label: prop.label, prefix: prop.prefix, 
              value: num, type: prop.type, fullClass: cls, 
              min: prop.min, max: prop.max, step: prop.step || 1 
            });
            matched = true;
            break;
          } else if (valStr.startsWith('[') && valStr.endsWith(']')) {
             const isColor = valStr.startsWith('[#') || valStr.startsWith('[rgb') || valStr.startsWith('[hsl');
             if (!isColor) {
               const inner = valStr.slice(1, -1);
               const match = inner.match(/^(-?\d+\.?\d*)([a-zA-Z%]*)$/);
               
               if (match) {
                 const numVal = parseFloat(match[1]);
                 const unit = match[2] || '';
                 
                 let maxBound = numVal * 2;
                 if (maxBound < 100) maxBound = 100;
                 if (maxBound > 2000) maxBound = 2000;
                 if (unit === '%') maxBound = 100;
                 if (unit === 'vh' || unit === 'vw') maxBound = 100;

                 parsed.push({ 
                   id: prop.id, label: prop.label, prefix: prop.prefix, 
                   value: numVal, unit: unit, type: 'arbitrary-slider', fullClass: cls,
                   min: numVal < 0 ? maxBound * -1 : 0, 
                   max: maxBound, 
                   step: unit === 'px' ? 1 : Math.abs(numVal) < 10 ? 0.1 : 1
                 });
               } else {
                 parsed.push({ 
                   id: prop.id, label: prop.label + ' (Arbitrary)', prefix: prop.prefix, 
                   value: valStr, type: 'string', fullClass: cls
                 });
               }
               matched = true;
               break;
             }
          }
        } else if (prop.type === 'string') {
          parsed.push({
            id: prop.id, label: prop.label, prefix: prop.prefix,
            value: valStr, type: prop.type, fullClass: cls
          });
          matched = true;
          break;
        }
      }
    }

    if (!matched) {
      unparsed.push(cls);
    }
  });

  return { parsed, unparsed };
}

export function updateClass(classString: string, targetPrefix: string | undefined, newValue: string | number, targetFullClass: string | null, targetType: string) {
  const classes = (classString || "").split(" ").filter(Boolean);
  
  let replaced = false;
  const newClass = targetType === 'select-exact' ? String(newValue) : `${targetPrefix}${newValue}`;

  const nextClasses = classes.map(cls => {
    if (cls === targetFullClass) {
      replaced = true;
      return newClass;
    }
    
    if (!replaced && targetType === 'select-exact') {
      const propGroup = TAILWIND_PROPERTIES.find(p => p.type === 'select-exact' && p.options?.includes(String(newValue)));
      if (propGroup && propGroup.options?.includes(cls)) {
        replaced = true;
        return newClass;
      }
    }

    if (!replaced && targetPrefix && cls.startsWith(targetPrefix)) {
      for (const prop of TAILWIND_PROPERTIES) {
         if (prop.prefix === targetPrefix) {
            const valStr = cls.slice(prop.prefix.length);
            
            if (prop.type === 'select' && prop.options) {
               if (prop.options.includes(valStr) || (valStr.startsWith('[') && valStr.endsWith(']'))) {
                  replaced = true;
                  return newClass;
               }
            } else if (prop.type === 'slider') {
               const isNum = !isNaN(parseFloat(valStr)) && cls === `${prop.prefix}${valStr}`;
               const isArb = valStr.startsWith('[') && valStr.endsWith(']');
               
               if (isNum) {
                  replaced = true;
                  return newClass;
               } else if (isArb) {
                  const isColor = valStr.startsWith('[#') || valStr.startsWith('[rgb') || valStr.startsWith('[hsl');
                  if (!isColor) {
                    replaced = true;
                    return newClass;
                  }
               }
            } else if (prop.type === 'string') {
               replaced = true;
               return newClass;
            }
         }
      }
    }
    return cls;
  });

  if (!replaced) {
    nextClasses.push(newClass);
  }

  return nextClasses.join(" ");
}

export function removeClass(classString: string, targetFullClass: string) {
  const classes = (classString || "").split(" ").filter(Boolean);
  return classes.filter(cls => cls !== targetFullClass).join(" ");
}
