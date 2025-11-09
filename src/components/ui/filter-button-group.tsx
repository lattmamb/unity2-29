import { cn } from "@/lib/utils";

interface FilterButtonGroupProps {
  options: { value: string; label: string }[];
  selected: string;
  onChange: (value: any) => void;
  className?: string;
}

export function FilterButtonGroup({
  options,
  selected,
  onChange,
  className,
}: FilterButtonGroupProps) {
  return (
    <div className={cn("flex gap-2 overflow-x-auto pb-2", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
            "border border-border",
            selected === option.value
              ? "bg-gradient-to-r from-cyan to-teal text-black border-cyan scale-105"
              : "bg-card/50 hover:bg-accent/10 hover:border-cyan/50"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
