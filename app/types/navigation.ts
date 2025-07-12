export interface NavigationLink {
  name: string;
  href: string;
  isBold?: boolean;
}

export interface NavigationItem {
  name: string;
  href: string;
  dropdown?: {
    [category: string]: NavigationLink[];
  };
}
