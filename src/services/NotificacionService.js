import { servers } from "./ApiClient.js";
import axios from "axios";

export default {
  getNotificaciones(identificador) {
    return axios.get(
      `${servers.produccion}/consulta/consultaNotificaciones/${identificador}`
    );
  },
  registerNotificacion(credentials) {
    return axios.post(
      `${servers.produccion}/registro/registroNotificacion`,
      credentials
    );
  },
};
