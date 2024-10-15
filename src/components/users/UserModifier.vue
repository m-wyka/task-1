<script setup lang="ts">
import { Ref, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useForm } from "vee-validate";
import { object, string } from "yup";
import { useFetch } from "../../composables/useFetch";
import { CameraIcon } from "@heroicons/vue/24/solid";
import locales from "../../locales/index";
import type { ResponseSingleUser } from "../../types/ResponseData";
import TextField from "@/components/TextField.vue";
import Btn from "@/components/Btn.vue";

type Props = {
  mode: "add" | "edit";
};

const props = defineProps<Props>();
const { id } = useRoute().params;
const file = ref<File | Ref | null>(null);

const { handleSubmit, resetForm } = useForm({
  validationSchema: object({
    firstName: string()
      .required(locales.form.required)
      .min(3, locales.form.min)
      .max(100, locales.form.max),
    lastName: string()
      .required(locales.form.required)
      .min(3, locales.form.min)
      .max(100, locales.form.max),
  }),
});

const formData = ref({
  firstName: "",
  lastName: "",
  avatar: "",
});

const getUser = () => {
  const { data } = useFetch<ResponseSingleUser>(`users/${id}`);

  watch(data, (newData) => {
    if (newData) {
      const {
        data: { first_name, last_name, avatar },
      } = newData;

      formData.value = {
        firstName: first_name,
        lastName: last_name,
        avatar: avatar,
      };

      resetForm({
        values: {
          firstName: first_name,
          lastName: last_name,
          avatar: avatar,
        },
      });
    }
  });
};

if (props.mode === "edit") {
  getUser();
}

const handleInputFileClick = () => {
  if (file.value) {
    file.value.click();
  }
};

const handleUploadFile = () => {
  const image = file.value.files[0];

  if (image) {
    const reader = new FileReader();
    reader.onload = function (e) {
      formData.value.avatar = e.target?.result as string;
    };
    reader.readAsDataURL(image);
  }
};

const updateUserDetails = () => {
  let method = props.mode === "add" ? "POST" : "PATCH";
  let url = props.mode === "add" ? `users` : `users/${id}`;

  return useFetch<ResponseSingleUser>(
    url,
    {},
    {
      method,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      // The https://reqres.in/ API is limited, so I only passed first_name and last_name for testing.
      body: JSON.stringify({
        first_name: formData.value.firstName,
        last_name: formData.value.lastName,
      }),
    },
    props.mode === "add"
      ? "The user has been created."
      : "The user has been deleted."
  );
};

const handleFormSubmit = handleSubmit(() => {
  return updateUserDetails();
});
</script>

<template>
  <div class="grid gap-8">
    <h1>
      {{ mode === "add" ? "Add user" : "Edit user" }}
    </h1>

    <div class="user-grid">
      <div class="card px-7 py-5">
        <form
          @submit="handleFormSubmit"
          class="grid gap-6 justify-items-start content-between xl:h-full xl:pt-14"
        >
          <div class="grid gap-7 md:grid-cols-2 w-full">
            <div class="grid gap-2">
              <TextField
                label="First Name"
                name="firstName"
                v-model="formData.firstName"
              />
            </div>

            <div class="grid gap-2">
              <TextField
                label="Last Name"
                name="lastName"
                v-model="formData.lastName"
              />
            </div>
          </div>

          <Btn type="submit">
            {{ mode === "add" ? "Add user" : "Update details" }}
          </Btn>
        </form>
      </div>

      <div class="card flex flex-wrap justify-center items-stretch p-5">
        <div class="pt-8 pb-12 xl:pt-12 xl:pb-16">
          <img
            v-if="formData.avatar"
            :src="formData.avatar"
            :alt="`${formData.firstName} ${formData.lastName}`"
            class="user-avatar"
          />

          <div v-else class="user-avatar user-avatar--empty">?</div>
        </div>

        <input
          ref="file"
          type="file"
          @change="handleUploadFile"
          accept="image/png, image/jpeg"
          hidden
        />

        <Btn
          btnStyle="outline"
          class="flex items-center justify-center w-full"
          @click="handleInputFileClick"
        >
          <CameraIcon class="w-[18px] mr-2" /> Change Photo
        </Btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(1, 1fr);
  gap: 2rem;

  @media only screen and (min-width: 1280px) {
    grid-template-columns: 1fr 520px;
    grid-template-rows: 1fr;
  }
}

.user-avatar {
  width: 150px;
  height: 150px;
  padding: 0.125rem;
  border: 1px solid theme("colors.iron");
  border-radius: 9999px;
  object-fit: cover;
}

.user-avatar--empty {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  user-select: none;
}
</style>
