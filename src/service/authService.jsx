export async function login(username, password) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();

  // tokenni localStorage-ga saqlab qo'yamiz
  localStorage.setItem("token", data.token);

  return data;
}