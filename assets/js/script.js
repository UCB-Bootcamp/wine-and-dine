  // DOM VARIABLES GO HERE
var wineSelectorEl = document.querySelector('#wineSelector'); 
var mainEl = document.querySelector('#main');
var headerEl = document.querySelector('#header');
var selectedWineOption = wineSelectorEl.options[wineSelectorEl.selectedIndex].text;
var selectedOptionVal = wineSelectorEl.value;
console.log(selectedWineOption);

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

wineSelectorEl.addEventListener('change', function() {
	removeExistingElems();
	wineCardGenerator();

});

//create a function to generate the food card and description
var wineCardGenerator = function() {
	var wineCardContainer = document.createElement('div');
	wineCardContainer.innerHTML = `<div class="container">
	<div class="row">
			<div class="col s12 m5">
					<div class="row">
							<div class="col s12">
									<div class="card">
											<div class="card-image">
													<img src="./assets/images/sample-1.jpg">
													<span class="card-title">` + selectedWineOption + `</span>
											</div>
											<div class="card-content">
													<div class ="row">
															<div class="col s6">
																	<h4>I will be the Info</h4>
																	<p>I am a very simple card. I am good at containing small bits of information.
																	I am convenient because I require little markup to use effectively.</p>
															</div>
															<div class="col s6">
																	<h4>I will be the Rating</h4>
																	<p>I am a very simple card. I am good at containing small bits of information.
																	I am convenient because I require little markup to use effectively.</p>
															</div>
													</div>
											</div>
											<div class="card-action">
													<a href="#">This is a link</a>
											</div>
									</div>
							</div>
					</div>
			</div>
			<div class="col s12 m7">
					<ul class="collapsible">
							<li>
									<div class="collapsible-header">
											<i class="material-icons">filter_drama</i>First
									</div>
									<div class="collapsible-body">
											<span>Lorem ipsum dolor sit amet.</span>
									</div>
							</li>
							<li>
									<div class="collapsible-header">
											<i class="material-icons">place</i>Second
									</div>
									<div class="collapsible-body">
											<span>Lorem ipsum dolor sit amet.</span>
									</div>
							</li>
							<li>
									<div class="collapsible-header">
											<i class="material-icons">whatshot</i>Third
									</div>
									<div class="collapsible-body">
											<span>Lorem ipsum dolor sit amet.</span>
									</div>
							</li>
					</ul>
			</div>
	</div>
</div>`;
	mainEl.appendChild(wineCardContainer);
}

//create something to display the 3 options to the right