<template>
  <q-page padding class="container">
    <h4>Verificar Título</h4>
    <q-form @submit.prevent="onSubmit" class="column">
      <q-input
        v-model="titulo"
        label="Título"
        placeholder="Ingrese título de la noticia que desea verificar"
      />
      <q-btn
        class="q-mt-lg"
        type="submit"
        label="Verificar"
        color="primary"
        icon="save"
      />
    </q-form>
    <div class="row" v-if="respuesta">
      <div>
        <h6 class="q-mb-xs text-grey">Información relacionada a</h6>
        <h5 class="q-mb-md q-mt-none">{{ _titulo }}</h5>
        <p>
          Se muestra información no confiable, pero puede ser util si desea
          buscar al respecto
        </p>
      </div>
      <CardInformation
        v-for="(subdata, index) in data"
        :key="index"
        v-bind="subdata"
        class="q-mb-lg"
      />
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { api } from "src/boot/axios";
import CardInformation from "src/components/CardInformation.vue";

defineOptions({
  name: "TitleVerify",
});

const $q = useQuasar();

// Variables
const titulo = ref();
const _titulo = ref();
const data = ref([]);
const respuesta = ref(false);

// Funciones
function onSubmit() {
  $q.loading.show();

  const obj = {
    titulo: titulo.value,
  };

  // Envio de titulo al endpoint del backend
  api
    .post("verificar-titulo", obj)
    .then((response) => {
      respuesta.value = true;

      // Obtenemos la informacion y la guardamos
      data.value = response.data.resultados;
      _titulo.value = response.data.titulo;
      data.value.sort((a, b) => b.confiable - a.confiable);
      titulo.value = "";

      $q.loading.hide();
    })

    // En caso de error se muestra una notificacion
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
