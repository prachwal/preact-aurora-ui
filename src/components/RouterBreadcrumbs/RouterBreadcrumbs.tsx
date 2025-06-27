import { useLocation } from "preact-iso";

import { Breadcrumbs } from "../Breadcrumbs";

export function RouterBreadcrumbs() {
  const { url } = useLocation();

  const getBreadcrumbs = () => {
    const path = url;

    const breadcrumbMap = {
      "/": [{ label: "Dashboard", href: "/", icon: "🏠" }],
      "/dashboard": [{ label: "Dashboard", href: "/dashboard", icon: "🏠" }],
      "/analytics": [
        { label: "Dashboard", href: "/", icon: "🏠" },
        { label: "Analytics", href: "/analytics" },
      ],
      "/users": [
        { label: "Dashboard", href: "/", icon: "🏠" },
        { label: "Users", href: "/users" },
      ],
      "/theme-demo": [
        { label: "Dashboard", href: "/", icon: "🏠" },
        { label: "Theme Demo", href: "/theme-demo" },
      ],
      "/settings": [
        { label: "Dashboard", href: "/", icon: "🏠" },
        { label: "Settings", href: "/settings" },
      ],
    };

    return (
      breadcrumbMap[path as keyof typeof breadcrumbMap] || [
        { label: "Dashboard", href: "/", icon: "🏠" },
      ]
    );
  };

  return (
    <Breadcrumbs
      items={getBreadcrumbs()}
      separator="/"
      style={{
        marginBottom: "var(--space-sm)",
      }}
    />
  );
}
