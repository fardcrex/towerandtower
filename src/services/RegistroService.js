import { servers } from "./ApiClient.js";
import axios from "axios";

export default {
  registrarMarcacion(credentials) {
    console.log(credentials);
    return axios.post(
      `${servers.produccion}/registro/registroMarcado`,
      credentials
    );
  },
  postRegister(credentials) {
    return axios.post(
      `${servers.produccion}/registro/registroNotificacion`,
      credentials
    );
  },
  registerNotificacion(credentials) {
    return axios.post(
      `${servers.produccion}/registro/registroNotificacion`,
      credentials
    );
  },
};
