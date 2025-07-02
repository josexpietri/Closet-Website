let allTops = getTops();
const topsContainer = document.getElementById("tops-container");

// Edit/Delete button UI interaction 
document.addEventListener("DOMContentLoaded", () => {

  let currentTopElement = null; // Store the currently hovered "top" item

  const showControls = (actions) => {
    actions.querySelector(".delete-btn").style.display = "inline-block";
    actions.querySelector(".edit-btn").style.display = "inline-block";
    actions.querySelector(".options-btn").style.display = "inline-block";

  };

  const hideControls = (actions) => {
  if (!actions) return; // Safely do nothing if null

  const deleteBtn = actions.querySelector(".delete-btn");
  const editBtn = actions.querySelector(".edit-btn");
  const optionsBtn = actions.querySelector(".options-btn");

  if (deleteBtn) deleteBtn.style.display = "none";
  if (editBtn) editBtn.style.display = "none";
  if (optionsBtn) optionsBtn.style.display = "inline-block";
};


  const hideOptions = (actions) => {
    actions.querySelector(".options-btn").style.display = "none";
  };

  document.body.addEventListener("mouseover", (e) => {
    const actions = e.target.closest(".actions");
    if (!actions) return;

    const topElement = actions.closest(".product-card"); 
  if (topElement) {
    currentTopElement = topElement; // Store for later use
  }

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

  // Call hideControls only if needed, and safely
  if (!actions || !related || !actions.contains(related)) {
    hideControls(actions); // No error now, even if `actions` is null
  } else if (
    e.target.classList.contains("edit-btn") ||
    e.target.classList.contains("delete-btn")
  ) {
    const optionsBtn = actions?.querySelector(".options-btn");
    if (optionsBtn) optionsBtn.style.display = "inline-block";
  }
});


 document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    if (currentTopElement) editTop(currentTopElement);
  } else if (e.target.classList.contains("delete-btn")) {
    if (currentTopElement) deleteTop(currentTopElement);
  }
});


});

//load in the storage s
 if (topsContainer) {
      updateTops(topsContainer, allTops);
  }
   

  function pushTops(itemData){
    allTops.push(itemData);
    saveTops(allTops);
    updateTops();
  }
  
  function updateTops(container, allTops) {
    container.innerHTML = "";
    allTops.forEach((top, index) => {
      const el = createNewTop(top.image, top.name, top.price, top.link, index);
      container.appendChild(el);
    });
  }
  
  function createNewTop(image, name, price, link, idIndex) {
    const div = document.createElement("div");
    div.className = "product-card";
    div.dataset.id = idIndex; 
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
  const data = localStorage.getItem("allTops");
  if (!data || data === "undefined") return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}
  
  function saveTops(allTops) {
    localStorage.setItem("allTops", JSON.stringify(allTops));
  }
  
  function editTop(topElement) {
  const id = topElement.dataset.id;
  
}

let pendingDeleteId = null;

function deleteTop(topElement) {
  pendingDeleteId = parseInt(topElement.dataset.id);
  document.getElementById("confirmModal").classList.remove("hidden");
}

function closeModal() {
  pendingDeleteId = null;
  document.getElementById("confirmModal").classList.add("hidden");
}

function confirmDelete() {
  if (pendingDeleteId === null) return;

  allTops = allTops.filter((_, i) => i !== pendingDeleteId);
  saveTops(allTops);
  updateTops(topsContainer, allTops);

  closeModal();
}


