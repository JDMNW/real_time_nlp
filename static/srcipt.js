function analyzeText() {
    const text = document.getElementById("textInput").value;

    fetch("/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: text })
    })
    .then(response => response.json())
    .then(data => {

        // Sentiment
        document.getElementById("sentimentResult").innerText =
            data.sentiment + " (Score: " + data.score + ")";

        // Entities
        const entityList = document.getElementById("entityResult");
        entityList.innerHTML = "";

        if (data.entities.length === 0) {
            entityList.innerHTML = "<li>No entities found</li>";
        } else {
            data.entities.forEach(ent => {
                const li = document.createElement("li");
                li.textContent = ent.text + " → " + ent.label;
                entityList.appendChild(li);
            });
        }
    });
}
