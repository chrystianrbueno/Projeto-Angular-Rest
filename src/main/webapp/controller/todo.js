var todoModulo = angular.module('todoModulo', []);

todoModulo.controller("todoController", function($scope, $http, $filter) {

	urlTodo = 'http://localhost:8080/ProjetoToDoMVC/rest/todo';

	var todoName = '';
		
	$scope.showAll = function() {

		$http.get(urlTodo).then(sucessCallback, errorCalback);

		function sucessCallback(todos) {
			$scope.listTodos = $scope.todos = todos.data;
			$scope.remainingCount = $filter('filter')($scope.todos, { status: false }).length;
			if ($scope.remainingCount == $scope.todos.length) {
				$scope.completedCount = false;
			} else {
				$scope.completedCount = true;
			}
		}

		function errorCalback(error) {
			alert(error);
		}

	}

	$scope.showAllTodos = function() {
		$scope.todos = $scope.listTodos;
	}

	$scope.showActiveTodos = function() {
		$scope.todos = $filter('filter')($scope.listTodos, { status: false});
	}

	$scope.showCompletedTodos = function() {
		$scope.todos = $filter('filter')($scope.listTodos, { status: true });
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
		if (!($scope.newTodo == undefined)) {
			$http.post(urlTodo, $scope.newTodo).then(sucessCallback, errorCalback);

			function sucessCallback() {
				$scope.saving = false;
				$scope.todos.push($scope.newTodo);
				$scope.showAll();
				$scope.newTodo = null;
			}

			function errorCalback(error) {
				alert(error);
			}

			$scope.saving = false;
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

	$scope.editTodo = function(todo) {
		$scope.editedTodo = todo;
		todoName = todo.todo;
		// Clone the original todo to restore it on demand.
	};

	$scope.saveEdits = function(updatedTodo, event) {
		// Blur events are automatically triggered after the form submit event.
		// This does some unfortunate logic handling to prevent saving twice.


		if (event === 'blur' && $scope.saveEvent === 'submit') {
			$scope.saveEvent = null;
			return;
		}

		$scope.saveEvent = event;
		if (todoName == updatedTodo.todo || updatedTodo.todo == '') {
			$scope.showAll();
		} else {
			$scope.toggleCompleted(updatedTodo);
		}

	};

	$scope.showAll();

});