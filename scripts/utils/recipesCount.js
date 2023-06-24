/**
 * Updates the recipe count displayed on the page with the total number of recipes.
 * @param {Array} recipes - The array of recipes.
 */
export function recipesCount(recipes) {
	const count = document.getElementById('recipeCount');
	const countRecipes = recipes.length;
	count.innerText = countRecipes;
}
