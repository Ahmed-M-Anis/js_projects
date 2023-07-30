import { API_URL } from "./config";

export const getJson = async function (id) {
  const requist = await fetch(`${API_URL}/${id}`);

  const data = await requist.json();
  return data;
};
