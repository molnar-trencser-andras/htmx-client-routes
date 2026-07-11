// htmx 4 does not export request/config types anymore. This is a minimal
// subset of the internal request context passed via the `htmx:config:request`
// event detail (`evt.detail.ctx`). Field names follow htmx 4's #createRequestContext.
export interface HtmxRequestContext {
  sourceElement: Element;
  target: Element;
  swap?: string;
  request: {
    action: string;
    method: string;
    body?: FormData;
    headers?: Record<string, string>;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

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
  ctx: HtmxRequestContext;
}
