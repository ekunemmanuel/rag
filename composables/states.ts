import type { NavItem } from "~/types";

export const useLinks = () => useState<NavItem[]>("links", () => []);
