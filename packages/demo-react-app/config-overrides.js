/**
 * Adds typescript and relay support to CRA 2+ via react-app-rewire.
 * 
 * Expects:
 *   "devDependencies": {
 *     "@babel/preset-typescript": "7.0.0-beta.46",
 *     "babel-plugin-relay": "1.7.0-rc.1"
 *   }
 */

module.exports = function override(config, env) {
  config.resolve.extensions = ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx', '.ts', '.tsx'];

  const oneOf = config.module.rules.find(x => x.oneOf).oneOf;

  const babelLoader = oneOf.find(x => x.include && x.loader.indexOf('babel-loader') > -1);

  babelLoader.test = /\.(js|jsx|mjs|ts|tsx)$/;
  babelLoader.options.presets = [[require.resolve('babel-preset-react-app'), {flow: false}], [require.resolve('@babel/preset-typescript')]];
  babelLoader.options.plugins.push([
    require.resolve('babel-plugin-relay'),
    {
      artifactDirectory: './src/__generated__',
    },
  ]);

  const lastOneOf = oneOf.pop();
  // mjs files in node_modules
  oneOf.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: 'javascript/auto',
  });
  oneOf.push(lastOneOf);

  // console.log(JSON.stringify(config, null, 2));
  // throw 'exit'

  return config;
};
