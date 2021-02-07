// search button event handler---
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', function () {
    const getMealName = document.getElementById('meal-name').value;
    const mealNameLength = getMealName.length;
    const errors = document.getElementById('for-empty-string');
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${getMealName}`;
    // search with first letter---
    if (mealNameLength == 1) {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${getMealName}`;
        errors.style.display = 'none';
    }
    // empty search box error---
    else if (getMealName === "") {
        errors.innerText = 'Please Provide Food Name to Get Your Menu!!!'
    }
    // search with full name---
    else {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${getMealName}`;
        errors.style.display = 'none';
    }
    fetch(url)
        .then(res => res.json())
        .then(data => showMeals(data.meals))
    const showMeals = meals => {
        // wrong typing or random things error---
        if (meals === null) {
            errors.style.display = 'block';
            errors.innerText = "Sorry! Your Searched Food is not available!"
        }
        // meal displayer---
        else {
            const mealsDiv = document.getElementById('meals');
            mealsDiv.innerHTML = " ";
            meals.forEach(meal => {
                const mealDiv = document.createElement('div');
                mealDiv.className = 'meal-list';
                const mealInfo = `
                <div onclick = "showIngredients('${meal.strMeal}')" class="meal-info-area">
                    <img id="meal-image" class="meal-img" src="${meal.strMealThumb}">
                    <h4>${meal.strMeal}</h4>
                </div>
            `;
                mealDiv.innerHTML = mealInfo;
                mealsDiv.appendChild(mealDiv);

            });
        }
    }
})
// ingredients shower---
const showIngredients = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    fetch(url)
        .then(res => res.json())
        .then(data => ingredientsInfo(data.meals[0]))
}
const ingredientsInfo = info => {
    console.log(info);
    const ingredientDiv = document.getElementById('ingredients-info');
    ingredientDiv.innerHTML = `
        <div class="ingredient-area">
            <img src ="${info.strMealThumb}">
            <h1>${info.strMeal}</h1>
            <h3>${'Ingredients'}</h3>
                <p>${info.strIngredient1} ${info.strMeasure1}</p>
                <p>${info.strIngredient2} ${info.strMeasure2}</p>
                <p>${info.strIngredient3} ${info.strMeasure3}</p>
                <p>${info.strIngredient4} ${info.strMeasure4}</p>
                <p>${info.strIngredient5} ${info.strMeasure5}</p>
                <p>${info.strIngredient6} ${info.strMeasure6}</p>
                <p>${info.strIngredient7} ${info.strMeasure7}</p>
                <p>${info.strIngredient8} ${info.strMeasure8}</p>
                <p>${info.strIngredient9} ${info.strMeasure9}</p>
                <p>${info.strIngredient10} ${info.strMeasure10}</p>
        </div>
    `
}

