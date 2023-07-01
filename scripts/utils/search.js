import { recipes } from '../../data/recipes.js';
import { recipesCount } from '../utils/recipesCount.js';
import { renderRecipes } from '../utils/galleryDisplay.js';

const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');

let recipesToDisplay = [...recipes];

// Principal search function
function principalSearch(searchTerm) {
	for (let i = 0; i < recipesToDisplay.length; i++) {
		const recipe = recipesToDisplay[i];
		const recipeTitle = recipe.name.toLowerCase();
		const recipeIngredients = [];

		for (let j = 0; j < recipe.ingredients.length; j++) {
			const ingredient = recipe.ingredients[j];
			recipeIngredients.push(ingredient.ingredient.toLowerCase());
		}

		const recipeDescription = recipe.description.toLowerCase();

		let shouldDisplay = false;

		// Check if search term matches recipe title or description
		if (recipeTitle.includes(searchTerm.toLowerCase()) || recipeDescription.includes(searchTerm.toLowerCase())) {
			shouldDisplay = true;
		} else {
			// Check if search term matches any recipe ingredient
			for (let j = 0; j < recipeIngredients.length; j++) {
				const ingredient = recipeIngredients[j];
				if (ingredient.includes(searchTerm.toLowerCase())) {
					shouldDisplay = true;
					break;
				}
			}
		}

		// Remove recipe if it should not be displayed
		if (!shouldDisplay) {
			recipesToDisplay.splice(i, 1);
			i--;
		}
	}

	console.log('principalSearch', recipesToDisplay);
}

// Other search functions (placeholders)
function ingredientsSearch(searchTerm) {
	console.log('WIP', 'ingredientsSearch', searchTerm);
}

function applianceSearch(searchTerm) {
	console.log('WIP', 'applianceSearch', searchTerm);
}

function ustensilsSearch(searchTerm) {
	console.log('WIP', 'ustensilsSearch', searchTerm);
}

let searches = [];

export function globalSearch(searchTerm, id) {
	if (id === 'searchInput') {
		const previousSearchIndex = searches.findIndex((search) => search.inputId === id);

		// Remove previous search with the same inputId
		if (previousSearchIndex !== -1) {
			searches.splice(previousSearchIndex, 1);
		}
	}

	searches.push({ term: searchTerm, inputId: id });

	// Process all searches
	searches.forEach((search) => {
		switch (search.inputId) {
			case 'searchInput':
				principalSearch(search.term);
				break;
			case 'ingredients':
				ingredientsSearch(search.term);
				break;
			case 'appliance':
				applianceSearch(search.term);
				break;
			case 'ustensils':
				ustensilsSearch(search.term);
				break;
			default:
				break;
		}
	});

	recipesCount(recipesToDisplay);
	renderRecipes(recipesToDisplay);
}

export function removeSearch(searchTerm, id) {
	const index = searches.findIndex((search) => search.term === searchTerm && search.inputId === id);

	// Remove the specified search from the searches array
	if (index !== -1) {
		searches.splice(index, 1);
	}
}

export function handleSearchInput() {
	if (searchInput.value.length > 0) {
		clearSearch.classList.add('active');
		if (searchInput.value.length > 2) {
			const searchTerm = searchInput.value.toLowerCase();
			globalSearch(searchTerm, 'searchInput');
		}
	}
	if (clearSearch.classList.contains('active') && searchInput.value.length < 3) {
		// If the clearSearch button is active and the search input length is less than 3,
		// reset the recipesToDisplay to include all recipes
		recipesToDisplay = [...recipes];
	}
	if (searchInput.value.length === 0) {
		clearSearch.classList.remove('active');
	}
}

export function handleClearSearch() {
	searchInput.value = '';
	clearSearch.classList.remove('active');

	const count = document.getElementById('recipeCount');
	const countRecipes = recipes.length;
	count.innerText = countRecipes;

	renderRecipes(recipes);
}
