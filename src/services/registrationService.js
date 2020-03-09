export async function register(url, body) {
  const response = await fetch(url, {
    method: "POST",
    body: body
  });

  return response;
}

export async function checkIfUserExists(email) {
  const response = await fetch("https://oh5sbl2cs4.execute-api.us-east-1.amazonaws.com/prod/" + email, {
    method: "GET",
  });

  return response;
}

export async function validatePlayer(body) {
  const response = await fetch("https://rnwstejzs0.execute-api.us-east-1.amazonaws.com/prod/", {
    body: body,
    method: "POST"
  });
  return response;
}

