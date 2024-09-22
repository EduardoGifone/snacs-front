<template>
  <q-item clickable tag="a" @click="navigateTo">
    <q-item-section v-if="props.icon" avatar>
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useRouter } from "vue-router";

defineOptions({
  name: "EssentialLink",
});

const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  link: {
    type: String,
    default: "#",
  },

  icon: {
    type: String,
    default: "",
  },
});

const navigateTo = () => {
  if (props.link.startsWith("http")) {
    window.open(props.link, "_blank");
  } else {
    router.push({ name: props.link });
  }
};
</script>
