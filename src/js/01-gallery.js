// Add imports above this line
// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from './gallery-items.js';
// Change code below this line


const galleryRef = document.querySelector('.gallery');
insertGalleryMarkup(createGalleryMarkup(galleryItems));

function createGalleryMarkup(arrayItems) {
    return arrayItems.map(({preview, original, description}) => {
        return `
            <a class="gallery__item" href="${original}">
                <img
                class="gallery__image"
                src="${preview}"
                loading = "lazy"
                alt="${description}"
                />
            </a>`;
})
        .join('');
}

function insertGalleryMarkup(galleryMarkup) {
    galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);
}

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});


