// Materialize Initiation script
M.AutoInit();

// API VARIABLES GO HERE
const cocktailApi = "https://www.thecocktaildb.com/api/json/v1/1/random.php"

// DOM VARIABLES GO HERE
const wineSelectorEl = document.querySelector('#wineSelector'); 
const contentRow = document.querySelector('#contentRow');
const headerEl = document.querySelector('#header');
const foodSelectorEl = document.querySelector('#foodSelector');
const randomPairingEl = document.querySelector('#randomPairing');
const aboutUsEl = document.querySelector('#about-us');
const wantCocktailEl = document.querySelector('#want-cocktail');
const apiKey = '2e045af459ca42fda601b67a39611082';

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

const getCocktail = function() {
	fetch(cocktailApi).then(res => res.json()).then(function(response){
	
	// Create two arrays to hold the Object and the Object Contents
	var drinkData = [];
	var drinkDataContents = [];

	// Get the key variables
	drinkData = response.drinks;
	drinkName = drinkData[0].strDrink;
	drinkRecipe = drinkData[0].strInstructions;
	drinkImage = drinkData[0].strDrinkThumb;

	// Separate the ingredients and measurements for the drinks
	drinkDataContents = Object.values(drinkData[0]);

	// calling the cocktail generating function
	displayCocktail(drinkName, drinkRecipe, drinkImage, drinkDataContents);

	});
};

// Displaying the cocktails in it's own card
const displayCocktail = function(drinkName, drinkRecipe, drinkImage, drinkDataContents) {

	// Clear existing elements
	removeEl();

	// Generating cocktail container 
	const mainContainer = document.createElement('div');
	mainContainer.setAttribute("class", "container");

	// Insert the main row
	const headerRow = document.createElement('div');
	headerRow.setAttribute("class", "row");
	mainContainer.append(headerRow);

	// Header Div
	const cocktailHeaderDiv = document.createElement('div');
	cocktailHeaderDiv.setAttribute("class", "col s12");
	headerRow.append(cocktailHeaderDiv);

	// Cocktail Welcome Title Generator
	const cocktailHeader = document.createElement("h2");
	cocktailHeader.textContent = 'Seems like you prefer a cocktail...';
	cocktailHeader.className = 'center';
	cocktailHeaderDiv.append(cocktailHeader);

	// Cokctail Info row
	const cocktailInfoRow = document.createElement('div');
	cocktailInfoRow.setAttribute("class", "row");
	mainContainer.append(cocktailInfoRow);

	// Cocktail Column
	const cocktailInfoCard = document.createElement('div');
	cocktailInfoCard.setAttribute("class", "col s12");
	cocktailInfoRow.append(cocktailInfoCard);

	// Horizontal Card Creation
	const cocktailCardHz = document.createElement('div');
	cocktailCardHz.setAttribute("class", "card horizontal");
	cocktailInfoCard.append(cocktailCardHz);

	// Image div Goes First
	const cocktailImgDiv = document.createElement('div');
	cocktailImgDiv.setAttribute("class", "card-image");
	cocktailCardHz.append(cocktailImgDiv);

	// Pass through the image
	const cocktailImg = document.createElement('img');
	cocktailImg.setAttribute("class", "materialboxed");
	cocktailImg.setAttribute("width", "100%");
	cocktailImg.setAttribute("src", drinkImage);
	cocktailImgDiv.append(cocktailImg);

	// Pass through the cocktail name
	const cocktailTitle = document.createElement('span');
	cocktailTitle.setAttribute("class", "card-title");
	cocktailTitle.textContent = drinkName;
	cocktailImgDiv.append(cocktailTitle);

	// Create Recipe Card div
	const cocktailRecipeDiv = document.createElement('div');
	cocktailRecipeDiv.setAttribute("class", "card-stacked");
	cocktailCardHz.append(cocktailRecipeDiv);

	// Generate the Card Content div
	const cocktailRecipe = document.createElement('div');
	cocktailRecipe.setAttribute("class", "card-content");
	cocktailRecipeDiv.append(cocktailRecipe);

	// Pass Through the Cocktail Name
	const cocktailRecipeTitle = document.createElement("h4");
	cocktailRecipeTitle.textContent = `Making the ${drinkName}:`;
	cocktailRecipe.append(cocktailRecipeTitle);

	// Pass through the recipe instructions
	const cocktailInstructions = document.createElement("p");
	cocktailInstructions.textContent = drinkRecipe;
	cocktailRecipe.append(cocktailInstructions);

	// Create the Ingredients & Measaurements Row
	const cocktailIngredientDiv = document.createElement('div');
	cocktailIngredientDiv.setAttribute("class", "row");
	cocktailRecipe.append(cocktailIngredientDiv);

	// Ingredients column
	const cocktailIngredientCol = document.createElement('div');
	cocktailIngredientCol.setAttribute("class", "col s12 m6");
	cocktailIngredientDiv.append(cocktailIngredientCol);

	// Ingredients Title
	const cocktailIngredientTitle = document.createElement("h5");
	cocktailIngredientTitle.textContent = "Ingredients";
	cocktailIngredientCol.append(cocktailIngredientTitle);

	// Measurements Column
	const cocktailMeasureCol = document.createElement('div');
	cocktailMeasureCol.setAttribute("class", "col s12 m6");
	cocktailIngredientDiv.append(cocktailMeasureCol);

	// Measurements Title
	const cocktailMeasureTitle = document.createElement("h5");
	cocktailMeasureTitle.textContent = "Measurements";
	cocktailMeasureCol.append(cocktailMeasureTitle);

	// Ingredients List
	const cocktailIngredientList = document.createElement('ul');
	cocktailIngredientCol.append(cocktailIngredientList);

	// Ingredient Measurement List
	const cocktailMeasureList = document.createElement('ul');
	cocktailMeasureCol.append(cocktailMeasureList);

	// Ingredient Names Loop
	for (var i = 17; i < 32; i++) {
		if (drinkDataContents[i]) {
			var ingredientList = document.createElement('li');
			ingredientList.textContent = drinkDataContents[i];
			cocktailIngredientList.append(ingredientList);
		}
	}

	// Ingredient Measurements Loop
	for (var i = 32; i < 47; i++) {
		if (drinkDataContents[i]) {
			var measurementList = document.createElement('li');
			measurementList.textContent = drinkDataContents[i];
			cocktailMeasureList.append(measurementList);
		}
	}


	contentRow.appendChild(mainContainer);

	// Initialize the picture max
	$(document).ready(function(){
    $('.materialboxed').materialbox();
    });

	// Makes it a normal card on smaller and horizontal card on larger
    $(window).resize(function(){

		if($(window).width() <= 860){
		$('.horizontal').removeClass('horizontal');
		}
		if(860 <= $(window).width()){
			$('.card').addClass('horizontal');
		}
    });
};

wantCocktailEl.addEventListener('click', getCocktail);
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

	contentRow.appendChild(aboutUsHeader);
	contentRow.appendChild(aboutUsBody);

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
