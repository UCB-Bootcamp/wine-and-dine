  // DOM VARIABLES GO HERE
var wineSelectorEl = document.querySelector('#wineSelector'); 
var mainEl = document.querySelector('#main');
var headerEl = document.querySelector('#header');


 // Initializing the DOM Form functions for Materialize (DROP DOWNS)
 // THERE IS A VARIABLE BUG WITH THE VANILLA JS, JQUERY ADDED
document.addEventListener('DOMContentLoaded', function() {
	var selectElems = document.querySelectorAll('select');
//	var selectInstances = M.FormSelect.init(selectElems, options);
	var collapseElems = document.querySelectorAll('.collapsible');
//	var collapseInstances = M.Collapsible.init(collapseElems, options);
});

// Initializing the DOM Form functions for Materialize (JQuery)
$(document).ready(function(){
	$('select').formSelect();
	$('.collapsible').collapsible()
});

//create a function to remove all html elements except the footer
var removeExistingElems = function() {
	//console.log('blah');
  headerEl.innerHTML = '';
	mainEl.innerHTML = '';
}

wineSelectorEl.addEventListener('change', removeExistingElems);

//create a function to generate the the food card, description


//create something to display the 3 options to the right