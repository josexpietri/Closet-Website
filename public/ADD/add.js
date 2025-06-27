document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addItemForm");
    // ✅ ONLY run add form logic if on add.html
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        const itemData = {
          name: document.getElementById("itemName").value.trim(),
          price: parseFloat(document.getElementById("itemPrice").value),
          link: document.getElementById("itemLink").value.trim(),
          image: document.getElementById("itemImage").value.trim(),
          category: document.getElementById("itemCategory").value.trim()
        };

        if (itemData.category && itemData.name && itemData.price && itemData.link && itemData.image) {
           
            if(itemData.category == "Top"){
                pushTops(itemData);
            }else if(itemData.category == "Bottom"){

            }else if(itemData.category == "Shoe"){
                pushShoe(itemData);
            }

          form.reset();

        } else {
          alert("Please fill in all fields.");
        }
      });
    }
  });