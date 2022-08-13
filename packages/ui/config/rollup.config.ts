import { transform as formatjsTransform } from '@formatjs/ts-transformer';
import type { RollupOptions } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import packageJson from '../package.json';

const external = Object.keys(packageJson.dependencies)
  .concat(Object.keys(packageJson.peerDependencies))
  .concat(['react/jsx-runtime']);

const config: RollupOptions = {
  input: './src/index.tsx',
  treeshake: true,
  output: {
    dir: './dist',
    format: 'esm',
  },
  external: external,
  plugins: [
    typescript({
      transformers: [
        () => ({
          before: [
            formatjsTransform({
              overrideIdFn: '[sha512:contenthash:base64:6]',
              ast: true,
            }),
          ],
        }),
      ],
    }),
  ],
};

export default config;
