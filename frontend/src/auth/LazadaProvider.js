// my-custom-provider.js
import {OpenIDProvider} from '@salte-auth/salte-auth';

export default class LazadaProvider extends OpenIDProvider {
    constructor(config) {
        super(config);
        this.authUrl = 'https://auth.lazada.com/oauth/authorize';
        // this.clientID = '122309';
    }

    /**
     * This is the default name of the provider.
     */
    get name() {
        return 'lazada';
    }

    /**
     * This should use `this.config.url` to build the provider-specific login url.
     */
    get login() {
        return this.url(this.authUrl, {
            redirectUrl: this.config.redirectUrl,
            clientId: this.config.clientId,
            responseType: 'code'
        });
    }

    /**
     * This should use `this.config.url` to build the provider-specific logout url.
     */
    get logout() {
        return this.url(`${this.config.url}/v2/logout`, {
            returnTo: this.config.redirectUrl,
            client_id: this.config.clientID
        });
    }
}
