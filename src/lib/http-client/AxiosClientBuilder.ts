import type HTTPClient from "./HTTPClient";
import type { HTTPClientBuilder } from "./HTTPClient";
import AxiosClient from "./AxiosClient";
import type { RequestInterceptor, ResponseInterceptor } from "./AxiosClient";

export class AxiosClientBuilder implements HTTPClientBuilder {
  private readonly instance: AxiosClient;

  constructor() {
    this.instance = new AxiosClient();
  }

  setBaseUrl(url: string): AxiosClientBuilder {
    this.instance.baseUrl = url;
    return this;
  }

  setRequestInterceptor({ onFulfilled, onRejected }: RequestInterceptor): AxiosClientBuilder {
    this.instance.requestInterceptors = { onFulfilled, onRejected };
    return this;
  }

  setResponseInterceptor({ onFulfilled, onRejected }: ResponseInterceptor): AxiosClientBuilder {
    this.instance.responseInterceptor = { onFulfilled, onRejected };
    return this;
  }

  build(): HTTPClient {
    return this.instance;
  }
}
