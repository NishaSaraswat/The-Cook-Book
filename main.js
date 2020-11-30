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


            htmlContent += `<a href="${option.recipe.url}" 
                            target="_blank">Full Recipe</a>`
            htmlContent += `<section class="result"> 
                            <h3>${option.recipe.label}</h3>
                           <img src=${option.recipe.image}>
                           <br>
                        <i>Source:${option.recipe.source}</i>
                        <h4>healthLabels:</h4>
                        <span>${option.recipe.healthLabels}</span>;
                        <a href="##"><h4>Ingredeants:</h4></a>
                        <ul class="ingredient">
                        ${option.recipe.ingredientLines.join('.<br>')}
                        </ul>
                        </section>
                        `
           

        }


        container.innerHTML = htmlContent;
        toggleIngredients();

    } catch (error) {
        throw new Error("Some thing went wrong");
    }
    htmlContent = "";
}
function toggleIngredients(){
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

async function fetchData2() {
    try {

        let response = await fetch(`https://api.edamam.com/search?app_id=${APPI_ID}&app_key=${APPI_KEY}&q=${input.value}&diet=${dietValue}`);

        let data = await response.json();
        console.log(data);


        for (let option of data.hits) {

            htmlContent += `<section class="result"> 
                            <h3>${option.recipe.label}</h3>
                            <img src=${option.recipe.image}>
                            <h4>${option.recipe.dietLabels}<h4>
                            <p><a href="${option.recipe.url}">Recipe</a></p>
                            <a href="##"><h4>Ingredeants:</h4></a>
                        <ul class="ingredient">
                        ${option.recipe.ingredientLines.join('.<br>')}
                        </ul>
                            </section>`;
        }
        container.innerHTML = htmlContent;
        toggleIngredients();
    } catch (error) {
        throw new Error("Some thing went wrong");
    }

}

let multiCkeck = document.getElementById("submit");
multiCkeck.addEventListener("click", fetchData3);

let chekedValue = " ";

async function fetchData3() {

    try {

        let checkBoxes = document.getElementsByName("excluded");
        for (let checkBox of checkBoxes) {

            if (checkBox.checked) {
                chekedValue = checkBox.value;
                console.log(chekedValue);

            }
        }

        let response = await fetch(`https://api.edamam.com/search?app_id=${APPI_ID}&app_key=${APPI_KEY}&q=${input.value}&excluded=${chekedValue}`);
        let data = await response.json();
        console.log(data);

        for (let option of data.hits) {

            htmlContent += `<section class="result"> 
                            <h3>${option.recipe.label}</h3>
                            <img src=${option.recipe.image}>
                            <h4>${option.recipe.dietLabels}<h4>
                            <p><a href="${option.recipe.url}">Recipe</a></p>
                            <a href="##"><h4>Ingredeants:</h4></a>
                        <ul class="ingredient">
                        ${option.recipe.ingredientLines.join('.<br>')}
                        </ul>
                            </section>`;
        }
        container.innerHTML = htmlContent;
        toggleIngredients();
    } catch (error) {
        throw new Error("Some thing went wrong");
    }

}
/*let more = document.getElementById("more");
more.addEventListener("click",function(){

});*/