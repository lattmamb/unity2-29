import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

export type StatCardVariant = "primary" | "success" | "warning" | "danger";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: number;
    label: string;
  };
  variant?: StatCardVariant;
  className?: string;
}

const variantConfig = {
  primary: {
    border: "before:bg-gradient-to-r before:from-cyan before:to-teal",
    icon: "bg-cyan/20 text-cyan",
  },
  success: {
    border: "before:bg-gradient-to-r before:from-success before:to-green-400",
    icon: "bg-success/20 text-success",
  },
  warning: {
    border: "before:bg-gradient-to-r before:from-warning before:to-orange-400",
    icon: "bg-warning/20 text-warning",
  },
  danger: {
    border: "before:bg-gradient-to-r before:from-danger before:to-red-400",
    icon: "bg-danger/20 text-danger",
  },
};

export function StatCard({
  title,
  value,
  icon: Icon,
  change,
  variant = "primary",
  className,
}: StatCardProps) {
  const config = variantConfig[variant];

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative overflow-hidden rounded-xl bg-card/50 backdrop-blur-sm border border-border p-6",
        "before:absolute before:top-0 before:left-0 before:right-0 before:h-1",
        config.border,
        "hover:shadow-lg transition-shadow",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", config.icon)}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="text-3xl font-bold mb-2">{value}</div>

      {change && (
        <div className="flex items-center gap-1 text-sm">
          <span className={cn(change.value >= 0 ? "text-success" : "text-danger")}>
            {change.value >= 0 ? "+" : ""}
            {change.value}%
          </span>
          <span className="text-muted-foreground">{change.label}</span>
        </div>
      )}
    </motion.div>
  );
}
