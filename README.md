# Node_Proxy_Server

## [Task-1: Print "Hello World!" to the console](https://godelonline.sharepoint.com/Functions/LearningAndDevelopment/SitePages/Node---Proxy-Server.aspx?csf=1&web=1&e=Z6bZS6&OR=Teams-HL&CT=1732611317249&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiI0OS8yNDEwMjAwMTMxOCIsIkhhc0ZlZGVyYXRlZFVzZXIiOmZhbHNlfQ%3D%3D&CID=5a831324-1a88-4207-96aa-41cca15bce8e#task-1-print-hello-world!-to-the-console)

**Acceptance criteria**:

- Create `index.js` file created.
- `hello world` is printed in console by running application.

## [Task-2: Make first server to server API request](https://godelonline.sharepoint.com/Functions/LearningAndDevelopment/SitePages/Node---Proxy-Server.aspx?csf=1&web=1&e=Z6bZS6&OR=Teams-HL&CT=1732611317249&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiI0OS8yNDEwMjAwMTMxOCIsIkhhc0ZlZGVyYXRlZFVzZXIiOmZhbHNlfQ%3D%3D&CID=5a831324-1a88-4207-96aa-41cca15bce8e#task-2-make-first-server-to-server-api-request)

**Acceptance criteria**:

- `package.json` file and project configuration is initialized
- Add start command to package.json
- API request library is chosen and installed
- NASA API token is created by sign up (https://api.nasa.gov/index.html)
- NASA API endpoint is called and response is received (GET https://api.nasa.gov/neo/rest/v1/feed?start_date=START_DATE&end_date=END_DATE&api_key=API_KEY)
- Response in JSON format is printed to the console

## [Task-3: Add environment variables](https://godelonline.sharepoint.com/Functions/LearningAndDevelopment/SitePages/Node---Proxy-Server.aspx?csf=1&web=1&e=Z6bZS6&OR=Teams-HL&CT=1732611317249&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiI0OS8yNDEwMjAwMTMxOCIsIkhhc0ZlZGVyYXRlZFVzZXIiOmZhbHNlfQ%3D%3D&CID=5a831324-1a88-4207-96aa-41cca15bce8e#task-3-add-environment-variables)

**Acceptance criteria**:

- Add `.env` for environment variables
- `.env` should be added to .gitignore, and .env.example should be created to store template keys
- Import the token and api link into our `index.js` file
- Start the application using variables from the environment file

## [Task-4: Connect Express framework](https://godelonline.sharepoint.com/Functions/LearningAndDevelopment/SitePages/Node---Proxy-Server.aspx?csf=1&web=1&e=Z6bZS6&OR=Teams-HL&CT=1732611317249&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiI0OS8yNDEwMjAwMTMxOCIsIkhhc0ZlZGVyYXRlZFVzZXIiOmZhbHNlfQ%3D%3D&CID=5a831324-1a88-4207-96aa-41cca15bce8e#task-4-connect-express-framework)

**Acceptance criteria**:

- Connect framework
- Start server on port `4000`
- Print to the console that the server is running and on what port
- Create a separate configuration file to manage environment variables

## [Task-5: Create a first endpoint](https://godelonline.sharepoint.com/Functions/LearningAndDevelopment/SitePages/Node---Proxy-Server.aspx?csf=1&web=1&e=Z6bZS6&OR=Teams-HL&CT=1732611317249&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiI0OS8yNDEwMjAwMTMxOCIsIkhhc0ZlZGVyYXRlZFVzZXIiOmZhbHNlfQ%3D%3D&CID=5a831324-1a88-4207-96aa-41cca15bce8e#task-5-create-a-first-endpoint)

**Acceptance criteria**:

- Add endpoint for the example `"/meteors"`
- Output the response in JSON format to endpoint response
- Test response with browser

## [Task-6: Explore the Postman tool](https://godelonline.sharepoint.com/Functions/LearningAndDevelopment/SitePages/Node---Proxy-Server.aspx?csf=1&web=1&e=Z6bZS6&OR=Teams-HL&CT=1732611317249&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiI0OS8yNDEwMjAwMTMxOCIsIkhhc0ZlZGVyYXRlZFVzZXIiOmZhbHNlfQ%3D%3D&CID=5a831324-1a88-4207-96aa-41cca15bce8e#task-6-explore-the-postman-tool)

**Acceptance criteria**:

- Install Postman
- Make multiple requests to the NASA API
- Make a request to your proxy server

## [Task-7: Add logic to your app](https://godelonline.sharepoint.com/Functions/LearningAndDevelopment/SitePages/Node---Proxy-Server.aspx?csf=1&web=1&e=Z6bZS6&OR=Teams-HL&CT=1732611317249&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiI0OS8yNDEwMjAwMTMxOCIsIkhhc0ZlZGVyYXRlZFVzZXIiOmZhbHNlfQ%3D%3D&CID=5a831324-1a88-4207-96aa-41cca15bce8e#task-7-add-logic-to-your-app)

**Acceptance criteria**:

- Add logic to the base endpoint `/meteors`

## [Task-8: Refactor code](https://godelonline.sharepoint.com/Functions/LearningAndDevelopment/SitePages/Node---Proxy-Server.aspx?csf=1&web=1&e=Z6bZS6&OR=Teams-HL&CT=1732611317249&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiI0OS8yNDEwMjAwMTMxOCIsIkhhc0ZlZGVyYXRlZFVzZXIiOmZhbHNlfQ%3D%3D&CID=5a831324-1a88-4207-96aa-41cca15bce8e#task-8-refactor-code)

**Acceptance criteria**:

- Divide the application into layers
- Add the controllers/services/repositories layers
- Split logic by layers
- Add custom Exception. It should include a status code and an error message. Error handler should be able to work with it
- Create middleware for error handling. This middleware should accept an error and return a user-friendly response to the client (e.g., error status and message). Ensure that all errors from the all layers are passed to the error handler
- Add “page not found” endpoint. For now it can return “Page not found” string
