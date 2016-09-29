//Service to get country Data;

(function(){
	angular.module('assignmentApp').service('statesService', function($http){
	this.fetchStatesData =  function(code){
		return $http.get('http://services.groupkt.com/state/get/'+code+'/all');
	};
});
})();