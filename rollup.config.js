import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';

export default [
  // ESM build - Main package
  {
    input: 'src/npm-package/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'es',
      sourcemap: true
    },
    external: ['htmx.org'],
    plugins: [
      typescript({
        tsconfig: 'tsconfig.npm.json',
        useTsconfigDeclarationDir: true
      })
    ]
  },
  // ESM build - React integration
  {
    input: 'src/npm-package/react.tsx',
    output: {
      file: 'dist/react.js',
      format: 'es',
      sourcemap: true
    },
    external: ['htmx.org', 'react', 'react-dom', 'react-dom/client'],
    plugins: [
      typescript({
        tsconfig: 'tsconfig.npm.json',
        useTsconfigDeclarationDir: true
      })
    ]
  },
  // UMD build (minified)
  {
    input: 'src/npm-package/index.ts',
    output: {
      file: 'dist/htmx-client-routes.min.js',
      format: 'umd',
      name: 'htmxClientRoutes',
      sourcemap: true,
      globals: {
        'htmx.org': 'htmx'
      }
    },
    external: ['htmx.org'],
    plugins: [
      typescript({
        tsconfig: 'tsconfig.npm.json',
        useTsconfigDeclarationDir: true
      }),
      terser()
    ]
  }
];
