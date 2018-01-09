import {HttpEvent, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";

interface BaseOption {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  withCredentials?: boolean;
}

export interface ArrayBufferOption extends BaseOption {
  observe?: 'body';
  responseType: 'arraybuffer';
}

export interface BlobOption extends BaseOption {
  observe?: 'body';
  responseType: 'blob';
}

export interface TextOption extends BaseOption {
  observe?: 'body';
  responseType: 'text';
}

export interface JsonOption extends BaseOption {
  observe?: 'body';
  responseType: 'json';
}

export interface EventArrayBufferOption extends BaseOption {
  observe: 'events';
  responseType: 'arraybuffer';
}

export interface EventBlobOption extends BaseOption {
  observe: 'events';
  responseType: 'blob';
}

export interface EventTextOption extends BaseOption {
  observe: 'events';
  responseType: 'text';
}

export interface EventJsonOption extends BaseOption {
  observe: 'events';
  responseType: 'json';
}

export interface HttpResponseArrayBufferOption extends BaseOption {
  observe: 'response';
  responseType: 'arraybuffer';
}

export interface HttpResponseArrayBlobOption extends BaseOption {
  observe: 'response';
  responseType: 'blob';
}

export interface HttpResponseTextOption extends BaseOption {
  observe: 'response';
  responseType: 'text';
}

export interface HttpResponseJsonOption extends BaseOption {
  observe: 'response';
  responseType: 'json';
}

export declare type OptionsTypes =
  ArrayBufferOption
  | BlobOption
  | TextOption
  | JsonOption
  | EventArrayBufferOption
  | EventBlobOption
  | EventTextOption
  | HttpResponseArrayBufferOption
  | EventJsonOption
  | HttpResponseArrayBlobOption
  | HttpResponseTextOption
  | HttpResponseJsonOption;

export declare type OptionsReturnTypes =
  ArrayBuffer
  | Blob
  | string
  | Object
  | HttpEvent<ArrayBuffer>
  | HttpEvent<Blob>
  | HttpEvent<string>
  | HttpEvent<Object>
  | HttpResponse<ArrayBuffer>
  | HttpResponse<Blob>
  | HttpResponse<string>
  | HttpResponse<Object>;
