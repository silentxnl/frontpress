angular.module("frontpress").config(frontpressConfig);

function frontpressConfig($interpolateProvider, $httpProvider, $urlRouterProvider, $locationProvider, BlogApiProvider, PostsApiProvider, $FrontpressProvider, $compileProvider){
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $locationProvider.html5Mode(true);
    $FrontpressProvider.configure.load();
    $compileProvider.debugInfoEnabled(false);
}
