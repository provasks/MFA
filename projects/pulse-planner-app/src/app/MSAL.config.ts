
// Config object to be passed to Msal on creation.
// For a full list of msal.js configuration parameters, 
// visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_authenticationparameters_.html
export const msalConfig: any = {

};
export const tokenRequest: any = {
  scopes: ["User.Read", "People.Read", "People.Read.All", "Files.ReadWrite.All"]
};
export const msalLoginConfig: any = {
  //popUp: !isIE,
  popUp: false,
  consentScopes: [
    'user.read',
    'openid',
    'profile',
  ],
  protectedResourceMap: [
    ['https://graph.microsoft.com/v1.0/me', ['user.read']]
  ],
  unprotectedResources: [],
  extraQueryParameters: {}
};