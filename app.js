const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryContainer = document.querySelector('.js-gallery');
const backdrop = document.querySelector('.js-lightbox');
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
const imageEl = document.querySelector('.lightbox__image');
const overlay = document.querySelector('.lightbox__overlay');

function createGalleryCardMarkup(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `}).join('');
  
}
const cardMarkup = createGalleryCardMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', cardMarkup);


galleryContainer.addEventListener('click', onGalleryContainerClick);
function onGalleryContainerClick(evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains('gallery__image')) {
    return;
    }
    window.addEventListener('keydown', onEscKeyPress);
    backdrop.classList.add('is-open');
    const bigImageUrl = evt.target.dataset.source;
    imageEl.setAttribute("src", bigImageUrl)
  
    window.addEventListener('keydown', onRightKeyPress);
    window.addEventListener('keydown', onLeftKeyPress); 
} 
 
closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

function closeModal() {
  window.removeEventListener('keydown', onEscKeyPress);
    backdrop.classList.remove('is-open')
    imageEl.setAttribute("src", "")
}

function onEscKeyPress(e) {
    if (e.code === 'Escape') {
        closeModal()
    }
}

 function onRightKeyPress(e) {
    const bigImagesArray = galleryItems.map(image => image.original);
    if (e.code == 'ArrowRight') {
        for (let i = 0; i < bigImagesArray.length; i += 1){
          let bigImageSrc = imageEl.getAttribute('src')
          if (i === bigImagesArray.length - 1 && bigImagesArray[i] == bigImageSrc) {
            imageEl.setAttribute("src", bigImagesArray[0]);
            return;
          }if (bigImagesArray[i] == bigImageSrc) {
            imageEl.setAttribute("src", bigImagesArray[i + 1]);
            return;
          }  
        }
      }
}
    
function onLeftKeyPress(e) {
    const bigImagesArray = galleryItems.map(image => image.original);
    if (e.code == 'ArrowLeft') {
        for (let i = 0; i < bigImagesArray.length; i += 1){
          let bigImageSrc = imageEl.getAttribute('src')
          if (i === 0 && bigImagesArray[i] == bigImageSrc) {
            imageEl.setAttribute("src", bigImagesArray[bigImagesArray.length-1]);
            return;
          }if (bigImagesArray[i] == bigImageSrc) {
            imageEl.setAttribute("src", bigImagesArray[i - 1]);
            return;
          }  
        }
    }
}

//  Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image.Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
// Ссылка на оригинальное изображение должна храниться в data-атрибуте source на элементе img, и указываться в href ссылки (это необходимо для доступности).
// Закрытие модального окна по клику на div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
//     <li class="gallery__item">
//   <a
//     class="gallery__link"
//     href="${original}"
//   >
//     <img
//       class="gallery__image"
//       src="${preview}"
//       data-source="${original}"
//       alt="${description}"
//     />
//   </a>
// </li>