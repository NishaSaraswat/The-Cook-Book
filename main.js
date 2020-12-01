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
let input = document.getElementById("input");
let container = document.getElementById("container");
let APPI_ID = "ec4b29b4";
let APPI_KEY = "b9da11433e30787ee73b10e573acbf23";
searchBtn.addEventListener("click", fetchData);
let htmlContent = "";

//Events
searchBtn.addEventListener("click", fetchData);
document.getElementById("choice").onchange = getOptionValue;

//helper functions
function getOptionValue() {

    dietValue = this.value;
    fetchData2();
};

//First fetch
async function fetchData() {

    try {
        let response = await fetch(`https://api.edamam.com/search?app_id=${APPI_ID}&app_key=${APPI_KEY}&q=${input.value}`);
        let data = await response.json();
        console.log(data["hits"]);


        for (let option of data["hits"]) {

            htmlContent += `<section class="result"> 
                            <h3 style="color:cornsilk";>${option.recipe.label}</h3>
                           <img src=${option.recipe.image}>
                           <br><br>
                          <button><a href="${option.recipe.url}" 
                           target="_blank" id="full-Recipe">Full Recipe</a></button>
                           <br><br>
                        <i style="color:floralwhite";>Source:${option.recipe.source}</i>
                        <h4 style="color:brown";>healthLabels:</h4>
                        <p style="color:darkgray">${option.recipe.healthLabels}</p>
                        <br><br><br>
                        <a href="##"><h4 style="color:darkorange";>Ingredeants:</h4></a>
                        <ul class="ingredient" style="color:olivedrab";>
                        ${option.recipe.ingredientLines.join('.<br>')}
                        </ul>
                        </section><br> `



        }


        container.innerHTML = htmlContent;
        toggleIngredients();

    } catch (error) {
        throw new Error("Some thing went wrong");
    }
    htmlContent = "";
}

function toggleIngredients() {
    let ingredients = document.querySelectorAll("#container a");
    for (let ingredient of ingredients) {
        ingredient.addEventListener("click", function () {

            this.parentNode.lastElementChild.classList.toggle("ingredient");

        });
    }
}
let dietValue = "";
document.getElementById("choice").onchange = function () {

    dietValue = this.value;
    fetchData2();
};
//Second fetch
async function fetchData2() {
    try {

        let response = await fetch(`https://api.edamam.com/search?app_id=${APPI_ID}&app_key=${APPI_KEY}&q=${input.value}&diet=${dietValue}`);

        let data = await response.json();
        console.log(data);


        for (let option of data.hits) {

            htmlContent += `<section class="result"> 
                            <h3 style="color:cornsilk";>${option.recipe.label}</h3>
                            <img src=${option.recipe.image}>
                            <br><br>
                           <button><a href="${option.recipe.url}" 
                            target="_blank" id="full-Recipe">Full Recipe</a></button>
                            <br><br>
                            <h4 style="color:floralwhite";>${option.recipe.dietLabels}</h4>
                            <br>
                            <a href="##"><h4 style="color:darkorange";>Ingredeants:</h4></a>
                        <ul class="ingredient" style="color:olivedrab";>
                        ${option.recipe.ingredientLines.join('.<br>')}
                        </ul>
                            </section><br>`;

        }
        container.innerHTML = htmlContent;
        toggleIngredients();
    } catch (error) {
        throw new Error("Some thing went wrong");
    }
    htmlContent = "";
}

let multiCkeck = document.getElementById("submit");
multiCkeck.addEventListener("click", fetchData3);

let chekedValue = " ";
//Third fetch
async function fetchData3() {

    try {

        let checkBoxes = document.getElementsByName("health");
        for (let checkBox of checkBoxes) {

            if (checkBox.checked) {
                chekedValue = checkBox.value;
                console.log(chekedValue);

            }
        }

        let response = await fetch(`https://api.edamam.com/search?app_id=${APPI_ID}&app_key=${APPI_KEY}&q=${input.value}&health=${chekedValue}`);
        let data = await response.json();
        console.log(data);

        for (let option of data.hits) {

            htmlContent += `<section class="result"> 
                            <h3 style="color:cornsilk";>${option.recipe.label}</h3>
                            <img src=${option.recipe.image}>
                            <br><br>
                            <button><a href="${option.recipe.url}" 
                            target="_blank" id="full-Recipe">Full Recipe</a></button>
                            <br><br>
                            <h4 style="color:floralwhite";>${option.recipe.dietLabels}</h4>
                            <br>
                            <a href="##"><h4 style="color:darkorange";>Ingredeants:</h4></a>
                        <ul class="ingredient" style="color:olivedrab";>
                        ${option.recipe.ingredientLines.join('.<br>')}
                        </ul>
                            </section><br>`;

        }
        container.innerHTML = htmlContent;
        toggleIngredients();
    } catch (error) {
        throw new Error("Some thing went wrong");
    }
    htmlContent = "";
}
/*let more = document.getElementById("more");
more.addEventListener("click",function(){

});*/