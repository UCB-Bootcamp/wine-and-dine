// Materialize Initiation script
M.AutoInit();

// DOM VARIABLES GO HERE
const wineSelectorEl = document.querySelector('#wineSelector'); 
const mainEl = document.querySelector('#main');
const headerEl = document.querySelector('#header');
const foodSelectorEl = document.querySelector('#foodSelector');
const randomPairingEl = document.querySelector('#randomPairing');

// hardcoded examples
let info = "I am a full bodied wine made with grapes. Has been fermenting since the days of old";
let rating = '⭐️⭐️⭐️⭐️⭐️';



// Initializing the DOM Form functions for Materialize (DROP DOWNS)
// THERE IS A VARIABLE BUG WITH THE VANILLA JS, JQUERY ADDED
document.addEventListener('DOMContentLoaded', function() {
	var selectElems = document.querySelectorAll('select');
//	var selectInstances = M.FormSelect.init(selectElems, options);
	var collapseElems = document.querySelectorAll('.collapsible');
//	var collapseInstances = M.Collapsible.init(collapseElems, options);
});

//create a function to remove all html elements except the footer
const removeExistingElems = () => {
  headerEl.innerHTML = '';
	mainEl.innerHTML = '';
};

const listenerHandler = el => {
	el.addEventListener('change', function() {
		var title = this.options[this.selectedIndex].text;
		// fetch function dependent on `el`
		removeExistingElems();
		// these will go inside the fetch function because that's where we'll receive input for ratings, descr, and recipes
		infoCardGenerator(title,info, rating); 
		recipeCardGenerator();
	});
};

// refactoring information display function
const infoCardGenerator = function(title, info, rating) {
	const infoCardDiv = document.createElement('div');
	infoCardDiv.setAttribute("id", "content");
	infoCardDiv.innerHTML = 
	`<div class="container">
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
													<h4>Description</h4>
													<p>${info}</p>
											</div>
											<div class="col s6">
													<h4>Rating</h4>
													<p>${rating}</p>
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

	// Call the collapsible function again when the element is rendered
	$(document).ready(function(){
	$('.collapsible').collapsible();
});
};

const recipeCardGenerator = (recipe1, recipe2, recipe3) => {
	const recipeCardDiv = document.createElement("div");
	const recipeUl = document.createElement("ul");
	recipeUl.setAttribute("class", "collapsible");
	recipeCardDiv.classList.add("col", "s12", "m7");
	recipeCardDiv.append(recipeUl);
	// For the collapsible cards, we will be using a for loop
	for(let i =0; i < 3; i++) {
		// create `li` el
		const recipeLi = document.createElement("li");
		// create header div and set class to collapsible-header
		const recipeHeaderDiv = document.createElement("div");
		recipeHeaderDiv.setAttribute("class", "collapsible-header");
		// create body div and set class to collapsible-body
		const recipeBodyDiv = document.createElement("div");
		recipeBodyDiv.setAttribute("class", "collapsible-body");

		// set content of header and body divs
		recipeHeaderDiv.innerHTML = `<i class="material-icons">filter_drama</i> ${i}`;
		recipeBodyDiv.innerHTML = `<span>Lorem ipsum dolor sit amet.</span> ${i}`;

		// append everything
		recipeLi.append(recipeHeaderDiv, recipeBodyDiv);
		recipeUl.append(recipeLi);
	}
	$("#contentRow").append(recipeCardDiv);
};


//create something to display the 3 options to the right

listenerHandler(wineSelectorEl);
listenerHandler(foodSelectorEl);
listenerHandler(randomPairingEl);