(function () {
    'use strict';

    angular
        .module('book.services', [])
        .factory('bookFactory', bookFactory)

    bookFactory.$inject = ['$http', '$q', '$rootScope'];

    function bookFactory($http, $q, $rootScope) {
        return {
            getBooks: getBooks,
            getBookById: getBookById,
            saveBook: saveBook,
            updateBook: updateBook,
            deleteBook: deleteBook
        };


        function getBooks() {
            return $http.get('http://54.186.35.55:3004/books')
                .then(getBooksComplete);

            function getBooksComplete(response) {
                return response.data;
            }
        }
        function getBookById(idAuthor) {

            var defered = $q.defered;
            var promise = defered.promise;

            getAuthors()
                .then(getBookByIdComplete)
                .catch(getBookByIdFailed);

            function getBookByIdComplete(response) {

                var results = response.filter(function (elem) {
                    return elem.id === parseInt(idBook);
                });

                if (results.length > 0) {
                    defered.resolve(results);
                } else {
                    defered.reject();
                }
            }
            function getBookByIdFailed(e, status) {
                var newMessage = "The request failed with reponse" + e + "and status code: " + status;

                return $q.reject(newMessage);
            }
            return defered.promise;
        }
        function saveBook(book) {

            var defered = $q.defer;
            var promise = defered.promise;

            $http({
                method: 'POST',
                url: 'http://54.186.35.55:3004/books',
                data: $.param(book),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(function saveBookComplete(data, status) {
                if (status === 200) {
                    defered.resolve(data);
                } else {
                    defered.reject();
                }
            }, function saveBookFailed(e, status) {
                var newMessage = "The request failed with reponse" + e + "and status code: " + status;

                return $q.reject(newMessage);

            });

            return defered.promise;
        }
        function updateBook(book) {
            var defered = $q.defer;
            var promise = defered.promise;

            $http({
                method: 'PUT',
                url: 'http://54.186.35.55:3004/books',
                data: $.param(book),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .success(updateBookComplete)
            .error(updateBookFailed);

            function updateBookComplete(data, status) {
                if (status === 200) {
                    defered.resolve(data);
                } else {
                    defered.reject();
                }
            }
            function updateBookFailed(data) {
                var newMessage = "The request failed with reponse" + e + "and status code: " + status;

                return $q.reject(newMessage);
            }
            return defered.promise;
        }

        function deleteBook(book) {
            var defered = $q.defer;
            var promise = defered.promise;

            $http({
                method: 'DELETE',
                url: 'http://54.186.35.55:3004/authors/' + book.book.id,
                data: $.param(author),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(deleteBookComplete)
            .error(deleteBookFailed);

            function deleteBookComplete(data, status) {
                if (status === 200) {
                    defered.resolve(data);
                } else {
                    defered.reject();
                }
            }
            function deleteBookFailed(data) {
                var newMessage = "The request failed with reponse" + e + "and status code: " + status;

                return $q.reject(newMessage);
            }
            return defered.promise;
        }
    }
})();