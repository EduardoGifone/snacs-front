import { boot } from "quasar/wrappers";
import axios from "axios";

// Configuracion para conectarnos con el servidor/backend
const api = axios.create({ baseURL: "https://snacs-back.onrender.com/" });

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = api;
});

export { api };
