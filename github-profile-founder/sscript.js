document.addEventListener("DOMContentLoaded", () => {
const outputDiv = document.querySelector(".output")
const button = document.querySelector("#search")

button.addEventListener("click",getUser)

async function fetchUser(userName) {
    try {
        const response = await fetch(`https://api.github.com/users/${userName}`)
        if(!response.ok) {
            outputDiv.innerHTML = "Oops Failed To Get Data";
            return;
        }
        const data = await response.json()
        console.log(data)
        representData(data)
    } catch (error) {
        outputDiv.innerHTML = "Something Went Wrong"   
    }
}
function representData(data) {
    const img = document.createElement("img")
    img.setAttribute("src",`${data.avatar_url}`)
    outputDiv.appendChild(img)
    const name = document.createElement("h1");
    name.setAttribute("class","name")
    name.innerHTML = data.name;
    outputDiv.appendChild(name)
    const bio = document.createElement("h2")
    bio.setAttribute("class","bio")
    bio.innerHTML = data.bio
    outputDiv.appendChild(bio)
    const followersAndFollowing = document.createElement("div")
    followersAndFollowing.setAttribute("class","followersAndFollowing")
    const follower = document.createElement("h3")
    follower.setAttribute("class","follower")
    follower.innerHTML = `Followers: ${data.followers}`
    followersAndFollowing.appendChild(follower)
    const following = document.createElement("h3")
    following.setAttribute("class","followings")
    following.innerHTML = `Following: ${data.following}`
    followersAndFollowing.appendChild(following)
    outputDiv.appendChild(followersAndFollowing)
}

function getUser (){
    const userName = document.getElementById("text").value;
    if(userName.trim() === ""){
        outputDiv.innerText = "Please Give An Username"
    }
    else{
        outputDiv.innerHTML = ""
        fetchUser(userName)
    }
    userName.value = ""
} 
})