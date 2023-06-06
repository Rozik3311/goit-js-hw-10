import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
// import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';

// new SlimSelect({
//   select: 'select.breed-select'
// })

Notiflix.Notify.success('You are welcome');

// Выполнение HTTP-запроса за коллекцией пород
fetchBreeds()
  .then(breeds => {
    // Заполняем select.breed-select опциями
    const breedSelect = document.querySelector('select.breed-select');
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  })
  .catch((error) => {
    // Проверяем тип ошибки
    if (error instanceof TypeError) {
      // Выводим текст об ошибке в элементе параграфа
      const errorMessage = document.getElementById('error-message');
      errorMessage.textContent = 'Oops! Something went wrong! Try reloading the page!';
    }

  });

  document.querySelector('.breed-select').addEventListener('change', event => {
    const breedId = event.target.value;
  
    // Выполнение HTTP-запроса за данными о коте
    fetchCatByBreed(breedId)
      .then(catData => {
        // Обновление интерфейса с информацией о коте
        const catInfo = document.querySelector('div.cat-info');
        catInfo.innerHTML = ''; // Очищаем содержимое блока
  
        if (catData) {
          const cat = catData[0];
          const image = document.createElement('img');
          image.src = cat.url;
          catInfo.innerHTML = `
            <p><strong>Название породы:</strong> ${cat.breeds[0].name}</p>
            <p><strong>Описание:</strong> ${cat.breeds[0].description}</p>
            <p><strong>Темперамент:</strong> ${cat.breeds[0].temperament}</p>
          `;
          catInfo.appendChild(image);
        }
      })
      .catch((error) => {
        const errorMessage = document.querySelector('.error');
        errorMessage.classList.add('active');
      });
  });



