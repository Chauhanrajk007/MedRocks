function detectSpecialist(text) {

    text = text.toLowerCase();

    const mapping = [
        { specialist: "Orthopedic", keywords: ["knee","joint","bone","fracture"] },
        { specialist: "Cardiologist", keywords: ["chest","heart","breath"] },
        { specialist: "Dermatologist", keywords: ["skin","rash","itch"] },
        { specialist: "Dentist", keywords: ["tooth","gum"] },
        { specialist: "Neurologist", keywords: ["headache","migraine"] }
    ];

    let bestMatch = "General Physician";
    let maxScore = 0;

    mapping.forEach(group => {
        let score = 0;
        group.keywords.forEach(k => {
            if (text.includes(k)) score++;
        });

        if (score > maxScore) {
            maxScore = score;
            bestMatch = group.specialist;
        }
    });

    return bestMatch;
}

function startSearch() {
    const text = document.getElementById("symptom").value;
    const specialist = detectSpecialist(text);

    // redirect to doctors page with specialist
    window.location.href = 
        "doctors.html?specialist=" + encodeURIComponent(specialist);
}
