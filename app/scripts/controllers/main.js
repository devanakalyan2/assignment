'use strict';


angular.module('assignmentApp')
  .controller('MainCtrl',['$http','$window','countryService','statesService', function ($http,$window,countryService,statesService) {

//Descendant scope varibles
	this.countryData;
	this.statesData;
	this.noDataAvailable = false;
	this.showStatesData = false;
	this.loadingData = true;
//to prevent scope confict inside http function / regular functions  
	var main = this;  

//Function to hide loading icon
	this.showHideLoadIcon = function(state){
		main.loadingData = state;
	};	

//code to get country data
	countryService
		.success(function(data){
			main.countryData = data.RestResponse.result;
			main.showHideLoadIcon(false);
		})
		.error(function(err){
			main.showHideLoadIcon(false);
			main.noDataAvailable = true;
		});

//code to get state data on click event

	this.getStates = function(alphaCode){

		$window.scrollTo(0,0); // scroll to top of the page
		this.showHideLoadIcon(true); //show the loading icon until response is got
		main.noDataAvailable = false; // hide the error message

		statesService.fetchStatesData(alphaCode)

			.success(function(data){
				main.showHideLoadIcon(false); // hide the loading icon 
			//check to see if there is states data for a particular country.
				if(data.RestResponse.result.length){
				main.statesData = data.RestResponse.result;	//parse and assign data for angular to populate
				main.showStatesData = true; //show the states table
				}
				else{
					main.statesData = ""; //reset the data variable					
					main.noDataAvailable = true; //show the alert box
					main.showStatesData = false; // hide the statesTable if there is no data
				}
				
			})
			
			.error(function(err){
				main.showHideLoadIcon(false);
				main.noDataAvailable = true;
				main.showStatesData = false; 
			});
	};

  }]);
