<template>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">Verificación</div>
        <div
          class="text-h5 q-mt-sm q-mb-xs"
          :class="{ 'text-green': confiable, 'text-red': !confiable }"
        >
          {{ confiable ? "Confiable" : "No Confiable" }}
        </div>
        <a :href="url" class="text-caption text-grey" target="_blank">
          {{ url }}
        </a>
      </q-card-section>
    </q-card-section>

    <q-separator></q-separator>

    <q-card-actions>
      <q-btn flat round icon="event"></q-btn>
      <q-btn flat> Fuente </q-btn>
      <q-btn flat color="primary"> {{ fuente }} </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  confiable: {
    type: Boolean,
    required: true,
  },
  fuente: {
    type: String,
    required: true,
  },
});
</script>
