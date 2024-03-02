import {
  collection,
  doc,
  setDoc,
  type DocumentData,
  serverTimestamp,
  type Timestamp
} from "firebase/firestore";
import { ref as storageRef } from "firebase/storage";

export const useMyFirebase = () => {
  const db = useFirestore();
  const storage = useFirebaseStorage();

  const filePath = "userId/library/files";

  async function addData<T extends DocumentData>(id: string, data: T) {
    console.log({ ...data, createdAt: serverTimestamp() });
    
    await setDoc(doc(db, filePath, id), { ...data, createdAt: serverTimestamp() });
  }

  async function getData<T>() {
    const {
      // rename the Ref to something more meaningful
      data,
      // is the subscription still pending?
      pending,
      // did the subscription fail?
      error,
      // A promise that resolves or rejects when the initial state is loaded
      promise,
    } = useCollection(collection(db, filePath));

    try {
      await promise.value;
      if (pending.value == false && error.value == undefined) {
        data.value.sort((a, b) => {
          let dateA = (a.createdAt as Timestamp).toDate();
          let dateB = (b.createdAt as Timestamp).toDate();

          return dateB!.getTime() - dateA!.getTime();
        });
        return data.value as T;
      }
      return [] as T;
    } catch (error) {
      console.log(error);
    }
  }

  async function uploadFile(file: File, alias: string) {
    const data = file;

    const fileRef = storageRef(storage, `${filePath}/${alias}`);
    const { url, upload, refresh, uploadProgress, uploadTask, uploadError } =
      useStorageFile(fileRef);

    try {
      if (data) {
        await upload(data);
        await refresh();
        console.log(uploadError.value);
        console.log(uploadProgress.value);
        console.log(uploadTask.value);

        return url.value;
      }
    } catch (error) {
      console.log(error);
    }
  }
  return {
    addData,
    getData,
    uploadFile,
  };
};
