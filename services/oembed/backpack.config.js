/* eslint-disable no-param-reassign */

module.exports = {
  webpack: (config, options, webpack) => { // eslint-disable-line no-unused-vars
    config.externals = [config.externals];
    config.externals.push((ctx, request, callback) => {
      if (/^\.\.\/config/.test(request)) {
        return callback(null, request);
      }
      return callback();
    });
    return config;
  },
};
