async function loadProfile() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const response = await fetch(
        `${SUPABASE_URL}/rest/v1/doctors?id=eq.${id}`,
        {
            headers: {
                apikey: SUPABASE_KEY,
                Authorization: `Bearer ${SUPABASE_KEY}`
            }
        }
    );

    const data = await response.json();
    const doc = data[0];

    document.getElementById("profile").innerHTML = `
        <h2>${doc.name}</h2>
        <p>${doc.clinic_name}</p>
        <p>${doc.address}</p>
        <p>${doc.phone}</p>
        <p>Available: ${doc.available_days}</p>
        <p>Time: ${doc.available_from} - ${doc.available_to}</p>
        <p>Expertise: ${doc.expertise}</p>
        <p>About: ${doc.about}</p>
    `;
}

loadProfile();