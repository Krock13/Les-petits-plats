import { galleryFactory } from '../factories/gallery.js';

export function renderRecipes(recipes) {
	const searchInput = document.getElementById('searchInput');
	const galleryContainer = document.getElementById('gallery-container');
	galleryContainer.innerHTML = '';

	if (recipes.length === 0) {
		const notFound = document.createElement('p');
		notFound.className = 'notFound';

		notFound.innerText =
			"Aucune recette ne contient '" + searchInput.value + "' vous pouvez chercher 'tarte aux pommes', 'poisson', etc.";

		galleryContainer.appendChild(notFound);
	} else {
		recipes.forEach((recipe, _) => {
			// Create the recipe model using the galleryFactory
			const galleryModel = galleryFactory(recipe);
			const recipeCardDOM = galleryModel.getRecipeCardDOM();

			galleryContainer.appendChild(recipeCardDOM);
		});
	}
}
