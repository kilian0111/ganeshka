import config from "../config";
import api from "../config/api";

const API_URL = config.API_URL + "items/privateMessage";

// Requête Axios pour récupérer tous les messages privés
const getAllPrivateMessage = async (id_privateCall) => {
  const response = await api.get(
    API_URL +
      "?fields=*,user_created.*&filter[id_privateCall][_eq]=" +
      id_privateCall
  );

  return response.data;
};

// Requête Axios pour créer un message privé
const postPrivateMessage = async (data) => {
  const response = await api.post(API_URL, data);
  return response;
};

const privateMessageService = {
  getAllPrivateMessage,
  postPrivateMessage,
};

export default privateMessageService;
