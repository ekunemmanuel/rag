import { type Timestamp } from "firebase/firestore";

export interface BookDetails {
  id: string;
  href?: string;
  icon?: string;
  active?: boolean;
  label: string;
  alias: string;
  collections?: BookDetails[];
  createdAt?: Timestamp;
  sourceId?: string;
  chatId?: string;
}
// export interface Message {
//   id: string;
//   role: string;
//   content: string;
// }

export interface Message {
  id: string;
  content: string;
  role: string;
  createdAt?: string;
  references?: PageReferences[];
}
interface PageReferences {
  pageNumber: number;
}
export interface Chat {
  id: string;
  messages: Message[];
  createdAt?: string;
  updatedAt?: string;
}

const source: Chat = {
  messages: [
    {
      id: "1",
      role: "user",
      references: [],
      content: "What is the book saying",
    },
  ],
  id: "src_LSarJkjuUivnVgFLeROJG",
};
export interface NavItem extends BookDetails {}
