import { recipes } from '../../data/recipes.js';
import { renderRecipes } from '../utils/galleryDisplay.js';

const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');

let recipesToDisplay = [...recipes];
let removedRecipes = [];

// Function to count remaining recipes
function recipesCount() {
	const count = document.getElementById('recipeCount');
	const countRecipes = recipesToDisplay.length;
	count.innerText = countRecipes;
}

// Principal search function
function principalSearch(searchTerm) {
	const lowercaseSearchTerm = searchTerm.toLowerCase();

	recipesToDisplay = recipes.filter((recipe) => {
		const recipeTitle = recipe.name.toLowerCase();
		const recipeDescription = recipe.description.toLowerCase();
		const recipeIngredients = recipe.ingredients.map((ingredient) => ingredient.ingredient.toLowerCase());

		const matchesTitleOrDescription =
			recipeTitle.includes(lowercaseSearchTerm) || recipeDescription.includes(lowercaseSearchTerm);

		const matchesIngredient = recipeIngredients.some((ingredient) => ingredient.includes(lowercaseSearchTerm));

		if (matchesTitleOrDescription || matchesIngredient) {
			return true; // Match found, include in recipesToDisplay
		} else {
			removedRecipes[lowercaseSearchTerm] = removedRecipes[lowercaseSearchTerm] || [];
			removedRecipes[lowercaseSearchTerm].push(recipe);
			return false; // No match, remove from recipesToDisplay
		}
	});
}

function ingredientsSearch(searchTerm) {
	const lowercaseSearchTerm = searchTerm.toLowerCase();

	// Filters out recipes that don't contain the required ingredient
	removedRecipes[searchTerm] = recipesToDisplay.filter((recipe) => {
		const hasIngredient = recipe.ingredients.some((ingredient) =>
			ingredient.ingredient.toLowerCase().includes(lowercaseSearchTerm),
		);
		return !hasIngredient;
	});

	// Filter recipes and keep only those containing the required ingredient
	recipesToDisplay = recipesToDisplay.filter((recipe) => {
		return recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(lowercaseSearchTerm));
	});
}

function applianceSearch(searchTerm) {
	const lowercaseSearchTerm = searchTerm.toLowerCase();

	removedRecipes[searchTerm] = recipesToDisplay.filter(({ appliance }) => appliance.toLowerCase() !== lowercaseSearchTerm);

	recipesToDisplay = recipesToDisplay.filter(({ appliance }) => appliance.toLowerCase() === lowercaseSearchTerm);
}

function ustensilsSearch(searchTerm) {
	const lowercaseSearchTerm = searchTerm.toLowerCase();

	removedRecipes[searchTerm] = recipesToDisplay.filter(({ ustensils }) =>
		ustensils.every((utensil) => utensil.toLowerCase() !== lowercaseSearchTerm),
	);

	recipesToDisplay = recipesToDisplay.filter(({ ustensils }) =>
		ustensils.some((utensil) => utensil.toLowerCase() === lowercaseSearchTerm),
	);
}

let searches = [];

export function globalSearch(searchTerm, id) {
	recipesToDisplay = [...recipes];
	removedRecipes = [];
	if (id === 'searchInput') {
		// Search in 'searches' if an object with id 'searchInput' already exists
		const previousSearchIndex = searches.findIndex((search) => search.inputId === id);
		// If this is the case, delete it
		if (previousSearchIndex !== -1) {
			searches.splice(previousSearchIndex, 1);
		}
	}
	const isExistingSearch = searches.some((search) => search.term === searchTerm);
	if (searchTerm === 'clear') {
		// Removes the object whose id is 'searchInput' in 'searches'.
		searches = searches.filter((search) => search.inputId !== 'searchInput');
		// Add search if it doesn't already exist
	} else if (searchTerm !== '' && !isExistingSearch) {
		searches.push({ term: searchTerm, inputId: id });
	}

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
	console.log(recipesToDisplay);
	console.log(removedRecipes);
}

export function removeSearch(searchTerm) {
	if (removedRecipes.hasOwnProperty(searchTerm)) {
		searches = searches.filter((search) => search.term !== searchTerm);
		globalSearch('', null);
	}
}

// Function that manages the actions to be taken each time the main search bar changes
export function handleSearchInput() {
	const searchTerm = searchInput.value.toLowerCase();

	if (searchInput.value.length === 0) {
		clearSearch.classList.remove('active');
	} else {
		clearSearch.classList.add('active');
	}

	if (searchInput.value.length > 2) {
		globalSearch(searchTerm, 'searchInput');
	} else {
		searches = searches.filter((search) => search.inputId !== 'searchInput');
		globalSearch('clear', 'searchInput');
	}
}

// Function to manage the click on the cross in the main search bar
export function handleClearSearch() {
	searches = searches.filter((search) => search.inputId !== 'searchInput');
	searchInput.value = '';
	clearSearch.classList.remove('active');

	const searchTerm = 'searchInput';
	if (removedRecipes.hasOwnProperty(searchTerm)) {
		delete removedRecipes[searchTerm];
	}

	globalSearch('clear', 'searchInput');
}

export function filterList() {
	return recipesToDisplay;
}
