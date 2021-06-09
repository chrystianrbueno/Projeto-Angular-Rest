var todoModulo = angular.module('todoModulo', []);

todoModulo.controller("todoController", function($scope, $http){
	urlTodo = 'http://localhost:8080/ProjetoToDoMVC/rest/todo';
	$scope.listarTodos = function() {

		$http.get(urlTodo).then(sucessCallback, errorCalback);

		function sucessCallback(todos) {
			$scope.todos = todos.data;
			console.log(todos);
		}

		function errorCalback(error) {
			alert(error);
		}

	}
	
	$scope.listarTodos();

});