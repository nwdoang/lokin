import { Input } from "@/core/ui/input";
import { SidebarTrigger } from "@/core/ui/sidebar";
import { SearchIcon } from "lucide-react";

type AppHeaderProps = Readonly<{
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
}>;

export function AppHeader({
  searchQuery,
  onSearchQueryChange,
}: AppHeaderProps) {
  return (
    <header className="flex h-12 shrink-0 items-center gap-3 border-b px-4">
      <SidebarTrigger
        aria-label="Toggle sidebar"
      />
      <div className="relative w-full max-w-sm">
        <SearchIcon
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          aria-label="Search projects"
          className="pl-7"
          placeholder="Search projects"
          value={searchQuery}
          onChange={(event) => onSearchQueryChange(event.target.value)}
        />
      </div>
    </header>
  );
}
