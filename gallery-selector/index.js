const btns = document.querySelectorAll("li a");
const container = document.querySelector(".container");
const boxes = document.querySelectorAll(".box");

btns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const match = e.target.innerText;
        container.innerHTML = "";
        if (match === "all") {
            boxes.forEach(box => {
                container.appendChild(box.cloneNode(true)); 
            });
        } else {
            boxes.forEach(box => {
                if (box.id === match) {
                    container.appendChild(box.cloneNode(true));
                }
            });
        }
    });
});
