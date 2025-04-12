import axios from "axios";

const baseURL = "POAdvanced/odata/v4/pocreation";

const instance = axios.create({
  baseURL
});

export const getTableData = async (params = { $top: 100, $skip: 0 }) => {
  const { data } = await instance.get("/Plants", {
    params
  });

  return data.d?.results || data.d || data.value;
};

export const getTableCount = async () => {
  const { data } = await instance.get("/Plants/$count");
  return data;
};

export const createPlant = async (payload) => {
  const { data } = await instance.post("/Plants", payload, {
    headers: {
      "Content-Type": "application/json"
    }
  });

  return data;
};