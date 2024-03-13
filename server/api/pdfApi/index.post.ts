import { Timestamp, getFirestore } from "firebase-admin/firestore";
import { H3Error } from "h3";
import { BookDetails } from "~/types";

export default defineEventHandler(async (event) => {
  try {
    const { fileId, userId } = await readBody(event);

    const fileData = await getBookDetail(fileId, userId);

    if (
      !fileData.href &&
      !(
        fileData.collections &&
        fileData.collections.some((collection) => collection.href)
      )
    ) {
      throw createError({
        status: 404,
        message: "File not found",
      });
    }
    if (fileData.sourceId) {
      return {
        status: 200,
        message: "Source ID already exists",
        data: {},
      } as Response<{}>;
    }
    if (fileData.collections && fileData.collections.length > 0) {
      const col = fileData.collections.find((collection) => {
        return collection.id === fileId;
      }) as BookDetails;
      if (col.sourceId) {
        return {
          status: 200,
          message: "Source ID already exists",
          data: {},
        } as Response<{}>;
      }

      // const sourceId = await uploadToChatPdfApi(col.href!);
      const data = {
        sourceId: "demo",
      };
      const response = await updateBookDetail<typeof data, BookDetails>(
        userId,
        col.id!,
        data
      );
      return response;
    }

    // Not inside a collection
    const sourceId = await uploadToChatPdfApi(fileData.href!);
    const data = {
      sourceId,
    };

    const response = await updateBookDetail<typeof data, BookDetails>(
      userId,
      fileId,
      data
    );

    return response;
  } catch (error) {
    console.log("Error:", error);
    return error;
  }
});

async function getCollection(userId: string) {
  const filePath = `${userId}/library/files`;
  const db = getFirestore();
  return await db.collection(filePath).get();
}

async function getBookDetail(fileId: string, userId: string) {
  const data = (await getCollection(userId)).docs.map((da) =>
    da.data()
  ) as BookDetails[];

  if (!data) {
    throw createError({
      status: 404,
      message: `No Files`,
    });
  }

  const foundBook = data.find(
    (book) =>
      book.id === fileId ||
      (book.collections && book.collections.find((b) => b.id === fileId))
  );

  if (!foundBook) {
    throw createError({
      status: 404,
      message: `Book with id ${fileId} not found`,
    });
  }

  return foundBook || ({} as BookDetails);
}

async function updateBookDetail<T extends { [x: string]: any }, F>(
  userId: string,
  fileId: string,
  data: T
) {
  const filePath = `${userId}/library/files`;
  const db = getFirestore();
  const bookDetail = await getBookDetail(fileId, userId);

  const docRef = db.collection(filePath).doc(bookDetail.id);
  const doc = await docRef.get();

  if (!doc.exists) {
    throw createError({
      status: 404,
      message: "Data not found",
    });
  }

  const incomingData = {
    ...data,
    updatedAt: Timestamp.now(),
  };

  try {
    if (bookDetail.collections) {
      const updatedCollections = bookDetail.collections.map((collection) =>
        collection.id === fileId
          ? { ...collection, ...incomingData }
          : collection
      );

      await docRef.update({
        collections: updatedCollections,
        updatedAt: Timestamp.now(),
      });
    } else {
      await docRef.update({ ...incomingData });
    }

    const newData = (await docRef.get()).data();
    return {
      status: 200,
      message: "success",
      data: newData as F,
    };
  } catch (error) {
    return error as H3Error;
  }
}

interface Response<T> {
  status: number;
  message: string;
  data: T;
}

async function uploadToChatPdfApi(pdfUrl: string) {
  const { chatApiKey, chatApiUrl } = useRuntimeConfig();
  try {
    const { sourceId } = await $fetch<{ sourceId: string }>(
      `${chatApiUrl}/sources/add-url`,
      {
        method: "POST",
        headers: {
          "x-api-key": chatApiKey,
          "Content-Type": "application/json",
        },
        body: {
          url: pdfUrl,
        },
      }
    );
    return sourceId;
  } catch (error: any) {
    throw createError({
      status: error.status || 500,
      message: "Failed to upload to Chat PDF API",
      cause: error,
    });
  }
}

// {
//   "sourceId": "src_hr8D5NRgxGdvpaYuuotDa"
// }

// {
//   "sourceId": "src_zV7g8H641TOUXXjQbJrAR"
// }
