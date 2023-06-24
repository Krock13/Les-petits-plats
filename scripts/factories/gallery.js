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

		const img = document.createElement('img');
		img.src = picture;
		img.alt = name;
		img.className = 'recipe-image';

		const card = document.createElement('div');
		card.className = 'recipe-card';

		const h3 = document.createElement('h3');
		h3.textContent = name;
		h3.className = 'recipe-title';

		const Entitled1 = document.createElement('h4');
		Entitled1.textContent = 'recette';
		Entitled1.className = 'entitled1';

		const step = document.createElement('p');
		step.innerText = description;
		step.className = 'recipe-description';

		const Entitled2 = document.createElement('h4');
		Entitled2.textContent = 'ingrédients';
		Entitled2.className = 'entitled2';

		const ingredientGrid = document.createElement('div');
		ingredientGrid.className = 'ingredient-grid';

		ingredients.forEach((ingredient) => {
			const ingredientDiv = document.createElement('div');
			ingredientDiv.className = 'ingredient';

			const ingredientName = document.createElement('h5');
			ingredientName.textContent = ingredient.ingredient;

			const ingredientQuantity = document.createElement('p');
			if (ingredient.quantity && ingredient.unit) {
				ingredientQuantity.textContent = `${ingredient.quantity} ${ingredient.unit}`;
			} else if (ingredient.quantity) {
				ingredientQuantity.textContent = ingredient.quantity;
			}

			ingredientDiv.appendChild(ingredientName);
			ingredientDiv.appendChild(ingredientQuantity);
			ingredientGrid.appendChild(ingredientDiv);
		});

		const timeDiv = document.createElement('div');
		timeDiv.className = 'time';
		timeDiv.textContent = time + 'min';

		card.appendChild(h3);
		card.appendChild(Entitled1);
		card.appendChild(step);
		card.appendChild(Entitled2);
		card.appendChild(ingredientGrid);
		article.appendChild(img);
		article.appendChild(card);
		article.appendChild(timeDiv);

		return article;
	}
	return { getRecipeCardDOM };
}
