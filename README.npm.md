# HTMX Client Routes


A lightweight **HTMX extension** for handling **client-side routes** and **mocking server responses**.  
Useful for prototyping, testing, or adding custom frontend logic before hitting the server.

## Features

- Define client-side routes directly in the frontend
- Return custom responses without a backend
- Intercept HTMX requests and perform extra logic before sending them to the server
- Great for prototyping or mocking APIs

## Demo
[HTMX Client Routes](https://codepen.io/Andr-s-Moln-r-Trencs-r/pen/WbQmGGp)

[HTMX with React](https://codepen.io/Andr-s-Moln-r-Trencs-r/pen/bNEVBmO)

## Installation

### NPM

```bash
npm install htmx-client-routes
```

### CDN

```html
<script src="https://unpkg.com/htmx-client-routes/dist/htmx-client-routes.min.js"></script>
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/htmx-client-routes/dist/htmx-client-routes.min.js"></script>
```

## Usage

### As an HTMX Extension

```html
<script src="https://unpkg.com/htmx.org@2.0.6"></script>
<script src="https://unpkg.com/htmx-client-routes/dist/htmx-client-routes.min.js"></script>

<script>
  // Define your routes
  htmxClientRoutes.addRoute('/hello', '<h1>Hello World!</h1>');
  
  htmxClientRoutes.addRoute('/users/{id}', ({ params }) => {
    return `<h1>User ${params.id}</h1>`;
  });
</script>

<!-- Use it in your HTML -->
<button hx-get="/hello" hx-target="#content">Say Hello</button>
<button hx-get="/users/123" hx-target="#content">Show User 123</button>

<div id="content"></div>
```

### With TypeScript/ES Modules

```typescript
import htmx from 'htmx.org';
import htmxClientRoutes, { addRoute } from 'htmx-client-routes';

// Initialize the extension
htmxClientRoutes.init();

// Define your routes
addRoute('/hello', '<h1>Hello World!</h1>');

addRoute('/users/{id}', ({ params }) => {
  return `<h1>User ${params.id}</h1>`;
});

// You can also use async handlers
addRoute('/api/data', async ({ params }) => {
  const response = await fetch(`/api/data?id=${params.id}`);
  const data = await response.json();
  return `<pre>${JSON.stringify(data, null, 2)}</pre>`;
});
```

## React Integration

You can use React components with htmx-client-routes by importing the React integration module:

```typescript
import { loadReactComponent } from 'htmx-client-routes/react';

// Define a route that renders a React component
addRoute('/react-component', () => {
  return loadReactComponent(
    'my-component',  // Component name for identification
    React.lazy(() => import("./MyComponent")), // The React component to render

    { prop1: 'value1', prop2: 'value2' }  // Props to pass to the component
  );
});
```

This will render your React component inside an HTMX request, handling all the necessary setup and cleanup.

## API

### `addRoute(path, handler)`

Adds a new route to the client-side router.

- `path`: The URL path pattern to match. Can include parameters like `{id}`, `{string}`, `{integer}`, etc.
- `handler`: Either a string of HTML or a function that returns HTML. The function receives an object with `params` and `elt` properties.

### `getRoute(path)`

Gets a route definition that matches the given path.

### `getRouteParams(path, route)`

Extracts parameters from a path based on a route definition.

### `clearParams(parameters)`

Cleans up parameters from HTMX request.

### `watchAfterRendered(targetElement?, ms?)`

Helper function to process HTMX elements after rendering.

### `loadReactComponent(componentName, Component, componentProps?, loader?)`

Renders a React component for use with HTMX.

- `componentName`: A unique name for the component instance
- `Component`: The React component to render
- `componentProps`: Optional props to pass to the component
- `loader`: Boolean to show/hide a loading spinner (default: true)

## License

MIT
