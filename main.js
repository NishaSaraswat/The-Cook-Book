
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
document.getElementById("choice").onchange=getOptionValue;

//helper functions
function getOptionValue(){
    
    dietValue= this.value;
    fetchData2();
};

//First fetch
async function fetchData() {

    try {
        let response = await fetch(`https://api.edamam.com/search?app_id=${APPI_ID}&app_key=${APPI_KEY}&q=${input.value}`);
        let data = await response.json();
        console.log(data["hits"]);


        for (let hit of data["hits"]) {


            htmlContent += `
                            <section class="result"> 
                            <h3>${hit.recipe.label}</h3>
                           <img src=${hit.recipe.image}>
                           <br>
                        <i>Source:${hit.recipe.source}</i>
                        <p><a href="${hit.recipe.url}">Recipe</a></p>
                        <h4>healthLabels:</h4>
                        <span>${hit.recipe.healthLabels}</span>;
                        <h4>Ingredeants:</h4>
                        <ul>
                        ${hit.recipe.ingredientLines.join('.<br>')}
                        </ul>
                        </section>
                        `

        }


        container.innerHTML = htmlContent;

    } catch (error) {
        throw new Error("Some thing went wrong");
    }
    htmlContent = "";
}
let dietValue="";
document.getElementById("choice").onchange=function(){
    
    dietValue= this.value;
    fetchData2();
};

async function fetchData2() {
    try {
        
        let htmlContent2 = "";
        let response = await fetch(`https://api.edamam.com/search?app_id=${APPI_ID}&app_key=${APPI_KEY}&q=${input.value}&diet=${dietValue}`);

        let data = await response.json();
        console.log(data);


        for (let option of data.hits) {

            htmlContent2 += `<section class="result"> 
                            <h3>${option.recipe.label}</h3>
                            <img src=${option.recipe.image}>
                            <h4>${option.recipe.dietLabels}<h4>
                            <p><a href="${option.recipe.url}">Recipe</a></p>
                            </section>`;
        }
        container.innerHTML = htmlContent2;
    } catch (error) {
        throw new Error("Some thing went wrong");
    }

}

let multiCkeck = document.getElementById("submit");
multiCkeck.addEventListener("click",fetchData3);

let chekedValue =" ";

async function fetchData3(input2) {

    try {

        let checkBoxes = document.getElementsByName("excluded");
        for (let checkBox of checkBoxes) {

            if (checkBox.checked) {
                chekedValue = checkBox.value;
                console.log(chekedValue);
                
            }
        }
        
        let htmlContent3 = "";
        let response = await fetch(`https://api.edamam.com/search?app_id=${APPI_ID}&app_key=${APPI_KEY}&q=${input.value}&excluded=${chekedValue}`);
        let data = await response.json();
        console.log(data);
        
        for (let option of data.hits) {

            htmlContent3 += `<section class="result"> 
                            <h3>${option.recipe.label}</h3>
                            <img src=${option.recipe.image}>
                            <h4>${option.recipe.dietLabels}<h4>
                            <p><a href="${option.recipe.url}">Recipe</a></p>
                            </section>`;
        }
        container.innerHTML = htmlContent3;
    } catch (error) {
        throw new Error("Some thing went wrong");
    }

}
/*let more = document.getElementById("more");
more.addEventListener("click",function(){

});*/