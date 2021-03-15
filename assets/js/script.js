  // DOM VARIABLES GO HERE




 // Initializing the DOM Form functions for Materialize (DROP DOWNS)
 // THERE IS A VARIABLE BUG WITH THE VANILLA JS, JQUERY ADDED
document.addEventListener('DOMContentLoaded', function() {
	var selectElems = document.querySelectorAll('select');
	var selectInstances = M.FormSelect.init(selectElems, options);
	var collapseElems = document.querySelectorAll('.collapsible');
    var collapseInstances = M.Collapsible.init(collapseElems, options);
});

// Initializing the DOM Form functions for Materialize (JQuery)
$(document).ready(function(){
	$('select').formSelect();
	$('.collapsible').collapsible()
});
        