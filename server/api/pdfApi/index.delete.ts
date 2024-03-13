export default defineEventHandler(async (event) => {
  const { sourceId } = await readBody<{ sourceId: string }>(event);
  try {
    await deleteFromChatPdfApi(sourceId);
    // console.log("Deleted from Chat PDF API", sourceId);

    return {
      status: 200,
      message: "Success",
    };
  } catch (error: any) {
    return {
      status: error.status || 500,
      message: "Failed to delete from Chat PDF API",
      data: error,
    };
  }
});

async function deleteFromChatPdfApi(sourceId: string) {
  const { chatApiKey, chatApiUrl } = useRuntimeConfig();
  try {
    await $fetch(`${chatApiUrl}/sources/delete`, {
      method: "POST",
      headers: {
        "x-api-key": chatApiKey,
        "Content-Type": "application/json",
      },
      body: {
        sources: [sourceId],
      },
    });
    return true;
  } catch (error: any) {
    throw {
      status: error.status || 500,
      message: "Failed to upload to Chat PDF API",
      data: error,
    };
  }
}
