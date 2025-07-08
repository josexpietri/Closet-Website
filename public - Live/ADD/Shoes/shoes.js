let allShoes = getShoes();
const shoesContainer = document.getElementById("shoes-container");

// Wire up hover / edit / delete UI once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  let currentItem = null;

  // Clear any pending edit when clicking the "+" tab
  const addTab = document.querySelector('nav.tabs-container a[href="/ADD/add.html"]');
  if (addTab) addTab.addEventListener("click", () => {
    sessionStorage.removeItem("editingItem");
  });

  const showControls = actions => {
    actions.querySelector(".delete-btn").style.display = "inline-block";
    actions.querySelector(".edit-btn").style.display   = "inline-block";
    actions.querySelector(".options-btn").style.display = "inline-block";
  };
  const hideControls = actions => {
    if (!actions) return;
    actions.querySelector(".delete-btn").style.display = "none";
    actions.querySelector(".edit-btn").style.display   = "none";
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

    if (
      e.target.classList.contains("options-btn") ||
      e.target.classList.contains("edit-btn")    ||
      e.target.classList.contains("delete-btn")
    ) {
      showControls(actions);
    }
    if (
      e.target.classList.contains("edit-btn")    ||
      e.target.classList.contains("delete-btn")
    ) {
      hideOptions(actions);
    }
  });

  document.body.addEventListener("mouseout", e => {
    const actions = e.target.closest(".actions");
    const related = e.relatedTarget;
    if (!actions || !related || !actions.contains(related)) {
      hideControls(actions);
    } else if (
      e.target.classList.contains("edit-btn")    ||
      e.target.classList.contains("delete-btn")
    ) {
      actions.querySelector(".options-btn").style.display = "inline-block";
    }
  });

  document.body.addEventListener("click", e => {
    if (e.target.classList.contains("edit-btn") && currentItem) {
      editShoe(currentItem);
    } else if (e.target.classList.contains("delete-btn") && currentItem) {
      deleteShoe(currentItem);
    }
  });
});

// Initial render
if (shoesContainer) {
  updateShoes(shoesContainer, allShoes);
}

// Called from add.js when you save a new shoe
function pushShoes(itemData) {
  allShoes.push(itemData);
  saveShoes(allShoes);
  updateShoes(shoesContainer, allShoes);
}

// Render the grid
function updateShoes(container, list) {
  if (!container) return;
  container.innerHTML = "";
  list.forEach((item, idx) => {
    container.appendChild(
      createShoeCard(item.image, item.name, item.price, item.link, idx)
    );
  });
}

function createShoeCard(image, name, price, link, idx) {
  const div = document.createElement("div");
  div.className = "product-card";
  div.dataset.id = idx;
  div.innerHTML = `
    <a href="${link}" target="_blank">
      <img src="${image}" alt="Shoe ${idx}" />
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

// 🔑 use the same key that your add.js writes to
function getShoes() {
  const data = localStorage.getItem("allShoes");
  if (!data || data === "undefined") return [];
  try { return JSON.parse(data); }
  catch { return []; }
}

function saveShoes(list) {
  localStorage.setItem("allShoes", JSON.stringify(list));
}

// Edit
function editShoe(cardEl) {
  const idx    = +cardEl.dataset.id;
  const shoes  = getShoes();
  const obj    = shoes[idx];
  sessionStorage.setItem(
    "editingItem",
    JSON.stringify({ idx, category: "Shoe", ...obj })
  );
  window.location.href = "/ADD/add.html";
}

// Delete w/ confirmation
function deleteShoe(cardEl) {
  pendingDeleteId = +cardEl.dataset.id;
  document.getElementById("confirmModal").classList.remove("hidden");
}
function closeModal() {
  pendingDeleteId = null;
  document.getElementById("confirmModal").classList.add("hidden");
}
function confirmDelete() {
  if (pendingDeleteId === null) return;
  allShoes = allShoes.filter((_, i) => i !== pendingDeleteId);
  saveShoes(allShoes);
  updateShoes(shoesContainer, allShoes);
  closeModal();
}
