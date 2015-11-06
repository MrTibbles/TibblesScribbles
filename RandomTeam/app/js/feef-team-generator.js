//Tibbles Scribbles | Feef Team Generator
angular.module('FeefTeamGenerator', [])
	.controller('feefTeamController', ['$scope', '$http', function feefTeamController($scope, $http) {
  	
  	$http.get('rest/teams.json')
  		.success(function(data) {
  		  $scope.teams = data;
  		  $scope.teamLength = data.length - 1;

  		  for (var i = $scope.teamLength; i >= 0; i -= 1) {
  		    console.info($scope.teams[i]);
  		  }
  		})
  		.error(function(data) {
  		  console.log('Error: ' + data);
  		});

  		$scope.getTeam = function(e) {
  			var randNum = Math.floor(Math.random() * $scope.teamLength);
  			$scope.generatedTeam = {
  				name: $scope.teams[randNum].teamName,
  				rating: $scope.teams[randNum].rating,
  			}
  		};

	}]);