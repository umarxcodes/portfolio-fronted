import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/common/BrandIcons";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Button } from "@/components/ui";
import { useSettings } from "@/features/settings";
import { useProfile } from "@/features/profile";
import { getIdentityProfile, getIdentitySettings, getInitials, identity } from "@/config/identity";
import { cn } from "@/lib/cn";

const NAV = [
  { to: "/", label: "Home", end: true },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { data } = useSettings();
  const { data: profileData } = useProfile();
  const settings = getIdentitySettings(data?.settings);
  const profile = getIdentityProfile(profileData?.profile);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const brand = profile.name || settings.siteTitle || identity.name;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-bg-base/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 font-heading text-sm font-bold tracking-tight text-brand-fg shadow-sm transition-transform group-hover:scale-105">
            {getInitials(brand) || identity.monogram}
          </span>
          <span className="font-heading text-lg font-bold tracking-tight text-content-primary">
            {brand}
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-content-primary"
                    : "text-content-secondary hover:text-content-primary"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle variant="button" />
          <Link
            to="/search"
            aria-label="Search"
            className="hidden h-9 w-9 items-center justify-center rounded-md border border-border text-content-secondary transition-colors hover:bg-surface-hover hover:text-content-primary sm:inline-flex"
          >
            <Search className="h-4 w-4" />
          </Link>
          <Button
            as={Link}
            to="/login"
            size="sm"
            variant="secondary"
            className="hidden sm:inline-flex"
          >
            Admin
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-content-secondary md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-bg-base md:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-2.5 text-sm font-medium",
                    isActive ? "bg-surface-hover text-content-primary" : "text-content-secondary"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-2 flex gap-2">
              <Button as={Link} to="/login" size="sm" variant="secondary" className="flex-1">
                Admin
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function PublicFooter() {
  const { data } = useSettings();
  const { data: profileData } = useProfile();
  const settings = getIdentitySettings(data?.settings);
  const profile = getIdentityProfile(profileData?.profile);
  const social = {
    github: settings?.socialLinks?.github || profile?.socialLinks?.github || identity.github,
    linkedin:
      settings?.socialLinks?.linkedin || profile?.socialLinks?.linkedin || identity.linkedin,
    twitter: settings?.socialLinks?.twitter || profile?.socialLinks?.twitter || "",
  };
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-subtle">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-heading text-lg font-bold text-content-primary">
            {profile.name || settings.siteTitle || identity.name}
          </p>
          <p className="mt-3 max-w-sm text-sm text-content-secondary">
            {settings.siteDescription || profile.shortBio || identity.siteDescription}
          </p>
          <div className="mt-5 flex gap-2">
            {social.github && (
              <a
                href={social.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="footer-icon"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            )}
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="footer-icon"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            )}
            {social.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="footer-icon"
              >
                <TwitterIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-content-primary">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-content-secondary">
            <li>
              <Link to="/projects" className="footer-link">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/blog" className="footer-link">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" className="footer-link">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-content-primary">Get in touch</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-content-secondary">
            {profile.email && (
              <li>
                <a href={`mailto:${profile.email}`} className="footer-link">
                  {profile.email}
                </a>
              </li>
            )}
            {profile.location && <li>{profile.location}</li>}
            <li>
              <a
                href={identity.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="footer-link"
              >
                WhatsApp: {identity.whatsappNumber}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-content-muted sm:flex-row">
          <p>
            © {year} {profile.name || settings.siteTitle || identity.name}. All rights reserved.
          </p>
          <p>{identity.name}</p>
        </div>
      </div>
    </footer>
  );
}

export function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-bg-base">
      <PublicNavbar />
      <main className="flex-1">{children || <Outlet />}</main>
      <PublicFooter />
    </div>
  );
}

export default PublicLayout;
