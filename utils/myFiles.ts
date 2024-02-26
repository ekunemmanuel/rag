import type { NavItem } from "~/types";

export default () => {
  const links = ref<NavItem[]>([]);
  console.log(links.value);
  
  return { links };
};
