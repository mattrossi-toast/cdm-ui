export default async function createCampaign(url, body) {
  const response = await fetch(url, {
    method: "POST",
    body: body
  }).then(response => {
    return response;
  });
  return response;
}

export async function getUserCampaigns(url) {
  const response = await fetch(url, {
    method: "GET"
  }).then(response => {
    return response;
  });
  return response;
}
