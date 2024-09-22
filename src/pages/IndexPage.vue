<template>
  <q-page class="flex flex-center container">
    <div class="column content-center" v-if="type === '1'">
      <img
        alt="Snac's logo"
        src="~assets/snacs-tv.png"
        style="width: 100%; max-width: 500px; height: auto"
      />

      <h3 class="text-center">SNAC'S</h3>
      <q-btn
        class="q-mt-lg"
        color="primary"
        icon-right="send"
        label="Continuar"
        @click="type = '2'"
      />
    </div>

    <div class="column content-center q-px-md" v-if="type === '2'">
      <img
        alt="Snac's logo"
        src="~assets/snacs-ant1.png"
        style="width: 100%; max-width: 500px; height: auto"
      />
      <q-btn
        class="q-mt-lg"
        color="primary"
        icon-right="send"
        label="Continuar"
        @click="type = '3'"
      />
    </div>

    <div class="column content-center q-px-md" v-if="type === '3'">
      <img
        alt="Snac's logo"
        src="~assets/snacs-ant2.png"
        style="width: 100%; max-width: 500px; height: auto"
      />
      <div class="row justify-around q-mt-lg">
        <q-btn color="primary" label="Verificar URL" :to="`/verificar/url`" />
        <q-btn
          color="secondary"
          label="Verificar Titulo"
          :to="`/verificar/titulo`"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

defineOptions({
  name: "IndexPage",
});

const type = ref("1");
</script>
