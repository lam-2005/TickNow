export interface FooterLinkType {
  id: number;
  title: string;
  children: childrenFooterLinkType[];
}
export interface childrenFooterLinkType {
  url: string;
  name: string;
}
export interface LinkNavbarType {
  id: number;
  url: string;
  name: string;
}
