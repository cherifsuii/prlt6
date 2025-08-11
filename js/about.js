document.addEventListener('DOMContentLoaded', async () => {
    const aboutSchoolDiv = document.getElementById('about-school-info');
    const aboutSchoolDiv2 = document.getElementById('about-school-info2');

    if (aboutSchoolDiv) {
        try {
            const response = await fetch('data/infoabtschool.txt');
            const text = await response.text();
            aboutSchoolDiv.innerHTML = `<pre class="info-text">${text}</pre>`;
        } catch (error) {
            console.error('Error loading infoabtschool.txt:', error);
            aboutSchoolDiv.innerHTML = '<p>Error loading information.</p>';
        }
    }

    if (aboutSchoolDiv2) {
        try {
            const response = await fetch('data/info2.txt');
            const text = await response.text();
            aboutSchoolDiv2.innerHTML = `<pre class="info-text">${text}</pre>`;
        } catch (error) {
            console.error('Error loading info2.txt:', error);
            aboutSchoolDiv2.innerHTML = '<p>Error loading information.</p>';
        }
    }
});
