
//selectors
let searchBtn = document.getElementById("search");
let input = document.getElementById("input");
let container = document.getElementById("container");
let APPI_ID = "ec4b29b4";
let APPI_KEY = "b9da11433e30787ee73b10e573acbf23";
let htmlContent = "";
let dietValue="";

//Events
searchBtn.addEventListener("click", fetchData);
document.getElementById("choice").onchange=getOptionValue;
input.addEventListener("keyup",autoComplete);

//helper functions
function getOptionValue(){
    
    dietValue= this.value;
    fetchData2();
};
function autoComplete(){
    let inputValue = this.value;
    if(inputValue.trim()!=""){

        fetchData();
    }else{
        
        alert("Please Enter a recipe name");
        
    }
    
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


async function fetchData2() {
    try {
        
        let htmlContent = "";
        let response = await fetch(`https://api.edamam.com/search?app_id=${APPI_ID}&app_key=${APPI_KEY}&q=${input.value}&diet=${dietValue}`);

        let data = await response.json();
        console.log(data);


        for (let option of data.hits) {

            htmlContent += `<section class="result"> 
                            <h3>${option.recipe.label}</h3>
                            <img src=${option.recipe.image}>
                            <h4>${option.recipe.dietLabels}<h4>
                            <p><a href="${option.recipe.url}">Recipe</a></p>
                            </section>`;
        }
        container.innerHTML = htmlContent;
    } catch (error) {
        throw new Error("Some thing went wrong");
    }

}

let multiCkeck = document.getElementById("submit");
multiCkeck.addEventListener("click",fetchData3);

let chekedValue =" ";

async function fetchData3() {

    try {

        let checkBoxes = document.getElementsByName("excluded");
        for (let checkBox of checkBoxes) {

            if (checkBox.checked) {
                chekedValue = checkBox.value;
                console.log(chekedValue);
                
            }
        }
        
        let htmlContent = "";
        let response = await fetch(`https://api.edamam.com/search?app_id=${APPI_ID}&app_key=${APPI_KEY}&q=${input.value}&excluded=${chekedValue}`);
        let data = await response.json();
        console.log(data);
        
        for (let option of data.hits) {

            htmlContent += `<section class="result"> 
                            <h3>${option.recipe.label}</h3>
                            <img src=${option.recipe.image}>
                            <h4>${option.recipe.dietLabels}<h4>
                            <p><a href="${option.recipe.url}">Recipe</a></p>
                            </section>`;
        }
        container.innerHTML = htmlContent;
    } catch (error) {
        throw new Error("Some thing went wrong");
    }

}
/*let more = document.getElementById("more");
more.addEventListener("click",function(){

});*/