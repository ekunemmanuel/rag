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
        />
      </UForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";
import type { Message } from "~/types";
const schema = object({
  chat: string().required("You can't send an empty message"),
});

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

const loading = ref(false);

const icon = computed(() =>
  loading.value ? "i-solar:stop-outline" : "i-ph:paper-plane-tilt-fill"
);

scrollToEnd();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true;
  scrollToEnd();
  messages.value.push({
    content: event.data.chat,
    id: "36",
    role: "user",
  });
  console.log(event.data);
  console.log(event.data);
  event.data.chat = "";
  setTimeout(() => {
    loading.value = false;
    messages.value.push({
      content: "Sup",
      id: "36",
      role: "assistant",
    });
  }, 3000);
}
// defineProps<{
//   messages: Message[];
//   isLoading: boolean;
// }>();

const messages = ref<Message[]>([
  { id: "1", role: "user", content: "Hello!" },
  { id: "2", role: "assistant", content: "Hi there! How can I help?" },
  { id: "3", role: "user", content: "I have a question about the project." },
  { id: "4", role: "assistant", content: "Sure, go ahead and ask." },
  {
    id: "5",
    role: "user",
    content: "How do I set up Firebase in my Nuxt project?",
  },
  {
    id: "6",
    role: "assistant",
    content:
      "You need to install vuefire and configure Firebase. Here are the steps...",
  },
  { id: "7", role: "user", content: "Thanks for the information!" },
  { id: "8", role: "assistant", content: "You're welcome!" },
  {
    id: "9",
    role: "user",
    content: "Can you provide an example of using vuefire with Nuxt 3?",
  },
  {
    id: "10",
    role: "assistant",
    content:
      "Certainly! First, you need to install vuefire and configure Firebase...",
  },
  { id: "11", role: "user", content: "Got it, thanks!" },
  { id: "12", role: "assistant", content: "No problem!" },
  {
    id: "13",
    role: "user",
    content: "What other features does vuefire provide?",
  },
  {
    id: "14",
    role: "assistant",
    content:
      "Vuefire provides bindings for Firestore, real-time database, and more. Check the documentation for details.",
  },
  {
    id: "15",
    role: "user",
    content: "I will check it out. Anything else I should know?",
  },
  {
    id: "16",
    role: "assistant",
    content:
      "Make sure to handle authentication, security rules, and other Firebase configurations based on your project requirements.",
  },
  { id: "17", role: "user", content: "Thanks for the advice!" },
  { id: "18", role: "assistant", content: "You're welcome!" },
  { id: "19", role: "user", content: "I have another question..." },
  { id: "20", role: "assistant", content: "Go ahead and ask." },
  {
    id: "21",
    role: "user",
    content:
      "How can I upload files to Firebase Storage using vuefire in Nuxt 3?",
  },
  {
    id: "22",
    role: "assistant",
    content:
      "You need to use the Storage API from vuefire. Here are the steps...",
  },
  { id: "23", role: "user", content: "Great, thanks for the guidance!" },
  { id: "24", role: "assistant", content: "No problem!" },
  {
    id: "25",
    role: "user",
    content:
      "Can you provide an example of using Storage API for file uploads?",
  },
  {
    id: "26",
    role: "assistant",
    content: "Certainly! Here's an example code snippet...",
  },
  { id: "27", role: "user", content: "I appreciate your help!" },
  { id: "28", role: "assistant", content: "Happy to help!" },
  {
    id: "29",
    role: "user",
    content: "I think I have enough information for now.",
  },
  {
    id: "30",
    role: "assistant",
    content:
      "If you have more questions in the future, feel free to ask. Have a great day!",
  },
  { id: "31", role: "user", content: "You too!" },
  { id: "32", role: "assistant", content: "Goodbye!" },
  { id: "33", role: "user", content: "Goodbye!" },
  { id: "34", role: "assistant", content: "Goodbye!" },
  { id: "35", role: "user", content: "Goodbye!" },
]);
</script>

<style></style>
