---
permalink: /assets/js/projects-photoswipe-setup.js
---
import PhotoSwipeLightbox from "{{ site.third_party_libraries.photoswipe-lightbox.url.js }}";
import PhotoSwipe from "{{ site.third_party_libraries.photoswipe.url.js }}";

// Set image dimensions dynamically before initializing PhotoSwipe
function setImageDimensions() {
  const galleryLinks = document.querySelectorAll('.pswp-gallery a');
  galleryLinks.forEach((link) => {
    if (!link.dataset.pswpWidth || !link.dataset.pswpHeight) {
      const img = link.querySelector('img');
      if (img) {
        // If image is already loaded, use its natural dimensions
        if (img.complete && img.naturalWidth > 0) {
          link.dataset.pswpWidth = img.naturalWidth;
          link.dataset.pswpHeight = img.naturalHeight;
        } else {
          // Otherwise, wait for image to load
          img.onload = function() {
            link.dataset.pswpWidth = this.naturalWidth;
            link.dataset.pswpHeight = this.naturalHeight;
          };
        }
      }
    }
  });
}

// Set dimensions for all images
setImageDimensions();

// Initialize PhotoSwipe for project pages
const lightbox = new PhotoSwipeLightbox({
  gallery: ".pswp-gallery",
  children: "a",
  pswpModule: PhotoSwipe,
  showHideAnimationType: 'zoom',
  preload: [1, 2],
});

lightbox.init();

