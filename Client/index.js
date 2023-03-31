
 var ImageURLs =[]
 var currentImageIndex = 0;
 const gallery = document.getElementById('gallery')


//we are fetching all images from our server asyncronously and appending the image in gallary div
// JavaScript

// Add a class to show the loading spinner
function showLoading(text) {
  const spinner = document.querySelector('.spinner');
  if(text){
    spinner.innerHTML = `<p>${text}</p>`
  }
  
  spinner.classList.add('loading');
}

// Remove the loading class to hide the spinner
function hideLoading() {
  const spinner = document.querySelector('.spinner');
  spinner.classList.remove('loading');
}

// Fetch the images and show them in the gallery
function fetchImages() {
  showLoading();

  fetch('http://127.0.0.1:3000/images')
    .then(response => response.json())
    .then(images => {
      hideLoading();
      displayImages(images);
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      showLoading("Sorry, can't load images...")
      // hideLoading();
    });
}

// Display the images in the gallery
function displayImages(images) {
  
  ImageURLs = images
  ImageURLs = images;
  ImageURLs.forEach((ele, index) => {
    const img = new Image(); // Create a new Image object
    img.onload = () => { // Replace the placeholder image with the actual image when it finishes loading
      const Image = document.createElement('img');
      Image.src = ele.url;
      Image.alt = ele.ImageName;
      Image.title = ele.ImageName;
      Image.addEventListener('click', () => {
        openModal(index);
      });
      gallery.appendChild(Image);
     
    };
    img.src = ele.url; // Set the src attribute of the Image object to the URL of the actual image
  });
}

fetchImages();


//open model will show a modal window on click of a image of gallary
function openModal(index){
    const modal = document.getElementById('modal')
    document.addEventListener('keydown',(ev)=>{    //we are adding left and right arrow key functionality also
      switch (ev.key) {
        case "ArrowLeft":
            prevImage()
            break;
        case "ArrowRight":
            nextImage()
            break;
    }
    })
    const ImageNamePara = document.getElementById('image_name')
    ImageNamePara.innerText = ImageURLs[index].ImageName                //adding image name on top of image in modal window
    modal.style.display='flex';
    const Image1= document.getElementById('image1')
    currentImageIndex = index
    Image1.src = ImageURLs[index].url
    Image1.alt = ImageURLs[index].ImageName
}
// nextImage function will change image of current window to next image 
function nextImage(index){
    const Image1= document.getElementById('image1')
    currentImageIndex = (currentImageIndex+1) % ImageURLs.length
    Image1.src = ImageURLs[currentImageIndex].url
    const ImageNamePara = document.getElementById('image_name')
    ImageNamePara.innerText = ImageURLs[currentImageIndex].ImageName
    Image1.alt = ImageURLs[currentImageIndex].ImageName
}
// prevImage will change current image with previous image 
function prevImage(index){
    const Image1= document.getElementById('image1')
    currentImageIndex = currentImageIndex==0?ImageURLs.length-1:currentImageIndex-1;
    Image1.src = ImageURLs[currentImageIndex].url
    Image1.alt = ImageURLs[currentImageIndex].ImageName
    const ImageNamePara = document.getElementById('image_name')
    ImageNamePara.innerText = ImageURLs[currentImageIndex].ImageName
}
// closeModel will make modal to disappear
function closeModal(){
    document.getElementById('modal').style.display='none'
}



