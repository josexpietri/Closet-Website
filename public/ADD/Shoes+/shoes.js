let allShoe = getShoe();
const shoeContainer = document.getElementById("shoe-container");
 if (shoeContainer) {
      updateShoe(shoeContainer, allShoe);
   }
   
  function pushShoe(itemData){
    let allShoe = getShoe();
    console.log("PUSHING");
    allShoe.push(itemData);
    saveShoe(allShoe);
    updateShoe();
  }
  
  function updateShoe(container, allShoe) {
    console.log("PUSHING3");
    container.innerHTML = "";
    allShoe.forEach((top, index) => {
      const el = createNewTop(top.image, top.name, top.price, top.link, index);
      container.appendChild(el);
    });
  }
  
  function createNewTop(image, name, price, link, idIndex) {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <a href="${link}" target="_blank">
      <img src="${image}" alt="Top ${idIndex}" />
      </a>
      <p>${name}</p>
      <p>$ ${price} USD</p>
    `;
    return div;
  }
  
  function getShoe() {
    return JSON.parse(localStorage.getItem("allShoe") || "[]");
  }
  
  function saveShoe(allShoe) {
    console.log("PUSHING2");
    localStorage.setItem("allShoe", JSON.stringify(allShoe));
  }
  