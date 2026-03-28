const SIZES = ['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '72', '80', '96', 'auto', 'full', 'screen', '1/2', '1/3', '2/3', '1/4', '3/4'];
const COLORS = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
const SHADES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
const TEXT_SIZES = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];
const FONT_WEIGHTS = ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'];
const ROUNDING = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'];
const SHADOWS = ['sm', 'md', 'lg', 'xl', '2xl', 'inner', 'none'];

const suggestions = new Set<string>();

// Layout & Flexbox
const LAYOUT = ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid', 'hidden', 'static', 'fixed', 'absolute', 'relative', 'sticky', 'flex-row', 'flex-col', 'flex-wrap', 'items-start', 'items-end', 'items-center', 'items-stretch', 'justify-start', 'justify-end', 'justify-center', 'justify-between', 'z-0', 'z-10', 'z-20', 'z-30', 'z-40', 'z-50', 'z-auto'];
LAYOUT.forEach(l => suggestions.add(l));

// Spacing & Sizing
const SPACING_PREFIXES = ['p-', 'px-', 'py-', 'pt-', 'pb-', 'pl-', 'pr-', 'm-', 'mx-', 'my-', 'mt-', 'mb-', 'ml-', 'mr-', 'gap-', 'w-', 'h-', 'max-w-', 'max-h-', 'min-w-', 'min-h-'];
SPACING_PREFIXES.forEach(prefix => {
  SIZES.forEach(size => suggestions.add(`${prefix}${size}`));
  // Negative margins
  if (prefix.startsWith('m')) {
    SIZES.forEach(size => size !== '0' && size !== 'auto' && suggestions.add(`-${prefix}${size}`));
  }
});

// Colors
const COLOR_PREFIXES = ['bg-', 'text-', 'border-', 'ring-', 'fill-', 'stroke-'];
const USER_CUSTOM_COLORS = ['neon-green', 'neon-border', 'dark-bg', 'dark-card'];

COLOR_PREFIXES.forEach(prefix => {
  suggestions.add(`${prefix}black`);
  suggestions.add(`${prefix}white`);
  suggestions.add(`${prefix}transparent`);
  
  // Custom Config Colors
  USER_CUSTOM_COLORS.forEach(color => {
    suggestions.add(`${prefix}${color}`);
  });

  COLORS.forEach(color => {
    SHADES.forEach(shade => {
      suggestions.add(`${prefix}${color}-${shade}`);
    });
  });
});

// Typography
TEXT_SIZES.forEach(s => suggestions.add(`text-${s}`));
FONT_WEIGHTS.forEach(w => suggestions.add(`font-${w}`));
['italic', 'not-italic', 'underline', 'overline', 'line-through', 'no-underline', 'uppercase', 'lowercase', 'capitalize'].forEach(t => suggestions.add(t));

// Effects & Borders
ROUNDING.forEach(r => suggestions.add(`rounded-${r}`));
SHADOWS.forEach(s => suggestions.add(`shadow-${s}`));
['opacity-0', 'opacity-5', 'opacity-10', 'opacity-20', 'opacity-25', 'opacity-30', 'opacity-40', 'opacity-50', 'opacity-60', 'opacity-70', 'opacity-75', 'opacity-80', 'opacity-90', 'opacity-95', 'opacity-100'].forEach(o => suggestions.add(o));
['transition', 'transition-all', 'transition-colors', 'transition-opacity', 'transition-shadow', 'transition-transform', 'duration-75', 'duration-100', 'duration-150', 'duration-200', 'duration-300', 'duration-500', 'duration-700', 'duration-1000'].forEach(t => suggestions.add(t));

// User Custom CSS Classes (index.css)
const USER_CUSTOM_CSS_CLASSES = [
  'glow-green', 'inner-glow-green', 'glow-text-white', 'glow-text-green',
  'figma-text-shadow', 'text-stroke-black', 'text-stroke-black-lg',
  'diagonal-bg', 'avatar-gradient', 'stats-box-gradient', 'small-caps'
];
USER_CUSTOM_CSS_CLASSES.forEach(cls => suggestions.add(cls));

export const TAILWIND_SUGGESTIONS = Array.from(suggestions);
