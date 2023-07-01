import { recipes } from '../../data/recipes.js';
import { generateDropdownList } from '../factories/filterDropdown.js';
import { renderRecipes } from '../utils/galleryDisplay.js';
import { handleSearchInput, handleClearSearch } from '../utils/search.js';

const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');

function init() {
	// Event listener for search input
	searchInput.addEventListener('input', handleSearchInput);

	// Event listener for clear search button
	clearSearch.addEventListener('click', handleClearSearch);

	// Generate respective drop-down lists for ingredients, appliances and utensils
	generateDropdownList('ingredientsDropdown', 'ingredients-container', 'Ingrédients', 'ingredients');
	generateDropdownList('applianceDropdown', 'appliance-container', 'Appareils', 'appliance');
	generateDropdownList('ustensilsDropdown', 'ustensils-container', 'Ustensiles', 'ustensils');

	// Display number of recipes
	const count = document.getElementById('recipeCount');
	const countRecipes = recipes.length;
	count.innerText = countRecipes;

	// Display recipes gallery
	renderRecipes(recipes);
}

// Initialize the application
init();
