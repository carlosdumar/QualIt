(function () {
    angular.module('LibraryApp', ['ngRoute', 'book.controllers', 'book.services', 'author.controllers', 'author.services'])

    .config(config);

    function config($routeProvider, $locationProvider) {

        $routeProvider
            .when('/books', {
                templateUrl: '/App/Template/books.html',
                controller: 'BookController',
                controllerAs: 'BC'
            })
            .when('/authors', {
                templateUrl: '/App/Template/authors.html',
                controller: 'AuthorController',
                controllerAs: 'AC'
            });

        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
            });
    };
})();
