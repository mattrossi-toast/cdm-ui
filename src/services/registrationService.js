export const register = body => {
  return fetch({
    method: "POST",
    url: `https://xhs60uhqtl.execute-api.us-east-1.amazonaws.com`,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
};
