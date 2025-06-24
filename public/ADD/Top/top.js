let allTops = getTops();
const topsContainer = document.getElementById("tops-container");
 if (topsContainer) {
      updateTops(topsContainer, allTops);
   }
   
  function pushTops(itemData){
    let allTops = getTops();
    console.log("PUSHING");
    allTops.push(itemData);
    saveTops(allTops);
    updateTops();
  }
  
  function updateTops(container, allTops) {
    console.log("PUSHING3");
    container.innerHTML = "";
    allTops.forEach((top, index) => {
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
  
  function getTops() {
    return JSON.parse(localStorage.getItem("allTops") || "[]");
  }
  
  function saveTops(allTops) {
    console.log("PUSHING2");
    localStorage.setItem("allTops", JSON.stringify(allTops));
  }
  