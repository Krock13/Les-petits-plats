/**
 * Resets the display of list items to show all items.
 * @param {HTMLElement} list - The list element to reset.
 */
export function resetList(list) {
	list.querySelectorAll('li').forEach((item) => {
		item.style.display = 'block';
	});
}
