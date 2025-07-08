let allBottoms = getBottoms();
const bottomsContainer = document.getElementById("bottoms-container");

// Wait for DOM, wire up hover/edit/delete UI
document.addEventListener("DOMContentLoaded", () => {
  let currentItem = null;

  // Clear any pending edit when clicking the "+" tab
  const addTab = document.querySelector('nav.tabs-container a[href="/ADD/add.html"]');
  if (addTab) addTab.addEventListener("click", () => {
    sessionStorage.removeItem("editingItem");
  });

  const showControls = actions => {
    actions.querySelector(".delete-btn").style.display = "inline-block";
    actions.querySelector(".edit-btn").style.display = "inline-block";
    actions.querySelector(".options-btn").style.display = "inline-block";
  };
  const hideControls = actions => {
    if (!actions) return;
    actions.querySelector(".delete-btn").style.display = "none";
    actions.querySelector(".edit-btn").style.display = "none";
    actions.querySelector(".options-btn").style.display = "inline-block";
  };
  const hideOptions = actions => {
    actions.querySelector(".options-btn").style.display = "none";
  };

  document.body.addEventListener("mouseover", e => {
    const actions = e.target.closest(".actions");
    if (!actions) return;
    const card = actions.closest(".product-card");
    if (card) currentItem = card;

    if (e.target.classList.contains("options-btn") ||
        e.target.classList.contains("edit-btn") ||
        e.target.classList.contains("delete-btn")) {
      showControls(actions);
    }
    if (e.target.classList.contains("edit-btn") ||
        e.target.classList.contains("delete-btn")) {
      hideOptions(actions);
    }
  });

  document.body.addEventListener("mouseout", e => {
    const actions = e.target.closest(".actions");
    const related = e.relatedTarget;
    if (!actions || !related || !actions.contains(related)) {
      hideControls(actions);
    } else if (e.target.classList.contains("edit-btn") ||
               e.target.classList.contains("delete-btn")) {
      actions.querySelector(".options-btn").style.display = "inline-block";
    }
  });

  document.body.addEventListener("click", e => {
    if (e.target.classList.contains("edit-btn") && currentItem) {
      editBottom(currentItem);
    } else if (e.target.classList.contains("delete-btn") && currentItem) {
      deleteBottom(currentItem);
    }
  });
});

// Initial render
if (bottomsContainer) {
  updateBottoms(bottomsContainer, allBottoms);
}

// Add & save a new bottom
function pushBottoms(itemData) {
  allBottoms.push(itemData);
  saveBottoms(allBottoms);
  updateBottoms(bottomsContainer, allBottoms);
}

// Render list
function updateBottoms(container, list) {
  if (!container) return;
  container.innerHTML = "";
  list.forEach((item, idx) => {
    container.appendChild(
      createBottomCard(item.image, item.name, item.price, item.link, idx)
    );
  });
}

function createBottomCard(image, name, price, link, idx) {
  const div = document.createElement("div");
  div.className = "product-card";
  div.dataset.id = idx;
  div.innerHTML = `
    <a href="${link}" target="_blank">
      <img src="${image}" alt="Bottom ${idx}" />
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

// **Key fix:** use the same localStorage key as add.js does!
function getBottoms() {
  const data = localStorage.getItem("allBottoms");
  if (!data || data === "undefined") return [];
  try { return JSON.parse(data); }
  catch { return []; }
}

function saveBottoms(list) {
  localStorage.setItem("allBottoms", JSON.stringify(list));
}

// Edit
function editBottom(cardEl) {
  const idx = +cardEl.dataset.id;
  const bottoms = getBottoms();
  const obj = bottoms[idx];
  sessionStorage.setItem(
    "editingItem",
    JSON.stringify({ idx, category: "Bottom", ...obj })
  );
  window.location.href = "/ADD/add.html";
}

// Delete w/ confirmation
function deleteBottom(cardEl) {
  pendingDeleteId = +cardEl.dataset.id;
  document.getElementById("confirmModal").classList.remove("hidden");
}
function closeModal() {
  pendingDeleteId = null;
  document.getElementById("confirmModal").classList.add("hidden");
}
function confirmDelete() {
  if (pendingDeleteId === null) return;
  allBottoms = allBottoms.filter((_, i) => i !== pendingDeleteId);
  saveBottoms(allBottoms);
  updateBottoms(bottomsContainer, allBottoms);
  closeModal();
}
