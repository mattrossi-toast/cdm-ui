export default async function getSpells(url) {
  const response = await fetch(url, {
    method: "GET"
  }).then(response => {
    return response;
  });
  return response;
}
export async function insertCharacterSpell(url, body) {
  const response = await fetch(url, {
    method: "POST",
    body: body
  }).then(response => {
    return response;
  });
  return response;
}
