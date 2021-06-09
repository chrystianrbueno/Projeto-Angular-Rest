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

	$scope.showAll();

});