window.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll('button');
    const sliderContainer = document.querySelector(".slide");
    let index = 0;

    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            if (event.target.className === "left") {
                index = index - 1;
            }
            if (event.target.className === "right") {
                index = index + 1;
            }
            if (index < 0) {
                index = 0;
            }
            const maxSlider = sliderContainer.children.length - 1;
            if (index > maxSlider) {
                index = maxSlider;
            }
            sliderContainer.scrollTo({
                behavior: "smooth",
                left: index * 600
            });
            console.log("Scroll to position:", index * 600);
        });
    });
});
