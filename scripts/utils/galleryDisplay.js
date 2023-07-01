import { galleryFactory } from '../factories/gallery.js';

export function renderRecipes(recipes) {
	const galleryContainer = document.getElementById('gallery-container');
	galleryContainer.innerHTML = '';

	recipes.forEach((recipe, _) => {
		// Create the recipe model using the galleryFactory
		const galleryModel = galleryFactory(recipe);
		const recipeCardDOM = galleryModel.getRecipeCardDOM();

		galleryContainer.appendChild(recipeCardDOM);
	});
}
