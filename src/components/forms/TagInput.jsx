import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export function TagInput({ value = [], onChange, placeholder = "Type and press Enter", error }) {
  const [input, setInput] = useState("");

  function addTag() {
    const tag = input.trim();
    if (!tag) return;
    if (value.includes(tag)) {
      setInput("");
      return;
    }
    onChange?.([...value, tag]);
    setInput("");
  }

  function removeTag(tag) {
    onChange?.(value.filter((t) => t !== tag));
  }

  function onKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && !input && value.length) {
      removeTag(value[value.length - 1]);
    }
  }

  return (
    <div
      className={cn(
        "flex min-h-10 flex-wrap items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1.5 transition-colors focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/30",
        error && "border-danger focus-within:border-danger"
      )}
    >
      {value.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-full bg-brand-500/10 px-2.5 py-1 text-xs font-medium text-brand-600 dark:text-brand-300"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="rounded-full hover:text-danger"
            aria-label={`Remove ${tag}`}
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={addTag}
        placeholder={value.length ? "" : placeholder}
        className="min-w-[120px] flex-1 bg-transparent py-1 text-sm text-content-primary outline-none placeholder:text-content-muted"
      />
    </div>
  );
}

export default TagInput;
