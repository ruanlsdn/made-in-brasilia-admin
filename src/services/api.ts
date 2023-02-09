import axios from "axios";
import iCreateCityDto from "../dtos/iCreateCityDto";
import iUpdateCityDto from "../dtos/iUpdateCityDto";

const api = axios.create({ baseURL: "http://localhost:3000/" });

// CITY REQUEST
export const createCityRequest = async (dto: iCreateCityDto) => {
  return await api.post("/city", dto);
};

export const listAllCityRequest = async () => {
  return await api.get("/city/list-all");
};

export const updateCityRequest = async (id: string, dto: iUpdateCityDto) => {
  return await api.put("/city");
};

export const deleteCityRequest = async (id: string) => {
  return await api.delete("/city");
};

export const getCityIaTextsRequest = async (cityName: string) => {
  return await api.get(`city/get-ai-texts/${cityName}`);
};
// END OF CITY REQUEST
