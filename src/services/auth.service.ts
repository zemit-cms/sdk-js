import { AxiosResponse } from 'axios';
import Service from '@/core/service';
import ZemitData from '@/types/zemit-data.type';
import GetView from '@/types/auth/get-view.type';
import LoginView from '@/types/auth/login-view.type';
import LogoutView from '@/types/auth/logout-view.type';
import RegisterView from '@/types/auth/register-view.type';
import RefreshView from '@/types/auth/refresh-view.type';

export default class AuthService extends Service {
  modelUrl = '/auth';
  baseUrl = '/api';

  // auth endpoints
  endpointList: { [key: string]: string } = {
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

  get = (data = {}): Promise<AxiosResponse<ZemitData<GetView>>> => this.handleRequest(this.getGetUrl(), data);
  login = (data = {}): Promise<AxiosResponse<ZemitData<LoginView>>> => this.handleRequest(this.getLoginUrl(), data);
  logout = (data = {}): Promise<AxiosResponse<ZemitData<LogoutView>>> => this.handleRequest(this.getLogoutUrl(), data);
  register = (data = {}): Promise<AxiosResponse<ZemitData<RegisterView>>> =>
    this.handleRequest(this.getRegisterUrl(), data);
  refresh = (data = {}): Promise<AxiosResponse<ZemitData<RefreshView>>> =>
    this.handleRequest(this.getRefreshUrl(), data);
}
