# htmx-client-routes

A lightweight **HTMX extension** for handling **client-side routes** and **mocking server responses**.  
Useful for prototyping, testing, or adding custom frontend logic before hitting the server.

## Coming Soon!!!

> Work in progress!
> ..

## Features

- Define client-side routes directly in the frontend
- Return custom responses without a backend
- Intercept HTMX requests and perform extra logic before sending them to the server
- Great for prototyping or mocking APIs

## Installation

Include the script after loading HTMX:

```html
<script src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.6/dist/htmx.min.js"></script>
<script src="./htmx-client-routes.min.js"></script>
```

> or install via npm:

```bash
npm install htmx.org
npm install htmx-client-routes
```

## Usage

Define routes using `htmxClientRoutes.addRoute`:

```tsx
interface Params extends ParamType {
  index: number;
}

addRoute<Params>(
  "/clicked/{index}",
  ({
    params: { index },
  }) => `<button hx-get="/clicked/${index + 1}" hx-swap="outerHTML">
    Hey, you clicked me! (${index})
  </button>`
);

function App() {
  return (
    <>
      <button hx-get="/clicked/0" hx-swap="outerHTML">
        Click to replace!
      </button>
    </>
  );
}
```
