import UserProfile from "../components/UserProfile";
export default async function createCharacter(url, body) {
  const response = await fetch(url, {
    method: "POST",
    body: body
  }).then(response => {
    return response;
  });
  return response;
}

export async function getDMCharacters() {
  const response = await fetch(
    "https://wa3zwircg1.execute-api.us-east-1.amazonaws.com/prod/" +
    UserProfile.getId(),
    {
      method: "GET"
    }
  ).then(response => {
    return response;
  });
  return response;
}

export async function getCharacterInventory(uuid) {
  const response = await fetch(
    "https://36r9wx9s0b.execute-api.us-east-1.amazonaws.com/prod/" +
    uuid,
    {
      method: "GET"
    }
  ).then(response => {
    return response;
  });
  return response;
}
