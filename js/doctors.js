async function loadDoctors() {

    const params = new URLSearchParams(window.location.search);
    const specialist = params.get("specialist");

    if (!specialist) {
        document.getElementById("results").innerHTML = "No specialist selected.";
        return;
    }

const response = await fetch(
  `${SUPABASE_URL}/rest/v1/doctors?specialist=ilike.${specialist}`,
  {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`
    }
  }
);

    const data = await response.json();

    if (!data.length) {
        document.getElementById("results").innerHTML = "No doctors found.";
        return;
    }

    data.sort((a,b)=>a.distance-b.distance);

    let html = "";

    data.forEach(doc => {
        html += `
            <div>
                <h3>${doc.name}</h3>
                <p>${doc.clinic_name}</p>
                <p>₹${doc.price}</p>
                <button onclick="viewProfile(${doc.id})">
                    View Profile
                </button>
                <hr>
            </div>
        `;
    });

    document.getElementById("results").innerHTML = html;
}

function viewProfile(id) {
    window.location.href = "profile.html?id=" + id;
}

loadDoctors();

