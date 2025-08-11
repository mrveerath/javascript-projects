var products = Array.from({ length: 100 }, function (_, index) {
    return {
        id: index + 1,
        name: "Product ".concat(index + 1),
        price: Math.floor(Math.random() * 100) + 1,
        description: "This is a description for product ".concat(index + 1),
        category: "Category ".concat(Math.floor(Math.random() * 5) + 1),
        image: "https://picsum.photos/200/300?random=".concat(index + 1)
    };
});
function showProducts(currentPageNumber) {
    var itemsPerPage = 10;
    var startIndex = (currentPageNumber - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    var productsToDisplay = products.slice(startIndex, endIndex);
    var contentContainer = document.querySelector(".content-container");
    contentContainer.innerHTML = "";
    productsToDisplay.forEach(function (product) {
        var content = document.createElement("div");
        content.classList.add("content");
        content.innerHTML = "\n      <img src=\"".concat(product.image, "\" alt=\"").concat(product.name, "\">\n      <div>\n      <h2>").concat(product.name, "</h2>\n      <p>").concat(product.description, "</p>\n      <p>Category: ").concat(product.category, "</p>\n      <p>Price: $").concat(product.price, "</p>\n      </div>\n    ");
        contentContainer.appendChild(content);
    });
}
var paginatorContainer = document.querySelector(".paginator-container");
var contentContainer = document.querySelector(".content-container");
console.log(paginatorContainer, contentContainer);
var currentPage = 1;
showProducts(currentPage);
var pageIndexToShow = function () {
    var pageNumbers = [];
    if (currentPage === 1) {
        pageNumbers = [1, 2, 3];
    }
    else if (currentPage === 10) {
        pageNumbers = [8, 9, 10];
    }
    else {
        pageNumbers = [currentPage - 1, currentPage, currentPage + 1];
    }
    return pageNumbers;
};
function showButtons() {
    var pageIndex = pageIndexToShow();
    var paginatorButtonsContainer = document.querySelector(".paginator-buttons");
    paginatorButtonsContainer.innerHTML = "";
    pageIndex.forEach(function (number) {
        var paginatorButton = document.createElement("button");
        paginatorButton.textContent = number.toString();
        paginatorButton.classList.add("paginator-buttons");
        if (number === currentPage) {
            paginatorButton.classList.add("active");
        }
        paginatorButtonsContainer.appendChild(paginatorButton);
        paginatorButton.addEventListener("click", function () {
            currentPage = number;
            showButtons();
            showProducts(currentPage);
            console.log(currentPage);
        });
    });
}
showButtons();
//   pageIndex()
var controlButtons = paginatorContainer.querySelectorAll(".control-buttons");
controlButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        if (button.textContent === "Prev") {
            if (currentPage > 1) {
                currentPage--;
            }
        }
        else if (button.textContent === "Next") {
            if (currentPage < 10) {
                currentPage++;
            }
        }
        showButtons();
        showProducts(currentPage);
    });
});
