const dataFiles = [
    '1er anne PREPARATOIRE SEMESTRE 1.txt',
    '2eme anne PREPARATOIRE semestre 2.txt',
    '2 eme anne 1 er semestre.txt',
    '2 EME ANNE 2 EME SEMESTRE.txt',
    '1ER ANNE PREPARATOIRE ULTIMATE PACKS FROM OTHER SCHOOLS.txt',
    '1 ere anne dib SEMESTRE 1.txt',
    '1 ERE ANNE DIB 2 EME SEMESTRE.txt',
    '1 ERE ANNE DMS 1 ER SEMESTRE.txt',
    '1 ERE ANNE DMS 2EME SEMESTRE.txt',
    '2 EME ANNE DIB 1 ERE ET 2 EME SEMESTRE.txt',
    '3 EME ANNE DMS COMING SOON.txt',
    'DES FORMATIONS POR LES 3 EME ANNE DMS ET DIB.txt',
    '2 eme anne coucours.txt',
    'info enstp specialitie.txt',
    'infoabtschool.txt',
    'info2.txt',
    '3 EME ANNE DIB COMING SOON.txt',
    'qanun_al-safaqat_al-jazairi.txt',
    'mustalahat_al_ashghal_al_eumumia_wa_al_bina.txt',
    '2 EME ANNE DMS 1 ERE ET 2 EME SEMESTRE COMING SOON.txt'
];

async function fetchAllData() {
    const allResources = [];

    for (const file of dataFiles) {
        const response = await fetch(`data/${file}`);
        const content = await response.text();
        const lines = content.split('\n').filter(line => line.trim() !== '');

        const fileInfo = parseFilename(file);

        let currentSubject = 'General';
        let currentCategory = 'General';
        let currentDescription = '';

        lines.forEach((line, index) => {
            const rawLine = line;
            line = line.trim();

            if (line.toLowerCase().includes('coming soon')) {
                currentSubject = line;
                return;
            }

            if (line.startsWith('https://')) {
                const links = line.split(',').map(l => l.trim()).filter(l => l.startsWith('https://'));
                links.forEach(link => {
                    allResources.push({
                        id: `${file}-${index}-${allResources.length}`,
                        ...fileInfo,
                        subject: currentSubject,
                        category: currentCategory,
                        description: currentDescription,
                        link: link,
                        raw: rawLine,
                    });
                });
                currentDescription = ''; // Reset description
                return;
            }

            const isLinkWithLabel = line.match(/(.+?)\s+(https?:\/\/\S+)/);
            if (isLinkWithLabel) {
                const [_, label, link] = isLinkWithLabel;
                allResources.push({
                    id: `${file}-${index}-${allResources.length}`,
                    ...fileInfo,
                    subject: currentSubject,
                    category: currentCategory,
                    description: label,
                    link: link,
                    raw: rawLine,
                });
                return;
            }

            const nextLine = lines[index + 1];
            if (nextLine && nextLine.trim().startsWith('https://')) {
                currentDescription = line;
                return;
            }

            const words = line.split(' ');
            if (words.length < 5) {
                const prevLine = lines[index - 1];
                if (prevLine && !prevLine.trim().startsWith('https://')) {
                    currentSubject = line;
                    currentCategory = 'General';
                } else {
                    currentCategory = line;
                }
            } else {
                currentSubject = line;
            }
        });
    }

    return allResources;
}

function parseFilename(filename) {
    const info = { cycle: 'Other' };
    const lowerCaseFilename = filename.toLowerCase();

    if (lowerCaseFilename.includes('preparatoire')) {
        info.cycle = 'Preparatory';
        if (lowerCaseFilename.includes('1er anne')) {
            info.year = '1st Year';
        } else if (lowerCaseFilename.includes('2 eme anne')) {
            info.year = '2nd Year';
        }

        if (lowerCaseFilename.includes('semestre 1')) {
            info.semester = 'Semester 1';
        } else if (lowerCaseFilename.includes('semestre 2')) {
            info.semester = 'Semester 2';
        }
    } else if (lowerCaseFilename.includes('dib') || lowerCaseFilename.includes('dms')) {
        info.cycle = 'Engineering';
        if (lowerCaseFilename.includes('dib')) {
            info.specialty = 'DIB';
        } else {
            info.specialty = 'DMS';
        }

        if (lowerCaseFilename.includes('1 ere anne')) {
            info.year = '1st Year';
        } else if (lowerCaseFilename.includes('2 eme anne')) {
            info.year = '2nd Year';
        } else if (lowerCaseFilename.includes('3 eme anne')) {
            info.year = '3rd Year';
        }

        if (lowerCaseFilename.includes('semestre 1') || lowerCaseFilename.includes('1 er semestre')) {
            info.semester = 'Semester 1';
        } else if (lowerCaseFilename.includes('semestre 2') || lowerCaseFilename.includes('2 eme semestre')) {
            info.semester = 'Semester 2';
        }

    } else if (lowerCaseFilename.includes('coucours') || lowerCaseFilename.includes('formations')) {
        info.cycle = 'Other';
    }


    return info;
}
