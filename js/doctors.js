let doctorData = [];

async function loadDoctors() {

    document.getElementById("results").innerHTML = "Loading...";

    try {

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

        console.log("Loaded Doctors:", doctorData);

        if (!doctorData || doctorData.length === 0) {
            document.getElementById("results").innerHTML =
                "No doctors available.";
            return;
        }

        // Default sort by distance
        doctorData.sort((a, b) =>
            Number(a.distance || 0) - Number(b.distance || 0)
        );

        displayDoctors(doctorData);

    } catch (error) {
        console.error("Fetch Error:", error);
        document.getElementById("results").innerHTML =
            "Database connection error.";
    }
}

function displayDoctors(data) {

    let html = "";

    data.forEach(doc => {

        html += `
            <div style="border:1px solid #ccc; padding:10px; margin-bottom:10px;">
                <h3>${doc.name}</h3>
                <p><b>Specialist:</b> ${doc.specialist}</p>
                <p><b>Clinic:</b> ${doc.clinic_name || "-"}</p>
                <p><b>Fee:</b> ₹${doc.price}</p>
                <p><b>Distance:</b> ${doc.distance} km</p>
                <p><b>Rating:</b> ${doc.rating}</p>
                <p><b>Experience:</b> ${doc.experience} years</p>
            </div>
        `;
    });

    document.getElementById("results").innerHTML = html;
}

function applySort() {

    const option = document.getElementById("sortOption").value;

    console.log("Sorting by:", option);

    if (option === "price") {
        doctorData.sort((a, b) =>
            Number(a.price || 0) - Number(b.price || 0)
        );
    }

    if (option === "rating") {
        doctorData.sort((a, b) =>
            Number(b.rating || 0) - Number(a.rating || 0)
        );
    }

    if (option === "experience") {
        doctorData.sort((a, b) =>
            Number(b.experience || 0) - Number(a.experience || 0)
        );
    }

    if (option === "distance") {
        doctorData.sort((a, b) =>
            Number(a.distance || 0) - Number(b.distance || 0)
        );
    }

    displayDoctors(doctorData);
}

loadDoctors();
