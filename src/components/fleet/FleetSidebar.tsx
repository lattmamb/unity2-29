import { Tables } from "@/integrations/supabase/types";
import { Loader2, Search } from "lucide-react";
import { VehicleDetailCard } from "./VehicleDetailCard";
import { FilterButtonGroup } from "@/components/ui/filter-button-group";
import { VehicleStatus } from "@/components/ui/status-badge";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";

interface FleetSidebarProps {
  vehicles: Tables<"vehicles">[];
  isLoading: boolean;
  selectedVehicleId: string | null;
  onVehicleSelect: (id: string) => void;
}

export function FleetSidebar({ vehicles, isLoading, selectedVehicleId, onVehicleSelect }: FleetSidebarProps) {
  const [filter, setFilter] = useState<VehicleStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filterOptions = [
    { value: "all" as const, label: "All" },
    { value: "available" as const, label: "Available" },
    { value: "active" as const, label: "Active" },
    { value: "charging" as const, label: "Charging" },
    { value: "maintenance" as const, label: "Maintenance" },
  ];

  const filteredVehicles = useMemo(() => {
    let filtered = vehicles;

    if (filter !== "all") {
      filtered = filtered.filter((v) => v.status === filter);
    }

    if (searchQuery) {
      filtered = filtered.filter((v) =>
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.type?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [vehicles, filter, searchQuery]);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px] bg-card/50 backdrop-blur-sm rounded-xl border border-border">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-card/30 backdrop-blur-sm rounded-xl border border-border overflow-hidden">
      <div className="p-6 border-b border-border bg-card/50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Fleet Overview</h2>
          <span className="text-sm text-muted-foreground font-medium">
            {filteredVehicles.length} of {vehicles.length}
          </span>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search vehicles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background/50 border-border focus:border-cyan"
          />
        </div>

        <FilterButtonGroup
          options={filterOptions}
          selected={filter}
          onChange={setFilter}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredVehicles.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No vehicles found</p>
          </div>
        ) : (
          filteredVehicles.map((vehicle) => (
            <VehicleDetailCard
              key={vehicle.id}
              vehicle={vehicle}
              isSelected={selectedVehicleId === vehicle.id}
              onClick={() => onVehicleSelect(vehicle.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
