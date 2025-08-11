let fuse;

function initSearch(data) {
    const options = {
        includeScore: true,
        keys: ['subject', 'category', 'description', 'cycle', 'year', 'specialty', 'semester'],
        threshold: 0.4,
    };
    fuse = new Fuse(data, options);
}

function search(query) {
    if (!fuse) {
        console.error('Search not initialized. Call initSearch first.');
        return [];
    }
    return fuse.search(query);
}
