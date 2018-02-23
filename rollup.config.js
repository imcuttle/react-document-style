/**
 * @file rollup.config
 * @author Cuttle Cong
 * @date 2018/2/23
 * @description
 */

import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import filesize from 'rollup-plugin-filesize'

const { BUILD_ENV, BUILD_FORMAT } = process.env

const config = {
  input: 'src/index.js',
  output: {
    name: 'reactDocumentStyle',
    globals: {
      'react-side-effect': 'withSideEffect',
      react: 'React'
    }
  },
  external: ['react', 'react-side-effect', 'prop-types'],
  plugins: [
    babel({
      babelrc: false,
      presets: ['react', ['env', { loose: true, modules: false }]],
      plugins: ['transform-object-rest-spread', 'transform-class-properties'],
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs({
      include: /node_modules/,
    }),
    filesize()
  ]
}

export default [
  Object.assign({}, config, {
    output: {
      ...config.output,
      file: 'lib/index.js',
      format: 'cjs',
    }
  }),
  Object.assign({}, config, {
    output: {
      ...config.output,
      file: 'lib/index.umd.js',
      format: 'umd',
      name: 'ReactDocumentStyle'
    }
  }),
  Object.assign({}, config, {
    output: {
      ...config.output,
      file: 'lib/index.es.js',
      format: 'es',
    }
  }),
  Object.assign({}, config, {
    output: {
      ...config.output,
      file: 'lib/index.umd.min.js',
      format: 'umd',
      name: 'ReactDocumentStyle'
    },
    plugins: config.plugins.concat(uglify())
  })
]
