document.addEventListener('DOMContentLoaded', function() {
const container = document.querySelector(".container")
container.addEventListener("mousemove", (e) => {
    console.log(e)
    e.preventDefault()
    container.innerHTML = ""
    const div = document.createElement("div")
    div.setAttribute("class","cursor")
    container.appendChild(div)
    var x = e.layerX
    var y = e.layerY
    div.style.left =`${x}px`
    div.style.top = `${y}px`
}) 
})