// Materialize Initiation script
M.AutoInit();

// DOM VARIABLES GO HERE
const wineSelectorEl = document.querySelector('#wineSelector'); 
const contentRow = document.querySelector('#contentRow');
const headerEl = document.querySelector('#header');
const foodSelectorEl = document.querySelector('#foodSelector');
const randomPairingEl = document.querySelector('#randomPairing');
const aboutUsEl = document.querySelector('#about-us');
const apiKey = 'f9e4f37f62de4dba85137360011a63c2';

const ourNames = ['Tim Weyel', 'Shy Gois', 'Leah Russell', 'Sydney Walcoff', 'Carlos Vadillo'];
const ourTitles = ['Director of HTML', 'Data Courier', 'Github Cat Wrangler', 'Chief Mischief Officer (CMO)', 'Unpaid Intern'];

//create a function to remove all html elements except the footer
const removeEl = () => {
	headerEl.innerHTML = '';
	contentRow.innerHTML = '';
};

const recipePageConstructor = () => {
	const recipeCardDiv = document.createElement("div");
	const recipeUl = document.createElement("ul");
	recipeUl.setAttribute("class", "collapsible");
	recipeUl.setAttribute("id", "recipeUl");
	recipeCardDiv.classList.add("col", "s12", "m7");
	recipeCardDiv.append(recipeUl);
	contentRow.append(recipeCardDiv);
};


const listenerHandler = el => {
	el.addEventListener('change', function() {
		const selectedOption = this.options[this.selectedIndex].text;
		const dataType = this.options[0].text.split(' ')[0];
		validateDropdownType(dataType, selectedOption);
		removeEl();
		contentRow.setAttribute("class", "container row");
		// these will go inside the fetch function because that's where we'll receive input for ratings, descr, and recipes
		// infoCardGenerator(selectedOption, info, rating);
		// recipeCardGenerator(firstProtein, secondProtein(if applicable),...n);
	});	
};

// fetch data
const validateDropdownType = (dataType, selectedOption) => {
	if(dataType == 'Wine') {
		const wineApiUrl = `https://api.spoonacular.com/food/wine/dishes?wine=${selectedOption}&apiKey=${apiKey}`;
		getWineData(wineApiUrl, selectedOption);
	} else if(dataType == 'Food') {
		const foodApiUrl = `https://api.spoonacular.com/food/wine/pairing?food=${selectedOption}&apiKey=${apiKey}`;
		getFoodWithWineData(foodApiUrl, selectedOption);
	}
};

const getPairingsData = (searchQuery) => {
	const pairingsApiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&number=3&apiKey=${apiKey}`;
	fetch(pairingsApiUrl).then(function(response) {
		response.json().then(function(data) {
			// need to get these 3 foods displayed on the collapisble/expandable recipe cards
			// grab ID of recipe
			const recipeId = data.results[0].id
			getPairingsRecipes(recipeId);
		})
	})
};

const getPairingsRecipes = (recipeId) => {
	const recipesApiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${apiKey}`;
	fetch(recipesApiUrl).then(function(response) {
		response.json().then(function(data) {
			const recipeTitle = data.title;
			const recipeSummary = data.summary;
			recipeCardGenerator(recipeTitle, recipeSummary)
		})
	});
};


const getImageData = (selectedOption, info) => {
	const unsplashApiKey = 'EE_GhE32LBWp_v-xfq5aidZGEPP4n4j3IAzvCZ-cEGw';
	const unsplashApiUrl = `https://api.unsplash.com/search/photos?client_id=${unsplashApiKey}&query=${selectedOption}`;
	fetch(unsplashApiUrl).then(function(response){
		response.json().then(function(data){
			let imgSrc = data.results[0].urls.raw;
			infoCardGenerator(selectedOption, info, imgSrc);
		})
	})
};

// wine with food
const getWineData = (apiUrl, selectedOption) => {
	fetch(apiUrl).then(function(response) {
		response.json().then(function(data) {
			const info = data.text;
			const foodPairings = data.pairings;
			for(let i=0; i < 3; i++) {
				let currentPairing = foodPairings[i];
				getPairingsData(currentPairing);
			}
			getImageData(selectedOption, info);
		});
	})		
};
 

// food with wine
const getFoodWithWineData = (apiUrl, selectedOption) => {
	fetch(apiUrl).then(function(response) {
		response.json().then(function(data) {
			// console.log(data);
			const pairingText = data.pairingText;
			let pairedWines = data.pairedWines;
			// need to get these 3 wines displayed on the collapisble/expandable recipe cards
			// console.log(pairedWines);
			getImageData(selectedOption, pairingText);
		});
	})
};

// refactoring information display function
const infoCardGenerator = function(selectedOption, info, img) {
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
	cardImgEl.setAttribute("src", img);
	// append image el to info card image div
	cardImageDiv.append(cardImgEl);

	// card title element 
	const cardSpanEl = document.createElement('span');
	cardSpanEl.setAttribute("class", "card-title");
	cardSpanEl.textContent = selectedOption;
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
	descriptionDiv.setAttribute("class", "col");
	// append description
	cardContentRow.append(descriptionDiv);

	// create title el
	const descriptionTitle = document.createElement('h4');
	descriptionDiv.append(descriptionTitle);

	descriptionTitle.textContent = 'Description';

	// create description el
	const descriptionContent = document.createElement('p');
	descriptionDiv.append(descriptionContent);

	descriptionContent.textContent = info;
	// append info card div to info card col
	contentRow.append(infoCardDiv);
	// append info card 

	// Call the collapsible function again when the element is rendered
	$(document).ready(function(){
		$('.collapsible').collapsible();
	});
	
	recipePageConstructor();
};

const recipeCardGenerator = (recipeTitle, recipeSummary) => {
	// create `li` el
	const recipeLi = document.createElement("li");
	// create header div and set class to collapsible-header
	const recipeHeaderDiv = document.createElement("div");
	recipeHeaderDiv.setAttribute("class", "collapsible-header");
	// create body div and set class to collapsible-body
	const recipeBodyDiv = document.createElement("div");
	recipeBodyDiv.classList= "collapsible-body";

	// set content of header and body divs
	recipeHeaderDiv.innerHTML = `<i class="material-icons">filter_drama</i> ${recipeTitle}`;

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
	recipeSpan.innerHTML = recipeSummary;
	recipeTextDiv.append(recipeSpan);

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
	let recipeUl = $('#recipeUl');
	recipeUl.append(recipeLi);
};

const surpriseMeData = () => {
	removeEl();

	const wines = ["Sauvignon Blanc", "Chardonnay", "Champagne", "Pinot Noir", "Merlot", "Shiraz", "Cabernet Sauvignon", "Malbec", "Sangiovese"];
	const randomWineEl = Math.floor(Math.random() * wines.length);
	const surpriseMeWine = wines[randomWineEl];
	console.log(surpriseMeWine);
	validateDropdownType('Wine', surpriseMeWine);
};

const aboutUs = () => {
	removeEl();

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
};

/* Wine with Food perspective

- get food pairings from wine api call
for loop
- recipeFetch(foodPairings[i])
- input recipe info into for loop creating recipe cards

*/


listenerHandler(wineSelectorEl);
listenerHandler(foodSelectorEl);
randomPairingEl.addEventListener('click', surpriseMeData);


// clicking about us link
aboutUsEl.addEventListener('click', aboutUs);
