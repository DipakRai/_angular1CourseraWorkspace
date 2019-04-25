(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
  })

  // Premade list page
  .state('mainList', {
    url: '/main-list',
    templateUrl: 'src/templates/main-restaurantlist.template.html',
    controller: 'CategoriesController as mainList',
    resolve: {
      items: ['MenuSearchService', function (MenuSearchService) {
        return MenuSearchService.getAllCategories();
      }]
    }
  })

  .state('categoryDetail', {
    url: '/category-detail/{id}',
    templateUrl: 'src/templates/items.template.html',
    controller: "ItemsController as itemsList",
    resolve: {
    items: ['$stateParams','MenuSearchService',
            function ($stateParams,MenuSearchService) {
            var shortName = $stateParams.id
            console.dir('$stateParams.id='+$stateParams.id);
            return MenuSearchService.getItemsForCategory(shortName);
      }]
    }
  });

}

})();
