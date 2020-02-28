export default async function login(url, body) {
  const response = await fetch(url, {
    method: "POST",
    body: body
  }).then(response => {
    return response;
  });
  return response;
}
