document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM fully loaded and parsed');

    // Fetch and parse the data
    const data = await fetchAllData();
    console.log(`Loaded ${data.length} resources.`);

    // Initialize the search
    initSearch(data);
    console.log('Search initialized.');

    // Add event listener to the search button
    const searchButton = document.getElementById('search-button');
    const searchBar = document.getElementById('search-bar');

    const searchButton = document.getElementById('search-button');
    const searchBar = document.getElementById('search-bar');
    const searchResultsContainer = document.getElementById('search-results-container');
    const searchResultsDiv = document.getElementById('search-results');

    function displayResults(results) {
        searchResultsDiv.innerHTML = '';
        searchResultsContainer.style.display = 'block';

        if (results.length === 0) {
            searchResultsDiv.innerHTML = '<p>No results found.</p>';
            return;
        }

        const ul = document.createElement('ul');
        results.forEach(result => {
            const item = result.item;
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.link;
            a.target = '_blank';

            const breadcrumb = `${item.cycle} > ${item.year || ''} > ${item.specialty || ''} > ${item.semester || ''}`.replace(/ >  >/g, ' > ');
            a.innerHTML = `<strong>${item.subject} - ${item.category}</strong>: ${item.description || item.raw} <br><small>${breadcrumb}</small>`;

            li.appendChild(a);
            ul.appendChild(li);
        });
        searchResultsDiv.appendChild(ul);
    }

    if (searchButton && searchBar) {
        const performSearch = () => {
            const query = searchBar.value;
            if (query) {
                const results = search(query);
                displayResults(results);
            } else {
                searchResultsContainer.style.display = 'none';
            }
        };

        searchButton.addEventListener('click', performSearch);
        searchBar.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                performSearch();
            }
        });
    }
});
