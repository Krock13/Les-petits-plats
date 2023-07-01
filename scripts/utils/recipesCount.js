/**
 * Updates the recipe count displayed on the page with the total number of recipes.
 * @param {Array} recipes - The array of recipes.
 */
export function recipesCount(recipesSet) {
	const count = document.getElementById('recipeCount');
	const countRecipes = recipesSet.size;
	count.innerText = countRecipes;
}
