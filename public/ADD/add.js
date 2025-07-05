// add.js

// STORAGE HELPERS
function getArray(key) {
  const data = localStorage.getItem(key);
  if (!data || data === "undefined") return [];
  try { return JSON.parse(data); }
  catch      { return []; }
}
function saveArray(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr));
}

// Wrappers
function getTops()     { return getArray("allTops"); }
function saveTops(a)  { saveArray("allTops", a); }
function getBottoms() { return getArray("allBottoms"); }
function saveBottoms(a){ saveArray("allBottoms", a); }
function getShoes()   { return getArray("allShoes"); }
function saveShoes(a){ saveArray("allShoes", a); }
function getAcc() {return getArray("allAcc");}
function saveAcc(a){ saveArray("allAcc", a);}


// REDIRECT TARGETS -->> ADD all the other tabs that we can add to 
const redirectMap = {
  Top:    "/ADD/Top/index.html",
  Bottom: "/ADD/Bottom/index.html",
  Shoe:   "/ADD/Shoes/index.html",
  Accessory: "/ADD/Accessories/index.html"
};




document.addEventListener("DOMContentLoaded", () => {
  const form      = document.getElementById("addItemForm");
  const submitBtn = form.querySelector('button[type="submit"]');
  // See if we came here to edit
  const editRaw   = sessionStorage.getItem("editingItem");
  let  editingIdx = null;
  let  editingCat = null;
  
  if (editRaw) {
    const { idx, category, name, price, link, image } = JSON.parse(editRaw);
    editingIdx = idx;
    editingCat = category;

    // Prefill the form
    form.itemName.value     = name;
    form.itemPrice.value    = price;
    form.itemLink.value     = link;
    form.itemImage.value    = image;
    form.itemCategory.value = category;
  }

  
  // FORM SUBMIT: ADD OR EDIT  
  form.addEventListener("submit", e => {
    e.preventDefault();

    // Gather form data
    const itemData = {
      name:     form.itemName.value.trim(),
      price:    parseFloat(form.itemPrice.value),
      link:     form.itemLink.value.trim(),
      image:    form.itemImage.value.trim(),
      category: form.itemCategory.value
    };

    // Basic validation
    if (
      !itemData.name ||
      isNaN(itemData.price) ||
      !itemData.link ||
      !itemData.image ||
      !itemData.category
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // Helper to overwrite an array at idx
    function overwrite(arrKey, saveFn) {
      const arr = getArray(arrKey);
      arr[editingIdx] = itemData;
      saveFn(arr);
    }
    // Helper to push into an array
    function push(arrKey, saveFn) {
      const arr = getArray(arrKey);
      arr.push(itemData);
      saveFn(arr);
    }

    if (editingIdx !== null) {
      // — EDIT MODE — overwrite only that one item
      switch (itemData.category) {
        case "Top":
          overwrite("allTops", saveTops);
          break;
        case "Bottom":
          overwrite("allBottoms", saveBottoms);
          break;
        case "Shoe":
          overwrite("allShoes", saveShoes);
          break;
        case "Accessory":
          overwrite("allAcc", saveAcc);
          break;
      }
      sessionStorage.removeItem("editingItem");

    } else {
      // — ADD MODE — push new
      switch (itemData.category) {
        case "Top":
          push("allTops", saveTops);
          break;
        case "Bottom":
          push("allBottoms", saveBottoms);
          break;
        case "Shoe":
          push("allShoes", saveShoes);
          break;
        case "Accessory":
          push("allAcc", saveAcc);
          break;
      }
    }

    // Finally, redirect back to the appropriate page
    const target = redirectMap[itemData.category] || "/index.html";
    window.location.href = target;

  });
});
