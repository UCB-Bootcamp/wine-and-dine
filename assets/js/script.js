// Materialize Initiation script
M.AutoInit();

// API VARIABLES GO HERE
const cocktailApi = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const unsplashApiKey = 'EE_GhE32LBWp_v-xfq5aidZGEPP4n4j3IAzvCZ-cEGw';
// const apiKey = '97a4448b41f44c18bd70423cbfd292bb';
// const apiKey = 'f9e4f37f62de4dba85137360011a63c2';
 const apiKey = '3e4ea1bd7e9641199a76b70fb68b7c89';
// const apiKey = '2e045af459ca42fda601b67a39611082';

// DOM VARIABLES GO HERE
const wineSelectorEl = document.querySelector('#wineSelector'); 
const contentRow = document.querySelector('#contentRow');
const headerEl = document.querySelector('#header');
const randomPairingEl = document.querySelector('#randomPairing');
const aboutUsEl = document.querySelector('#about-us');
const wantCocktailEl = document.querySelector('#want-cocktail');
const historyEl = document.querySelector('#history');

// ARRAYS FOR HARDCODED DATA GO
const ourNames = ['Tim Weyel', 'Shy Gois', 'Leah Russell', 'Sydney Walcoff', 'Carlos Vadillo'];
const ourTitles = ['Director of HTML', 'Data Courier', 'Github Cat Wrangler', 'Chief Mischief Officer (CMO)', 'Unpaid Intern'];


// REUSABLE FUNCTIONS
const removeEl = () => {
	headerEl.innerHTML = '';
	contentRow.innerHTML = '';
};

// WINE DROPDOWN FUNCTIONS
// save selected wines
const saveWineHistory = (selectedOption) => {
	
	let wineHistory = [];
	let temp = JSON.parse(localStorage.getItem("wineItems")) || [];

	if (temp.indexOf(selectedOption) === -1) {
		temp.push(selectedOption);
		localStorage.setItem('wineItems', JSON.stringify(temp));
		wineHistory = temp; 
	} else {
		wineHistory = temp;
	}
	return wineHistory;
};

// load selected wines
const loadWineHistory = () => {
	wineHistory = JSON.parse(localStorage.getItem('wineItems'));
};

// get image for selected wine
const getWineImage = (selectedOption, info) => {
	const unsplashApiUrl = `https://api.unsplash.com/search/photos?client_id=${unsplashApiKey}&query=${selectedOption}-wine`;
	fetch(unsplashApiUrl).then(function(response){
		response.json().then(function(data){
			let imgSrc = data.results[0].urls.raw;
			infoCardGenerator(selectedOption, info, imgSrc);
		})
	})
};

// get title and description for selected wine
const getWineData = (selectedOption) => {
	const wineApiUrl = `https://api.spoonacular.com/food/wine/dishes?wine=${selectedOption}&apiKey=${apiKey}`;
	fetch(wineApiUrl).then(function(response) {
		response.json().then(function(data) {

			const info = data.text;
			const foodPairings = data.pairings;
			for(let i=0; i < 3; i++) {
				let currentFoodPairing = foodPairings[i];
				getRecipes(currentFoodPairing);
			}
			getWineImage(selectedOption, info);
		});
	})
};

const infoCardConstructor = () => {
	// Title column Div
	const wineHeaderDiv = document.createElement('div');
	wineHeaderDiv.setAttribute("class", "col s12");
	contentRow.append(wineHeaderDiv);

	// Cocktail Welcome Title Generator
	const wineHeader = document.createElement("h2");
	wineHeader.textContent = 'Here are your pairings:';
	wineHeader.className = 'center';
	wineHeaderDiv.append(wineHeader);

	// info card column div
	let infoCardDiv = document.createElement('div');
	infoCardDiv.setAttribute("class", "col s12 m5 card");
	infoCardDiv.setAttribute("id", "info-card-div");
	// append info card column div to content row
	contentRow.append(infoCardDiv);
};

// display info card with wine image, title and description
const infoCardGenerator = (selectedOption, info, img) => {
	let infoCardDiv = $('#info-card-div');

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
};

// search for recipes that contained suggested food pairing
const getRecipes = searchQuery => {
	const pairingsApiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&number=3&apiKey=${apiKey}`;
	fetch(pairingsApiUrl).then(function(response) {
		response.json().then(function(data) {
			const recipeId = data.results[0].id
			getRecipeData(recipeId);
		})
	})
};

// get recipe information for above listed recipes
const getRecipeData = recipeId => {
	const recipesApiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${apiKey}`;
	fetch(recipesApiUrl).then(function(response) {
		response.json().then(function(data) {
			const recipeTitle = data.title;
			const recipeSummary = data.summary;
			recipeCardGenerator(recipeTitle, recipeSummary)
		})
	});
};

// creates div for recipes
const recipePageConstructor = () => {
	const recipeCardDiv = document.createElement("div");
	recipeCardDiv.setAttribute("id", "recipe-card-div");
	const recipeUl = document.createElement("ul");
	recipeUl.setAttribute("class", "collapsible");
	recipeUl.setAttribute("id", "recipeUl");
	recipeCardDiv.classList.add("col", "s12", "m7");
	recipeCardDiv.append(recipeUl);
	contentRow.append(recipeCardDiv);
};

