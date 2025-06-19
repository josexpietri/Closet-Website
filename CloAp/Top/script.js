let allTops = getTops();
updateTops();

document.getElementById('addItemForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  const itemData = {
    name: document.getElementById('itemName').value.trim(),
    price: parseFloat(document.getElementById('itemPrice').value),
    link: document.getElementById('itemLink').value.trim(),
    image: document.getElementById('itemImage').value.trim()
  };

  console.log(itemData.name);
  console.log(itemData.price);
  console.log(itemData.link);
  console.log(itemData.image);


  addTopToDisplay(itemData);
  // You can now send itemData to a server, use it to update the UI, etc.
});


function addTopToDisplay(itemData){

    function addTopToDisplay(itemData){
    const { image, name, price, link } = itemData;

    if (image && name && price && link) {
        const idIndex = allTops.length;
        const newTop = { image, name, price, link };
        allTops.push(newTop);
        saveTops();

        // ✅ Redirect to index.html after saving
        window.location.href = 'index.html';
    } else {
        alert("All fields are required.");
    }
        updateTops();
}

}

function createNewTop(image, name, price, link, idIndex) {
    const topsContainer = document.getElementById("tops-container");
     if (!topsContainer) return;

    const div = document.createElement('div');
    const inspectPage = "TopInsect/Top" + idIndex + ".html";
    const alt1 = "Top " + idIndex;
    div.innerHTML = `
        <div class="product-card" id="${idIndex}">
            <a href="${inspectPage}">
                <img src="${image}" alt="${alt1}">
            </a>
            <div class="product-info">
                <h3>${name}</h3>
                <p>Price: ${price}</p>
                <a href="${link}" target="_blank">Buy Now</a>
            </div>
        </div>
    `;

    topsContainer.appendChild(div);
}

function updateTops() {
    document.querySelectorAll('.product-card').forEach(card => card.remove());
    allTops.forEach((top, index) => {
        createNewTop(top.image, top.name, top.price, top.link, index);
    });
}

function saveTops(){
    const topsJson = JSON.stringify(allTops);
    localStorage.setItem("allTops", topsJson);
}

function getTops(){
    const tops = localStorage.getItem("allTops") || "[]"; // if left = null store right
    return JSON.parse(tops);
}