export default async function insertInventory(url, body) {
  console.log(body);
  const response = await fetch(url, {
    method: "POST",
    body: body
  }).then(response => {
    return response;
  });
  return response;
}
