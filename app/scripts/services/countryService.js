//Service to get country Data;

(function(){
	angular.module('assignmentApp').factory('countryService', function($http){
	return $http.get('http://services.groupkt.com/country/get/all');
});
})();