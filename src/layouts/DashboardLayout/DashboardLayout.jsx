import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Sparkles,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Inbox,
  UploadCloud,
  BarChart3,
  Settings,
  LogOut,
  Shield,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useAuth, useSidebar } from "@/context";
import { useContactUnreadCount } from "@/features/contact";
import { useLogout } from "@/features/auth";
import { Avatar } from "@/components/ui";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { routes } from "@/constants/routes";
import { identity } from "@/config/identity";

const NAV = [
  {
    section: "Overview",
    items: [{ to: routes.admin.dashboard, label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    section: "Content",
    items: [
      { to: routes.admin.projects, label: "Projects", icon: FolderKanban },
      { to: routes.admin.skills, label: "Skills", icon: Sparkles },
      { to: routes.admin.experience, label: "Experience", icon: Briefcase },
      { to: routes.admin.education, label: "Education", icon: GraduationCap },
      { to: routes.admin.certificates, label: "Certificates", icon: Award },
      { to: routes.admin.blogs, label: "Blog", icon: FileText },
    ],
  },
  {
    section: "Operations",
    items: [
      { to: routes.admin.contact, label: "Messages", icon: Inbox, badge: "unread" },
      { to: routes.admin.uploads, label: "Uploads", icon: UploadCloud },
      { to: routes.admin.analytics, label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    section: "System",
    items: [
      { to: routes.admin.settings, label: "Settings", icon: Settings },
      { to: routes.admin.account, label: "Account", icon: Shield },
    ],
  },
];

function SidebarItem({ item, onNavigate }) {
  const { data: unread } = useContactUnreadCount();
  const Icon = item.icon;
  const showBadge = item.badge === "unread" && unread && unread > 0;
  return (
    <NavLink
      to={item.to}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-brand-500/10 text-brand-600 dark:text-brand-300"
            : "text-content-secondary hover:bg-surface-hover hover:text-content-primary"
        )
      }
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="flex-1">{item.label}</span>
      {showBadge && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1.5 text-2xs font-semibold text-white">
          {unread}
        </span>
      )}
    </NavLink>
  );
}

function SidebarContent({ onNavigate }) {
  const { admin, isAuthenticated } = useAuth();
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 font-heading text-sm font-bold tracking-tight text-brand-fg">
          {identity.monogram}
        </span>
        <div className="leading-tight">
          <p className="font-heading text-sm font-bold text-content-primary">{identity.name}</p>
          <p className="text-2xs uppercase tracking-wider text-content-muted">Control Center</p>
        </div>
      </div>
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {NAV.map((group) => (
          <div key={group.section}>
            <p className="px-3 pb-2 text-2xs font-semibold uppercase tracking-wider text-content-muted">
              {group.section}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => (
                <SidebarItem key={item.to} item={item} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        ))}
      </nav>
      {isAuthenticated && admin && (
        <div className="border-t border-border p-3">
          <NavLink
            to={routes.admin.account}
            onClick={onNavigate}
            className="flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-surface-hover"
          >
            <Avatar name={admin.name} size="sm" />
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-medium text-content-primary">{admin.name}</p>
              <p className="truncate text-2xs text-content-muted">{admin.email}</p>
            </div>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export function DashboardLayout({ children }) {
  const { isOpen, close, toggle } = useSidebar();
  const logoutMutation = useLogout();
  const navigate = useNavigate();
  const { admin } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } finally {
      navigate(routes.login, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-bg-base">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-surface lg:block">
        <SidebarContent />
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={close}
          />
          <aside className="absolute inset-y-0 left-0 w-72 animate-slide-in-right border-r border-border bg-surface">
            <SidebarContent onNavigate={close} />
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-border bg-bg-base/85 px-5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggle}
              aria-label="Toggle menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-content-secondary lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <p className="text-sm text-content-muted">
              Welcome back,{" "}
              <span className="font-medium text-content-primary">
                {admin?.name || identity.name}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle variant="button" />
            <button
              type="button"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm text-content-secondary transition-colors hover:bg-surface-hover hover:text-danger disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">
                {logoutMutation.isPending ? "Logging out…" : "Logout"}
              </span>
            </button>
          </div>
        </header>
        <main className="container-page py-8">{children || <Outlet />}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
