import Model from '@/core/model';
import axios, {
  Axios,
  AxiosError,
  AxiosInstance,
  AxiosInterceptorManager,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';
import Logger from '@/core/logger';
import Identity from '@/core/identity';
import moment from 'moment/moment';
import GetView from '@/types/get-view.type';
import ZemitData from '@/types/zemit-data.type';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const createError = require('./../../node_modules/axios/lib/core/createError.js');

const d = new Logger('zemit/core/service');

export type ModelServiceEndpointType =
  'getAll' |
  'getList' |
  'get' |
  'export' |
  'count' |
  'new' |
  'validate' |
  'save' |
  'create' |
  'update' |
  'delete' |
  'restore' |
  ''
  ;

export class ZemitOptions {
  apiUrl = '';
  axiosRequestConfig?: AxiosRequestConfig;
}

export abstract class ServiceConfig {
  model = Model;
  config?: Partial<ZemitOptions>;
}

export default class Service extends ServiceConfig {

  http!: AxiosInstance;
  baseUrl = '';
  modelUrl = '';

  endpointList: { [key: ModelServiceEndpointType | string]: string } = {
    getAll: '/get-all',
    getList: '/get-list',
    get: '/get',
    import: '/import',
    export: '/export',
    count: '/count',
    new: '/new',
    validate: '/validate',
    save: '/save',
    create: '/save',
    update: '/save',
    delete: '/delete',
    restore: '/restore',
    logout: '/logout',
    login: '/login',
    upload: '/upload',
  };

  refreshOnUnauthorized = true;

  constructor (opts: Partial<ServiceConfig> = {}) {
    super();
    Object.assign(this, opts);
  }

  static getInstance<T, K extends keyof ServiceConfig> (this: new () => T, opts: Partial<ServiceConfig> = {}): T {
    const instance = new this();

    for (const key in opts) {
      if (opts.hasOwnProperty(key)) {
        const keyTyped = key as K;
        (instance as any)[key] = opts[keyTyped];
      }
    }

    return instance;
  }

  getEndpointUrl = (endpoint: ModelServiceEndpointType | string): string => this.endpointList[endpoint] || endpoint;
  setEndpointUrl = (endpoint: ModelServiceEndpointType | string, url: string): string => this.endpointList[endpoint] = url;

  getBaseUrl = () => this.baseUrl;
  setBaseUrl = (url: string) => this.baseUrl = url;

  setModelUrl = (url: string) => this.modelUrl = url;
  getModelUrl = () => this.modelUrl;

  /**
   * Build an endpoint url using the baseUrl + modelUrl + endpointUrl
   * @param endpoint
   */
  getUrl(endpoint: ModelServiceEndpointType | string) {
    return [
      this.getBaseUrl(),
      this.getModelUrl(),
      this.getEndpointUrl(endpoint)
    ].filter(Boolean).join('/').replace(/\/+/g, '\/');
  }

  /**
   * Endpoint URL getters
   * @return string
   */
  getGetAllUrl = () => this.getUrl('getAll');
  getGetListUrl = () => this.getUrl('getList');
  getGetUrl = () => this.getUrl('get');
  getImportUrl = () => this.getUrl('import');
  getExportUrl = () => this.getUrl('export');
  getCountUrl = () => this.getUrl('count');
  getNewUrl = () => this.getUrl('new');
  getValidateUrl = () => this.getUrl('validate');
  getCreateUrl = () => this.getUrl('create');
  getUpdateUrl = () => this.getUrl('update');
  getSaveUrl = () => this.getUrl('save');
  getDeleteUrl = () => this.getUrl('delete');
  getRestoreUrl = () => this.getUrl('restore');
  getLogoutUrl = () => this.getUrl('logout');
  getLoginUrl = () => this.getUrl('login');
  getUploadUrl = () => this.getUrl('upload');

  getAll = (data = {}, config = {}) => this.handleRequest(this.getGetAllUrl(), data, config);
  getList = (data = {}, config = {}) => this.handleRequest(this.getGetListUrl(), data, config);
  get = (data = {}, config = {}) => this.handleRequest(this.getGetUrl(), data, config);
  import = (data = {}, config = {}) => this.handleRequest(this.getImportUrl(), data, config);
  export = (data = {}, config = {}) => this.handleRequest(this.getExportUrl(), data, config);
  count = (data = {}, config = {}) => this.handleRequest(this.getCountUrl(), data, config);
  new = (data = {}, config = {}) => this.handleRequest(this.getNewUrl(), data, config);
  validate = (data = {}, config = {}) => this.handleRequest(this.getValidateUrl(), data, config);
  create = (data = {}, config = {}) => this.handleRequest(this.getCreateUrl(), data, config);
  update = (data = {}, config = {}) => this.handleRequest(this.getUpdateUrl(), data, config);
  save = (data = {}, config = {}) => this.handleRequest(this.getSaveUrl(), data, config);
  delete = (data = {}, config = {}) => this.handleRequest(this.getDeleteUrl(), data, config);
  restore = (data = {}, config = {}) => this.handleRequest(this.getRestoreUrl(), data, config);
  upload = (data = {}, config = {}) => this.handleRequest(this.getUploadUrl(), data, config);

  handleRequest<D = any, R = any>(
    url: string,
    data: D,
    config: AxiosRequestConfig<D> = {},
    success?: CallableFunction,
    error?: CallableFunction,
    complete?: CallableFunction
  ): Promise<AxiosResponse<ZemitData<R>>> {
    /**
     * Create default Axios Request
     * Add custom interceptors
     */
    this.http = axios.create(this.config?.axiosRequestConfig);
    this.http.interceptors.response.use(this.responseInterceptor, this.rejectedResponseInterceptor);
    this.http.interceptors.request.use(this.requestInterceptor);

    return this.prepareUploads(data)
      .then(data => {
        this.prepareRequestConfig(url, data, config)
        this.beforeRequest(config);

        return new Promise((resolve, reject) =>
          this.http(config)
            .then((response: AxiosResponse<any>) => this.success(response, resolve, reject, success))
            .catch((reason: AxiosError<any>) => this.error(reason, resolve, reject, error))
            .finally(() => this.complete(resolve, reject, complete)),
        );
      })
  }

  /**
   * Prepare request config
   */
  prepareRequestConfig<D = any>(url: string, data?: D | any, config: AxiosRequestConfig<D> = {}) {
    // Set default method to post
    if (!config.method) {
      config.method = 'post';
    }

    // Force url
    if (!config.url) {
      config.url = url;
    }

    // Force data
    if (!config.data) {
      config.data = data;
    }
  }

  uploadFile(file: File, category: string) {
    const formData = new FormData();
    formData.append('file', file);
    return this.handleRequest(
      this.getBaseUrl() + '/file/upload/' + category,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
  }

  prepareUploads<D = any>(model: D | any): Promise<any> {
    return new Promise((resolve, reject) => {

      if (!(model instanceof Model)) {
        resolve(model);
      }

      const data = model.toObject();
      const uploadMap: any = model.uploadMap();
      const promises: Array<Promise<any>> = [];
      Object.keys(data).forEach(key => {
        if (uploadMap[key]) {
          if (data[key] instanceof File) {
            promises.push(
              this.uploadFile(data[key], uploadMap[key].category)
                .then(response => {
                  data[uploadMap[key].key] = response.data.view[0].file.id;
                  return response;
                })
            );
          } else if (data[key] === null) {
            data[uploadMap[key].key] = null;
          }
          delete data[key];
        }
      })

      Promise.all(promises).then(() => {
        resolve(data);
      });
    })
  }

  /**
   * Process parameters before Axios Request
   */
  beforeRequest<D = any>(config: AxiosRequestConfig<D|any>) {
    d.d('beforeRequest', config);

    // prepare model
    if (config.data instanceof Model) {
      config.data = config.data.toObject();
    }

    // prepare array of models
    if (Array.isArray(config.data)) {
      const newData: Array<any> = [];
      config.data.forEach((value, index) => {
        newData[index] = value instanceof Model
          ? value.toObject()
          : value;
      })
      config.data = newData;
    }
  }

  /**
   * Request Success Callback
   */
  success = (
    response: AxiosResponse<ZemitData<any>>,
    resolve: CallableFunction,
    reject: CallableFunction,
    callable?: CallableFunction,
  ) => {
    if (response?.data?.view?.single) {
      response.data.view.single = new this.model(response.data.view.single);
    }
    if (response?.data?.view?.list) {
      response.data.view.list = response.data.view.list.map((item: any) => {
        return new this.model(item);
      });
    }
    d.d('success', response);
    callable && callable(response);
    resolve(response);
  };

  /**
   * Request Error Callback
   */
  error = (
    reason: AxiosError<any>|AxiosResponse<any>,
    resolve: CallableFunction,
    reject: CallableFunction,
    callable?: CallableFunction,
  ) => {
    d.error('error', reason);
    callable && callable(reason);
    reject(reason);
  };

  /**
   * Request Complete Callback
   */
  complete = (
    resolve: CallableFunction,
    reject: CallableFunction,
    callable?: CallableFunction,
  ) => {
    d.d('complete');
    callable && callable();
  };

  /**
   * Axios Success Response
   * Parse Zemit Data Response and reject the request if we don't have valid response
   * - @todo Zemit should return a 401 itself
   */
  responseInterceptor = (response: AxiosResponse<ZemitData<GetView>>) => {
    d.info('interceptor:response', response);

    switch (response?.data?.response) {
      case undefined:
      case null:
      case true:
        return response;
    }
    return Promise.reject(
        // createError(response.statusText, response.config, response.status, response.request, response)
    );
  };

  /**
   * Axios Rejected Response
   * If 401, the JWT may be expired or invalid, so we try to refresh JWT once
   */
  retry = false;
  rejectedResponseInterceptor = async (reject: AxiosError) => {
    if (this.refreshOnUnauthorized && reject.response) {
      if (reject.response.status === 401 && !this.retry) {
        this.retry = true;
        await Identity.refreshPromise();
        if (Identity.isLoggedIn()) {
          if (reject.config) {
            return this.http(reject.config);
          }
        }
      }
    }
    return Promise.reject(reject);
  };

  /**
   * Adding X-Authorization JWT header
   * Refresh the JWT token if expired
   */
  requestInterceptor = async (config: InternalAxiosRequestConfig ) => {
    d.info('interceptor:config', config);
    if (config.headers) {
      let jwt = Identity.getIdentity()?.jwt;
      if (jwt) {
        if (this.refreshOnUnauthorized) {
          // const token = jose.decodeJwt(jwt);
          // const exp = token.exp || false;
          // if (token && exp && exp <= moment().unix()) {
          //   d.d('jwt:expired', jwt);
          //   await Identity.refreshPromise();
          //   jwt = Identity.getIdentity()?.jwt;
          // }
        }
        config.headers['X-Authorization'] = `Bearer ${jwt}`;
      }
    }
    return config;
  };
}
