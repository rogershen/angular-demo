/* A module is a container for the different parts of the app (controllers, services, filters, directives, ...)
/* ngRoute is a dependency of demoApp */
/* The Angular injector subsystem is in charge of creating components, resolving their dependencies, and providing them to other components as requested. */
var demoApp = angular.module('demoApp', ['ngRoute']);

demoApp.controller('DemoController1', function DemoController1($scope) {
  $scope.template_text = "template_text";
  $scope.template_fn = function() { return "template_fn" };
});

demoApp.controller('DemoController2', function DemoController2($scope) {
  $scope.template_list = ["template_text1", "template_text2", "template_text3"];
});

demoApp.controller('DemoController3', function DemoController3($scope) {
  $scope.name = "None";
});

demoApp.controller('DemoController4', [ '$scope', 'DemoService' , function DemoController4($scope, DemoService) {
  $scope.data = [];
  $scope.getData = function() {
    var promise = DemoService.getData();
    promise.then(function(resp) {
      $scope.data = resp.data;
    },
    function(error) {
      console.log("something went wrong!");
    });
  };
}]);

demoApp.controller('DemoController5', [ '$scope', '$routeParams', function DemoController5($scope, $routeParams) {
  $scope.text = $routeParams.text;
}]);

/* The string '$http' in the list is used to tell Angular to dependency inject
$http into the function. The fn argument names are enough for Angular to discern,
but if this js file were ever to be minified those names would be gone.
The $ prefix is there to namespace Angular-provided services. */
demoApp.service("DemoService", [ '$http' , function($http) {
  this.getData = function() { return $http.get('data.json') };
}]);


/* Route config */
demoApp.config([ '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/demo/:text', {
        templateUrl : 'demo.html',
        controller : 'DemoController5'
    }).when('/demo', {
      templateUrl : 'demo.html',
      controller : 'DemoController5'
    }).otherwise({
        redirectTo : "/"
    });

    /* hashbang mode  /#!  */
    $locationProvider.html5Mode({
        enabled : false,
        requireBase : false
    });
} ]);
