import Model from '@/core/model';
import { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosRequestConfig, AxiosResponse } from 'axios';
import GetView from '@/types/get-view.type';
import ZemitData from '@/types/zemit-data.type';
export type ModelServiceEndpointType = 'getAll' | 'getList' | 'get' | 'export' | 'count' | 'new' | 'validate' | 'save' | 'create' | 'update' | 'delete' | 'restore' | '';
export declare class ZemitOptions {
    apiUrl: string;
    axiosRequestConfig?: AxiosRequestConfig;
}
export declare abstract class ServiceConfig {
    model: typeof Model;
    config?: Partial<ZemitOptions>;
}
export default class Service extends ServiceConfig {
    http: AxiosInstance;
    baseUrl: string;
    modelUrl: string;
    endpointList: {
        [key: ModelServiceEndpointType | string]: string;
    };
    refreshOnUnauthorized: boolean;
    constructor(opts?: Partial<ServiceConfig>);
    static getInstance<T, K extends keyof ServiceConfig>(this: new () => T, opts?: Partial<ServiceConfig>): T;
    getEndpointUrl: (endpoint: ModelServiceEndpointType | string) => string;
    setEndpointUrl: (endpoint: ModelServiceEndpointType | string, url: string) => string;
    getBaseUrl: () => string;
    setBaseUrl: (url: string) => string;
    setModelUrl: (url: string) => string;
    getModelUrl: () => string;
    /**
     * Build an endpoint url using the baseUrl + modelUrl + endpointUrl
     * @param endpoint
     */
    getUrl(endpoint: ModelServiceEndpointType | string): string;
    /**
     * Endpoint URL getters
     * @return string
     */
    getGetAllUrl: () => string;
    getGetListUrl: () => string;
    getGetUrl: () => string;
    getImportUrl: () => string;
    getExportUrl: () => string;
    getCountUrl: () => string;
    getNewUrl: () => string;
    getValidateUrl: () => string;
    getCreateUrl: () => string;
    getUpdateUrl: () => string;
    getSaveUrl: () => string;
    getDeleteUrl: () => string;
    getRestoreUrl: () => string;
    getLogoutUrl: () => string;
    getLoginUrl: () => string;
    getUploadUrl: () => string;
    getAll: (data?: {}, config?: {}) => Promise<AxiosResponse<ZemitData<any>, any>>;
    getList: (data?: {}, config?: {}) => Promise<AxiosResponse<ZemitData<any>, any>>;
    get: (data?: {}, config?: {}) => Promise<AxiosResponse<ZemitData<any>, any>>;
    import: (data?: {}, config?: {}) => Promise<AxiosResponse<ZemitData<any>, any>>;
    export: (data?: {}, config?: {}) => Promise<AxiosResponse<ZemitData<any>, any>>;
    count: (data?: {}, config?: {}) => Promise<AxiosResponse<ZemitData<any>, any>>;
    new: (data?: {}, config?: {}) => Promise<AxiosResponse<ZemitData<any>, any>>;
    validate: (data?: {}, config?: {}) => Promise<AxiosResponse<ZemitData<any>, any>>;
    create: (data?: {}, config?: {}) => Promise<AxiosResponse<ZemitData<any>, any>>;
    update: (data?: {}, config?: {}) => Promise<AxiosResponse<ZemitData<any>, any>>;
    save: (data?: {}, config?: {}) => Promise<AxiosResponse<ZemitData<any>, any>>;
    delete: (data?: {}, config?: {}) => Promise<AxiosResponse<ZemitData<any>, any>>;
    restore: (data?: {}, config?: {}) => Promise<AxiosResponse<ZemitData<any>, any>>;
    upload: (data?: {}, config?: {}) => Promise<AxiosResponse<ZemitData<any>, any>>;
    handleRequest<D = any, R = any>(url: string, data: D, config?: AxiosRequestConfig<D>, success?: CallableFunction, error?: CallableFunction, complete?: CallableFunction): Promise<AxiosResponse<ZemitData<R>>>;
    /**
     * Prepare request config
     */
    prepareRequestConfig<D = any>(url: string, data?: D | any, config?: AxiosRequestConfig<D>): void;
    uploadFile(file: File, category: string): Promise<AxiosResponse<ZemitData<any>, any>>;
    prepareUploads<D = any>(model: D | any): Promise<any>;
    /**
     * Process parameters before Axios Request
     */
    beforeRequest<D = any>(config: AxiosRequestConfig<D | any>): void;
    /**
     * Request Success Callback
     */
    success: (response: AxiosResponse<ZemitData<any>>, resolve: CallableFunction, reject: CallableFunction, callable?: CallableFunction) => void;
    /**
     * Request Error Callback
     */
    error: (reason: AxiosError<any> | AxiosResponse<any>, resolve: CallableFunction, reject: CallableFunction, callable?: CallableFunction) => void;
    /**
     * Request Complete Callback
     */
    complete: (resolve: CallableFunction, reject: CallableFunction, callable?: CallableFunction) => void;
    /**
     * Axios Success Response
     * Parse Zemit Data Response and reject the request if we don't have valid response
     * - @todo Zemit should return a 401 itself
     */
    responseInterceptor: (response: AxiosResponse<ZemitData<GetView>>) => AxiosResponse<ZemitData<GetView>, any> | Promise<never>;
    /**
     * Axios Rejected Response
     * If 401, the JWT may be expired or invalid, so we try to refresh JWT once
     */
    retry: boolean;
    rejectedResponseInterceptor: (reject: AxiosError) => Promise<AxiosResponse<any, any>>;
    /**
     * Adding X-Authorization JWT header
     * Refresh the JWT token if expired
     */
    requestInterceptor: (config: InternalAxiosRequestConfig) => Promise<InternalAxiosRequestConfig<any>>;
}
//# sourceMappingURL=service.d.ts.map