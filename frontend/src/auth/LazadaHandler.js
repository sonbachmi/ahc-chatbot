import {Handler, SalteAuthError, Utils} from '@salte-auth/salte-auth';

export default class LazadaHandler extends Handler {
    constructor(config) {
        super(config);
        this.config = Utils.Common.defaults(this.config, {
            timeout: 10000
        });
    }

    get name() {
        return 'lazada';
    }

    get auto() {
        return true;
    }

    connected({action}) {
        if (!action) return;

        const origin = this.storage.get('origin');
        console.log(origin);
        if (!origin) return;

        this.storage.delete('origin');

        if (action === 'login') {
            // Does it make sense to navigate on 'logout'?
            // NOTE: This order, matters since navigate modifies the location.
            const parsed = Utils.URL.parse(location);
            console.log(parsed);
            this.navigate(origin);
            return parsed;
        }
    }

    open({url, timeout = this.config.timeout}) {
        this.storage.set('origin', location.href);
        this.navigate(url);

        // return new Promise((_resolve, reject) => {
        //     setTimeout(() => {
        //         reject(new SalteAuthError({
        //             code: 'redirect_timeout',
        //             message: `Timed out while redirecting.`,
        //         }));
        //     }, timeout);
        // });
    }
}

