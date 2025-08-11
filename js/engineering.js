document.addEventListener('DOMContentLoaded', async () => {
    const infoDiv = document.getElementById('engineering-info');
    if (!infoDiv) return;

    try {
        const response = await fetch('data/info enstp specialitie.txt');
        const text = await response.text();

        // Convert the text to HTML, preserving line breaks
        infoDiv.innerHTML = `<pre>${text}</pre>`;
    } catch (error) {
        console.error('Error loading engineering info:', error);
        infoDiv.innerHTML = '<p>Error loading information.</p>';
    }
});
