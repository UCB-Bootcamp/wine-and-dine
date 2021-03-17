// Materialize Initiation script
M.AutoInit();

// DOM VARIABLES GO HERE
const wineSelectorEl = document.querySelector('#wineSelector'); 
const mainEl = document.querySelector('#main');
const headerEl = document.querySelector('#header');
const foodSelectorEl = document.querySelector('#foodSelector');
const randomPairingEl = document.querySelector('#randomPairing');
const aboutUsEl = document.querySelector('#about-us');

const ourNames = ['Tim Weyel', 'Shy Gois', 'Leah Russell', 'Sydney Walcoff', 'Carlos Vadillo'];
const ourTitles = ['Director of HTML', 'Data Courier', 'Github Cat Wrangler', 'Chief Mischief Officer (CMO)', 'Unpaid Intern'];

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
		recipeCardGenerator();
		
	});	
};

// refactoring information display function
const infoCardGenerator = function(title, info, rating, img ) {
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

		// create and append row
		const recipeBodyRow = document.createElement('div');
		recipeBodyRow.classList = "row";
		recipeBodyDiv.append(recipeBodyRow);

		// create and append text div
		const recipeTextDiv = document.createElement('div');
		recipeTextDiv.setAttribute("class", "col s11 m11 l11 xl11");
		recipeBodyRow.append(recipeTextDiv);

		// create recipe span
		const recipeSpan = document.createElement('span');
		recipeSpan.textContent = 'The best way to make lemonade is to make a simple syrup first, by heating water and sugar together until the sugar is completely dissolved, and then mix that with the lemon juice. The proportions will vary depending on how sweet and strong you like your lemonade, and how sour your lemons are to begin with. Late season lemons are less sour than early season lemons. Meyer lemons are sweeter than standard lemons.';
		recipeTextDiv.append(recipeSpan);
		console.log(recipeSpan);

		// create like button div
		const likeButtonDiv = document.createElement('div');
		likeButtonDiv.setAttribute('class', 'col s1 m1 l1 xl1 favorites');
		recipeBodyRow.append(likeButtonDiv);

		// create like button
		const likeButton = document.createElement('i');
		likeButton.setAttribute('class', 'material-icons');
		likeButton.textContent = 'favorite_border';
		likeButtonDiv.append(likeButton);
		likeButton.addEventListener("click", function() {
			likeButton.textContent = 'favorite';
		})

		// append everything
		recipeLi.append(recipeHeaderDiv, recipeBodyDiv);
		recipeUl.append(recipeLi);
	}
	// append recipeCard container div to contentrow in main
	$("#contentRow").append(recipeCardDiv);

	// add event listeners


};


//create something to display the 3 options to the right

listenerHandler(wineSelectorEl);
listenerHandler(foodSelectorEl);
listenerHandler(randomPairingEl);


// clicking about us link
aboutUsEl.addEventListener('click', function() {
	// remove header and main elements (keeping the footer)
	removeExistingElems();

	const aboutUsHeader = document.createElement("h2");
	aboutUsHeader.textContent = 'About Us';
	aboutUsHeader.className = 'center';
	aboutUsHeader.id = 'about-us-header';

	const aboutUsBody = document.createElement("div");
	aboutUsBody.innerHTML = `<div class="row center" id="card-holder-row"></div>`

	mainEl.appendChild(aboutUsHeader);
	mainEl.appendChild(aboutUsBody);

	for (var i = 0; i < ourNames.length; i++) {
		const cardHolderRow = document.querySelector('#card-holder-row');

		const aboutUsCard = document.createElement("div");
		aboutUsCard.classList = 'col s4 m2';
		aboutUsCard.innerHTML = `<div class="card">
		<div class="card-image">
		  <img src="./assets/images/about-us-example-image.png">
		</div>
		<div class="card-content">
		<span class="card-title">${ourNames[i]}</span>
		  <p>${ourTitles[i]}</p>
		</div>
	  </div>`

	  cardHolderRow.appendChild(aboutUsCard);
	}
});
