(function () {

    angular
        .module('author.controllers', [])
        .controller('AuthorController', AuthorController)

    AuthorController.$inject = ['authorFactory', '$scope', '$routeParams'];

    function AuthorController(authorFactory, $scope, $routeParams) {

        getAuthors();

        var idAuthor = $routeParams.id;

        function getAuthors() {
            return authorFactory.getAuthors()
                .then(function (data) {
                    $scope.authors = data;
                    return $scope.authors;
                });
        }
        $scope.getAuthorById = function(id) {
            return authorFactory.getAuthorById(id)
                .then(function(data) {
                    $scope.authorById = data;
                });
        }
        $scope.saveAuthor = function(author) {
            var created = new Date();
            var id = parseInt(Math.random() * (100 - 1) + 100);

            $scope.author = {
                'author': {
                    'id': id,
                    'name': author.name,
                    'nationality': author.nationality,
                    'created': created
                }             
            };

            authorFactory.saveAuthor($scope.author) 
                .then(function(data) {
                    alert("The author was added!!");
                })
                .catch(function (data) {
                    $scope.errorSave = data;
                    alert('The author couldnt save!!');
                })
        }
        
        $scope.updateAuthor = function(author) {
            var updated = new Data();

            $scope.author = {
                'author': {
                    'name': author.name,
                    'nationality': author.nationality,
                    'updated': updated
                }      
            }
            authorFactory.updateAuthor($scope.author)
                .then(function (data) {
                    alert("The author was updated!!");
                })
                .catch(function (data) {
                    $scope.errorUpdate = data;
                    alert('The author couldnt updated!!');
                })
        }

        $scope.deleteAuthor = function (author) {
            $scope.author = {
                'author': {
                    'id': author.id
                }
            }
            authorFactory.deleteAuthor($scope.author)
                .then(function (data) {
                    alert('The author was deleted!!')
                })
                .catch(function (data) {
                    $scope.errorDelete = data;
                    alert('The author couldnt deleted!!');
                })
        }
    }

})();
