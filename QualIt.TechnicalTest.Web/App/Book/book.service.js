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

        /**
        * Obtiene todos los libros de la libreria 
        */
        function getBooks() {
            return $http.get('http://54.186.35.55:3004/books.json')
                .then(getBooksComplete);

            function getBooksComplete(response) {
                return response.data;
            }
        }
        /**
        * Obtiene todos los libros de la libreria por id del Author
        */
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
            .success(saveBookComplete)
            .catch(saveBookFailed);

            function saveBookComplete(data) {
                if (data.status === 201) {
                    defered.resolve(data);
                } else {
                    defered.reject();
                }
            }
            function saveBookFailed(data) {
                var newMessage = "The request failed with reponse" + e + "and status code: " + status;

                return $q.reject(newMessage);
            }

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
            .catch(updateBookFailed);

            function updateBookComplete(data) {
                if (data.status === 200) {
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
                url: 'http://54.186.35.55:3004/books/' + book.book.id,
                data: $.param(book),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .success(deleteBookComplete)
            .catch(deleteBookFailed);

            function deleteBookComplete(data) {
                if (data.status === 200) {
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