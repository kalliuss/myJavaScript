const getMealBtn = document.getElementById("get-meal");

getMealBtn.addEventListener("click", () => {
    // API'den veri çekiyoruz.

    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(response => response.json()) // JSON formatına çeviriyoruz
        .then(data => {
            const meal = data.meals[0];
            const mealName = meal.strMeal;
            const mealImg = meal.strMealThumb;
            const mealInstructions = meal.strInstructions;
            const mealContainer = document.getElementById("meal-container");
            const fullInstructions = mealInstructions;
            const shortInstructions = mealInstructions.length > 200 ? mealInstructions.substring(0, 200) + "..." : mealInstructions;
            mealContainer.innerHTML = `
            <h2>${mealName}</h2>
            <img src="${mealImg}" alt="Yemek resmi" />
            <p id="instructions">${shortInstructions}</p>
            <button id="toggle-instructions">Devamını Gör</button>
            `;
        // Buton varsa davranışı ekle
        const toggleBtn = document.getElementById('toggle-instructions');
        if (toggleBtn) {
            let isShort = true;
            toggleBtn.addEventListener('click', () => {
                const instructionsP = document.getElementById('instructions');
                if (isShort) {
                    instructionsP.textContent = fullInstructions;
                    toggleBtn.textContent = "Kısalt";
                    isShort = false;
                } else {
                    instructionsP.textContent = shortInstructions;
                    toggleBtn.textContent = "Devamını Gör";
                    isShort = true;
                }
            });
        }
        })
        .catch(error => {
            console.log("Hata oluştu:", error);
        });
});

