/*
  AJAX stands for Asynchronous JavaScript And XML
  It allows for performing javascript actions asynchronously.
  Generally used in conjunction with http requests, as we can wait
  for the response in the background while still doing other things.
  One of the biggest advantages of JS is the responsiveness it provides
  to our webpages. We can easily respond to events on our frontend and manipulate
  the DOM using basic JS functions.
  But the magic JS does not end there. We can use JS to make asynchronous
  requests to servers. We do this with AJAX.
  We want our application to continue to be responsive, while waiting
  for the server to respond. By sending the request and receiving the
  response asynchronously, we accomplish this.
  Note that AJAX has XML in it's name, but that primarily has its origin in
  and older era, where XML was used far more frequently as a data interchange
  format. Nowadays, we primarily use JSON. There are still some places that
  use XML, but JSON is a bit more popular.
*/

//get access to our button that will trigger this event
let button = document.getElementById("button");

let user = localStorage.getItem('currentUser');
let myUser = JSON.parse(user);
//console.log(user);
//console.log(myUser.user_name);
let greeting = document.getElementById("greeting");
greeting.innerHTML = `Get your Zodiac Update , ${myUser.first_name}`;
document.getElementById("field").value = myUser.horoscope_sign

//note the event listener takes in an arrow function
//we can also add an event param which would use the event.preventDefault() function
//to prevent the default behavior of refreshing the page when we submit the form
button.addEventListener("click", () => {

    //do Ajax!

    //1. Create our XmlHttpRequest Object
    let xhttp = new XMLHttpRequest();

    //1.5

    let inputValue = document.getElementById("field").value

    //2. Define the behavior
    /*
        A readyState is a property which signifies that state that the request is currently in.
        There are several states:
        0: UNSENT - opening of the request has yet to be called
        1: OPENED - open() has been called
        2: HEADERS_RECEIVED: send() has been called[aka the request has been sent], and the headers of the response as well as the status are now available.
        3: LOADING: downloading the response. Therefore, the responseText (which is a xhr property) is holding partial data.
        4: DONE: the entire operation is now complete
        Why need readyStates?
        Ofter you can implement other transitions or animations to your webpages by triggering them at given readyStates.
        ex. loading screens
    */

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
        xhttp.open("GET",`http://sandipbgt.com/theastrologer/api/horoscope/${inputValue.toLowerCase()}/today`);

        //4.Send the request
        xhttp.send();
        
        //here data is just the param name
        //where "data" will be the actual JSON data we get back from our request in the responseText
        //this DOM manipulation
        function renderHTML(data){

            //target the p tag that has an id = "input"
            let response = document.getElementById("input")

            //append the response data
            response.append("Sunsign: " + data.sunsign);
            response.append(document.createElement('br'));
            response.append(document.createElement('br'));

            response.append("Horoscope: " + data.horoscope);
            response.append(document.createElement('br'));
            response.append(document.createElement('br'));

            response.append("Mood: " + data.meta.mood);
            response.append(document.createElement('br'));
            localStorage.setItem('currentMood', data.meta.mood);
          
            updateMood();

        }

});

async function updateMood(){
    event.preventDefault();
    let userid = myUser.user_id;
    let zodiacmood = localStorage.getItem('currentMood');
        
    let userInfo = {
        user_id: userid,
        horoscope_mood: zodiacmood    
    }
    
    console.log(userInfo);

       //the url for our backend
    try {
        const raw_response = await fetch(`http://localhost:8080/Horoscope/updatemood`,
       
          {
            method: "POST", //the http verb
            headers: { //headers
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
             },
             body: JSON.stringify(userInfo)
           
        //here would be the body if it was a post request
          });
          console.log(json_data); 
          //check for a successful response
          if (!raw_response.ok) {
            //throw new Error(raw_response.status); //this is a js error class that we are throwing
          }
          console.log(json_data);
      
          const json_data = await raw_response.json();
      
            
          //save token into a sessionStorage variable
          // localStorage.setItem("tickets", JSON.stringify(json_data));
      
          // console.log(localStorage.getItem("tickets"))

          alert(`User #: ${json_data} has been updated`)
      
          setTimeout( () => {

          
          },1000)
      } catch (error) {
        //this catch block is for network errors
        
        console.log(error);
    
    
    }

}
