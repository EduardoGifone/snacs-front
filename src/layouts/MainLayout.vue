<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-btn flat size="lg" to="/">Snac's - Verificador de FakeNews</q-btn>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item>
          <q-img
            class="absolute-top"
            src="https://img.freepik.com/foto-gratis/fondo-pintura-onda-marmol-beige_53876-104415.jpg"
            style="height: 150px"
          >
            <div
              class="absolute-bottom bg-transparent row inline justify-between items-end"
            >
              <div>
                <q-avatar size="56px" class="q-mb-sm">
                  <img src="~assets/ant.jpeg" />
                </q-avatar>
                <div class="text-weight-bold">
                  <p class="q-ma-none text-weight-bolder text-h6">
                    {{ "Hormiga Chamba" }}
                  </p>
                  <p class="q-ma-none">@{{ "hormigitaChamba" }}</p>
                </div>
              </div>
            </div>
          </q-img>
        </q-item>
        <div style="margin-top: 100px">
          <EssentialLink
            v-for="link in linksList"
            :key="link.title"
            v-bind="link"
          />
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

defineOptions({
  name: "MainLayout",
});

const linksList = [
  {
    title: "Verificar URL",
    icon: "link",
    link: "UrlVerify",
  },
  {
    title: "Verificar Titulo",
    icon: "spellcheck",
    link: "TitleVerify",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function avatar() {
  return `https://api.dicebear.com/8.x/initials/svg?backgroundColor=26A69A&seed=${"Hormiga"}`;
}
</script>
