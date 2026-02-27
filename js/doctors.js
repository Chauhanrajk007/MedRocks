async function loadDoctors() {

    const params = new URLSearchParams(window.location.search);
    const specialist = params.get("specialist");

    console.log("Specialist from URL:", specialist);

    if (!specialist) {
        document.getElementById("results").innerHTML =
            "No specialist selected.";
        return;
    }

    try {

        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/doctors?specialist=ilike.${encodeURIComponent(specialist)}`,
            {
                headers: {
                    apikey: SUPABASE_KEY,
                    Authorization: `Bearer ${SUPABASE_KEY}`
                }
            }
        );

        const data = await response.json();

        console.log("Doctors returned:", data);

        if (!data || data.length === 0) {
            document.getElementById("results").innerHTML =
                "No doctors available.";
            return;
        }

        // Default sort by distance
        data.sort((a, b) => a.distance - b.distance);

        let html = "";

        data.forEach(doc => {
            html += `
                <div>
                    <h3>${doc.name}</h3>
                    <p>${doc.clinic_name}</p>
                    <p>${doc.address}</p>
                    <p>₹${doc.price}</p>
                    <p>Distance: ${doc.distance} km</p>
                    <hr>
                </div>
            `;
        });

        document.getElementById("results").innerHTML = html;

    } catch (error) {
        console.error(error);
        document.getElementById("results").innerHTML =
            "Database connection error.";
    }
}

loadDoctors();
