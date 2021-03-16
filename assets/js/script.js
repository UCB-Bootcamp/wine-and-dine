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
		infoCardGenerator(title, info, rating); 
		
	});
};

// refactoring information display function
const infoCardGenerator = function(title, info, rating, img ) {
	// call recipe
	recipeCardGenerator();

	// content row div
	const contentRow = document.createElement('div');
	contentRow.setAttribute("class", "container row");
	contentRow.setAttribute("id", "contentRow");

	// info card column div
	const infoCardDiv = document.createElement('div');
	infoCardDiv.setAttribute("class", "col s12 m5 card");
	// append info card column div to content row
	contentRow.append(infoCardDiv);

	// info card image div
	const cardImageDiv = document.createElement('div');
	cardImageDiv.setAttribute("class", "card-image");
	// append info card image div to info card column div
	infoCardDiv.append(cardImageDiv);

	// card image element
	const cardImgEl = document.createElement('img');
	cardImgEl.setAttribute("src", "./assets/images/sample-1.jpg");
	// append image el to info card image div
	cardImageDiv.append(cardImgEl);

	// card title element 
	const cardSpanEl = document.createElement('span');
	cardSpanEl.setAttribute("class", "card-title");
	cardSpanEl.textContent = title;
	// append title span el to image div
	cardImageDiv.append(cardSpanEl);
	console.log(infoCardDiv);

	// card content div
	const cardContentDiv = document.createElement('div');
	cardContentDiv.setAttribute("class", "card-content");
	// append card content div to infoCardDiv
	infoCardDiv.append(cardContentDiv);

	// create row div
	const cardContentRow = document.createElement('div');
	cardContentRow.setAttribute("class", "row");
	// append row to infoCardDiv
	cardContentDiv.append(cardContentRow);

	// create description div and content
	const descriptionDiv = document.createElement('div');
	descriptionDiv.setAttribute("class", "col s6");
	// append description
	cardContentRow.append(descriptionDiv);

	// create title el
	const descriptionTitle = document.createElement('h4');
	descriptionDiv.append(descriptionTitle);

	descriptionTitle.textContent = 'description';

	// create description el
	const descriptionContent = document.createElement('p');
	descriptionDiv.append(descriptionContent);

	descriptionContent.textContent = info;


	// create rating div
	const ratingDiv = document.createElement("div");
	ratingDiv.setAttribute("class", "col s6");
	cardContentRow.append(ratingDiv);
	// create rating el
	const ratingTitle = document.createElement('h4');
	ratingDiv.append(ratingTitle);

	ratingTitle.textContent = 'rating';

	// create description el
	const descriptionRating = document.createElement('p');
	ratingDiv.append(descriptionRating);

	descriptionRating.textContent = rating;





	/* 
		`
				<div class="col s6">
						<h4>Description</h4>
						<p></p>
				</div>
				<div class="col s6">
						<h4>Rating</h4>
						<p></p>
				</div>
		
		<div class="card-action">
				<a href="#">This is a link</a>
		</div>`*/
	;
	// append info card col to main
	mainEl.appendChild(contentRow);
	// append info card div to info card col
	contentRow.append(infoCardDiv);
	// append info card 

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
	for(let i =0; i < 3; i++) {
		// create `li` el
		const recipeLi = document.createElement("li");
		// create header div and set class to collapsible-header
		const recipeHeaderDiv = document.createElement("div");
		recipeHeaderDiv.setAttribute("class", "collapsible-header");
		// create body div and set class to collapsible-body
		const recipeBodyDiv = document.createElement("div");
		recipeBodyDiv.classList= "collapsible-body";

		// set content of header and body divs
		recipeHeaderDiv.innerHTML = `<i class="material-icons">filter_drama</i> Recipe ${i}`;
		recipeBodyDiv.innerHTML = `<row><div class="col s11 m11 l11 xl11"><span>Lorem ipsum dolor sit amet.</span></div> <div class="col s1 m1 l1 xl1 favorites"><i class="material-icons">favorite_border</i></div></row>`;
		// on click listener 
		$("favorites").on("click", "i", function() {
			console.log("you clicked favorites");
			
		});
		// add favorites button
		// const likeButton = $("#favorites"); 
		// console.log(likeButton);
		// recipeBodyDiv.append(likeButton);
	
	
		// grab favorite border button 
		// const likeButton = $("#favorites");
		// console.log(likeButton);

		// favorite button event listener

		// // on click listener 
		// $("#favorite-border").click(function() {
		// 	console.log(":(");
		// 	// likeButtonHandler();
		// });

		// append everything
		recipeLi.append(recipeHeaderDiv, recipeBodyDiv);
		recipeUl.append(recipeLi);
	}
	

	$("#contentRow").append(recipeCardDiv);
};


const likeButtonHandler = () => {
	console.log('hi :)');
	// const newButton = '<i class="material-icons" id="favorite">favorite_border</i>';
	// // replace #favorite-border with #favorite
	// $("#favorite-border").replaceWith(newButton);
};


//create something to display the 3 options to the right

listenerHandler(wineSelectorEl);
listenerHandler(foodSelectorEl);
listenerHandler(randomPairingEl);