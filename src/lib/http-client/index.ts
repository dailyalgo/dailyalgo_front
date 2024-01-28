import type { HTTPClientBuilder } from "./HTTPClient";
import type { RequestInterceptor, ResponseInterceptor } from "./AxiosClient";
import { AxiosClientBuilder } from "./AxiosClientBuilder";

const requestInterceptor: RequestInterceptor = {
  async onFulfilled(config) {
    // 토큰 설정
    const token = localStorage.getItem("token");
    if (!token) return config;

    const newConfig = config;
    newConfig.headers.Authorization = `Bearer ${token}`;
    return newConfig;
  },
  onRejected(error) {
    return Promise.reject(error);
  },
};

let isRefreshing = false;
let refreshQueue: any[] = [];

const responseInterceptor: ResponseInterceptor = {
  async onFulfilled(response) {
    return response;
  },
  async onRejected(error) {
    const httpClient = (this as any).instance;
    const axiosClient = httpClient.axiosInstance;

    const {
      config: originConfig,
      response: { data },
    } = error;

    if (data.message !== "jwt expired") return Promise.reject(error);

    const token = localStorage.getItem("token");
    if (!token) return Promise.reject(error);

    if (!isRefreshing) {
      httpClient
        .put("user/token")
        .then((res: { token: string; message: string }) => {
          const newToken = res.token;
          localStorage.setItem("token", newToken);
          refreshQueue.forEach((promise: any) => promise.resolve(newToken));
        })
        .catch(() => {
          refreshQueue.forEach((promise: any) => promise.reject(error));
        })
        .finally(() => {
          refreshQueue = [];
          isRefreshing = false;
        });
    }

    if (originConfig.url === "/user/token") {
      return Promise.reject(error);
    }
    return new Promise((resolve, reject) => {
      refreshQueue.push({
        resolve() {
          resolve(axiosClient(originConfig));
        },
        reject(err: any) {
          reject(err);
        },
      });
    });
  },
};

export function createHttpCilent(): HTTPClientBuilder {
  const builder: AxiosClientBuilder = new AxiosClientBuilder();
  return builder
    .setRequestInterceptor({
      onFulfilled: requestInterceptor.onFulfilled.bind(builder),
      onRejected: requestInterceptor.onRejected.bind(builder),
    })
    .setResponseInterceptor({
      onFulfilled: responseInterceptor.onFulfilled.bind(builder),
      onRejected: responseInterceptor.onRejected.bind(builder),
    });
}
