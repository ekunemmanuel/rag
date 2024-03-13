import Loading from "~/components/Loading.vue";

export const useNotification = () => {
  const toast = useToast();
  const modal = useModal();
  function notification({
    id,
    title,
    description,
  }: {
    id?: string;
    title: string;
    description: string;
  }) {
    toast.add({
      id,
      title,
      description,
    });
  }
  function showModal() {
    modal.open(Loading);
    notification({
      id: "sourceId",
      title: "Setting up",
      description: "Preparing The second brain",
    });
  }
  function hideModal() {
    modal.close();
  }
  function loadingNextPage() {
    modal.open(Loading);
  }

  function hiddingNextPage() {
    modal.close();
  }
  return {
    notification,
    showModal,
    hideModal,
    loadingNextPage,
    hiddingNextPage,
  };
};
