document.addEventListener('DOMContentLoaded', async () => {
    const contentDiv = document.getElementById('preparatory-content');
    if (!contentDiv) return;

    try {
        const data = await fetchAllData();
        const preparatoryData = data.filter(r => r.cycle === 'Preparatory');

        if (preparatoryData.length === 0) {
            contentDiv.innerHTML = '<p>No preparatory data found.</p>';
            return;
        }

        // Group by year
        const years = groupBy(preparatoryData, 'year');

        for (const year of Object.keys(years).sort()) {
            const yearSection = document.createElement('section');
            yearSection.className = 'year-section';

            const yearTitle = document.createElement('h2');
            yearTitle.textContent = year;
            yearSection.appendChild(yearTitle);

            const yearData = years[year];
            const semesters = groupBy(yearData, 'semester');

            for (const semester of Object.keys(semesters).sort()) {
                const semesterSection = document.createElement('div');
                semesterSection.className = 'semester-section';

                const semesterTitle = document.createElement('h3');
                semesterTitle.textContent = semester;
                semesterSection.appendChild(semesterTitle);

                const semesterData = semesters[semester];
                const subjects = groupBy(semesterData, 'subject');

                const subjectsGrid = document.createElement('div');
                subjectsGrid.className = 'subjects-grid';

                for (const subject of Object.keys(subjects)) {
                    const subjectCard = document.createElement('div');
                    subjectCard.className = 'subject-card';

                    const subjectTitle = document.createElement('h4');
                    subjectTitle.textContent = subject;
                    subjectCard.appendChild(subjectTitle);

                    const resourcesList = document.createElement('ul');
                    const resources = subjects[subject];
                    resources.forEach(resource => {
                        const resourceItem = document.createElement('li');
                        const resourceLink = document.createElement('a');
                        resourceLink.href = resource.link;
                        resourceLink.textContent = `${resource.category} - ${resource.description || 'Link'}`;
                        resourceLink.target = '_blank';
                        resourceItem.appendChild(resourceLink);
                        resourcesList.appendChild(resourceItem);
                    });
                    subjectCard.appendChild(resourcesList);
                    subjectsGrid.appendChild(subjectCard);
                }
                semesterSection.appendChild(subjectsGrid);
                yearSection.appendChild(semesterSection);
            }
            contentDiv.appendChild(yearSection);
        }

    } catch (error) {
        console.error('Error loading preparatory data:', error);
        contentDiv.innerHTML = '<p>Error loading data. Please try again later.</p>';
    }
});

function groupBy(array, key) {
    return array.reduce((result, currentValue) => {
        const groupKey = currentValue[key] || 'General';
        (result[groupKey] = result[groupKey] || []).push(currentValue);
        return result;
    }, {});
}
