export function galleryFactory(data) {
	// Destructure the properties from the data object (recipe)
	const { image, name, description, ingredients, time } = data;

	const picture = `./assets/photos/${image}`;

	/**
	 * Returns the DOM structure for the recipe card.
	 * @returns {HTMLElement} The recipe card DOM element.
	 */
	function getRecipeCardDOM() {
		const article = document.createElement('article');
		article.className = 'recipe-article';

		article.innerHTML = `
		<img src="${picture}" alt="${name}" class="recipe-image">
		<div class="recipe-card">
		  <h3 class="recipe-title">${name}</h3>
		  <h4 class="entitled1">recette</h4>
		  <p class="recipe-description">${description}</p>
		  <h4 class="entitled2">ingrédients</h4>
		  <div class="ingredient-grid">
			${ingredients
				.map(
					(ingredient) => `
				<div class="ingredient">
				  <h5>${ingredient.ingredient}</h5>
				  <p>${
						ingredient.quantity && ingredient.unit
							? `${ingredient.quantity} ${ingredient.unit}`
							: ingredient.quantity || ''
					}</p>
				</div>
			  `,
				)
				.join('')}
		  </div>
		</div>
		<div class="time">${time}min</div>
	  `;

		return article;
	}

	return { getRecipeCardDOM };
}
