import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpEvent, HttpParams, HttpResponse, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {getCookie, isObject, isString, isUndefined} from "../helpers";
import {environment} from "../../environments/environment";
import {Authentication} from "./authentication.service";

/**
 * Http service
 * @constructor
 * @function
 * @name HttpService
 *
 * @description
 * Main service for request handling
 */
abstract export class HttpService {
  /**
   * @param {Http} http
   * @description
   * Http handler
   */
  @Inject(HttpClient)
  private httpClient;
  /**
   * @param {Authentication} authenticationService
   * @description
   * Authentication service
   */
  @Inject(Authentication)
  private authenticationService;

  /**
   * @function
   * @name HttpService#getServiceAPI
   *
   * @description
   * Patch uri with env options
   */
  abstract getServiceAPI(url: string): string;

  /**
   * @function
   * @name HttpService#patchOptions
   *
   * @description
   * Patch request options
   */
  private patchOptions(options?: any): any {
    if (isUndefined(options)) {
      options = {};
    }
    if (isUndefined(options.headers)) {
      options.headers = new HttpHeaders();
    }

    if (options.headers instanceof HttpHeaders) {
      if (!options.headers.has("Content-Type")) {
        options.headers.set("Content-Type", "application/json");
      }
      options.headers.set("Authorization", getCookie(environment.SESSION_KEY));
    } else if (isObject(options.headers)) {
      if (!options.headers.hasOwnProperty("Content-Type")) {
        options.headers["Content-Type"] = "application/json";
      }
      options.headers.Authorization = getCookie(environment.SESSION_KEY)
    } else {
      throw new TypeError("HttpService unknown headers type");
    }
    return options;
  }


  /**
   * @function
   * @name HttpService#patchMethod
   *
   * @description
   * Patch method with authentication check
   */
  private patchMethod<R>(method: string, url: string, options?: {}, body?: any): Observable<R> {
    return new Observable<R>(observer => {
      let subscriber: Observable<R>;

      if (["post", "put", "patch"].indexOf(method) > -1) {
        if (!isString(body)) {
          try {
            body = JSON.stringify(body);
          } catch (e) {
            return observer.error(e);
          }
        }
        subscriber = this.httpClient[method].call(
          this.httpClient,
          this.getServiceAPI(url),
          body,
          this.patchOptions(options)
        );
      } else {
        subscriber = this.httpClient[method].call(
          this.httpClient,
          this.getServiceAPI(url),
          this.patchOptions(options)
        );
      }
      subscriber.subscribe(observer.next, (data) => {
        if (data.status === 401) {
          this.authenticationService.doLogout();
        }
        observer.error(data);
      });
    });
  }


