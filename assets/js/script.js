// DOM VARIABLES GO HERE
const wineSelectorEl = document.querySelector('#wineSelector'); 
const mainEl = document.querySelector('#main');
const headerEl = document.querySelector('#header');
const foodSelectorEl = document.querySelector('#foodSelector');



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
	$('.collapsible').collapsible();
});

//create a function to remove all html elements except the footer
const removeExistingElems = () => {
  headerEl.innerHTML = '';
	mainEl.innerHTML = '';
};

const listenerHandler = el => {
	el.addEventListener('change', function() {
		var title = this.options[this.selectedIndex].text;
		removeExistingElems();
		infoCardGenerator(title);
		recipeCardGenerator();
	});
};

// refactoring information display function
const infoCardGenerator = function(title, info, rating) {
	const infoCardDiv = document.createElement('div');
	infoCardDiv.setAttribute("id", "content");
	console.log(infoCardDiv)
	infoCardDiv.innerHTML = 
	`
	<div class="container">
		<div class="row" id="contentRow">
			<div class="col s12 m5">
				<div class="row">
					<div class="col s12">
						<div class="card">
							<div class="card-image">
									<img src="./assets/images/sample-1.jpg">
									<span class="card-title">${title}</span>
							</div>
							<div class="card-content">
									<div class ="row">
											<div class="col s6">
													<h4>I will be the {info}</h4>
													<p>I am a very simple card. I am good at containing small bits of information.
													I am convenient because I require little markup to use effectively.</p>
											</div>
											<div class="col s6">
													<h4>I will be the {rating}</h4>
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
	</div>`;
	mainEl.appendChild(infoCardDiv);
};

const recipeCardGenerator = (recipe1, recipe2, recipe3) => {
	const recipeCardDiv = document.createElement("div");
	recipeCardDiv.classList.add("col", "s12", "m7");
	// For the collapsible cards, we will be using a for loop
	recipeCardDiv.innerHTML = `
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
	</ul>`;
	$("#contentRow").append(recipeCardDiv);
};


//create something to display the 3 options to the right

listenerHandler(wineSelectorEl);
listenerHandler(foodSelectorEl);