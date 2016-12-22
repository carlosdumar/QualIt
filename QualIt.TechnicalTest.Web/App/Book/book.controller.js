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
                'book': {
                    'title': book.title,
                    'description': book.description,
                    'image': book.image,
                    'created_at': created
                }
            };

            bookFactory.saveBook($scope.book)
                .then(function (data) {
                    alert("The book was added!!");
                })
                .catch(function (data) {
                    $scope.errorSave = data;
                    alert('The book couldnt save!!');
                })
        }

        $scope.updateBook = function (book) {
            var updated = new Date();

            $scope.book = {
                'book': {
                    'title': book.title,
                    'description': book.description,
                    'image': book.image,
                    'updated_at': updated
                }
            }
            bookFactory.updateAuthor($scope.book)
                .then(function (data) {
                    alert("The book was updated!!");
                })
                .catch(function (data) {
                    $scope.errorUpdate = data;
                    alert('The book couldnt updated!!');
                })
        }

        $scope.deleteBook = function (book) {
            $scope.book = {
                'book': {
                    'id': book.id
                }
            }
            bookFactory.deleteBook($scope.book)
                .then(function (data) {
                    alert('The book was deleted!!')
                })
                .catch(function (data) {
                    $scope.errorDelete = data;
                    alert('The book couldnt deleted!!');
                })
        }
    }

})();
