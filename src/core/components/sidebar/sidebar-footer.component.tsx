import type { UserProfile } from "@/core/components/sidebar/types/sidebar.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/core/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/core/ui/popover";
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/core/ui/sidebar";

export type AppSidebarFooterProps = Readonly<{
  user: UserProfile;
}>;

function getInitials(name: string): string {
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toLocaleUpperCase())
    .join("");

  return initials || "U";
}

function UserAvatar({ user }: Readonly<{ user: UserProfile }>) {
  return (
    <Avatar size="sm">
      {user.avatarUrl ? (
        <AvatarImage alt={user.name} src={user.avatarUrl} />
      ) : null}
      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
    </Avatar>
  );
}

export function AppSidebarFooter({ user }: AppSidebarFooterProps) {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <Popover>
            <PopoverTrigger asChild>
              <SidebarMenuButton
                aria-label={`Open profile for ${user.name}`}
                size="lg"
                tooltip={user.name}
              >
                <UserAvatar user={user} />
                <span className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
                  <span className="block truncate font-medium">
                    {user.name}
                  </span>
                  <span className="block truncate text-muted-foreground">
                    {user.email}
                  </span>
                </span>
              </SidebarMenuButton>
            </PopoverTrigger>
            <PopoverContent align="end" side="right">
              <div className="flex min-w-0 items-center gap-3">
                <UserAvatar user={user} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{user.name}</p>
                  <p className="truncate text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
