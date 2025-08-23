import { getToken } from "./tokenService";

export async function fetchWithAuth(url, options = {}) {
  const token = getToken();

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  return fetch(url, { ...options, headers });
}