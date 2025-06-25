let allTops = getTops();
const topsContainer = document.getElementById("tops-container");

document.addEventListener("DOMContentLoaded", () => {
  const showControls = (actions) => {
    actions.querySelector(".delete-btn").style.display = "inline-block";
    actions.querySelector(".edit-btn").style.display = "inline-block";
    actions.querySelector(".options-btn").style.display = "inline-block";
  };

  const hideControls = (actions) => {
    actions.querySelector(".delete-btn").style.display = "none";
    actions.querySelector(".edit-btn").style.display = "none";
    actions.querySelector(".options-btn").style.display = "inline-block";
  };

  const hideOptions = (actions) => {
    actions.querySelector(".options-btn").style.display = "none";
  };

  document.body.addEventListener("mouseover", (e) => {
    const actions = e.target.closest(".actions");
    if (!actions) return;

    if (
      e.target.classList.contains("options-btn") ||
      e.target.classList.contains("edit-btn") ||
      e.target.classList.contains("delete-btn")
    ) {
      showControls(actions);
    }

    if (
      e.target.classList.contains("edit-btn") ||
      e.target.classList.contains("delete-btn")
    ) {
      hideOptions(actions);
    }
  });

  document.body.addEventListener("mouseout", (e) => {
    const related = e.relatedTarget;
    const actions = e.target.closest(".actions");

    if (!actions || !related || !actions.contains(related)) {
      hideControls(actions);
    } else if (
      e.target.classList.contains("edit-btn") ||
      e.target.classList.contains("delete-btn")
    ) {
      actions.querySelector(".options-btn").style.display = "inline-block";
    }
  });
});




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
       
      <div class="actions">
        <button class="options-btn">...</button>
        <button class="delete-btn">delete</button>
        <button class="edit-btn">edit</button>
      </div>

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
  