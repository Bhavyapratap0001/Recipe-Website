const searchbox = document.querySelector(".searchbox");
const searchbutton = document.querySelector(".searchbutton");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");
// const searchInput = document.querySelector(".searchInput");

const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>"
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML = "";

    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>

        `

        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        button.addEventListener('click' , ()=>{
            openRecipePopup(meal);
        
        });

        recipeContainer.appendChild(recipeDiv);
        
    });
    // console.log(response);
    
}

const fetchIngredents = (meal) => {
    let ingredentsList = "";
    for(let i=1; i<=20; i++){
        const ingredent = meal[`strIngredient${i}`];
        if(ingredent){
            const measure = meal[`strMeasure${i}`];
            ingredentsList += `<li>${measure} ${ingredent}</li>`

        }
        else{
            break;
        }
    }
    return ingredentsList;
    
}
const openRecipePopup = (meal)=>{
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="ingredientsList">${fetchIngredents(meal)}</ul1>   
    <div class="recipeInstructions">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div> 
    `

    

    recipeDetailsContent.parentElement.style.display = "block";


}


recipeCloseBtn.addEventListener('click', ()=>{
    recipeDetailsContent.parentElement.style.display = "none";

});
          
searchbutton.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInput = searchbox.value.trim();
    fetchRecipes(searchInput);
   

    // console.log("button clicked");
    
});                