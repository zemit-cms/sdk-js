import { AxiosResponse } from 'axios';
import Service from '@/core/service';
import ZemitData from '@/types/zemit-data.type';
import GetView from '@/types/auth/get-view.type';
import LoginView from '@/types/auth/login-view.type';
import LogoutView from '@/types/auth/logout-view.type';
import RegisterView from '@/types/auth/register-view.type';
import RefreshView from '@/types/auth/refresh-view.type';
export default class AuthService extends Service {
    modelUrl: string;
    baseUrl: string;
    endpointList: {
        [key: string]: string;
    };
    refreshOnUnauthorized: boolean;
    getGetUrl: () => string;
    getLoginUrl: () => string;
    getLogoutUrl: () => string;
    getRegisterUrl: () => string;
    getRefreshUrl: () => string;
    get: (data?: {}) => Promise<AxiosResponse<ZemitData<GetView>>>;
    login: (data?: {}) => Promise<AxiosResponse<ZemitData<LoginView>>>;
    logout: (data?: {}) => Promise<AxiosResponse<ZemitData<LogoutView>>>;
    register: (data?: {}) => Promise<AxiosResponse<ZemitData<RegisterView>>>;
    refresh: (data?: {}) => Promise<AxiosResponse<ZemitData<RefreshView>>>;
}
//# sourceMappingURL=auth.service.d.ts.map