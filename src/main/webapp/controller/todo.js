var todoModulo = angular.module('todoModulo', []);

todoModulo.controller("todoController", function($scope, $http) {

	urlTodo = 'http://localhost:8080/ProjetoToDoMVC/rest/todo';

	$scope.showAll = function() {

		$http.get(urlTodo).then(sucessCallback, errorCalback);

		function sucessCallback(todos) {
			$scope.todos = todos.data;
		}

		function errorCalback(error) {
			alert(error);
		}

	}

	$scope.clearCompleted = function() {
		$http.delete(urlTodo).then(sucessCallback, errorCalback);

		function sucessCallback() {
			$scope.showAll();
		}

		function errorCalback(error) {
			alert(error);
		}
	}

	$scope.addTodo = function() {

		$http.post(urlTodo, $scope.newTodo).then(sucessCallback, errorCalback);

		function sucessCallback() {

			$scope.todos.push($scope.newTodo);
			$scope.showAll();
			$scope.newTodo = null;
		}

		function errorCalback(error) {
			alert(error);
		}

	}

	$scope.removeTodo = function(todo) {
		$http.delete(urlTodo + '/' + todo.id).then(sucessCallback, errorCalback);

		function sucessCallback() {
			$scope.showAll();
		}

		function errorCalback(error) {
			alert(error);
		}
	}


	$scope.toggleCompleted = function(todo) {
		$http.put(urlTodo, todo).then(sucessCallback, errorCalback);

		function sucessCallback() {
			$scope.showAll();
		}

		function errorCalback(error) {
			alert(error);
		}

	}

	$scope.showAll();

});