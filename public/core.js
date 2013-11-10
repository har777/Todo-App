var todoApp = angular.module('TodoApp', []);

function mainController($scope, $http){
  $scope.formData = {};
  
  //show all todos on landing
  
  $scope.initialize = function(){
    $http.get('/api/todos')
    .success(function(data){
      $scope.todos = data;
      console.log(data);
    })
    .error(function(data){
      console.log('Error : ' + data);
    });
  };

  //add todo
  
  $scope.createTodo = function(){
    $http.post('/api/todos', $scope.formData)
    .success(function(data){
      $('input').val('');
      $scope.todos = data;
      console.log(data);
    })
    .error(function(data){
      console.log('Error : ' + data);
    });
  };

  //delete todo
  
  $scope.deleteTodo = function(id){
    $http.delete('/api/todos/' + id)
    .success(function(data){
      $scope.todos = data;
      console.log(data);
    })
    .error(function(data){
      console.log('Error : ' + data);
    });
  };


}