  /**
   * Construct a DELETE request which interprets the body as an `ArrayBuffer` and returns it.
   *
   * @return an `Observable` of the body as an `ArrayBuffer`.
   */
  delete(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
  }): Observable<ArrayBuffer> {
    return this.patchMethod("delete", url, options);
  }

  /**
   * Construct a DELETE request which interprets the body as a `Blob` and returns it.
   *
   * @return an `Observable` of the body as a `Blob`.
   */
  delete(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'blob';
    withCredentials?: boolean;
  }): Observable<Blob> {
    return this.patchMethod("delete", url, options);
  }

  /**
   * Construct a DELETE request which interprets the body as text and returns it.
   *
   * @return an `Observable` of the body as a `string`.
   */
  delete(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'text';
    withCredentials?: boolean;
  }): Observable<string> {
    return this.patchMethod("delete", url, options);
  }

  /**
   * Construct a DELETE request which interprets the body as an `ArrayBuffer` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `ArrayBuffer`.
   */
  delete(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
  }): Observable<HttpEvent<ArrayBuffer>> {
    return this.patchMethod("delete", url, options);
  }

  /**
   * Construct a DELETE request which interprets the body as a `Blob` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Blob`.
   */
  delete(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'blob';
    withCredentials?: boolean;
  }): Observable<HttpEvent<Blob>> {
    return this.patchMethod("delete", url, options);
  }

  /**
   * Construct a DELETE request which interprets the body as text and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `string`.
   */
  delete(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'text';
    withCredentials?: boolean;
  }): Observable<HttpEvent<string>> {
    return this.patchMethod("delete", url, options);
  }

  /**
   * Construct a DELETE request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
   */
  delete(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpEvent<Object>> {
    return this.patchMethod("delete", url, options);
  }

  /**
   * Construct a DELETE request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `T`.
   */
  delete<T>(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpEvent<T>> {
    return this.patchMethod("delete", url, options);
  }

  /**
   * Construct a DELETE request which interprets the body as an `ArrayBuffer` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `ArrayBuffer`.
   */
  delete(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
  }): Observable<HttpResponse<ArrayBuffer>> {
    return this.patchMethod("delete", url, options);
  }

  /**
   * Construct a DELETE request which interprets the body as a `Blob` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Blob`.
   */
  delete(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'blob';
    withCredentials?: boolean;
  }): Observable<HttpResponse<Blob>> {
    return this.patchMethod("delete", url, options);
  }

  /**
   * Construct a DELETE request which interprets the body as text and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `string`.
   */
  delete(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'text';
    withCredentials?: boolean;
  }): Observable<HttpResponse<string>> {
    return this.patchMethod("delete", url, options);
  }

  /**
   * Construct a DELETE request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Object`.
   */
  delete(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpResponse<Object>> {
    return this.patchMethod("delete", url, options);
  }

  /**
   * Construct a DELETE request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `T`.
   */
  delete<T>(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpResponse<T>> {
    return this.patchMethod("delete", url, options);
  }

  /**
   * Construct a DELETE request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as an `Object`.
   */
  delete(url: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<Object> {
    return this.patchMethod("delete", url, options);
  }

  /**
   * Construct a DELETE request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as type `T`.
   */
  delete<T>(url: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    return this.patchMethod("delete", url, options);
  }

  /**
   * Construct a GET request which interprets the body as an `ArrayBuffer` and returns it.
   *
   * @return an `Observable` of the body as an `ArrayBuffer`.
   */
  get(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
  }): Observable<ArrayBuffer> {
    return this.patchMethod("get", url, options);
  }

  /**
   * Construct a GET request which interprets the body as a `Blob` and returns it.
   *
   * @return an `Observable` of the body as a `Blob`.
   */
  get(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'blob';
    withCredentials?: boolean;
  }): Observable<Blob> {
    return this.patchMethod("get", url, options);
  }

  /**
   * Construct a GET request which interprets the body as text and returns it.
   *
   * @return an `Observable` of the body as a `string`.
   */
  get(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'text';
    withCredentials?: boolean;
  }): Observable<string> {
    return this.patchMethod("get", url, options);
  }

  /**
   * Construct a GET request which interprets the body as an `ArrayBuffer` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `ArrayBuffer`.
   */
  get(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
  }): Observable<HttpEvent<ArrayBuffer>> {
    return this.patchMethod("get", url, options);
  }

  /**
   * Construct a GET request which interprets the body as a `Blob` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Blob`.
   */
  get(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'blob';
    withCredentials?: boolean;
  }): Observable<HttpEvent<Blob>> {
    return this.patchMethod("get", url, options);
  }

  /**
   * Construct a GET request which interprets the body as text and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `string`.
   */
  get(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'text';
    withCredentials?: boolean;
  }): Observable<HttpEvent<string>> {
    return this.patchMethod("get", url, options);
  }

  /**
   * Construct a GET request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
   */
  get(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpEvent<Object>> {
    return this.patchMethod("get", url, options);
  }

  /**
   * Construct a GET request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `T`.
   */
  get<T>(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpEvent<T>> {
    return this.patchMethod("get", url, options);
  }

  /**
   * Construct a GET request which interprets the body as an `ArrayBuffer` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `ArrayBuffer`.
   */
  get(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
  }): Observable<HttpResponse<ArrayBuffer>> {
    return this.patchMethod("get", url, options);
  }

  /**
   * Construct a GET request which interprets the body as a `Blob` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Blob`.
   */
  get(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'blob';
    withCredentials?: boolean;
  }): Observable<HttpResponse<Blob>> {
    return this.patchMethod("get", url, options);
  }

  /**
   * Construct a GET request which interprets the body as text and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `string`.
   */
  get(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'text';
    withCredentials?: boolean;
  }): Observable<HttpResponse<string>> {
    return this.patchMethod("get", url, options);
  }

  /**
   * Construct a GET request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Object`.
   */
  get(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpResponse<Object>> {
    return this.patchMethod("get", url, options);
  }

  /**
   * Construct a GET request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `T`.
   */
  get<T>(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpResponse<T>> {
    return this.patchMethod("get", url, options);
  }

  /**
   * Construct a GET request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as an `Object`.
   */
  get(url: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<Object> {
    return this.patchMethod("get", url, options);
  }

  /**
   * Construct a GET request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as type `T`.
   */
  get<T>(url: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    return this.patchMethod("get", url, options);
  }

  /**
   * Construct a HEAD request which interprets the body as an `ArrayBuffer` and returns it.
   *
   * @return an `Observable` of the body as an `ArrayBuffer`.
   */
  head(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
  }): Observable<ArrayBuffer> {
    return this.patchMethod("head", url, options);
  }


  head(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'blob';
    withCredentials?: boolean;
  }): Observable<Blob> {
    return this.patchMethod("head", url, options);
  }

  /**
   * Construct a HEAD request which interprets the body as text and returns it.
   *
   * @return an `Observable` of the body as a `string`.
   */
  head(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'text';
    withCredentials?: boolean;
  }): Observable<string> {
    return this.patchMethod("head", url, options);
  }

  /**
   * Construct a GET request which interprets the body as an `ArrayBuffer` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `ArrayBuffer`.
   */
  head(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
  }): Observable<HttpEvent<ArrayBuffer>> {
    return this.patchMethod("head", url, options);
  }

  /**
   * Construct a HEAD request which interprets the body as a `Blob` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Blob`.
   */
  head(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'blob';
    withCredentials?: boolean;
  }): Observable<HttpEvent<Blob>> {
    return this.patchMethod("head", url, options);
  }

  /**
   * Construct a HEAD request which interprets the body as text and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `string`.
   */
  head(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'text';
    withCredentials?: boolean;
  }): Observable<HttpEvent<string>> {
    return this.patchMethod("head", url, options);
  }

  /**
   * Construct a HEAD request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
   */
  head(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpEvent<Object>> {
    return this.patchMethod("head", url, options);
  }

  /**
   * Construct a HEAD request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `T`.
   */
  head<T>(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpEvent<T>>;
  /**
   * Construct a HEAD request which interprets the body as an `ArrayBuffer` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `ArrayBuffer`.
   */
  head(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
  }): Observable<HttpResponse<ArrayBuffer>> {
    return this.patchMethod("head", url, options);
  }

  /**
   * Construct a HEAD request which interprets the body as a `Blob` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Blob`.
   */
  head(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'blob';
    withCredentials?: boolean;
  }): Observable<HttpResponse<Blob>> {
    return this.patchMethod("head", url, options);
  }

  /**
   * Construct a HEAD request which interprets the body as text and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `string`.
   */
  head(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'text';
    withCredentials?: boolean;
  }): Observable<HttpResponse<string>> {
    return this.patchMethod("head", url, options);
  }

  /**
   * Construct a HEAD request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Object`.
   */
  head(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpResponse<Object>> {
    return this.patchMethod("head", url, options);
  }

  /**
   * Construct a HEAD request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `T`.
   */
  head<T>(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpResponse<T>> {
    return this.patchMethod("head", url, options);
  }

  /**
   * Construct a HEAD request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as an `Object`.
   */
  head(url: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<Object> {
    return this.patchMethod("head", url, options);
  }

  /**
   * Construct a HEAD request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as type `T`.
   */
  head<T>(url: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    return this.patchMethod("head", url, options);
  }


  /**
   * Make an OPTIONS request which interprets the body as an `ArrayBuffer` and returns it.
   *
   * @return an `Observable` of the body as an `ArrayBuffer`.
   */
  options(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
  }): Observable<ArrayBuffer> {
    return this.patchMethod("options", url, options);
  }

  /**
   * Construct an OPTIONS request which interprets the body as a `Blob` and returns it.
   *
   * @return an `Observable` of the body as a `Blob`.
   */
  options(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'blob';
    withCredentials?: boolean;
  }): Observable<Blob> {
    return this.patchMethod("options", url, options);
  }

  /**
   * Construct a OPTIONS request which interprets the body as text and returns it.
   *
   * @return an `Observable` of the body as a `string`.
   */
  options(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'text';
    withCredentials?: boolean;
  }): Observable<string> {
    return this.patchMethod("options", url, options);
  }

  /**
   * Construct an OPTIONS request which interprets the body as an `ArrayBuffer` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `ArrayBuffer`.
   */
  options(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
  }): Observable<HttpEvent<ArrayBuffer>> {
    return this.patchMethod("options", url, options);
  }

  /**
   * Construct an OPTIONS request which interprets the body as a `Blob` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Blob`.
   */
  options(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'blob';
    withCredentials?: boolean;
  }): Observable<HttpEvent<Blob>> {
    return this.patchMethod("options", url, options);
  }

  /**
   * Construct an OPTIONS request which interprets the body as text and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `string`.
   */
  options(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'text';
    withCredentials?: boolean;
  }): Observable<HttpEvent<string>> {
    return this.patchMethod("options", url, options);
  }

  /**
   * Construct an OPTIONS request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
   */
  options(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpEvent<Object>> {
    return this.patchMethod("options", url, options);
  }

  /**
   * Construct an OPTIONS request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `T`.
   */
  options<T>(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpEvent<T>> {
    return this.patchMethod("options", url, options);
  }

  /**
   * Construct an OPTIONS request which interprets the body as an `ArrayBuffer` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `ArrayBuffer`.
   */
  options(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
  }): Observable<HttpResponse<ArrayBuffer>> {
    return this.patchMethod("options", url, options);
  }

  /**
   * Construct an OPTIONS request which interprets the body as a `Blob` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Blob`.
   */
  options(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'blob';
    withCredentials?: boolean;
  }): Observable<HttpResponse<Blob>> {
    return this.patchMethod("options", url, options);
  }

  /**
   * Construct an OPTIONS request which interprets the body as text and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `string`.
   */
  options(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'text';
    withCredentials?: boolean;
  }): Observable<HttpResponse<string>> {
    return this.patchMethod("options", url, options);
  }

  /**
   * Construct an OPTIONS request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Object`.
   */
  options(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpResponse<Object>> {
    return this.patchMethod("options", url, options);
  }

  /**
   * Construct an OPTIONS request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `T`.
   */
  options<T>(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpResponse<T>> {
    return this.patchMethod("options", url, options);
  }

  /**
   * Construct an OPTIONS request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as an `Object`.
   */
  options(url: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<Object> {
    return this.patchMethod("options", url, options);
  }

  /**
   * Construct an OPTIONS request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as type `T`.
   */
  options<T>(url: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    return this.patchMethod("options", url, options);
  }

  /**
   * Construct a PATCH request which interprets the body as an `ArrayBuffer` and returns it.
   *
   * @return an `Observable` of the body as an `ArrayBuffer`.
   */
  patch(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
  }): Observable<ArrayBuffer> {
    return this.patchMethod("patch", url, options, body);
  }

  /**
   * Construct a PATCH request which interprets the body as a `Blob` and returns it.
   *
   * @return an `Observable` of the body as a `Blob`.
   */
  patch(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'blob';
    withCredentials?: boolean;
  }): Observable<Blob> {
    return this.patchMethod("patch", url, options, body);
  }

  /**
   * Construct a PATCH request which interprets the body as text and returns it.
   *
   * @return an `Observable` of the body as a `string`.
   */
  patch(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'text';
    withCredentials?: boolean;
  }): Observable<string> {
    return this.patchMethod("patch", url, options, body);
  }

  /**
   * Construct a PATCH request which interprets the body as an `ArrayBuffer` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `ArrayBuffer`.
   */
  patch(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
  }): Observable<HttpEvent<ArrayBuffer>> {
    return this.patchMethod("patch", url, options, body);
  }

  /**
   * Construct a PATCH request which interprets the body as a `Blob` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Blob`.
   */
  patch(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'blob';
    withCredentials?: boolean;
  }): Observable<HttpEvent<Blob>> {
    return this.patchMethod("patch", url, options, body);
  }

  /**
   * Construct a PATCH request which interprets the body as text and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `string`.
   */
  patch(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'text';
    withCredentials?: boolean;
  }): Observable<HttpEvent<string>> {
    return this.patchMethod("patch", url, options, body);
  }

  /**
   * Construct a PATCH request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
   */
  patch(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpEvent<Object>> {
    return this.patchMethod("patch", url, options, body);
  }

  /**
   * Construct a PATCH request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `T`.
   */
  patch<T>(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpEvent<T>> {
    return this.patchMethod("patch", url, options, body);
  }

  /**
   * Construct a PATCH request which interprets the body as an `ArrayBuffer` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `ArrayBuffer`.
   */
  patch(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
  }): Observable<HttpResponse<ArrayBuffer>> {
    return this.patchMethod("patch", url, options, body);
  }

  /**
   * Construct a PATCH request which interprets the body as a `Blob` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Blob`.
   */
  patch(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'blob';
    withCredentials?: boolean;
  }): Observable<HttpResponse<Blob>> {
    return this.patchMethod("patch", url, options, body);
  }

  /**
   * Construct a PATCH request which interprets the body as text and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `string`.
   */
  patch(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'text';
    withCredentials?: boolean;
  }): Observable<HttpResponse<string>> {
    return this.patchMethod("patch", url, options, body);
  }

  /**
   * Construct a PATCH request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Object`.
   */
  patch(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpResponse<Object>> {
    return this.patchMethod("patch", url, options, body);
  }

  /**
   * Construct a PATCH request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `T`.
   */
  patch<T>(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpResponse<T>> {
    return this.patchMethod("patch", url, options, body);
  }

  /**
   * Construct a PATCH request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as an `Object`.
   */
  patch(url: string, body: any | null, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<Object> {
    return this.patchMethod("patch", url, options, body);
  }

  /**
   * Construct a PATCH request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as type `T`.
   */
  patch<T>(url: string, body: any | null, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    return this.patchMethod("patch", url, options, body);
  }

  /**
   * Construct a POST request which interprets the body as an `ArrayBuffer` and returns it.
   *
   * @return an `Observable` of the body as an `ArrayBuffer`.
   */
  post(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
  }): Observable<ArrayBuffer> {
    return this.patchMethod("post", url, options, body);
  }

  /**
   * Construct a POST request which interprets the body as a `Blob` and returns it.
   *
   * @return an `Observable` of the body as a `Blob`.
   */
  post(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'blob';
    withCredentials?: boolean;
  }): Observable<Blob> {
    return this.patchMethod("post", url, options, body);
  }

  /**
   * Construct a POST request which interprets the body as text and returns it.
   *
   * @return an `Observable` of the body as a `string`.
   */
  post(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'text';
    withCredentials?: boolean;
  }): Observable<string> {
    return this.patchMethod("post", url, options, body);
  }

  /**
   * Construct a PATCH request which interprets the body as an `ArrayBuffer` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `ArrayBuffer`.
   */
  post(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
  }): Observable<HttpEvent<ArrayBuffer>> {
    return this.patchMethod("post", url, options, body);
  }

  /**
   * Construct a POST request which interprets the body as a `Blob` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Blob`.
   */
  post(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'blob';
    withCredentials?: boolean;
  }): Observable<HttpEvent<Blob>> {
    return this.patchMethod("post", url, options, body);
  }

  /**
   * Construct a POST request which interprets the body as text and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `string`.
   */
  post(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'text';
    withCredentials?: boolean;
  }): Observable<HttpEvent<string>> {
    return this.patchMethod("post", url, options, body);
  }

  /**
   * Construct a POST request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
   */
  post(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpEvent<Object>> {
    return this.patchMethod("post", url, options, body);
  }

  /**
   * Construct a POST request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `T`.
   */
  post<T>(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpEvent<T>> {
    return this.patchMethod("post", url, options, body);
  }

  /**
   * Construct a POST request which interprets the body as an `ArrayBuffer` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `ArrayBuffer`.
   */
  post(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
  }): Observable<HttpResponse<ArrayBuffer>> {
    return this.patchMethod("post", url, options, body);
  }

  /**
   * Construct a POST request which interprets the body as a `Blob` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Blob`.
   */
  post(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'blob';
    withCredentials?: boolean;
  }): Observable<HttpResponse<Blob>> {
    return this.patchMethod("post", url, options, body);
  }

  /**
   * Construct a POST request which interprets the body as text and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `string`.
   */
  post(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'text';
    withCredentials?: boolean;
  }): Observable<HttpResponse<string>> {
    return this.patchMethod("post", url, options, body);
  }

  /**
   * Construct a POST request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Object`.
   */
  post(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpResponse<Object>> {
    return this.patchMethod("post", url, options, body);
  }

  /**
   * Construct a POST request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `T`.
   */
  post<T>(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpResponse<T>> {
    return this.patchMethod("post", url, options, body);
  }

  /**
   * Construct a POST request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as an `Object`.
   */
  post(url: string, body: any | null, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<Object> {
    return this.patchMethod("post", url, options, body);
  }

  /**
   * Construct a POST request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as type `T`.
   */
  post<T>(url: string, body: any | null, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    return this.patchMethod("post", url, options, body);
  }

  /**
   * Construct a PUT request which interprets the body as an `ArrayBuffer` and returns it.
   *
   * @return an `Observable` of the body as an `ArrayBuffer`.
   */
  put(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
  }): Observable<ArrayBuffer> {
    return this.patchMethod("put", url, options, body);
  }

  /**
   * Construct a PUT request which interprets the body as a `Blob` and returns it.
   *
   * @return an `Observable` of the body as a `Blob`.
   */
  put(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'blob';
    withCredentials?: boolean;
  }): Observable<Blob> {
    return this.patchMethod("put", url, options, body);
  }

  /**
   * Construct a PUT request which interprets the body as text and returns it.
   *
   * @return an `Observable` of the body as a `string`.
   */
  put(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'text';
    withCredentials?: boolean;
  }): Observable<string> {
    return this.patchMethod("put", url, options, body);
  }

  /**
   * Construct a PUT request which interprets the body as an `ArrayBuffer` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `ArrayBuffer`.
   */
  put(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
  }): Observable<HttpEvent<ArrayBuffer>> {
    return this.patchMethod("put", url, options, body);
  }

  /**
   * Construct a PUT request which interprets the body as a `Blob` and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Blob`.
   */
  put(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'blob';
    withCredentials?: boolean;
  }): Observable<HttpEvent<Blob>> {
    return this.patchMethod("put", url, options, body);
  }

  /**
   * Construct a PUT request which interprets the body as text and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `string`.
   */
  put(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'text';
    withCredentials?: boolean;
  }): Observable<HttpEvent<string>> {
    return this.patchMethod("put", url, options, body);
  }

  /**
   * Construct a PUT request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `Object`.
   */
  put(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpEvent<Object>> {
    return this.patchMethod("put", url, options, body);
  }

  /**
   * Construct a PUT request which interprets the body as JSON and returns the full event stream.
   *
   * @return an `Observable` of all `HttpEvent`s for the request, with a body type of `T`.
   */
  put<T>(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'events';
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpEvent<T>> {
    return this.patchMethod("put", url, options, body);
  }

  /**
   * Construct a PUT request which interprets the body as an `ArrayBuffer` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `ArrayBuffer`.
   */
  put(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
  }): Observable<HttpResponse<ArrayBuffer>> {
    return this.patchMethod("put", url, options, body);
  }

  /**
   * Construct a PUT request which interprets the body as a `Blob` and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Blob`.
   */
  put(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'blob';
    withCredentials?: boolean;
  }): Observable<HttpResponse<Blob>> {
    return this.patchMethod("put", url, options, body);
  }

  /**
   * Construct a PUT request which interprets the body as text and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `string`.
   */
  put(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'text';
    withCredentials?: boolean;
  }): Observable<HttpResponse<string>> {
    return this.patchMethod("put", url, options, body);
  }

  /**
   * Construct a PUT request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `Object`.
   */
  put(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpResponse<Object>> {
    return this.patchMethod("put", url, options, body);
  }

  /**
   * Construct a PUT request which interprets the body as JSON and returns the full response.
   *
   * @return an `Observable` of the `HttpResponse` for the request, with a body type of `T`.
   */
  put<T>(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe: 'response';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<HttpResponse<T>> {
    return this.patchMethod("put", url, options, body);
  }

  /**
   * Construct a PUT request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as an `Object`.
   */
  put(url: string, body: any | null, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<Object> {
    return this.patchMethod("put", url, options, body);
  }

  /**
   * Construct a PUT request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as type `T`.
   */
  put<T>(url: string, body: any | null, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    return this.patchMethod("put", url, options, body);
  }

}
