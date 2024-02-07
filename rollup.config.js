import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: './public/Assets/js/index.js',
  output: {
    dir: 'bundle',
    format: 'iifa'
  },
  plugins: [nodeResolve()]
};