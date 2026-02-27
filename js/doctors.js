let doctorData = [];

async function loadDoctors() {

    const response = await fetch(
        `${SUPABASE_URL}/rest/v1/doctors`,
        {
            headers: {
                apikey: SUPABASE_KEY,
                Authorization: `Bearer ${SUPABASE_KEY}`
            }
        }
    );

    doctorData = await response.json();

    if (!doctorData || doctorData.length === 0) {
        document.getElementById("results").innerHTML =
            "No doctors available.";
        return;
    }

    // Default sort
    doctorData.sort((a, b) => a.distance - b.distance);

    displayDoctors(doctorData);
}

function displayDoctors(data) {

    let html = "";

    data.forEach(doc => {
        html += `
            <div>
                <h3>${doc.name}</h3>
                <p>${doc.specialist}</p>
                <p>₹${doc.price}</p>
                <p>Distance: ${doc.distance} km</p>
                <p>Rating: ${doc.rating}</p>
                <p>Experience: ${doc.experience} years</p>
                <hr>
            </div>
        `;
    });

    document.getElementById("results").innerHTML = html;
}

function applySort() {

    const option = document.getElementById("sortOption").value;

    if (option === "price")
        doctorData.sort((a, b) => a.price - b.price);

    if (option === "rating")
        doctorData.sort((a, b) => b.rating - a.rating);

    if (option === "experience")
        doctorData.sort((a, b) => b.experience - a.experience);

    if (option === "distance")
        doctorData.sort((a, b) => a.distance - b.distance);

    displayDoctors(doctorData);
}

loadDoctors();
