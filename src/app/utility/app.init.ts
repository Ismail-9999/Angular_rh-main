import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
      keycloak.init({
        config: {
          url: 'http://localhost:8080',
          realm: 'CCG',
          clientId: 'CCG_KEYCLOACK',
          
        },
        initOptions: {
            
            checkLoginIframe:true ,
            checkLoginIframeInterval:25
        //   onLoad: 'check-sso',
        //   silentCheckSsoRedirectUri:
        //     window.location.origin + '/assets/silent-check-sso.html'
        }
      });
  }