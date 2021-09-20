const API_ENDPOINT =
  "https://services-gateway.staging.azure.dellalegal.com/api/v3";

export async function callApi(
  method: string,
  path: string,
  data?: any,
  formData = false
) {
  const headers = !formData
    ? {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    : undefined;
  const res = await fetch(`${API_ENDPOINT}/${path}`, {
    method,
    headers: {
      ...headers,
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
    },
    body: formData ? data : JSON.stringify(data),
  });
  return res.json();
}
