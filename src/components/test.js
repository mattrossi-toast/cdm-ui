var response = {
  statusCode: 201
};

var AWS = require("aws-sdk");
const uuidv4 = require("uuid/v4");
AWS.config.update({ region: "us-east-1" });
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
var params = {
  TableName: "user",
  Item: {
    uuid: { S: uuidv4() },
    email: { S: "test" },
    password: { S: "password" }
  }
};
console.log("Putting item...");
ddb.putItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
    response.statusCode = 400;
    response.body = err;
  } else {
    console.log("Success", data);
    response.statusCode = 200;
    response.body = data;
  }
});
console.log(response);
