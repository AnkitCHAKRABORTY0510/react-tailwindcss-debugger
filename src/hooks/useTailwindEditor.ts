import { useState, useEffect } from "react";
import { parseClasses, updateClass, removeClass, ParsedAttribute } from "../utils/tailwindParser";
import { TAILWIND_SUGGESTIONS } from "../utils/tailwindSuggestions";

export function useTailwindEditor(el: HTMLElement | null) {
  const [originalClasses, setOriginalClasses] = useState("");
  const [classes, setClasses] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [parsedAttributes, setParsedAttributes] = useState<ParsedAttribute[]>([]);
  const [unparsedAttributes, setUnparsedAttributes] = useState<string[]>([]);

  useEffect(() => {
    if (!el) return;

    const clean = (el.className || "").replace(/\s+/g, " ").trim();
    setClasses(clean);
    setOriginalClasses(clean);
  }, [el]);

  useEffect(() => {
    const { parsed, unparsed } = parseClasses(classes);
    setParsedAttributes(parsed);
    setUnparsedAttributes(unparsed || []);
  }, [classes]);

  const updateClasses = (val: string) => {
    setClasses(val);

    if (el) {
      el.className = val;
    }

    const last = val.split(" ").pop() || "";
    if (last.length > 1) {
      setSuggestions(
        TAILWIND_SUGGESTIONS.filter(s => s.startsWith(last)).slice(0, 20)
      );
    } else {
      setSuggestions([]);
    }
  };

  const applySuggestion = (s: string) => {
    const parts = classes.split(" ");
    parts[parts.length - 1] = s;
    const updated = parts.join(" ") + " ";

    updateClasses(updated);
  };

  const updateAttribute = (targetPrefix: string | undefined, newValue: string | number, targetFullClass: string | null, targetType: string) => {
    const nextClasses = updateClass(classes, targetPrefix, newValue, targetFullClass, targetType);
    updateClasses(nextClasses);
  };

  const removeAttribute = (targetFullClass: string) => {
    const nextClasses = removeClass(classes, targetFullClass);
    updateClasses(nextClasses);
  };

  const previewAttribute = (targetPrefix: string | undefined, newValue: string | number, targetFullClass: string | null, targetType: string) => {
    if (!el) return;
    const previewClasses = updateClass(classes, targetPrefix, newValue, targetFullClass, targetType);
    el.className = previewClasses;
  };

  const clearPreview = () => {
    if (!el) return;
    el.className = classes; // Revert to currently committed state
  };

  const revertToOriginal = () => {
    updateClasses(originalClasses);
  };

  const commitChanges = () => {
    setOriginalClasses(classes);
  };

  const hasChanges = classes !== originalClasses;

  return {
    classes,
    originalClasses,
    hasChanges,
    updateClasses,
    suggestions,
    applySuggestion,
    parsedAttributes,
    unparsedAttributes,
    updateAttribute,
    removeAttribute,
    previewAttribute,
    clearPreview,
    revertToOriginal,
    commitChanges
  };
}
