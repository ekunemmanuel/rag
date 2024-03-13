<template>
  <div
    class="w-full border-l dark:border-white border-gray-900 h-screen flex flex-col justify-between gap-[10px] py-[10px] dark:bg-[#121212] bg-white"
  >
    <div class="overflow-y-auto chat-messages">
      <div class="space-y-4 px-2 pb-2">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="[
            'flex',
            message.role === 'user'
              ? 'justify-end pl-10'
              : 'justify-start pr-10',
          ]"
        >
          <div
            :class="[
              'rounded-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10',
              message.role === 'user'
                ? 'bg-primary-600 text-white'
                : 'bg-primary-200 dark:ring-primary-400 text-black',
            ]"
          >
            <p>{{ message.content }}</p>
          </div>
        </div>
        <UIcon
          v-if="loading"
          name="i-eos-icons:three-dots-loading"
          class="text-primary-600 size-[60px]"
        />
      </div>
    </div>
    <div class="relative">
      <div
        class="absolute -top-[45px] left-1/2 transform -translate-x-1/2 z-10"
      >
        <UButton
          class="-rotate-90"
          icon="i-material-symbols:arrow-back-ios-new-rounded"
          @click="scrollToEnd"
        />
      </div>
      <UForm
        :schema="schema"
        :state="state"
        class="space-x-4 flex px-2 items-start"
        @submit="onSubmit"
      >
        <UFormGroup class="w-full" name="chat">
          <UTextarea
            v-model="state.chat"
            autoresize
            :maxrows="8"
            :rows="1"
            placeholder="Ask me anything from the file"
          />
        </UFormGroup>
        <UButton
          type="submit"
          :class="[loading ? 'animate-pulse' : ' ']"
          :icon="icon"
          :disabled="loading"
        />
      </UForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";
import { v4 as uuidv4 } from "uuid";

const schema = object({
  chat: string().required("You can't send an empty message"),
});

const props = defineProps<{
  chatId: string;
  sourceId: string;
}>();

const { addChat, loading } = useChats();

type Schema = InferType<typeof schema>;

const state = reactive({
  chat: undefined,
});

const scrollToEnd = () => {
  setTimeout(() => {
    const chatMessages = document.querySelector(
      ".chat-messages > div:last-child"
    );
    chatMessages?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, 100);
};

const messages = useMessages();
const { getChat } = useChats();

const sourceId = toRef(props.sourceId);
const chatId = toRef(props.chatId);

await getChat(chatId.value);

const icon = computed(() =>
  loading.value ? "i-solar:stop-outline" : "i-ph:paper-plane-tilt-fill"
);

scrollToEnd();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  scrollToEnd();
  const message = event.data.chat;
  messages.value.push({
    content: event.data.chat,
    role: "user",
    id: uuidv4(),
  });
  event.data.chat = "";

  await addChat(chatId.value, message, sourceId.value);

}


</script>

<style></style>
