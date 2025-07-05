let allAcc = getAcc();
const accContainer = document.getElementById("acc-container");

// Edit/Delete button UI interaction 
document.addEventListener("DOMContentLoaded", () => {

  let currentAccElement = null; // Store the currently hovered "Acc" item

  const addTab = document.querySelector('nav.tabs-container a[href="/ADD/add.html"]');
  if (addTab) {
    // 2) Clear any pending edit, then let the link navigate normally
    addTab.addEventListener("click", () => {
      sessionStorage.removeItem("editingItem");
    });
  }

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

    const accElement = actions.closest(".product-card"); 
  if (accElement) {
    currentAccElement = accElement; // Store for later use
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
    if (currentAccElement) editAcc(currentAccElement);
  } else if (e.target.classList.contains("delete-btn")) {
    if (currentAccElement) deleteAcc(currentAccElement);
  }
});


});

//load in the storage s
 if (accContainer) {
      updateAcc(accContainer, allAcc);
  }
   

function pushAcc(itemData){
    allAcc.push(itemData);
    saveAcc(allAcc);
    updateAcc();
}
  
function updateAcc(container, allAcc) {
     if (!container) {
    // we’re not on the Acc page—do nothing
    return;
    }

    container.innerHTML = "";
    allAcc.forEach((acc, index) => {
      const el = createNewAcc(acc.image, acc.name, acc.price, acc.link, index);
      container.appendChild(el);
    });
}
  
function createNewAcc(image, name, price, link, idIndex) {
    const div = document.createElement("div");
    div.className = "product-card";
    div.dataset.id = idIndex; 
    div.innerHTML = `
      <a href="${link}" target="_blank">
      <img src="${image}" alt="Acc ${idIndex}" />
      </a>
      <p>${name}</p>
      <p>$ ${price}.00</p>
       
      <div class="actions">
        <button class="options-btn">...</button>
        <button class="delete-btn">delete</button>
        <button class="edit-btn">edit</button>
      </div>

    `;

    
    return div;
}
  
function getAcc() {
  const data = localStorage.getItem("allAcc");
  if (!data || data === "undefined") return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}
  
function saveAcc(allAcc) {
    localStorage.setItem("allAcc", JSON.stringify(allAcc));
}
  
function editAcc(accElement) {
  const idx    = parseInt(accElement.dataset.id, 10);
  const allAcc= getAcc();
  const accObj = allAcc[idx];

  // Save both index and category so add.js knows what to do
  sessionStorage.setItem(
    "editingItem",
    JSON.stringify({ idx, category: "Acc", ...accObj })
  );
  window.location.href = "/ADD/add.html";
}


function deleteAcc(accElement) {
  pendingDeleteId = parseInt(accElement.dataset.id);
  document.getElementById("confirmModal").classList.remove("hidden");
}

function closeModal() {
  pendingDeleteId = null;
  document.getElementById("confirmModal").classList.add("hidden");
}

function confirmDelete() {
  if (pendingDeleteId === null) return;

  allAcc = allAcc.filter((_, i) => i !== pendingDeleteId);
  saveAcc(allAcc);
  updateAcc(accContainer, allAcc);

  closeModal();
}


