/**
 * Adds typescript and relay support to CRA 2+ via react-app-rewire.
 * 
 * Expects:
 *   "devDependencies": {
 *     "@babel/preset-typescript": "7.0.0-beta.46",
 *     "babel-plugin-relay": "1.7.0-rc.1"
 *   }
 */

function findParentOfBabelLoader(rules) {
  return rules.find(findBabelLoaderInRule);
}

function findBabelLoaderInRule(rule) {
  if (rule.use) {
    return rule.use.find(x => x.options && x.options.babelrc !== undefined && x.options.presets);
  }
}

module.exports = function override(config, env) {
  config.resolve.extensions = ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx', '.ts', '.tsx'];

  const oneOf = config.module.rules.find(x => x.oneOf).oneOf;
  const parentOfBabelLoader = findParentOfBabelLoader(oneOf);
  const babelLoader = findBabelLoaderInRule(parentOfBabelLoader);

  parentOfBabelLoader.test = /\.(js|jsx|mjs|ts|tsx)$/;
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

  return config;
};
