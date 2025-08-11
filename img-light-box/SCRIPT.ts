const API_URL: string = 'https://picsum.photos/v2/list?page=2&limit=100';
let IS_MODALE_OPEN: boolean = false;

// DOM Elements
const CLOSE_MODALE = document.querySelector(".CLOSE_MODALE") as HTMLButtonElement;
const LIGHT_BOX = document.querySelector(".LIGHT_BOX") as HTMLDivElement;
const LIGHT_IMAGE_CONTAINER = document.querySelector(".LIGHT_BOX_IMAGE") as HTMLImageElement;
const IMAGE_CONTAINER = document.querySelector(".IMAGE_CONTAINER") as HTMLDivElement;
const SLIDE_IMAGE_BTN = document.querySelectorAll(".IMG_CONTROLLER") as NodeListOf<HTMLButtonElement>;

interface IMAGE {
    id: string;
    author: string;
    download_url: string;
    width: number;
    height: number;
    url: string;
}

// Fetch images from API
async function FETCH_IMAGES(): Promise<void> {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch images');
        
        const data: IMAGE[] = await response.json();
        SHOW_IMAGES(data);
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

// Display images in grid
function SHOW_IMAGES(images: IMAGE[]): void {
    IMAGE_CONTAINER.innerHTML = "";
    images.forEach((img: IMAGE) => {
        const imgElement = document.createElement("img");
        imgElement.src = img.download_url;
        imgElement.alt = img.author;
        
        imgElement.addEventListener("click", (e: Event) => {
            const target = e.target as HTMLImageElement;
            target.classList.add("ACTIVE_IMAGE");
            IS_MODALE_OPEN = true;
            LIGHT_BOX.style.display = "flex";
            LIGHT_IMAGE_CONTAINER.src = target.src;
        });
        
        IMAGE_CONTAINER.appendChild(imgElement);
    });
}

// Close modal handlers
CLOSE_MODALE.addEventListener("click", () => {
    IS_MODALE_OPEN = false;
    LIGHT_BOX.style.display = "none";
    document.querySelector(".ACTIVE_IMAGE")?.classList.remove("ACTIVE_IMAGE");
});

// Close modal when clicking outside
document.addEventListener("click", (e: Event) => {
    if (IS_MODALE_OPEN && e.target === LIGHT_BOX) {
        IS_MODALE_OPEN = false;
        LIGHT_BOX.style.display = "none";
        document.querySelector(".ACTIVE_IMAGE")?.classList.remove("ACTIVE_IMAGE");
    }
});

// Image navigation controls
SLIDE_IMAGE_BTN.forEach((BTN) => {
    BTN.addEventListener("click", () => {
        const ACTIVE_IMAGE_ELEMENT = document.querySelector(".ACTIVE_IMAGE") as HTMLImageElement | null;
        if (!ACTIVE_IMAGE_ELEMENT) return;

        let newActiveElement: HTMLImageElement | null = null;

        if (BTN.classList.contains("RIGHT")) {
            newActiveElement = ACTIVE_IMAGE_ELEMENT.nextElementSibling as HTMLImageElement;
        } else if (BTN.classList.contains("LEFT")) {
            newActiveElement = ACTIVE_IMAGE_ELEMENT.previousElementSibling as HTMLImageElement;
        }

        if (newActiveElement) {
            ACTIVE_IMAGE_ELEMENT.classList.remove("ACTIVE_IMAGE");
            newActiveElement.classList.add("ACTIVE_IMAGE");
            LIGHT_IMAGE_CONTAINER.src = newActiveElement.src;
        }
    });
});

// Initialize
FETCH_IMAGES();