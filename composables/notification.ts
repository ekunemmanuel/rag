export const useNotification = () => {
  const toast = useToast();
  return function notification({
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
  };
};
