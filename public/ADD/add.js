document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addItemForm");
    // ✅ ONLY run add form logic if on add.html
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("Getting Data");
        const itemData = {
          name: document.getElementById("itemName").value.trim(),
          price: parseFloat(document.getElementById("itemPrice").value),
          link: document.getElementById("itemLink").value.trim(),
          image: document.getElementById("itemImage").value.trim(),
          category: document.getElementById("itemCategory").value.trim()
        };
         console.log(itemData.category);
        if (itemData.name && itemData.price && itemData.link && itemData.image) {
           
            if(itemData.category == "Top"){
                 console.log("Top Push");
                pushTops(itemData);
            }else if(itemData.category == "Bottom"){

            }else if(itemData.category == "Shoe"){
                console.log("Shoe Push");
                pushShoe(itemData);
            }

          document.getElementById("myItemForm").reset();

        } else {
          alert("Please fill in all fields.");
        }
      });
    }
  });