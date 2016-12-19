(function () {

    angular
        .module('book.controllers', [])
        .controller('BookController', BookController)

    BookController.$inject = ['bookFactory', '$scope', '$routeParams'];

    function BookController(bookFactory, $scope, $routeParams) {

        getBooks();

        var idAuthor = $routeParams.id;

        function getBooks() {
            return bookFactory.getBooks()
                .then(function (data) {
                    $scope.books = data;
                    return $scope.books;
                });
        }
        $scope.getBookById = function (id) {
            return bookFactory.getBookById(id)
                .then(function (data) {
                    $scope.authorById = data;
                });
        }
        $scope.saveBook = function (book) {
            var created = new Date();
            var id = parseInt(Math.random() * (100 - 1) + 100);

            $scope.book = {
                'author': {
                    'id': id,
                    'name': book.name,
                    'nationality': book.nationality,
                    'created': created
                }
            };

            bookFactory.saveBook($scope.book)
                .then(function (data) {
                    alert("The author was added!!");
                })
                .catch(function (data) {
                    $scope.errorSave = data;
                    alert('The author couldnt save!!');
                })
        }

        $scope.updateBook = function (author) {
            var updated = new Date();

            $scope.book = {
                'author': {
                    'name': book.name,
                    'nationality': book.nationality,
                    'updated': updated
                }
            }
            bookFactory.updateAuthor($scope.book)
                .then(function (data) {
                    alert("The author was updated!!");
                })
                .catch(function (data) {
                    $scope.errorUpdate = data;
                    alert('The author couldnt updated!!');
                })
        }

        $scope.deleteBook = function (book) {
            $scope.book = {
                'author': {
                    'id': book.id
                }
            }
            bookFactory.deleteBook($scope.book)
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
