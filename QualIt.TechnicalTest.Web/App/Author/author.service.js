(function () {
    'use strict';

    angular
        .module('author.services', [])
        .factory('authorFactory', authorFactory)

    authorFactory.$inject = ['$http', '$q', '$rootScope'];

    function authorFactory($http, $q, $rootScope) {
        return {
            getAuthors: getAuthors,
            getAuthorById: getAuthorById,
            saveAuthor: saveAuthor,
            updateAuthor: updateAuthor,
            deleteAuthor: deleteAuthor
        };

        
        function getAuthors() {
            return $http.get('http://54.186.35.55:3004/authors.json')
                .then(getAuthorsComplete);

            function getAuthorsComplete(response) {
                return response.data;
            }
        }
        function getAuthorById(idAuthor) {

            var defered = $q.defered;
            var promise = defered.promise;

            getAuthors()
                .then(getAuthorByIdComplete)
                .catch(getAuthorByIdFailed);

            function getAuthorByIdComplete(response) {
                
                var results = response.filter(function (elem) {
                    return elem.id === parseInt(idAuthor);
                });

                if (results.length > 0) {
                    defered.resolve(results);
                } else {
                    defered.reject();
                }
            }
            function getAuthorByIdFailed(e, status) {
                var newMessage = "The request failed with reponse" + e + "and status code: " + status;

                return $q.reject(newMessage);
            }
            return defered.promise;
        }
        function saveAuthor(author) {

            var defered = $q.defer;
            var promise = defered.promise;

            $http({
                method: 'POST',
                url: 'http://54.186.35.55:3004/authors',
                data: $.param(author),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .success(saveAuthorComplete)
            .catch(saveAuthorFailed);

            function saveAuthorComplete(data) {
                if (data.status === 201) {
                    defered.resolve(data);
                } else {
                    defered.reject();
                }
            }
            function saveAuthorFailed(data) {
                var newMessage = "The request failed with reponse" + e + "and status code: " + status;

                return $q.reject(newMessage);
            }
            
            return defered.promise;
        }
        function updateAuthor(author) {
            var defered = $q.defer;
            var promise = defered.promise;

            $http({
                method: 'PUT',
                url: 'http://54.186.35.55:3004/authors',
                data: $.param(author),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .success(updateAuthorComplete)
            .catch(updateAuthorFailed);

            function updateAuthorComplete(data) {
                if (data.status === 200) {
                    defered.resolve(data);
                } else {
                    defered.reject();
                }
            }
            function updateAuthorFailed(data) {
                var newMessage = "The request failed with reponse" + e + "and status code: " + status;

                return $q.reject(newMessage);
            }
            return defered.promise;
        }

        function deleteAuthor(author) {
            var defered = $q.defer;
            var promise = defered.promise;

            $http({
                method: 'DELETE',
                url: 'http://54.186.35.55:3004/authors/' + author.author.id,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .success(deleteAuthorComplete)
            .catch(updateAuthorFailed);

            function deleteAuthorComplete(data, status) {
                if (data.status === 200) {
                    defered.resolve(data);
                } else {
                    defered.reject();
                }
            }
            function updateAuthorFailed(data) {
                var newMessage = "The request failed with reponse" + e + "and status code: " + status;

                return $q.reject(newMessage);
            }
            return defered.promise;
        }
    }
})();