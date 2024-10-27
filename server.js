const http = require('http');

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  req.on("end", () => {
    if (req.headers['Content type'] === 'application/json') {
      req.body = JSON.parse(reqBody); // convert JSON string to JS object
      console.log(req.body); // log the parsed JSON body
    } else if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
      req.body = reqBody
        .split("&")
        .map((keyValuePair) => keyValuePair.split("="))
        .map(([key, value]) => [key, value.replace(/\+/g, " ")])
        .map(([key, value]) => [key, decodeURIComponent(value)])
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});

      // Log the body of the request to the terminal
      console.log(req.body);
    }

    const resBody = {
      "Hello": "World!"
    };

    // set response headers
    res.statusCode = 200; // http status code for OK
    res.setHeader('Content-Type', 'application/json'); // set response type to JSON

    // serialize `resBody` to JSON and send it in the response
    res.end(JSON.stringify(resBody));
  });
});

const port = 5001;

server.listen(port, () => console.log('Server is listening on port', port));
