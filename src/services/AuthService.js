import { apiClient } from "./ApiClient.js";

export default {
  postLogin(credentials) {
    return apiClient.post("/Usuario/login", credentials);
  },
  postRegister(credentials) {
    return apiClient.post("/Usuario/registrarUsuario", credentials);
  },
  postRegisterEmpresa(credentials) {
    return apiClient.post("/Usuario/registrarEmpresa", credentials);
  },
  postRegistrarToken(token, id) {
    return apiClient.post("/registrartoken", { token, id });
  },
  postRefrescarToken(body) {
    return apiClient.post("/refrescartoken", body);
  },
};
//test1@test2.com
//1235456
/* fetch(
  "https://api-pollo.herokuapp.com/refrescartoken",
  {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  }
); */
