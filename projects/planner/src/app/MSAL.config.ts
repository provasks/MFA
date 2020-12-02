
import { environment } from '../environments/environment'
// Config object to be passed to Msal on creation.
// For a full list of msal.js configuration parameters, 
// visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_authenticationparameters_.html
export const msalConfig: any = {
  auth: {
    clientId: `${environment.auth.clientId}`,
    authority: `${environment.auth.authority}`,
    redirectUri: `${environment.auth.redirectUri}`,
    postLogoutRedirectUri: `${environment.auth.redirectUri}`
  },
  cache: {
    cacheLocation: "localStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    tokenRenewalOffsetSeconds: 300
  }

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