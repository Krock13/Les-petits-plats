import { globalSearch, removeSearch } from '../utils/search.js';
import { filterList } from '../utils/search.js';

/**
 * Generates a dropdown list based on the specified parameters.
 * @param {string} buttonId - The ID of the button element that triggers the display of the dropdown list.
 * @param {string} containerId - The ID of the container element for the dropdown list.
 * @param {string} labelText -  The label text for the dropdown list.
 * @param {string} dataKey -  The key of the data to use for generating the dropdown options.
 */

const selectionContainer = document.getElementById('selectionContainer');

export function generateDropdownList(buttonId, containerId, labelText, dataKey) {
	const searchInputId = dataKey;
	const selectedItems = new Set();

	const button = document.getElementById(buttonId);

	button.addEventListener('click', () => {
		const container = document.getElementById(containerId);
		container.classList.add('container-filter-open');

		const list = document.createElement('ul');
		list.className = 'dropdown-menu';

		const uniqueItems = new Set();

		// Create label item
		const labelItem = document.createElement('li');
		labelItem.className = 'dropdown-label';
		labelItem.innerText = labelText;
		labelItem.addEventListener('click', () => {
			list.remove();
			button.style.display = 'block';
			container.classList.remove('container-filter-open');
		});

		// Create arrow icon
		const arrowUp = document.createElement('img');
		arrowUp.className = 'arrow-up';
		arrowUp.src = './assets/icons/arrow.svg';
		arrowUp.alt = 'Flèche vers le haut';
		list.appendChild(labelItem);
		labelItem.appendChild(arrowUp);

		// Create search input item
		const searchItem = document.createElement('li');
		searchItem.className = 'search-list dropdown-search';
		const searchInput = document.createElement('input');
		searchInput.type = 'text';
		searchInput.className = 'search-input';

		const clearSearch = document.createElement('span');
		clearSearch.className = 'clear-search-mini';

		// Event listener for input in search bar
		searchInput.addEventListener('input', () => {
			if (searchInput.value.length > 0) {
				clearSearch.classList.add('active');
			} else {
				clearSearch.classList.remove('active');
			}
		});

		// Event listener for input change in search bar
		searchInput.addEventListener('input', () => {
			const searchTerm = searchInput.value.toLowerCase();
			const filteredItems = Array.from(list.children)
				.slice(2)
				.filter((item) => {
					const text = item.textContent.toLowerCase();
					return (
						!item.classList.contains('dropdown-label') &&
						!item.classList.contains('dropdown-search') &&
						text.includes(searchTerm)
					);
				});

			list.querySelectorAll('li').forEach((item) => {
				if (
					filteredItems.includes(item) ||
					item.classList.contains('dropdown-label') ||
					item.classList.contains('dropdown-search') ||
					item.classList.contains('selected-item')
				) {
					item.style.display = 'block';
				} else {
					item.style.display = 'none';
				}
			});
		});

		// Event listener for clear search button
		clearSearch.addEventListener('click', () => {
			searchInput.value = '';
			clearSearch.classList.remove('active');
			list.querySelectorAll('li').forEach((item) => {
				item.style.display = 'block';
			});
		});

		searchItem.appendChild(searchInput);
		searchItem.appendChild(clearSearch);
		list.appendChild(searchItem);

		const recipes = filterList();

		// Collect unique items from recipes data
		recipes.forEach((recipe) => {
			const data = recipe[dataKey];
			if (Array.isArray(data)) {
				data.forEach((item) => {
					if (typeof item === 'object' && item !== null) {
						uniqueItems.add(item.ingredient.toLowerCase());
					} else {
						uniqueItems.add(item.toLowerCase());
					}
				});
			} else {
				uniqueItems.add(data.toLowerCase());
			}
		});

		// Remove already selected items from uniqueItems
		selectedItems.forEach((item) => {
			uniqueItems.delete(item.toLowerCase());
		});

		// Create selected items list if there are selected items
		if (selectedItems.size > 0) {
			const selectedList = document.createElement('ul');
			selectedList.className = 'selected-list';

			selectedItems.forEach((item) => {
				const selectedItem = document.createElement('li');
				selectedItem.className = 'selected-item';
				const formattedItem = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
				selectedItem.textContent = formattedItem;

				selectedList.appendChild(selectedItem);
			});

			list.appendChild(selectedList);
		}

		// Create list items for uniqueItems
		uniqueItems.forEach((item) => {
			const listItem = document.createElement('li');
			const formattedItem = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
			listItem.textContent = formattedItem;

			listItem.addEventListener('click', () => {
				const selectedItem = listItem.textContent;
				const span = document.createElement('span');
				span.className = 'item-selected';
				span.textContent = selectedItem;
				selectionContainer.appendChild(span);
				globalSearch(selectedItem, searchInputId);

				const cross = document.createElement('img');
				cross.src = './assets/icons/cross-black.svg';
				cross.alt = 'Croix';
				cross.className = 'item-cross';
				span.appendChild(cross);

				cross.addEventListener('click', () => {
					removeSearch(selectedItem);
					selectedItems.delete(selectedItem);
					span.remove();
				});

				selectedItems.add(selectedItem);

				list.remove();
				button.style.display = 'block';
				container.classList.remove('container-filter-open');
			});

			list.appendChild(listItem);
		});

		button.style.display = 'none';
		container.appendChild(list);
	});
}
