export default defineNuxtRouteMiddleware(async (to, from) => {
  const { getBookDetail, uploadToChatPdfApi } = useBookDetails();
  const id = to.params.id;
  const data = await getBookDetail(id as string);
  const { showModal, hideModal, loadingNextPage, } =
    useNotification();
  const bookDetails = useBookDetail();
  // If sourceId is not present
  loadingNextPage();
  if (!data.sourceId) {
    showModal();
    try {
      // Talk to the API to create it
      const response = await uploadToChatPdfApi("userId", data.id);
      // If the API call is successful
      if (response) {
        hideModal();
        // Update the book details
        bookDetails.value = await getBookDetail(id as string);
        // Navigate to the page
        return navigateTo(`/${id}`);
      } else {
        // If the API call fails, abort navigation
        throw new Error("API call failed");
      }
    } catch (error) {
        hideModal();
        return abortNavigation();
    }
  }

  // If sourceId is present, just update the book details
  bookDetails.value = data;
});
