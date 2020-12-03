/**
 *  Edamam recipes:https://github.com/public-apis/public-apis#food--drink
 *	Documentation: https://developer.edamam.com/edamam-docs-recipe-api
 *  Generate an API and APIid key here: https://developer.edamam.com/edamam-recipe-api
 */


/**
 * According to documentation, you need these parameters when calling the API https://api.edamam.com/
 * 1 Required parameter: APIkey
 * 1 Required parameter: APIid
 * 1 Required parameter: q.
 *
 * 
 * Example with parameter q=pasta
 * https://api.edamam.com/search?apikey=[yourkey]&q=pasta
 *
 * Example with parameter q=pasta AND diet=low-carb
 * http://www.omdbapi.com/?apikey=[yourkey]&q=pasta&diet=low-carb
 *
 * Example with parameter q=pasta AND health=vegan
 * http://www.omdbapi.com/?apikey=[yourkey]&q=pasta&health=vegan
 *
 */


//selectors
let searchBtn = document.getElementById("search");
let searchform = document.querySelector("form");
let input = document.getElementById("input");
let container = document.getElementById("container");
let multiCkeck = document.getElementById("submit");
let checkBoxes = document.getElementsByName("health");
let defaultDietValue = document.getElementById("default");
let htmlContent = "";
let dietValue = "";
let chekedValue = " ";
let searchQuery = " ";
let hitsData ="";
//Edamam sellectors
let APPI_ID = "ec4b29b4";
let APPI_KEY = "b9da11433e30787ee73b10e573acbf23";
let baseURL = `https://api.edamam.com/search?`;


//Events
searchBtn.addEventListener("click",fetchData);
searchform.addEventListener("submit",(e)=>{
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchData();
});
document.getElementById("choice").onchange = getOptionValue;
multiCkeck.addEventListener("click", fetchData3);


//First fetch
async function fetchData() {

    try {
        let response = await fetch(`${baseURL}&q=${input.value}&to=20&app_id=${APPI_ID}&app_key=${APPI_KEY}`);
        let data = await response.json();
         hitsData= (data.hits);
        htmlGeneratorfetch(hitsData);
        container.innerHTML = htmlContent;
        toggleIngredients();

    } catch (error) {
        throw new Error("Some thing went wrong");
    }
    htmlContent = "";
}

//Second fetch
async function fetchData2() {
    try {

        let response = await fetch(`${baseURL}&q=${input.value}&to=20&diet=${dietValue}&app_id=${APPI_ID}&app_key=${APPI_KEY}`);

        let data = await response.json();
        hitsData = data.hits;
        htmlGeneratorfetch(hitsData);
        container.innerHTML = htmlContent;
        toggleIngredients();
    } catch (error) {
        throw new Error("Some thing went wrong");
    }
    htmlContent = "";
}

//Third fetch
async function fetchData3() {

    try {

        checkBox();
        let response = await fetch(`${baseURL}&q=${input.value}&to=20&health=${chekedValue}&app_id=${APPI_ID}&app_key=${APPI_KEY}`);
        let data = await response.json();

        hitsData = data.hits;

        htmlGeneratorfetch(hitsData);
        container.innerHTML = htmlContent;
        toggleIngredients();
    } catch (error) {
        throw new Error("Some thing went wrong");
    }
    htmlContent = "";
}

//Helper functions

function getOptionValue() {

    dietValue = this.value;
    fetchData2();
};

function toggleIngredients() {
    let ingredients = document.querySelectorAll("#container a");
    for (let ingredient of ingredients) {
        ingredient.addEventListener("click", function () {

            this.parentNode.lastElementChild.classList.toggle("ingredient");

        });
    }
}

function checkBox() {
    for (let checkBox of checkBoxes) {

        if (checkBox.checked) {
            chekedValue = checkBox.value;

        }
    }
}

function htmlGeneratorfetch(hitsData) {
    for (let option of hitsData) {

        htmlContent += `<section class="result"> 
                        <h3 style="color:cornsilk";>${option.recipe.label}</h3>
                       <img src=${option.recipe.image}>
                       <br><br>
                      <button><a href="${option.recipe.url}" 
                       target="_blank" id="full-Recipe">Full Recipe</a></button>
                    <i style="color:floralwhite";>Source:${option.recipe.source}</i>
                    <h3 style="color:forestgreen">${option.recipe.dietLabels}</h3>
                    <h4 style="color:brown";>healthLabels:</h4>
                    <p style="color:darkgray";>${option.recipe.healthLabels}</p>
                    <br>
                    <a href="##"><h4 style="color:darkorange";>Ingredeants:</h4></a>
                    <ul class="ingredient" style="color:olivedrab";>
                    ${option.recipe.ingredientLines.join('.<br>')}
                    </ul>
                    </section><br> `
    }

}

