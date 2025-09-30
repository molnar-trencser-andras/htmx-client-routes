import { watchAfterRendered } from "./htmx-functions";
import type { ParamType, Route, RouteHandler } from "./types";
import { isUrlFromString } from "./url";

let routes: Map<string, Route> = new Map();

export const addRoute = <T extends ParamType = ParamType>(
  path: string,
  handler: RouteHandler<T>,
) => {
  routes.set(path, { path, handler } as Route);
  sortRoutes();
  watchAfterRendered();
};

export const getRoute = (path: string): Route | undefined => {
  if (path === undefined) {
    return undefined;
  }

  const realPath = path.split("?")[0];

  const exactMatch = routes.get(realPath);
  if (exactMatch) {
    return exactMatch;
  }

  // Check for pattern match
  const source = routes.entries();
  for (const [routePath, route] of source) {
    if (isUrlFromString(routePath, realPath)) {
      return route;
    }
  }

  return undefined;
};

export const sortRoutes = (): void => {
  const normalRoutes = new Map<string, Route>();
  const lastRoutes = new Map<string, Route>();
  const source = routes.entries();

  for (const [path, route] of source) {
    if (path.includes(".*")) {
      lastRoutes.set(path, route);
    } else {
      normalRoutes.set(path, route);
    }
  }

  routes = new Map([...normalRoutes, ...lastRoutes]);
};

export const getRouteParams = (path: string, route: Route): ParamType => {
  const pathParts = path.split("/");
  const routeParts = route.path.split("/");
  const params: ParamType = {};

  for (const key in routeParts) {
    const routePart = routeParts[key];

    if (routePart.startsWith("{")) {
      const paramKey = routePart.replace("{", "").replace("}", "");
      params[paramKey] = ["integer", "index", "id"].includes(paramKey)
        ? Number.parseInt(pathParts[key], 10)
        : pathParts[key];
    }
  }

  return params;
};

export const clearParams = (parameters: ParamType): ParamType => {
  const params: ParamType = {};

  if (Object.keys(parameters).length === 0) {
    return {};
  }

  const sourceParams = Object.entries(parameters);

  for (const [key, value] of sourceParams) {
    const isArray = key.includes("[]");
    const fieldName = key.replace("[]", "");

    if (params[fieldName]) {
      if (Array.isArray(params[fieldName])) {
        params[fieldName].push(value);
      } else {
        params[fieldName] = [params[fieldName], value];
      }
    } else {
      if (Array.isArray(params[fieldName]) || isArray) {
        params[fieldName] = [value];
      } else {
        params[fieldName] = value;
      }
    }
  }

  return params;
};
