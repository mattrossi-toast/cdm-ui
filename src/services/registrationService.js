export async function register(url, body) {
  const response = await fetch(url, {
    method: "POST",
    body: body
  });

  return response;
}
