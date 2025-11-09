import { cn } from "@/lib/utils";

export type VehicleStatus = "available" | "active" | "charging" | "maintenance" | "reserved";

interface StatusBadgeProps {
  status: VehicleStatus;
  className?: string;
}

const statusConfig = {
  available: {
    label: "Available",
    className: "bg-cyan/20 text-cyan border-cyan",
  },
  active: {
    label: "Active",
    className: "bg-success/20 text-success border-success",
  },
  charging: {
    label: "Charging",
    className: "bg-warning/20 text-warning border-warning",
  },
  maintenance: {
    label: "Maintenance",
    className: "bg-danger/20 text-danger border-danger",
  },
  reserved: {
    label: "Reserved",
    className: "bg-primary/20 text-primary border-primary",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
