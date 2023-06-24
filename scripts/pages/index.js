import { recipes } from '../../data/recipes.js';
import { generateDropdownList } from '../factories/filterDropdown.js';
import { galleryFactory } from '../factories/gallery.js';
import { recipesCount } from '../utils/recipesCount.js';
import { clearSearch } from '../utils/clearSearch.js';

function init() {
	clearSearch();
	// Generate respective drop-down lists for ingredients, appliances and utensils
	generateDropdownList('ingredientsDropdown', 'ingredients-container', 'Ingrédients', 'ingredients');
	generateDropdownList('applianceDropdown', 'appliance-container', 'Appareils', 'appliance');
	generateDropdownList('ustensilsDropdown', 'ustensils-container', 'Ustensiles', 'ustensils');

	const gallery = document.getElementById('gallery-container');

	recipes.forEach((recipe) => {
		// Create the recipe model using the galleryFactory
		const galleryModel = galleryFactory(recipe);
		const recipeCardDOM = galleryModel.getRecipeCardDOM();

		gallery.appendChild(recipeCardDOM);
	});
	recipesCount(recipes);
}

// Initialize the application
init();
