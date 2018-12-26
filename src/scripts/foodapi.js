fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(foodobj => {
            console.log("food back from json server", foodobj);
            // const foodAsHTML = foodFactory(foodobj);
            // addFoodToDom(foodAsHTML);
fetch(`https://world.openfoodfacts.org/api/v0/product/${foodobj.barcode}.json`)
    .then(response => response.json())
    .then(productInfo => {
    console.log("productInfo ingredients", productInfo.product.ingredients_text);
    foodobj.ingredients = productInfo.product.ingredients_text;
    foodobj.country = productInfo.product.countries;
    foodobj.sugar = productInfo.product.nutriments.sugar_value;
    foodobj.fat = productInfo.product.nutriments.fat_value;
    foodobj.calories = productInfo.product.nutriments.energy_serving;
    console.log("foodObj with ingredients", foodobj);
    const foodAsHTML = foodFactory (foodobj);
    addFoodToDom(foodAsHTML);
    });
        });
    });


const foodFactory = (food) => {
   let HTMLfoodSection = (`
   <section class = "foodcard">
       <h3> ${(food.name)}</h3>
        <p>${(food.type)}</p>
       <p>${(food.ethnicity)}</p>
       <p>${(food.ingredients)}</p>
       <p>${(food.sugar)}</p>
       <p>${(food.fat)}</p>
       <p>${(food.calories)}</p>
       
   </section> 
`);
console.log("html string", HTMLfoodSection);
return HTMLfoodSection;
};





const addFoodToDom = (foodHTMl) => {
  const articleContainer = document.querySelector(".foodList");
  articleContainer.innerHTML += foodHTMl;
};