<template>
  <q-page padding class="container">
    <h4>Verificar URL</h4>
    <q-form @submit="onSubmit" class="column">
      <q-input
        ref="inputRef"
        v-model="url"
        label="URL / Link"
        placeholder="Ingrese URL/link de la noticia que desea verificar"
      />
      <q-btn
        class="q-mt-lg"
        type="submit"
        label="Verificar"
        color="primary"
        icon="verified_user"
      />
    </q-form>
    <div class="row q-mt-xl">
      <CardInformation v-if="respuesta" v-bind="data" />
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { api } from "src/boot/axios";
import CardInformation from "src/components/CardInformation.vue";

defineOptions({
  name: "UrlVerify",
});

const $q = useQuasar();

// Variables
const url = ref("");
const data = ref({
  url: "",
  confiable: null,
  fuente: "",
});
const respuesta = ref(false);

// Funciones
function onSubmit() {
  $q.loading.show();

  const obj = {
    url: url.value,
  };

  // Envio de url al endpoint del backend
  api
    .post("verificar-url", obj)
    .then((response) => {
      respuesta.value = true;

      // Obtenemos la informacion y la guardamos
      Object.assign(data.value, response.data);
      url.value = "";

      $q.loading.hide();
    })

    // En Caso de error se muestra una notificacion
    .catch((error) => {
      $q.loading.hide();

      // Mensaje en caso que falle el internet o la conexion
      if (error.code == "ERR_NETWORK") {
        $q.notify({
          type: "negative",
          message:
            "Ups.. Parece que algo salió mal. Intenta nuevamente en un momento",
        });
      }

      // Mensaje de error que nos manda el backend
      if (error.response?.data?.error) {
        $q.notify({
          type: "warning",
          message: error.response.data.error,
        });
      }
    });
}
</script>
