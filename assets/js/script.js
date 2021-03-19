// Materialize Initiation script
M.AutoInit();

// DOM VARIABLES GO HERE
const wineSelectorEl = document.querySelector('#wineSelector'); 
const mainEl = document.querySelector('#main');
const headerEl = document.querySelector('#header');
const foodSelectorEl = document.querySelector('#foodSelector');
const randomPairingEl = document.querySelector('#randomPairing');
const aboutUsEl = document.querySelector('#about-us');
const apiKey = '2e045af459ca42fda601b67a39611082';

const ourNames = ['Tim Weyel', 'Shy Gois', 'Leah Russell', 'Sydney Walcoff', 'Carlos Vadillo'];
const ourTitles = ['Director of HTML', 'Data Courier', 'Github Cat Wrangler', 'Chief Mischief Officer (CMO)', 'Unpaid Intern'];

//create a function to remove all html elements except the footer
const removeExistingElems = () => {
	headerEl.innerHTML = '';
	mainEl.innerHTML = '';
};

const listenerHandler = el => {
	el.addEventListener('change', function() {
		const title = this.options[this.selectedIndex].text;
		const dataType = this.options[0].text.split(' ')[0];
		console.log(title, dataType);
		fetchData(dataType, title);
		removeExistingElems();
		// these will go inside the fetch function because that's where we'll receive input for ratings, descr, and recipes
		// infoCardGenerator(title, info, rating);
		// recipeCardGenerator(firstProtein, secondProtein(if applicable),...n);
	});	
};

// fetch data
const fetchData = (dataType, title) => {
	if(dataType == 'Wine') {
		const apiUrl = `https://api.spoonacular.com/food/wine/dishes?wine=${title}&apiKey=${apiKey}`;
		getWineData(apiUrl, title);
	} else if(dataType == 'Food') {
		const apiUrl = `https://api.spoonacular.com/food/wine/pairing?food=${title}&apiKey=${apiKey}`
		getFoodData(apiUrl, title);
	}
};

const getPairingsData = (title) => {
	const recipeApiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${title}&number=3&apiKey=${apiKey}`
	fetch(recipeApiUrl).then(function(response) {
		response.json().then(function(data) {
			// need to get these 3 foods displayed on the collapisble/expandable recipe cards
			console.log(response);
			console.log(data);
		})
	})
}

const getImageData = (title, info) => {
	const unsplashApiKey = 'EE_GhE32LBWp_v-xfq5aidZGEPP4n4j3IAzvCZ-cEGw';
	const unsplashApiUrl = `https://api.unsplash.com/search/photos?client_id=${unsplashApiKey}&query=${title}`;
	fetch(unsplashApiUrl).then(function(response){
		response.json().then(function(data){
			console.log(data.results[0].urls.raw);
			let imgSrc = data.results[0].urls.raw;
			infoCardGenerator(title, info, imgSrc);
		})
	})
}

// function fetching wine data
const getWineData = (apiUrl, title) => {
	fetch(apiUrl).then(function(response) {
		response.json().then(function(data) {
			console.log(data);
			const info = data.text;
			const foodPairing = data.pairings[0];
			getPairingsData(foodPairing);
			getImageData(title, info);
		});
	})
};

// function fetching food data
const getFoodData = (apiUrl, title) => {
	fetch(apiUrl).then(function(response) {
		response.json().then(function(data) {
			console.log(data);
			const pairingText = data.pairingText;
			let pairedWines = data.pairedWines;
			// need to get these 3 wines displayed on the collapisble/expandable recipe cards
			console.log(pairedWines);
			getImageData(title, pairingText);
		});
	})
};

// refactoring information display function
const infoCardGenerator = function(title, info, img) {
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
	cardImgEl.setAttribute("src", img);
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

	// append info card col to main
	mainEl.appendChild(contentRow);
	// append info card div to info card col
	contentRow.append(infoCardDiv);
	// append info card 

	recipeCardGenerator();

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
};

const surpriseMeData = () => {
	removeExistingElems();

	const wines = ["Sauvignon Blanc", "Chardonnay", "Champagne", "Pinot Noir", "Merlot", "Shiraz", "Cabernet Sauvignon", "Malbec", "Sangiovese"];
	const randomWineEl = Math.floor(Math.random() * wines.length);
	const surpriseMeWine = wines[randomWineEl];
	console.log(surpriseMeWine);
	fetchData('Wine', surpriseMeWine);
};

const aboutUs = () => {
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
};

listenerHandler(wineSelectorEl);
listenerHandler(foodSelectorEl);
randomPairingEl.addEventListener('click', surpriseMeData);


// clicking about us link
aboutUsEl.addEventListener('click', aboutUs);
