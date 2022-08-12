let button = document.getElementById("button");
button.addEventListener("click", async () => {


    try{
        let inputValue = document.getElementById("field").value
        const raw_response = await fetch(`http://localhost:8081/app/candy?id=${inputValue}`);
        if (!raw_response.ok){
            throw new Error(raw_response.status);
        }
        const data = await raw_response.json();
        console.log(data);
        renderHTML(data);
        // let candytext = document.getElementById("candytext");
        // console.log(jsondata[2])
        // console.log(jsondata[2].name)
        // candytext.innerHTML = `${jsondata[2].name} is the best candy!`
        function renderHTML(data){

            //target the p tag that has an id = "input"
            let response = document.getElementById("input")

            //append the response data
        
            response.append("My Favorite: " + data.name);
            response.append(document.createElement('br'));
            response.append(document.createElement('br'));

            response.append("Price: " + data.price);
            response.append(document.createElement('br'));
            response.append(document.createElement('br'));

            response.append("Get it At: " + data.shop.shopName);
            response.append(document.createElement('br'));
            response.append(document.createElement('br'));

            response.append("Quantity Available: " + data.shop.inventoryCount);
            response.append(document.createElement('br'));
            response.append(document.createElement('br'));
            
        }
    } catch (error){
        alert("There is an error: "+error)
    }

})