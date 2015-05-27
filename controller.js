'use strict';

/* Controllers */

// var marvelApp = angular.module('marvelApp', []);

// marvelApp.controller('MarvelCtrl', ['$scope', '$http', function($scope, $http) {
//   $http.get('http://gateway.marvel.com/v1/public/comics?apikey=aeb7fee968a38b3f8b95d79971180723').success(function(data) {
//     $scope.phones = data;
//     console.log($scope.phones);
//   });
// }]);

var myApp = angular.module('myApp', ['infinite-scroll', 'ngMaterial']);

myApp.controller('DemoController', function($scope, Reddit) {
  $scope.reddit = new Reddit();
});

// Reddit constructor function to encapsulate HTTP and pagination logic
myApp.factory('Reddit', function($http) {
  var Reddit = function() {
    this.copyright = {};
    this.items = [];
    this.busy = false;
    this.after = 0;
  };

  Reddit.prototype.nextPage = function() {
    if (this.busy) return;
    this.busy = true;

    var url = 'http://gateway.marvel.com/v1/public/characters?orderBy=modified&offset=' + this.after + '&apikey=aeb7fee968a38b3f8b95d79971180723';
    $http.get(url).success(function(data) {
      // console.log(data);
      this.copyright = {
        attributionText: data.attributionText
      };
      var items = data.data.results;
      for (var i = 0; i < items.length; i++) {
        this.items.push(items[i]);
      }
      this.after = this.after + data.data.limit;
      this.busy = false;
    }.bind(this));
  };
  return Reddit;
});