'use strict';

angular.module('myApp.cinema', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/cinema', {
            templateUrl: 'view/cinema.html',
            controller: 'CinemaController'
        });
    }])

    .controller('CinemaController', function($scope, localStorageService) {

        const emptyMovie = {
            title: '',
            country: '',
            genre: '',
            poster: '',
            description: '',
            comments: []
        };

        $scope.movie = Object.assign({}, emptyMovie);

        $scope.films = localStorageService.get('films') || [];

        $scope.isAddMovieMenuOpened = false;

        $scope.toggleAddMovieMenu = function() {
            $scope.isAddMovieMenuOpened = !$scope.isAddMovieMenuOpened;
        };

        $scope.saveMovie = function() {
            const film = Object.assign({}, $scope.movie, {id: uuidv1()});
            $scope.films.push(film);
            localStorageService.set('films', $scope.films);
            $scope.isAddMovieMenuOpened = false;
            $scope.movie = Object.assign({}, emptyMovie);
        };

        $scope.removeMovie = function(id) {
            const toDelete = $scope.films.filter(film => film.id === id);
            const toDeleteIndex = $scope.films.indexOf(toDelete[0]);
            $scope.films.splice(toDeleteIndex, 1);
            localStorageService.set('films', $scope.films);
        };

        $scope.editMovie = function(id) {
            const toEdit = $scope.films.filter(film => film.id === id);
            const toEditIndex = $scope.films.indexOf(toEdit[0]);
            $scope.isAddMovieMenuOpened = true;
            $scope.movie = Object.assign({}, toEdit[0]);
            $scope.films.splice(toEditIndex, 1);
            localStorageService.set('films', $scope.films);
        };

        $scope.addComment = function(id, comment) {
            const toComment = $scope.films.filter(film => film.id === id);
            const toCommentIndex = $scope.films.indexOf(toComment[0]);
            $scope.films[toCommentIndex].comments.push(comment);
            localStorageService.set('films', $scope.films);
        }
    });