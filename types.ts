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
}
export interface Message {
  id: string;
  role: string;
  content: string;
}

export interface NavItem extends BookDetails {}

// function upload() {
//   if (files.value instanceof Array) {
//     if (isMultiple.value) {
//       for (let i = 0; i < files.value.length; i++) {
//         const file = files.value[i];
//         if (!file) return;
//         if (!collectionName.value) return;
//         multipleFiles.value.collections!.push({
//           href: file.name,
//           label: file.name,
//         });
//       }

//       console.log(multipleFiles);
//       clearList();
//     } else {
//       const file = files.value[0];
//       if (!file) return;
//       singleFile.value.href = file.name;
//       singleFile.value.label = file.name;
//       clearList();
//       console.log(singleFile);
//     }
//   } else if (files.value instanceof FileList) {
//     if (isMultiple.value) {
//       for (let i = 0; i < files.value.length; i++) {
//         const file = files.value.item(i);
//         if (!file) return;
//         if (!collectionName.value) return;
//         multipleFiles.value.collections!.push({
//           href: file.name,
//           label: file.name,
//         });
//       }

//       console.log(multipleFiles);
//       clearList();
//     } else {
//       const file = files.value.item(0);
//       if (!file) return;
//       singleFile.value.href = file.name;
//       singleFile.value.label = file.name;
//       clearList();
//       console.log(singleFile);
//     }
//   }
// }
