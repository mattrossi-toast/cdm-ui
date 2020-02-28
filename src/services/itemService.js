export default async function getItems(url) {
  const response = await fetch(url, {
    method: "GET"
  }).then(response => {
    return response;
  });
  return response;
}
