document.addEventListener('DOMContentLoaded', function() {
  
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links'); 
  console.log(navLinks);
  
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');
  });
  
  // Gallery/Carousel functionality
  const mainImage = document.querySelector('.product-main img');
  const thumbnails = document.querySelectorAll('.list img');
  let currentImageIndex = 0;
  let isTransitioning = false;
  
  // Create slider container for main gallery
  setupGallerySlider();
  
  function setupGallerySlider() {
    // Create a wrapper for the images
    const productMain = document.querySelector('.product-main');
    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'slider-container';
    
    // Create the slider with all product images
    const slider = document.createElement('div');
    slider.className = 'slider';
    
    // Get product images based on thumbnails
    for (let i = 1; i <= thumbnails.length; i++) {
      const slide = document.createElement('div');
      slide.className = 'slide';
      slide.dataset.index = i - 1; 
      
      const img = document.createElement('img');
      img.src = `./images/image-product-${i}.jpg`;
      img.alt = `Product ${i}`;
      
      slide.appendChild(img);
      slider.appendChild(slide);
    }
    
    // Replace main image with slider
    mainImage.parentNode.replaceChild(sliderContainer, mainImage);
    sliderContainer.appendChild(slider);

    // Initial slide position
    updateGallery(0);
  }
  
  // Function to update gallery position
  function updateGallery(index) {
    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(-${index * 100}%)`;
    
    updateThumbnailSelection(index);
  }
  
  // Function to update thumbnail selection
  function updateThumbnailSelection(index) {
    thumbnails.forEach((thumb, idx) => {
      if (idx === index) {
        thumb.classList.add('active');
      } else {
        thumb.classList.remove('active');
      }
    });
  }
  
  // Thumbnail click handler
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', function() {
      if (isTransitioning) return;
      isTransitioning = true;
      
      currentImageIndex = index;
      updateGallery(index);
      
      setTimeout(() => {
        isTransitioning = false;
      }, 800);
    });
  });
  
  
  const dialog = document.querySelector('dialog');
  const closeDialog = document.getElementById('closeModal');
  const modalPrevButton = document.getElementById('modalPrevButton');
  const modalNextButton = document.getElementById('modalNextButton');
  

  function setupModalSlider() {
   
    const modalContainer = document.getElementById('modalImage').parentElement;
    

    const modalSliderContainer = document.createElement('div');
    modalSliderContainer.className = 'modal-slider-container';
    modalSliderContainer.style.width = '100%';
    modalSliderContainer.style.height = '100%';
    modalSliderContainer.style.overflow = 'hidden';
    modalSliderContainer.style.position = 'relative'; 

    const modalSlider = document.createElement('div');
    modalSlider.id = 'modalSlider';
    

    for (let i = 1; i <= thumbnails.length; i++) {
      const slide = document.createElement('div');
      slide.className = 'modal-slide';
      
      const img = document.createElement('img');
      img.src = `./images/image-product-${i}.jpg`;
      img.alt = `Product ${i}`;
      
      slide.appendChild(img);
      modalSlider.appendChild(slide);
    }
    
    // Make sure navigation buttons are properly positioned inside the slider container
    if (modalPrevButton && modalNextButton) {
      // Remove them from their current location
      modalPrevButton.remove();
      modalNextButton.remove();
      
      // Add them to the slider container
      modalSliderContainer.appendChild(modalPrevButton);
      modalSliderContainer.appendChild(modalNextButton);
      
      // Make sure they're visible
      modalPrevButton.style.display = 'flex';
      modalNextButton.style.display = 'flex';
    }
    
    modalSliderContainer.appendChild(modalSlider);
    modalContainer.innerHTML = '';
    modalContainer.appendChild(modalSliderContainer);
    
    // Return the slider for use in update functions
    return modalSlider;
  }
  
  // Function to update navigation button visibility
  function updateNavigationButtons(index) {
    // Show/hide previous button
    if (index === 0) {
      modalPrevButton.classList.add('hidden');
    } else {
      modalPrevButton.classList.remove('hidden');
    }
    
    // Show/hide next button
    if (index === thumbnails.length - 1) {
      modalNextButton.classList.add('hidden');
    } else {
      modalNextButton.classList.remove('hidden');
    }
  }
  
  // Add click handler to each slide in the main gallery
  function addSlideClickHandlers() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
      slide.addEventListener('click', function() {
        // Get the index of the clicked slide
        const clickedIndex = parseInt(slide.dataset.index);
        
        // Set current index to the clicked slide
        currentImageIndex = clickedIndex;
        
        // Setup modal slider and store the returned slider element
        const modalSlider = setupModalSlider();
        
        // Create modal thumbnails
        createModalThumbnails();
        
        // Position modal slider to clicked index
        updateModalSlider(clickedIndex);
        
        // Update navigation buttons
        updateNavigationButtons(clickedIndex);
        
        // Ensure the slider is actually using the index we set
        if (modalSlider) {
          modalSlider.style.transform = `translateX(-${clickedIndex * 100}%)`;
        }
        
        dialog.showModal();
      });
    });
  }
  
  // Initialize slide click handlers
  addSlideClickHandlers();
  
  // Close modal handler
  closeDialog.addEventListener('click', () => {
    dialog.close();
  });
  
  // Create modal thumbnails
  function createModalThumbnails() {
    const modalThumbnailsContainer = document.getElementById('modalThumbnailsContainer');
    modalThumbnailsContainer.innerHTML = '';
    
    thumbnails.forEach((thumbnail, index) => {
      const modalThumb = document.createElement('div');
      modalThumb.className = 'modal-thumbnail';
      
      if (index === currentImageIndex) {
        modalThumb.classList.add('active');
      }
      
      const img = document.createElement('img');
      img.src = thumbnail.src;
      img.alt = thumbnail.alt;
      
      modalThumb.appendChild(img);
      modalThumbnailsContainer.appendChild(modalThumb);
      
      modalThumb.addEventListener('click', function() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        currentImageIndex = index;
        updateModalSlider(index);
        updateGallery(index);
        updateNavigationButtons(index);
        
        setTimeout(() => {
          isTransitioning = false;
        }, 800);
      });
    });
  }
  
  // Update modal slider
  function updateModalSlider(index) {
    const modalSlider = document.getElementById('modalSlider');
    if (modalSlider) {
      modalSlider.style.transform = `translateX(-${index * 100}%)`;
    }
    
    // Update modal thumbnails
    document.querySelectorAll('.modal-thumbnail').forEach((thumb, idx) => {
      if (idx === index) {
        thumb.classList.add('active');
      } else {
        thumb.classList.remove('active');
      }
    });
  }
  
  // Add carousel navigation functionality
  if (modalPrevButton && modalNextButton) {
    // Previous button handler
    modalPrevButton.addEventListener('click', () => {
      if (isTransitioning) return;
      isTransitioning = true;
      
      currentImageIndex--;
      if (currentImageIndex < 0) {
        currentImageIndex = 0; // Stop at first slide
      }
      
      updateModalSlider(currentImageIndex);
      updateGallery(currentImageIndex);
      updateNavigationButtons(currentImageIndex);
      
      setTimeout(() => {
        isTransitioning = false;
      }, 800);
    });

    modalNextButton.addEventListener('click', () => {
      if (isTransitioning) return;
      isTransitioning = true;
      
      currentImageIndex++;
      if (currentImageIndex >= thumbnails.length) {
        currentImageIndex = thumbnails.length - 1; // Stop at last slide
      }
      
      updateModalSlider(currentImageIndex);
      updateGallery(currentImageIndex);
      updateNavigationButtons(currentImageIndex);
      
      setTimeout(() => {
        isTransitioning = false;
      }, 800);
    });
    
   
    dialog.addEventListener('keydown', (e) => {
      if (dialog.open) {
        if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
          e.preventDefault();
          if (!isTransitioning) {
            modalPrevButton.click();
          }
        } else if (e.key === 'ArrowRight' && currentImageIndex < thumbnails.length - 1) {
          e.preventDefault();
          if (!isTransitioning) {
            modalNextButton.click();
          }
        }
      }
    });
  }
});







