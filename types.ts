export interface NavItem {
  id: string;
  href?: string;
  icon?: string;
  active?: boolean;
  label: string;
  // content?: string;
  collections?: NavItem[];
}

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
