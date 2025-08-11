document.addEventListener('DOMContentLoaded', async () => {
    const contentDiv = document.getElementById('resources-content');
    if (!contentDiv) return;

    try {
        const data = await fetchAllData();
        const otherData = data.filter(r => r.cycle === 'Other');

        if (otherData.length === 0) {
            contentDiv.innerHTML = '<p>No resources found.</p>';
            return;
        }

        const sections = {
            'Competition Preparation': '2 eme anne coucours.txt',
            'Advanced Formations': 'DES FORMATIONS POR LES 3 EME ANNE DMS ET DIB.txt',
            'Technical & Legal Library': ['qanun_al-safaqat_al-jazairi.txt', 'mustalahat_al_ashghal_al_eumumia_wa_al_bina.txt'],
            'Resources from Other Schools': '1ER ANNE PREPARATOIRE ULTIMATE PACKS FROM OTHER SCHOOLS.txt'
        };

        for (const sectionTitle in sections) {
            const section = document.createElement('section');
            section.className = 'resources-section';

            const title = document.createElement('h2');
            title.textContent = sectionTitle;
            section.appendChild(title);

            const resourcesList = document.createElement('ul');
            const fileMatcher = sections[sectionTitle];

            const sectionData = otherData.filter(r => {
                if (Array.isArray(fileMatcher)) {
                    return fileMatcher.some(f => r.id.startsWith(f));
                }
                return r.id.startsWith(fileMatcher);
            });

            if (sectionData.length > 0) {
                sectionData.forEach(resource => {
                    const resourceItem = document.createElement('li');
                    const resourceLink = document.createElement('a');
                    resourceLink.href = resource.link;
                    resourceLink.textContent = resource.description || resource.subject || 'Link';
                    resourceLink.target = '_blank';
                    resourceItem.appendChild(resourceLink);
                    resourcesList.appendChild(resourceItem);
                });
                section.appendChild(resourcesList);
            } else {
                const noDataText = document.createElement('p');
                noDataText.textContent = 'No resources available in this section yet.';
                section.appendChild(noDataText);
            }
            contentDiv.appendChild(section);
        }

    } catch (error) {
        console.error('Error loading resources data:', error);
        contentDiv.innerHTML = '<p>Error loading data. Please try again later.</p>';
    }
});
