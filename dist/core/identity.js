import AuthService from '@/services/auth.service';
import Logger from '@/core/logger';
import store from 'store2';
const d = new Logger('zemit/core/identity');
export default class Identity {
    static identity;
    static refreshResponse = null;
    static setIdentity(identity) {
        d.d('setIdentity', identity);
        this.identity = identity;
        store.session.set('identity', this.identity);
        return this.identity;
    }
    static getIdentity() {
        if (!this.identity) {
            this.identity = store.session.get('identity', undefined);
        }
        d.d('getIdentity', this.identity);
        return this.identity;
    }
    static removeIdentity() {
        d.d('removeIdentity');
        delete this.identity;
        store.session.remove('identity');
    }
    static newIdentity() {
        d.d('newIdentity');
        this.removeIdentity();
        return AuthService.getInstance()
            .get()
            .then((success) => {
            this.setIdentity(success.data.view);
            d.d('new', this.identity);
        });
    }
    static refreshIdentity() {
        d.d('refreshIdentity');
        return AuthService.getInstance()
            .get()
            .then((success) => {
            this.setIdentity(success.data.view);
        })
            .catch((reason) => {
            d.d('refreshIdentity', reason);
            this.removeIdentity();
        });
    }
    /**
     * Check if identity is currently logged in
     */
    static isLoggedIn() {
        const isLoggedIn = this.getIdentity()?.loggedIn;
        d.d('isLoggedIn', isLoggedIn);
        return isLoggedIn;
    }
    /**
     *
     * @param roleList
     * @param or
     * @param inherit
     */
    static hasRole(roleList = [], or = false, inherit = true) {
        d.d('hasRole', roleList, Object.keys(this.identity?.roleList || {}));
        return this.has(roleList, Object.keys(this.identity?.roleList || {}), or);
    }
    /**
     * Check if the needles meet the haystack using nested arrays
     * Reversing ANDs and ORs within each nested subarray
     *
     * @param needles
     * @param haystack
     * @param or
     */
    static has(needles = [], haystack = [], or = false) {
        d.d('has', needles, haystack, or);
        if (!Array.isArray(needles)) {
            needles = [needles];
        }
        const result = [];
        for (const needle of [...needles]) {
            if (Array.isArray(needle)) {
                result.push(this.has(needle, haystack, !or));
            }
            else {
                result.push(haystack.includes(needle));
            }
        }
        return or ? !result.includes(false) : result.includes(true);
    }
    static hasPermission() { }
}
//# sourceMappingURL=identity.js.map