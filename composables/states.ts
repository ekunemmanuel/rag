import type { BookDetails } from "~/types";
import { useMediaQuery } from "@vueuse/core";

const isLargeScreen = useMediaQuery("(min-width: 1024px)");
export const useLinks = () => useState<BookDetails[]>("links", () => []);

export const useBookDetail = () =>
  useState<BookDetails>("bookDetail", () => {
    return {
      id: "",
      label: "",
      alias: "",
    };
  });

export const useComponentKey = () => useState<number>("componentKey", () => 0);

export const useVuePDFReload = () =>
  useState<void>("vuePDFReload", () => {
    () => {};
  });

export const useLargeScreen = () =>
  useState<boolean>("largeScreen", () => {
    return false;
  });

export const useMediumScreen = () =>
  useState<boolean>("mediumScreen", () => {
    return false;
  });

export const useSmallScreen = () =>
  useState<boolean>("smallScreen", () => {
    return false;
  });
