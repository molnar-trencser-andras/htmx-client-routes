import { describe, it, expect, vi } from "vitest";

// Mockoljuk a ./htmx-functions modult, hogy ne okozzon location hibát
vi.mock("./htmx-functions", () => ({
  watchAfterRendered: () => {},
}));

import { addRoute, getRoute, getRouteParams, clearParams } from "./routes";

describe("addRoute és getRoute", () => {
  it("should register and find a static route", () => {
    addRoute("/hello-teszt", "Hello Világ!");
    const route = getRoute("/hello-teszt");
    expect(route?.handler).toBe("Hello Világ!");
  });

  it("should not find a non-registered route", () => {
    const route = getRoute("/nincsilyen");
    expect(route).toBeUndefined();
  });

  it("should match dynamic route and extract params", () => {
    addRoute("/foo/{id}", () => "dynamic route");
    const route = getRoute("/foo/123");
    expect(route).toBeDefined();
    const params = route ? getRouteParams("/foo/123", route) : {};
    expect(params.id).toBe(123);
  });
});

describe("clearParams", () => {
  it("should clear array params correctly", () => {
    const orig = { "a[]": 1, "a[]": 2, b: "x" };
    const cleared = clearParams(orig);
    expect(cleared).toHaveProperty("a");
    expect(cleared).toHaveProperty("b", "x");
  });
  it("should return empty object for empty input", () => {
    expect(clearParams({})).toEqual({});
  });
});
