const products: Product[] = Array.from({ length: 100 }, (_, index) => {
  return {
    id: index + 1,
    name: `Product ${index + 1}`,
    price: Math.floor(Math.random() * 100) + 1,
    description: `This is a description for product ${index + 1}`,
    category: `Category ${Math.floor(Math.random() * 5) + 1}`,
    image: `https://picsum.photos/200/300?random=${index + 1}`
  };
});

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

function showProducts(currentPageNumber: number): void {
  const itemsPerPage = 10;
  const startIndex = (currentPageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToDisplay = products.slice(startIndex, endIndex);
  const contentContainer = document.querySelector(".content-container") as HTMLDivElement;
  contentContainer.innerHTML = "";
  productsToDisplay.forEach((product: Product) => {
    const content = document.createElement("div");
    content.classList.add("content");
    content.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div>
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p>Category: ${product.category}</p>
      <p>Price: $${product.price}</p>
      </div>
    `;
    contentContainer.appendChild(content);
  });


}

const paginatorContainer: HTMLDivElement = document.querySelector(".paginator-container")
const contentContainer: HTMLDivElement = document.querySelector(".content-container")
console.log(paginatorContainer, contentContainer);

let currentPage: number = 1;
showProducts(currentPage);

let pageIndexToShow = (): number[] => {
  let pageNumbers: number[] = []
  if (currentPage === 1) {
    pageNumbers = [1, 2, 3]
  }
  else if (currentPage === 10) {
    pageNumbers = [8, 9, 10]
  }
  else {
    pageNumbers = [currentPage - 1, currentPage, currentPage + 1]
  }
  return pageNumbers
}
function showButtons():void {
  const pageIndex = pageIndexToShow()
  const paginatorButtonsContainer = document.querySelector(".paginator-buttons") as HTMLDivElement
  paginatorButtonsContainer.innerHTML = ""
  pageIndex.forEach((number: number) => {
    const paginatorButton = document.createElement("button")
    paginatorButton.textContent = number.toString()
    paginatorButton.classList.add("paginator-buttons")
    if (number === currentPage) {
      paginatorButton.classList.add("active")
    }
    paginatorButtonsContainer.appendChild(paginatorButton)
    paginatorButton.addEventListener("click", () => {
      currentPage = number
      showButtons()
      showProducts(currentPage)
      console.log(currentPage)
    })
  })
}

showButtons()

//   pageIndex()
const controlButtons = paginatorContainer.querySelectorAll(".control-buttons") as NodeListOf<Element>;

controlButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent === "Prev") {
      if (currentPage > 1) {
        currentPage--;

      }
    } else if (button.textContent === "Next") {
      if (currentPage < 10) {
        currentPage++;
      }
    }
    showButtons()
    showProducts(currentPage)
  });
});