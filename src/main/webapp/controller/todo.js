todoModulo = angular.module('todoModulo', []);

todoModulo.controller("todoController", function($scope, $http, $filter) {

	urlTodo = 'http://localhost:8080/ProjetoToDoMVC/rest/todo';

	var todoName = '';
	var flagActives = false;
	var flagCompletes = false;
	var flagshowAll = false;
	var flagReverse = false;

	//SELECT
	$scope.showAll = function() {

		$http.get(urlTodo).then(sucessCallback, errorCalback);
		document.getElementById('toggle-all').checked = $scope.allChecked = true;

		function sucessCallback(todos) {

			$scope.listTodos = $scope.todos = todos.data;
			$scope.remainingCount = $filter('filter')($scope.todos, { status: false }).length;

			if ($scope.remainingCount == $scope.todos.length) {

				$scope.completedCount = false;

			} else {

				$scope.completedCount = true;

			}

			angular.forEach($scope.todos, function(verificaStatus, key) {

				if (verificaStatus.status == false) {

					document.getElementById('toggle-all').checked = $scope.allChecked = false;
					keepGoing = false;

				}
			});

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

		if ( $scope.newTodo != undefined && $scope.newTodo.trim()) {

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
	$scope.updateTodo = function(todo) {

		$http.put(urlTodo, todo).then(sucessCallback, errorCalback);

		function sucessCallback() {

			$scope.showAll();

		}

		function errorCalback(error) {

			alert(error);

		}

	}

	$scope.markAll = function() {

		$scope.allChecked = !($scope.allChecked);

		$http.put(urlTodo + '/allChecked/' + $scope.allChecked).then(sucessCallback, errorCalback);

		function sucessCallback() {

			document.getElementById('toggle-all').checked = $scope.allChecked;
			$scope.showAll();

		}

		function errorCalback(error) {

			alert(error);

		}

	}

	//REMOVE
	$scope.clearCompleted = function() {

		$http.delete(urlTodo).then(sucessCallback, errorCalback);

		function sucessCallback() {

			if (((($scope.listTodos.length - $scope.todos.length) == 0) || ($scope.listTodos.length - $scope.todos.length) == $scope.listTodos.length)) {

				$scope.showAllTodos();

			}

			$scope.showAll();

		}

		function errorCalback(error) {

			alert(error);

		}
	}

	$scope.removeTodo = function(todo) {

		$http.delete(urlTodo + '/' + todo.id).then(sucessCallback, errorCalback);

		function sucessCallback() {


			if (($scope.listTodos.length) == 1) {
				$scope.showAllTodos();
			}

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

	$scope.revertEdits = function(todo) {

		flagReverse = true;
		$scope.saveEdits(todo, 'submit');
		flagReverse = false;

	}

	$scope.saveEdits = function(updatedTodo, event) {

		if (!(flagReverse)) {
			if (updatedTodo.todo == '' || !updatedTodo.todo.trim()) {
				$scope.removeTodo(updatedTodo);
			}else if ((todoName != updatedTodo.todo)) {
				$scope.updateTodo(updatedTodo);
			}
		}

		$scope.showAll();

	}


	$scope.showAllTodos = function() {

		$scope.todos = $scope.listTodos;
		flagshowAll = true;
		flagActives = false;
		flagCompletes = false;
		$scope.selectedShowAll = true;
		$scope.selectedShowActive = false;
		$scope.selectedShowCompleted = false;

	}

	$scope.showActiveTodos = function() {

		$scope.todos = $filter('filter')($scope.listTodos, { status: false });
		flagshowAll = false;
		flagActives = true;
		flagCompletes = false;
		$scope.selectedShowAll = false;
		$scope.selectedShowActive = true;
		$scope.selectedShowCompleted = false;

	}

	$scope.showCompletedTodos = function() {

		$scope.todos = $filter('filter')($scope.listTodos, { status: true });
		flagshowAll = false;
		flagActives = false;
		flagCompletes = true;
		$scope.selectedShowAll = false;
		$scope.selectedShowActive = false;
		$scope.selectedShowCompleted = true;

	}


	$scope.showAll();

});

todoModulo.directive('todoEscape', function() {

	'use strict';

	var ESCAPE_KEY = 27;

	return function(scope, elem, attrs) {
		elem.bind('keydown', function(event) {
			if (event.keyCode === ESCAPE_KEY) {
				scope.$apply(attrs.todoEscape);
			}
		});

		scope.$on('$destroy', function() {
			elem.unbind('keydown');
		});
	};
});

todoModulo.directive('todoFocus', function todoFocus($timeout) {
	'use strict';

	return function(scope, elem, attrs) {
		scope.$watch(attrs.todoFocus, function(newVal) {
			if (newVal) {
				$timeout(function() {
					elem[0].focus();
				}, 0, false);
			}
		});
	};
});