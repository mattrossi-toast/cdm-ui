export default async function getSpells(url) {
  const response = await fetch(url, {
    method: "GET"
  }).then(response => {
    return response;
  });
  return response;
}
