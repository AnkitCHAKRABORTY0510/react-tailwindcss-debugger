import React, { useState } from "react";
import { MousePointer2, X, Plus, Trash2, RotateCcw, Minus, Maximize2 } from "lucide-react";
import { motion } from "framer-motion";
import { TAILWIND_PROPERTIES, ParsedAttribute } from "../utils/tailwindParser";

interface CustomSelectProps {
  attr: ParsedAttribute;
  updateAttribute: (prefix: string | undefined, value: string | number, fullClass: string | null, type: string) => void;
  previewAttribute: (prefix: string | undefined, value: string | number, fullClass: string | null, type: string) => void;
  clearPreview: () => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ attr, updateAttribute, previewAttribute, clearPreview }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex-1" onMouseLeave={() => { clearPreview(); setIsOpen(false); }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left bg-black/40 border border-white/10 rounded-md text-[11px] text-white px-2 py-1.5 outline-none focus:border-[#C6FF4D]/50 cursor-pointer flex justify-between items-center transition-colors"
      >
        <span>{attr.type === 'select-exact' ? attr.value : `${attr.prefix}${attr.value}`}</span>
        <span className="text-[8px] text-white/50">{isOpen ? "▲" : "▼"}</span>
      </button>
      
      {isOpen && attr.options && (
        <div className="absolute top-full left-0 w-full pt-1 z-[60]">
          <div className="bg-[#1a1c23] border border-white/10 rounded-md shadow-xl max-h-40 overflow-y-auto custom-scrollbar flex flex-col">
            {attr.options.map(opt => {
              const displayVal = attr.type === 'select-exact' ? opt : `${attr.prefix}${opt}`;
              return (
                <div 
                  key={opt}
                  className="px-2 py-1.5 text-[11px] text-white/70 hover:bg-[#C6FF4D]/20 hover:text-[#C6FF4D] cursor-pointer transition-colors"
                  onMouseEnter={() => previewAttribute(attr.prefix, opt, attr.fullClass, attr.type)}
                  onClick={() => {
                    updateAttribute(attr.prefix, opt, attr.fullClass, attr.type);
                    setIsOpen(false);
                  }}
                >
                  {displayVal}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

interface EditorPanelProps {
  isInspecting: boolean;
  setIsInspecting: (val: boolean) => void;
  selectedElement: HTMLElement | null;
  setSelectedElement: (el: HTMLElement | null) => void;
  sourceInfo: { fileName: string; lineNumber: number; columnNumber: number } | null;
  classes: string;
  updateClasses: (val: string) => void;
  suggestions: string[];
  applySuggestion: (s: string) => void;
  parsedAttributes: ParsedAttribute[];
  unparsedAttributes: string[];
  updateAttribute: (prefix: string | undefined, value: string | number, fullClass: string | null, type: string) => void;
  removeAttribute: (fullClass: string) => void;
  hasChanges: boolean;
  revertToOriginal: () => void;
  previewAttribute: (prefix: string | undefined, value: string | number, fullClass: string | null, type: string) => void;
  clearPreview: () => void;
  commitChanges?: () => void;
}

export default function EditorPanel({
  isInspecting,
  setIsInspecting,
  selectedElement,
  setSelectedElement,
  sourceInfo,
  classes,
  updateClasses,
  suggestions,
  applySuggestion,
  parsedAttributes,
  unparsedAttributes,
  updateAttribute,
  removeAttribute,
  hasChanges,
  revertToOriginal,
  previewAttribute,
  clearPreview,
  commitChanges
}: EditorPanelProps) {
  const [showAddProp, setShowAddProp] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Group properties by category for the Add UI
  const categories = TAILWIND_PROPERTIES.reduce((acc: Record<string, any[]>, prop) => {
    if (!acc[prop.category]) acc[prop.category] = [];
    acc[prop.category].push({ ...prop });
    return acc;
  }, {});

  const getPropDefault = (prop: any) => {
    let defaultVal: string | number = '';
    if (prop.type === 'slider') defaultVal = prop.prefix === 'opacity-' ? 100 : 4;
    else if (prop.type === 'select' || prop.type === 'select-exact') defaultVal = prop.options[0];
    else if (prop.type === 'string') defaultVal = 'current';
    return defaultVal;
  };

  const handleAddProp = (prop: any) => {
    updateAttribute(prop.prefix, getPropDefault(prop), null, prop.type);
    setShowAddProp(false);
  };

  return (
    <motion.div 
      drag 
      dragMomentum={false}
      id="rve-panel" 
      className="fixed bottom-6 right-6 flex flex-col items-end font-sans touch-none" 
      style={{ zIndex: 2147483647 }}
    >
      {/* Panel */}
      {selectedElement && !isMinimized && (
        <div 
          className="mb-4 w-80 bg-[#0A0D14] p-4 rounded-xl border border-white/10 shadow-2xl flex flex-col gap-3 max-h-[85vh] overflow-y-auto custom-scrollbar"
          onPointerDown={(e) => e.stopPropagation()}
        >
          
          <div className="flex justify-between items-center mb-1">
            <div className="text-[10px] text-white/50 font-mono bg-black/20 p-1 rounded inline-block px-2">
              {sourceInfo?.fileName?.split('/').pop() || "Unknown"}:{sourceInfo?.lineNumber || "?"}
            </div>
            <div className="flex items-center gap-2">
              {hasChanges && (
                 <button 
                   onClick={revertToOriginal} 
                   className="flex items-center gap-1 text-[10px] text-yellow-400/80 hover:text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20 px-2 py-0.5 rounded transition-colors"
                   title="Undo all changes"
                 >
                   <RotateCcw size={10} /> Undo
                 </button>
              )}
              <button 
                onClick={() => setIsMinimized(true)} 
                className="text-white/40 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
                title="Minimize Panel"
              >
                <Minus size={14} />
              </button>
              <button 
                onClick={() => { setSelectedElement(null); setIsMinimized(false); }} 
                className="text-white/40 hover:text-red-400 transition-colors p-1 hover:bg-white/10 rounded ml-1"
                title="Unselect Element"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {parsedAttributes.length > 0 && (
            <div className="flex flex-col gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
              {parsedAttributes.map((attr, idx) => (
                <div key={idx} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-semibold text-white/70 tracking-wide uppercase">{attr.label}</label>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#C6FF4D] font-mono">{attr.fullClass}</span>
                      <button 
                        onClick={() => removeAttribute(attr.fullClass)} 
                        className="text-white/30 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                  {attr.type === 'slider' ? (
                     <div className="flex items-center gap-3">
                       <input 
                         type="range" 
                         min={attr.min} 
                         max={attr.max} 
                         step={attr.step}
                         value={attr.value} 
                         onChange={(e) => updateAttribute(attr.prefix, e.target.value, attr.fullClass, attr.type)}
                         className="flex-1 h-1.5 bg-black/50 rounded-lg appearance-none cursor-pointer accent-[#C6FF4D]"
                       />
                       <span className="text-[11px] font-mono font-bold text-white w-6 text-right">{attr.value}</span>
                     </div>
                  ) : attr.type === 'arbitrary-slider' ? (
                     <div className="flex items-center gap-2">
                       <input 
                         type="range" 
                         min={attr.min} 
                         max={attr.max} 
                         step={attr.step}
                         value={attr.value} 
                         onChange={(e) => updateAttribute(attr.prefix, `[${e.target.value}${attr.unit}]`, attr.fullClass, attr.type)}
                         className="flex-1 h-1.5 bg-black/50 rounded-lg appearance-none cursor-pointer accent-[#C6FF4D]"
                       />
                       <div className="flex bg-black/40 border border-white/10 rounded-md overflow-hidden focus-within:border-[#C6FF4D]/50 transition-colors w-16 flex-shrink-0">
                         <input 
                           type="number"
                           value={attr.value}
                           onChange={(e) => updateAttribute(attr.prefix, `[${e.target.value}${attr.unit}]`, attr.fullClass, attr.type)}
                           className="w-full bg-transparent text-[10px] text-white px-1 py-1 outline-none font-mono text-center appearance-none"
                         />
                         <span className="text-[9px] text-white/50 bg-black/50 px-1 py-1 flex items-center border-l border-white/10">
                           {attr.unit}
                         </span>
                       </div>
                     </div>
                  ) : attr.type === 'string' ? (
                     <div className="flex bg-black/40 border border-white/10 rounded-md overflow-hidden focus-within:border-[#C6FF4D]/50 transition-colors">
                        <input 
                           type="text"
                           value={attr.value}
                           onChange={(e) => updateAttribute(attr.prefix, e.target.value, attr.fullClass, attr.type)}
                           className="w-full bg-transparent text-[11px] text-white px-2 py-1.5 outline-none font-mono"
                           placeholder="value..."
                        />
                     </div>
                  ) : (
                     <CustomSelect 
                        attr={attr} 
                        updateAttribute={updateAttribute} 
                        previewAttribute={previewAttribute} 
                        clearPreview={clearPreview} 
                     />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="relative">
             <button 
               onClick={() => setShowAddProp(!showAddProp)}
               className="w-full py-2 border border-dashed border-white/20 rounded-lg flex items-center justify-center gap-2 text-xs text-white/60 hover:text-[#C6FF4D] hover:border-[#C6FF4D]/50 hover:bg-[#C6FF4D]/10 transition-all font-medium tracking-wide"
             >
               <Plus size={14} /> Add Property
             </button>

             {showAddProp && (
               <div className="absolute w-full mt-2 bg-[#1a1c23] border border-white/10 rounded-lg shadow-2xl p-3 max-h-56 overflow-y-auto z-[70]">
                 {Object.entries(categories).map(([category, props]) => (
                   <div key={category} className="mb-3 last:mb-0">
                     <h4 className="text-[10px] uppercase text-white/40 mb-1.5 font-bold tracking-wider">{category}</h4>
                     <div className="grid grid-cols-2 gap-1.5">
                       {props.map(prop => (
                         <button 
                           key={prop.id}
                           className="text-left text-[11px] px-2 py-1.5 rounded bg-black/20 hover:bg-[#C6FF4D]/20 hover:text-[#C6FF4D] text-white/70 transition-colors truncate"
                           onMouseEnter={() => previewAttribute(prop.prefix, getPropDefault(prop), null, prop.type)}
                           onMouseLeave={clearPreview}
                           onClick={() => handleAddProp(prop)}
                         >
                           {prop.label}
                         </button>
                       ))}
                     </div>
                   </div>
                 ))}
               </div>
             )}
          </div>

          <div className="h-px bg-white/10 w-full my-1"></div>

          {/* Custom / Normal CSS Classes */}
          {unparsedAttributes && unparsedAttributes.length > 0 && (
            <div className="flex flex-col gap-2">
              <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-wider pl-1">Custom CSS</h3>
              <div className="flex flex-wrap gap-1.5 bg-white/5 p-2 rounded-lg border border-white/5">
                {unparsedAttributes.map((cls, idx) => (
                  <div key={idx} className="flex items-center gap-1 px-1.5 py-1 bg-black/40 border border-white/10 rounded-md text-[10px] text-white/80 font-mono">
                    {cls}
                    <button 
                      onClick={() => removeAttribute(cls)}
                      className="text-white/30 hover:text-red-400 transition-colors ml-1"
                    >
                      <Trash2 size={10} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Manual Textbox */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-wider pl-1">Raw Classes</h3>
            <textarea
              value={classes}
              onChange={(e) => updateClasses(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-md p-2.5 text-[11px] leading-relaxed font-mono text-white/90 focus:outline-none focus:border-[#C6FF4D]/50 transition-colors"
              rows={3}
              placeholder="Tailwind classes..."
            />
          </div>

          {suggestions && suggestions.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => applySuggestion(s)}
                  className="px-2 py-1 text-[10px] font-mono bg-white/5 hover:bg-[#C6FF4D]/20 hover:text-[#C6FF4D] text-white/70 rounded transition-colors border border-white/5"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => {
              fetch("http://localhost:3001/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  file: sourceInfo?.fileName,
                  line: sourceInfo?.lineNumber,
                  className: classes,
                }),
              }).then(() => {
                if (commitChanges) commitChanges();
              }).catch(err => console.error(err));
            }}
            className={`w-full mt-1 font-bold py-2.5 rounded-md text-xs transition-all duration-300 ${
              hasChanges 
                ? "bg-[#C6FF4D] text-black hover:bg-[#b0f030] shadow-[0_0_15px_rgba(198,255,77,0.3)]" 
                : "bg-white/10 text-white/50 hover:bg-white/20"
            }`}
          >
            {hasChanges ? "Apply Changes" : "No Changes"}
          </button>

        </div>
      )}

      {selectedElement && isMinimized && (
        <div 
          className="mb-4 flex gap-3 items-center bg-[#0A0D14] p-2.5 rounded-full border border-white/10 shadow-2xl"
          onPointerDown={(e) => e.stopPropagation()}
        >
           <div className="text-[11px] text-white/70 font-mono px-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon-green/80 animate-pulse"></span>
              {sourceInfo?.fileName?.split('/').pop() || "Selected"}
           </div>
           
           <div className="flex items-center ml-1 space-x-1">
             <button onClick={() => setIsMinimized(false)} className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
               <Maximize2 size={14} className="text-white/70" />
             </button>
             <button onClick={() => { setSelectedElement(null); setIsMinimized(false); }} className="p-1.5 hover:bg-red-500/20 rounded-full transition-colors">
               <X size={14} className="text-white/40" />
             </button>
           </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsInspecting(!isInspecting)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all ${
          isInspecting ? "bg-[#333] text-white/70" : "bg-[#C6FF4D] text-black hover:scale-105 shadow-[0_0_20px_rgba(198,255,77,0.4)]"
        }`}
      >
        {isInspecting ? <X size={24} /> : <MousePointer2 size={24} />}
      </button>

    </motion.div>
  );
}
