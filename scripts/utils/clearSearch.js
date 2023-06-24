// Adds event listeners to the search input and clear search button to handle search input and clear functionality.
export function clearSearch() {
	const searchInput = document.getElementById('searchInput');
	const clearSearch = document.getElementById('clearSearch');

	// Event listener for search input
	searchInput.addEventListener('input', () => {
		if (searchInput.value.length > 0) {
			clearSearch.classList.add('active');
		} else {
			clearSearch.classList.remove('active');
		}
	});

	// Event listener for clear search button
	clearSearch.addEventListener('click', () => {
		searchInput.value = '';
		clearSearch.classList.remove('active');
	});
}

/**
 * Resets the display of list items to show all items.
 * @param {HTMLElement} list - The list element to reset.
 */
export function resetList(list) {
	list.querySelectorAll('li').forEach((item) => {
		item.style.display = 'block';
	});
}
