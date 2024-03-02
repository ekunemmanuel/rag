import type { BookDetails } from "~/types";

export const useLinks = () => useState<BookDetails[]>("links", () => []);

export const useBookDetail = () =>
  useState<BookDetails>("bookDetail", () => {
    return {
      id: "",
      label: "",
      alias: "",
    };
  });
