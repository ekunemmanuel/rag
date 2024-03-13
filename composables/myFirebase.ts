import {
  collection,
  doc,
  setDoc,
  updateDoc,
  type DocumentData,
  serverTimestamp,
  type Timestamp,
  deleteDoc,
} from "firebase/firestore";
import { ref as storageRef, deleteObject } from "firebase/storage";

export const useMyFirebase = () => {
  const db = useFirestore();
  const storage = useFirebaseStorage();

  async function addData<T extends DocumentData>(
    id: string,
    data: T,
    path: string
  ) {
    await setDoc(doc(db, path, id), {
      ...data,
      createdAt: serverTimestamp(),
    });
  }

  async function getData<T>(id: string, path: string) {
    const {
      // rename the Ref to something more meaningful
      data,
      // is the subscription still pending?
      pending,
      // did the subscription fail?
      error,
      // A promise that resolves or rejects when the initial state is loaded
      promise,
    } = useDocument(doc(collection(db, path), id));
    try {
      await promise.value;
      if (pending.value == false && error.value == undefined) {
        return data.value as T;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllData<T>(path: string) {
    const {
      // rename the Ref to something more meaningful
      data,
      // is the subscription still pending?
      pending,
      // did the subscription fail?
      error,
      // A promise that resolves or rejects when the initial state is loaded
      promise,
    } = useCollection(collection(db, path));

    try {
      await promise.value;
      if (pending.value == false && error.value == undefined) {
        return data.value as T;
      }
      return [] as T;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateData<T extends { [x: string]: any }>(
    path: string,
    id: string,
    newData: T
  ) {
    try {
      const docRef = doc(db, path, id);
      await updateDoc(docRef, newData);
    } catch (error) {
      // FirebaseError: No document to update:
      console.log(error);
    }
  }

  async function deleteData(path: string, id: string) {
    try {
      const docRef = doc(db, path, id);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      // FirebaseError: No document to update:
      console.log(error);
    }
  }

  async function uploadFile(file: File, alias: string, path: string) {
    const data = file;

    const fileRef = storageRef(storage, `${path}/${alias}`);
    const { url, upload, refresh, uploadProgress, uploadTask, uploadError } =
      useStorageFile(fileRef);

    try {
      if (data) {
        await upload(data);
        await refresh();
        return url.value;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteFile(alias: string, path: string) {
    const fileRef = storageRef(storage, `${path}/${alias}`);
    try {
      await deleteObject(fileRef);
    } catch (error) {
      console.log(error);
    }
  }
  return {
    addData,
    getData,
    getAllData,
    updateData,
    uploadFile,
    deleteFile,
    deleteData,
  };
};
