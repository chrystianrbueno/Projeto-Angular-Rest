var todoModulo = angular.module('todoModulo', []);

todoModulo.controller("todoController", function($scope, $http, $filter) {

	urlTodo = 'http://localhost:8080/ProjetoToDoMVC/rest/todo';

	var todoName = '';
	var flagActives = false;
	var flagCompletes = false;
	var flagshowAll = false;

	//SELECT
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

			if (flagCompletes) {
				$scope.showCompletedTodos();
			} else if (flagActives) {
				$scope.showActiveTodos();
			} else if (flagshowAll) {
				$scope.showAllTodos();
			}

		}

		function errorCalback(error) {
			alert(error);
		}

	}

	//INSERT
	$scope.addTodo = function() {
		if (!($scope.newTodo == undefined)) {
			$http.post(urlTodo, $scope.newTodo).then(sucessCallback, errorCalback);

			function sucessCallback() {
				$scope.saving = true;
				if ($scope.remainingCount == $scope.todos.length) {
					$scope.completedCount = false;
				} else {
					$scope.completedCount = true;
				}
				$scope.showAll();
				$scope.newTodo = null;
				$scope.saving = false;
			}

			function errorCalback(error) {
				alert(error);
			}

		}
	}

	//UPDATE
	$scope.todoCompleted = function(todo) {
		$http.put(urlTodo, todo).then(sucessCallback, errorCalback);

		function sucessCallback() {
			$scope.showAll();
		}

		function errorCalback(error) {
			alert(error);
		}

	}

	$scope.markAll = function(teste) {
		alert(teste);
		if ($scope.allChecked) {
			$http.put(urlTodo).then(sucessCallback, errorCalback);
			function sucessCallback() {
				$scope.showAll();
			}

			function errorCalback(error) {
				alert(error);
			}

		}

	}

	$scope.saveEdits = function(updatedTodo, event) {


		if (event === 'blur' && $scope.saveEvent === 'submit') {
			$scope.saveEvent = null;
			return;
		}

		$scope.saveEvent = event;
		if (todoName == updatedTodo.todo || updatedTodo.todo == '') {
			$scope.showAll();
		} else {
			$scope.todoCompleted(updatedTodo);
		}

	}

	//REMOVE
	$scope.clearCompleted = function() {
		$http.delete(urlTodo).then(sucessCallback, errorCalback);

		function sucessCallback() {
			$scope.showAll();
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

	//FUNCTIONS

	$scope.editTodo = function(todo) {
		$scope.editedTodo = todo;
		todoName = todo.todo;
	}

	$scope.showAllTodos = function() {
		$scope.todos = $scope.listTodos;
		flagshowAll = true;
		flagActives = false;
		flagCompletes = false;
	}

	$scope.showActiveTodos = function() {
		$scope.todos = $filter('filter')($scope.listTodos, { status: false });
		flagshowAll = false;
		flagActives = true;
		flagCompletes = false;
	}

	$scope.showCompletedTodos = function() {
		$scope.todos = $filter('filter')($scope.listTodos, { status: true });
		flagshowAll = false;
		flagActives = false;
		flagCompletes = true;
	}

	$scope.showAll();

});