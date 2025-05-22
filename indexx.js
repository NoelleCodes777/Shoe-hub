// Product Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Main product page gallery
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('#thumbnailsContainer img');
    const productImages = [
        './images/image-product-1.jpg',
        './images/image-product-2.jpg',
        './images/image-product-3.jpg',
        './images/image-product-4.jpg'
    ];
    
    // Lightbox modal elements
    const modal = document.querySelector('dialog');
    const modalImage = document.getElementById('modalImage');
    const closeModalBtn = document.getElementById('closeModal');
    const modalPrevBtn = document.getElementById('modalPrevButton');
    const modalNextBtn = document.getElementById('modalNextButton');
    const modalThumbnailsContainer = document.getElementById('modalThumbnailsContainer');
    
    let currentImageIndex = 0;
    
    // Initialize modal thumbnails
    if (modalThumbnailsContainer) {
        productImages.forEach((image, index) => {
            const thumbnailImage = document.createElement('img');
            thumbnailImage.src = image.replace('.jpg', '-thumbnail.jpg');
            thumbnailImage.alt = `product${index + 1}`;
            thumbnailImage.className = index === 0 ? 'modal-thumbnail-active' : 'modal-thumbnail';
            thumbnailImage.dataset.index = index;
            
            thumbnailImage.addEventListener('click', () => {
                updateModalActiveImage(index);
            });
            
            modalThumbnailsContainer.appendChild(thumbnailImage);
        });
    }
    
    // Thumbnail click event
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            currentImageIndex = index;
            updateActiveImage();
        });
    });
    
    // Main image click to open modal
    if (mainImage && modal) {
        mainImage.addEventListener('click', () => {
            modal.showModal();
            updateModalActiveImage(currentImageIndex);
        });
    }
    
    // Close modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.close();
        });
    }
    
    // Modal navigation
    if (modalPrevBtn) {
        modalPrevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + productImages.length) % productImages.length;
            updateModalActiveImage(currentImageIndex);
        });
    }
    
    if (modalNextBtn) {
        modalNextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % productImages.length;
            updateModalActiveImage(currentImageIndex);
        });
    }
    
    // Update main page active image
    function updateActiveImage() {
        mainImage.src = productImages[currentImageIndex];
        
        thumbnails.forEach((thumb, idx) => {
            if (idx === currentImageIndex) {
                thumb.classList.add('thumbnail-active');
                thumb.classList.remove('thumbnail');
            } else {
                thumb.classList.add('thumbnail');
                thumb.classList.remove('thumbnail-active');
            }
        });
    }
    
    // Update modal active image
    function updateModalActiveImage(index) {
        currentImageIndex = index;
        modalImage.src = productImages[index];
        
        const modalThumbnails = modalThumbnailsContainer.querySelectorAll('img');
        modalThumbnails.forEach((thumb, idx) => {
            if (idx === index) {
                thumb.classList.add('modal-thumbnail-active');
                thumb.classList.remove('modal-thumbnail');
            } else {
                thumb.classList.add('modal-thumbnail');
                thumb.classList.remove('modal-thumbnail-active');
            }
        });
    }
    
    // Mobile menu toggle
    const hamburgerBtn = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');
        });
    }
});