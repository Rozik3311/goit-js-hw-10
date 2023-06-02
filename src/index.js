import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';

new SlimSelect({
  select: '#selectElement'
})

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
  .catch(error => {
    console.error('Ошибка при загрузке коллекции пород:', error);
  });

// Обработчик события выбора опции в селекте
document.querySelector('select.breed-select').addEventListener('change', event => {
  const breedId = event.target.value;
  
  // Выполнение HTTP-запроса за данными о коте
  fetchCatByBreed(breedId)
    .then(catData => {
      // Обновление интерфейса с информацией о коте
      const catInfo = document.querySelector('div.cat-info');
      catInfo.innerHTML = ''; // Очищаем содержимое блока
      
      if (catData.length > 0) {
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
    .catch(error => {
      console.error('Ошибка при загрузке данных о коте:', error);
    });
});


