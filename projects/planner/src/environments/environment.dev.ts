export const environment = {
  production: true,
  projectName: "Trianz Pulse - Planner Pro",
  apiUrl: "https://plannerdev.trianz.com/plannerapi/",
  auth: {
    clientId: "42a0be75-5487-4779-a591-29cfe708b95c",
    authority: "https://login.microsoftonline.com/bbab8f03-bc23-4ee6-b52d-f12ccc769787",
    redirectUri: `https://plannerdev.trianz.com/`,
    postLogoutRedirectUri: 'https://plannerdev.trianz.com/'
    // redirectUri: `http://localhost:3000/`,
    // postLogoutRedirectUri: `http://localhost:3000/`
  }
};
