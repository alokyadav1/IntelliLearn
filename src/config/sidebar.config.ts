export interface NavigationLink {
  name: string;
  href: string;
  icon?: string;
  roles?: string[];
  external?: boolean;
}

export interface SidebarConfig {
  title: string;
  subtitle: string;
  version: string;
  edition: string;
  links: NavigationLink[];
}

export const sidebarConfig: SidebarConfig = {
  title: "AI Agents",
  subtitle: "Mastery Portal",
  version: "v.1.0.0",
  edition: "PRO EDITION",
  links: [
    { name: "Overview", href: "/" },
    { name: "Prerequisites", href: "/prerequisites" },
    { name: "Building AI Agents", href: "/building-ai-agents" },
  ],
};
