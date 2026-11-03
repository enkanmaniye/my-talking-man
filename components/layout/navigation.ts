export type NavIcon = "home" | "chat" | "games" | "shop" | "profile";

export type NavItem = {
  href: string;
  label: string;
  icon: NavIcon;
};

export const mainNavigation: readonly NavItem[] = [
  { href: "/home", label: "Home", icon: "home" },
  { href: "/chat", label: "Chat", icon: "chat" },
  { href: "/games", label: "Games", icon: "games" },
  { href: "/shop", label: "Shop", icon: "shop" },
  { href: "/profile", label: "Profile", icon: "profile" },
];
