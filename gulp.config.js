(module.exports = function() {
    var jsFiles = ['*.js', 'src/**/*.js'];
    var config = {
      jsFiles: jsFiles,
      wiredepOptions: {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
      },
      injectSrc: ['./public/css/*.css', './public/js/*.js'],
      injectOptions: {
        ignorePath: '/public'
      },
      nodemonOptions: {
        script: 'app.js',
        delayTime: 1,
        env: {
          'PORT': 7000
        },
        watch: jsFiles
      }
    };
    return config;
});
