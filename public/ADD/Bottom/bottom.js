document.addEventListener("DOMContentLoaded", () => {
    const BottomsContainer = document.getElementById("Bottoms-container");
    const form = document.getElementById("addItemForm");
  
    let allBottoms = getBottoms();
  
    // ✅ ONLY run display logic if on index.html
    if (BottomsContainer) {
      updateBottoms(BottomsContainer, allBottoms);
    }
  
    // ✅ ONLY run add form logic if on add.html
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
  
        const itemData = {
          name: document.getElementById("itemName").value.trim(),
          price: parseFloat(document.getElementById("itemPrice").value),
          link: document.getElementById("itemLink").value.trim(),
          image: document.getElementById("itemImage").value.trim()
        };
  
        if (itemData.name && itemData.price && itemData.link && itemData.image) {
          allBottoms.push(itemData);
          saveBottoms(allBottoms);
          window.location.href = "index.html"; // ✅ redirect after add
        } else {
          alert("Please fill in all fields.");
        }
      });
    }
  });
  
  function updateBottoms(container, allBottoms) {
    container.innerHTML = "";
    allBottoms.forEach((Bottom, index) => {
      const el = createNewBottom(Bottom.image, Bottom.name, Bottom.price, Bottom.link, index);
      container.appendChild(el);
    });
  }
  
  function createNewBottom(image, name, price, link, idIndex) {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <a href="${link}" target="_blank">
      <img src="${image}" alt="Bottom ${idIndex}" />
      </a>
      <p>${name}</p>
      <p>$ ${price} USD</p>
    `;
    return div;
  }
  
  function getBottoms() {
    return JSON.parse(localStorage.getItem("allBottoms") || "[]");
  }
  
  function saveBottoms(allBottoms) {
    localStorage.setItem("allBottoms", JSON.stringify(allBottoms));
  }
  