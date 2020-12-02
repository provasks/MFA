
export const environment = {
  production: false,
  projectName: "Trianz Pulse - Planner Pro",

  /** local Server */
  // apiUrl: "https://plannerdev.trianz.com/plannerapi/",
  // auth: {
  //   clientId: "42a0be75-5487-4779-a591-29cfe708b95c",
  //   authority: "https://login.microsoftonline.com/bbab8f03-bc23-4ee6-b52d-f12ccc769787",
  //   redirectUri: `http://localhost:3001/`,
  //   postLogoutRedirectUri: 'http://localhost:3001/',
  // }

  /** DEV Server */
  // apiUrl: "https://plannerdev.trianz.com/plannerapi/",
  // auth: {
  //   clientId: "42a0be75-5487-4779-a591-29cfe708b95c",
  //   authority: "https://login.microsoftonline.com/bbab8f03-bc23-4ee6-b52d-f12ccc769787",
  //   redirectUri: `http://localhost:4200/`,
  //   postLogoutRedirectUri: 'http://localhost:4200/',
  // }


  /** UAT Server */
  apiUrl: "https://planneruat.trianz.com/plannerapi/",
  auth: {
    clientId: "437bc102-5a7a-45db-a3f2-942e2062c534",
    authority: "https://login.microsoftonline.com/a27f6b6b-dc28-48c2-a138-ddf0f11455f1",
    redirectUri: `http://localhost:4200/`,
    postLogoutRedirectUri: 'http://localhost:4200/',
  }



  /** Production */
  // apiUrl: "https://planner.trianz.com/plannerapi/",
  // auth: {
  //   clientId: "7ee8d1b2-153b-44e4-862c-8b4b8e859053",
  //   authority: "https://login.microsoftonline.com/a27f6b6b-dc28-48c2-a138-ddf0f11455f1",
  //   redirectUri: `http://localhost:4200/`,
  //   postLogoutRedirectUri: 'http://localhost:4200/',
  // }

};