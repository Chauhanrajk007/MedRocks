function detectSpecialist(text) {

    text = text.toLowerCase().trim();

    const mapping = [
        { specialist: "Orthopedic", keywords: ["knee","joint","bone","fracture","back"] },
        { specialist: "Cardiologist", keywords: ["chest","heart","breath","pressure"] },
        { specialist: "Dermatologist", keywords: ["skin","rash","itch","acne"] },
        { specialist: "Dentist", keywords: ["tooth","gum","jaw"] },
        { specialist: "Neurologist", keywords: ["headache","migraine","dizziness"] }
    ];

    let bestMatch = "General Physician";
    let maxScore = 0;

    mapping.forEach(group => {
        let score = 0;

        group.keywords.forEach(keyword => {
            if (text.includes(keyword)) score++;
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

    if (!text) return;

    const specialist = detectSpecialist(text);

    console.log("Detected Specialist:", specialist);

    window.location.href =
        "doctors.html?specialist=" + encodeURIComponent(specialist);
}
