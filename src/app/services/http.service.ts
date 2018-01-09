import {Inject} from "@angular/core";
import {HttpClient, HttpEvent, HttpParams, HttpResponse, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {getCookie, isObject, isString, isUndefined} from "../helpers";
import {environment} from "../../environments/environment";
import {Authentication} from "./authentication.service";
import {OptionsReturnTypes, OptionsTypes} from "./http.interfaces";

/**
 * Http service
 * @constructor
 * @function
 * @name HttpService
 *
 * @description
 * Main service for request handling
 */
export abstract class HttpService {
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
  delete(url: string, options: OptionsTypes): Observable<OptionsReturnTypes> {
    return this.patchMethod("delete", url, options);
  }

  /**
   * Construct a GET request which interprets the body as an `ArrayBuffer` and returns it.
   *
   * @return an `Observable` of the body as an `ArrayBuffer`.
   */
  get(url: string, options: OptionsTypes): Observable<OptionsReturnTypes> {
    return this.patchMethod("get", url, options);
  }

  /**
   * Construct a HEAD request which interprets the body as an `ArrayBuffer` and returns it.
   *
   * @return an `Observable` of the body as an `ArrayBuffer`.
   */
  head(url: string, options: OptionsTypes): Observable<OptionsReturnTypes> {
    return this.patchMethod("head", url, options);
  }

  /**
   * Make an OPTIONS request which interprets the body as an `ArrayBuffer` and returns it.
   *
   * @return an `Observable` of the body as an `ArrayBuffer`.
   */
  options(url: string, options: OptionsTypes): Observable<OptionsReturnTypes> {
    return this.patchMethod("options", url, options);
  }

  /**
   * Construct a PATCH request which interprets the body as an `ArrayBuffer` and returns it.
   *
   * @return an `Observable` of the body as an `ArrayBuffer`.
   */
  patch(url: string, body: any | null, options: OptionsTypes): Observable<OptionsReturnTypes> {
    return this.patchMethod("patch", url, options, body);
  }

  /**
   * Construct a POST request which interprets the body as an `ArrayBuffer` and returns it.
   *
   * @return an `Observable` of the body as an `ArrayBuffer`.
   */
  post(url: string, body: any | null, options: OptionsTypes): Observable<OptionsReturnTypes> {
    return this.patchMethod("post", url, options, body);
  }

  /**
   * Construct a PUT request which interprets the body as an `ArrayBuffer` and returns it.
   *
   * @return an `Observable` of the body as an `ArrayBuffer`.
   */
  put(url: string, body: any | null, options: OptionsTypes): Observable<OptionsReturnTypes> {
    return this.patchMethod("put", url, options, body);
  }
}
