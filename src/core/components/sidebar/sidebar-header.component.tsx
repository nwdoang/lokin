import { SidebarHeader } from "@/core/ui/sidebar";
import { ListTodoIcon } from "lucide-react";

type AppSidebarHeaderProps = Readonly<{
  appName: string;
  version: string;
}>;

export function AppSidebarHeader({ appName, version }: AppSidebarHeaderProps) {
  return (
    <SidebarHeader>
      <div className="flex min-h-10 items-center gap-2 px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
        <ListTodoIcon
          aria-label={`${appName} logo`}
          className="size-5 shrink-0 text-sidebar-primary"
          role="img"
        />
        <div className="min-w-0 group-data-[collapsible=icon]:hidden">
          <p className="truncate text-sm font-semibold text-sidebar-foreground">
            {appName}
          </p>
          <p className="truncate text-xs text-muted-foreground">v{version}</p>
        </div>
      </div>
    </SidebarHeader>
  );
}
