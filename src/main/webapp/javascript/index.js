let button = document.getElementById("button");


button.addEventListener("click", () => {

    //do Ajax!

    //1. Create our XmlHttpRequest Object
    let xhttp = new XMLHttpRequest();

    //1.5

    let inputValue = document.getElementById("field").value

   
        xhttp.onreadystatechange=function(){
            //status of 200 is ok

            if (this.readyState == 4 && this.status ==200){

                let data = JSON.parse(xhttp.responseText);
                console.log(data);

                //this method is a helper method to change the view or content in our html
                renderHTML(data);
            }
        };

        //3. Open the request http://sandipbgt.com/theastrologer/api/horoscope/pisces/today
      
        xhttp.open("GET",`http://localhost:8081/app/candy?id=${inputValue}`);

        //4.Send the request
        xhttp.send();
        
        //here data is just the param name
        //where "data" will be the actual JSON data we get back from our request in the responseText
        //this DOM manipulation
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

});