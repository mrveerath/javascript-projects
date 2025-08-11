const api_key:string = 'J0wqZ7RIoc0RlUiQks4VAPC4aFvKh4ZJRyUNaZPhhxc13Wb9NyGlPSfk'
interface PexelsPhoto {
    id: number;
    photographer: string;
    url: string;
}

async function fetchRandomPexelsImages(query: string, totalImages: number = 100): Promise<PexelsPhoto[]> {
    const API_KEY = 'J0wqZ7RIoc0RlUiQks4VAPC4aFvKh4ZJRyUNaZPhhxc13Wb9NyGlPSfk'; // Replace with your actual API key
    const perPage = 80; // Maximum allowed per request is 80
    const totalPages = Math.ceil(totalImages / perPage);
    let images: PexelsPhoto[] = [];

    try {
        for (let i = 1; i <= totalPages; i++) {
            const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${i}`;
            const response = await fetch(url, {
                headers: {
                    Authorization: API_KEY
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const photos: PexelsPhoto[] = data.photos.map((photo: any) => ({
                id: photo.id,
                photographer: photo.photographer,
                url: photo.src.medium
            }));

            images = [...images, ...photos];
        }

        // Shuffle images randomly
        return images.sort(() => Math.random() - 0.5).slice(0, totalImages);
    } catch (error) {
        console.error('Failed to fetch images:', error);
        return [];
    }
}

const imageGallery = document.querySelector('.images-container') as HTMLDivElement;

// Example usage:

imageGallery.innerHTML = '';
fetchRandomPexelsImages('random', 100).then(images => images.forEach(image => {
    const masonaryItem = document.createElement('div');
    masonaryItem.classList.add('masonary-item');
    const imageElement = document.createElement('img');
    imageElement.src = image.url;
    masonaryItem.appendChild(imageElement);
    imageGallery.appendChild(masonaryItem);
}));


