document.addEventListener('DOMContentLoaded', function() {
  
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links'); 
  console.log(navLinks);
  
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');
  });
  

  const mainImage = document.querySelector('.product-main img');
  const thumbnails = document.querySelectorAll('.list img');
  let currentImageIndex = 0;
  let isTransitioning = false;
  
  
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
    modalSliderContainer.className = 'modal-slide';
    // modalSliderContainer.style.width = '100%';
    // modalSliderContainer.style.height = '100%';
    //  modalSliderContainer.style.overflow = 'hidden';
    // modalSliderContainer.style.position = 'relative'; 

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

    if (modalPrevButton && modalNextButton) {
  
      modalPrevButton.remove();
      modalNextButton.remove();
      
 
      modalSliderContainer.appendChild(modalPrevButton);
      modalSliderContainer.appendChild(modalNextButton);
 
      modalPrevButton.style.display = 'flex';
      modalNextButton.style.display = 'flex';
    }
    
    modalSliderContainer.appendChild(modalSlider);
    modalContainer.innerHTML = '';
    modalContainer.appendChild(modalSliderContainer);
    
   
    return modalSlider;
  }
  

  function updateNavigationButtons(index) {
   
    if (index === 0) {
      modalPrevButton.classList.add('hidden');
    } else {
      modalPrevButton.classList.remove('hidden');
    }
    
 
    if (index === thumbnails.length - 1) {
      modalNextButton.classList.add('hidden');
    } else {
      modalNextButton.classList.remove('hidden');
    }
  }
  
 
  function addSlideClickHandlers() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
      slide.addEventListener('click', function() {
    
        const clickedIndex = parseInt(slide.dataset.index);
       
        currentImageIndex = clickedIndex;
        
       
        const modalSlider = setupModalSlider();
        
      
        createModalThumbnails();
        
        
        updateModalSlider(clickedIndex);
   
        updateNavigationButtons(clickedIndex);
        
        if (modalSlider) {
          modalSlider.style.transform = `translateX(-${clickedIndex * 100}%)`;
        }
        
        dialog.showModal();
      });
    });
  }
  
  addSlideClickHandlers();
  

  closeDialog.addEventListener('click', () => {
    dialog.close();
  });

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
  

  function updateModalSlider(index) {
    const modalSlider = document.getElementById('modalSlider');
    if (modalSlider) {
      modalSlider.style.transform = `translateX(-${index * 100}%)`;
    }
    

    document.querySelectorAll('.modal-thumbnail').forEach((thumb, idx) => {
      if (idx === index) {
        thumb.classList.add('active');
      } else {
        thumb.classList.remove('active');
      }
    });
  }
  

  if (modalPrevButton && modalNextButton) {

    modalPrevButton.addEventListener('click', () => {
      if (isTransitioning) return;
      isTransitioning = true;
      
      currentImageIndex--;
      if (currentImageIndex < 0) {
        currentImageIndex = 0; 
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
        currentImageIndex = thumbnails.length - 1; 
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