// generate expandable card for each recipe that will go inside recipePageConstructor and display data from getRecipeData function
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
	recipeHeaderDiv.innerHTML = `<i class="material-icons">restaurant</i> ${recipeTitle}`;

	// create and append row
	const recipeBodyRow = document.createElement('div');
	recipeBodyRow.classList = "row";
	recipeBodyDiv.append(recipeBodyRow);

	// create and append text div
	const recipeTextDiv = document.createElement('div');
	recipeTextDiv.setAttribute("class", "col");
	recipeBodyRow.append(recipeTextDiv);

	// create recipe span
	const recipeSpan = document.createElement('span');
	recipeSpan.innerHTML = recipeSummary;
	recipeTextDiv.append(recipeSpan);

	// append everything
	recipeLi.append(recipeHeaderDiv, recipeBodyDiv);
	let recipeUl = $('#recipeUl');
	recipeUl.append(recipeLi);

	$(document).ready(function(){
		$('.collapsible').collapsible();
	});
};

// SUPRISE ME FUNCTIONS
const surpriseMeData = () => {
	const wines = ["Sauvignon Blanc", "Chardonnay", "Champagne", "Pinot Noir", "Merlot", "Shiraz", "Cabernet Sauvignon", "Malbec", "Sangiovese"];
	const randomWineEl = Math.floor(Math.random() * wines.length);
	const surpriseMeWine = wines[randomWineEl];
	getWineData(surpriseMeWine);
	removeEl();
	contentRow.setAttribute("class", "container row");
	infoCardConstructor();
	recipePageConstructor();
};

// ABOUT US FUNCTIONS
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

// COCKTAIL FUNCTIONS
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
	cocktailCardHz.setAttribute("class", "card horizontal cocktail-card");
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
			$('.cocktail-card').addClass('horizontal');
		}
    });
};

wantCocktailEl.addEventListener('click', getCocktail);

// HISTORY FUNCTIONS
const displayHistory = () => {
	removeEl();
	loadWineHistory();
	// History Greeting
	const historyHeader = document.createElement("h2");
	historyHeader.textContent = 'Pairing History';
	historyHeader.className = 'center';
	contentRow.append(historyHeader);

	// History card row
	const historyCardRow = document.createElement('div');
	historyCardRow.setAttribute("class", "row");
	contentRow.append(historyCardRow);

	for(let i=0; i < wineHistory.length; i++) {
		const wineItem = wineHistory[i];
		const unsplashApiUrl = `https://api.unsplash.com/search/photos?client_id=${unsplashApiKey}&query=${wineItem}-wine`;
		const wineApiUrl = `https://api.spoonacular.com/food/wine/dishes?wine=${wineItem}&apiKey=${apiKey}`;

		// History card column
		const historyCardCol = document.createElement('div');
		historyCardCol.setAttribute("class", "col s12 m4");
		historyCardRow.append(historyCardCol);

		// History card
		const historyCard = document.createElement('div');
		historyCard.setAttribute("class", "card history");
		historyCardCol.append(historyCard);

		// History card image
		const historyImgDiv = document.createElement('div');
		historyImgDiv.setAttribute("class", "card-image waves-effect waves-block waves-light");
		historyCard.append(historyImgDiv);

		fetch(unsplashApiUrl).then(function(response){
			response.json().then(function(data){
				let img = data.results[0].urls.raw;

				// History image
				const historyImg = document.createElement('img');
				historyImg.setAttribute("class", "activator");
				historyImg.setAttribute("src", img);
				historyImgDiv.append(historyImg);
			})
		});

		// History card content
		const historyCardContent = document.createElement('div');
		historyCardContent.setAttribute("class", "card-content");
		historyCard.append(historyCardContent);

		// History Card Title
		const historyCardTitle = document.createElement('span');
		historyCardTitle.setAttribute("class", "card-title activator grey-text text-darken-4");
		historyCardTitle.textContent = wineItem;
		historyCardContent.append(historyCardTitle)

		const historyCardTitleIcon = document.createElement('i');
		historyCardTitleIcon.setAttribute("class", "material-icons right");
		historyCardTitleIcon.textContent = 'more_vert';
		historyCardTitle.append(historyCardTitleIcon);

		// History card info
		const historyCardInfo = document.createElement('div');
		historyCardInfo.setAttribute("class", "card-reveal");
		historyCard.append(historyCardInfo);

		// History info title
		const historyInfoTitle = document.createElement('span');
		historyInfoTitle.setAttribute("class", "card-title grey-text text-darken-4");
		historyInfoTitle.textContent = wineItem;
		historyCardInfo.append(historyInfoTitle);

		// History icon
		const historyInfoIcon = document.createElement('i');
		historyInfoIcon.setAttribute("class", "material-icons right");
		historyInfoIcon.textContent = 'close';
		historyInfoTitle.append(historyInfoIcon);

		fetch(wineApiUrl).then(function(response){
			response.json().then(function(data) {
				const info = data.text;

				const historyInfo = document.createElement('p');
				historyInfo.textContent = info;
				historyCardInfo.append(historyInfo);
			})
		});
	}
};

// clicking wine selector dropdown
wineSelectorEl.addEventListener('change', function() {
	const selectedOption = this.options[this.selectedIndex].text;
	saveWineHistory(selectedOption);
	getWineData(selectedOption);
	removeEl();
	contentRow.setAttribute("class", "container row");
	infoCardConstructor();
	recipePageConstructor();
});

// clicking 'Surprise Me' link
randomPairingEl.addEventListener('click', surpriseMeData);

// clicking about us link
aboutUsEl.addEventListener('click', aboutUs);

// clicking history link
historyEl.addEventListener('click', displayHistory);
