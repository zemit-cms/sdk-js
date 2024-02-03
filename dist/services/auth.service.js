import Service from '@/core/service';
export default class AuthService extends Service {
    modelUrl = '/auth';
    baseUrl = '/api';
    // auth endpoints
    endpointList = {
        get: '/get',
        logout: '/logout',
        login: '/login',
        register: '/register',
        refresh: '/refresh',
    };
    // do not send a refresh request on unauthorized
    refreshOnUnauthorized = false;
    getGetUrl = () => this.getUrl('get');
    getLoginUrl = () => this.getUrl('login');
    getLogoutUrl = () => this.getUrl('logout');
    getRegisterUrl = () => this.getUrl('register');
    getRefreshUrl = () => this.getUrl('refresh');
    get = (data = {}) => this.handleRequest(this.getGetUrl(), data);
    login = (data = {}) => this.handleRequest(this.getLoginUrl(), data);
    logout = (data = {}) => this.handleRequest(this.getLogoutUrl(), data);
    register = (data = {}) => this.handleRequest(this.getRegisterUrl(), data);
    refresh = (data = {}) => this.handleRequest(this.getRefreshUrl(), data);
}
//# sourceMappingURL=auth.service.js.map