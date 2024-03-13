export default defineEventHandler(async (event) => {
  try {
    const { sourceId, messages } = await readBody<req>(event);

    const body = {
      sourceId,
      messages,
      referenceSources: true,
    };

    // console.log(body);

    const data = await postChatMessage<res, req>(body);

    return {
      statusCode: 200,
      message: "success",
      data: data,
    };
  } catch (error) {
    console.log("Error:", error);
    return {
      status: 500,
      message: "Internal server error",
      data: error,
    };
  }
});



const result: res = {
  content:
    "The PDF file provides valuable information on research methodology, specifically focusing on literature review. It discusses the importance of conducting a literature review, reasons for doing so, and the steps involved in the process. Additionally, it emphasizes the critical evaluation of past works to identify areas of convergence and divergence in research [P4].",
  references: [
    {
      pageNumber: 4,
    },
  ],
};



const firestore = {
  sourceId: "src_LSarJkjuUivnVgFLeROJG",
};

// TypeScript

async function postChatMessage<T, B extends Record<string, any>>(
  body: B
): Promise<T> {
  const { chatApiKey, chatApiUrl } = useRuntimeConfig();
  try {
    const data = await $fetch<T>(`${chatApiUrl}/chats/message`, {
      method: "POST",
      headers: {
        "x-api-key": chatApiKey,
        "Content-Type": "application/json",
      },
      body,
    });
    return data as T; // Add type assertion to ensure the return type matches T
  } catch (error: any) {
    throw new Error(error);
  }
}

type chat = {
  role: "user" | "assistant";
  content: string;
};

type req = {
  sourceId: string;
  messages: chat[];
  referenceSources: boolean;
};

type res = {
  content: string;
  references: {
    pageNumber: number;
  }[];
};
