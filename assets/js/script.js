  // DOM VARIABLES GO HERE




 // Initializing the DOM Form functions for Materialize (DROP DOWNS ETC)
document.addEventListener('DOMContentLoaded', function() {
	var elems = document.querySelectorAll('select');
	var instances = M.FormSelect.init(elems, options);
});

// Initializing the DOM Form functions for Materialize (JQuery)
$(document).ready(function(){
	$('select').formSelect();
});
        