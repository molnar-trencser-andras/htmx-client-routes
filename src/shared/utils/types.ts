import type { HtmxRequestConfig } from "htmx.org";

type VoidCb = () => void;

export type ParamType = Record<string, string | number | unknown>;

export interface HandlerFunctionParams<T extends ParamType = ParamType> {
  params: T;
  elt: HTMLElement;
}

type HandlerAsyncFunction<T extends ParamType = ParamType> = (
  functionParams: HandlerFunctionParams<T>,
) => Promise<string> | string;

type HandlerFunction<T extends ParamType = ParamType> = (
  functionParams: HandlerFunctionParams<T>,
) => void;

export type RouteHandler<T extends ParamType = ParamType> =
  | HandlerFunction<T>
  | HandlerAsyncFunction<T>
  | string
  | VoidCb;

export interface Route {
  path: string;
  handler: RouteHandler;
}

export interface HtmxEventDetail {
  elt: Element;
  target: Element;
  detail: HtmxRequestConfig;
  pathInfo: {
    anchor?: string;
    requestPath: string;
    finalRequestPath: string;
    responsePath: string | null;
  };
}
