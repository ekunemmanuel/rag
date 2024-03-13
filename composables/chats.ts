import { v4 as uuidv4 } from "uuid";
import { arrayUnion } from "firebase/firestore";
import type { Chat } from "~/types";
export const useChats = () => {
  const { updateData, getData, deleteData } = useMyFirebase();

  const chatPath = "userId/library/chats";
  const loading = ref(false);

  const addChat = async (chatId: string, text: string, sourceId: string) => {
    try {
      loading.value = true;

      const date = new Date();

      const messages = useMessages();
      await updateData(chatPath, chatId, {
        messages: arrayUnion({
          content: text,
          role: "user",
          createdAt: date,
          id: uuidv4(),
        }),
        updatedAt: date,
      });

      // sourceId,
      // messages,

      const {data} = await useFetch("/api/chats", {
        method: "POST",
        body: {
          sourceId,
          messages:messages.value,
        },
      });

      if (!data.value) {
        return;     
      }
      await updateData(chatPath, chatId, {
        messages: arrayUnion({
          id: uuidv4(),
          content: data.value.data.content,
          references: data.value.data.references,
          role: "assistant",
          createdAt: date,
        }),
        updatedAt: date,
      });
      await getChat(chatId!);
      loading.value = false;
    } catch (error) {
      console.log(error);
    }
  };

  const getChat = async (id: string) => {
    const messages = useMessages();
    const chats = await getData<Chat>(id, chatPath);
    if (!chats) return;
    messages.value = chats.messages;
  };

  const deleteChat = async (id: string) => {
    await deleteData(chatPath, id);
    console.log("Chat deleted");
    
  }

  



  return {
    loading,
    addChat,
    getChat,
    deleteChat
  };
};
