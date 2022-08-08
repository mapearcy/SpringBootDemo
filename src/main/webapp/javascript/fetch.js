let button = document.getElementById("button")
button.onclick = getFavoriteCandy;
async function getFavoriteCandy(){
    try{
        const raw_response = await fetch(`http://localhost:8080/app/candies`);
        if (!raw_response.ok){
            throw new Error(raw_response.status);
        }
        const jsondata = await raw_response.json();
        console.log(jsondata);
        let candytext = document.getElementById("candytext");
        console.log(jsondata[2])
        console.log(jsondata[2].name)
        candytext.innerHTML = `${jsondata[2].name} is the best candy!`
    } catch (error){
        alert("There is an error: "+error)
    }
};