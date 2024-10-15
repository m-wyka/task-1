<script setup lang="ts">
import { useField } from "vee-validate";
import type { TextField } from "../types/TextField";

type Props = {
  modelValue: string;
  name: string;
  type?: TextField;
  placeholder?: string;
  label?: string;
};

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const { value: inputValue, errorMessage } = useField(
  () => props.name,
  undefined,
  {
    initialValue: props.modelValue,
  }
);

const handleModelValueUpdate = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emit("update:modelValue", input.value);
};
</script>

<template>
  <div class="textfield">
    <label v-if="label" :for="name" class="mb-2 font-semibold text-sm">
      {{ label }}
    </label>

    <input
      :id="name"
      :class="{
        'textfield__input--error': errorMessage,
      }"
      class="textfield__input"
      v-model="inputValue"
      :placeholder="placeholder"
      :type="type || 'text'"
      @input="handleModelValueUpdate"
    />

    <small :class="errorMessage ? 'textfield__message' : ''">
      {{ errorMessage }}
    </small>
  </div>
</template>

<style scoped>
.textfield {
  display: flex;
  flex-direction: column;
}

.textfield__input {
  background-color: theme("colors.white");
  padding: 0.425rem 1rem;
  border: 1px solid theme("colors.loblolly");
  outline: 0;
  border-radius: 0.375rem;
}

.textfield__input--error {
  border: 1px solid theme("colors.flamingo");
}

.textfield__message {
  color: theme("colors.flamingo");
}
</style>
