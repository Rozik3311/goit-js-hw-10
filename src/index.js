import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
// import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';

// new SlimSelect({
//   select: 'select.breed-select'
// })

Notiflix.Notify.success('You are welcome');

// Виконання HTTP-запитів за списком порід
fetchBreeds()
  .then(breeds => {
    const breedSelect = document.querySelector('select.breed-select');
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  })
  .catch((error) => {
    if (error instanceof TypeError) {
      // Виводимо текст про помилку
      const errorMessage = document.getElementById('error-message');
      errorMessage.textContent = 'Oops! Something went wrong! Try reloading the page!';
    }
  });

document.querySelector('.breed-select').addEventListener('change', event => {
  const breedId = event.target.value;

  // Виконання HTTP-запитів за данними про кота
  fetchCatByBreed(breedId)
    .then(catData => {
      const catInfo = document.querySelector('div.cat-info');
      catInfo.innerHTML = '';

      if (catData) {
        const cat = catData[0];

        const imageDiv = document.createElement('div'); 
        const image = document.createElement('img');
        image.src = cat.url;
        imageDiv.appendChild(image);
        catInfo.appendChild(imageDiv);

        const breedInfoDiv = document.createElement('div'); 
        breedInfoDiv.classList.add('breed-info');
        catInfo.appendChild(breedInfoDiv);

        const breedTitle = document.createElement('p');
        breedTitle.classList.add('breed-title');
        breedTitle.innerHTML = `<strong></strong> ${cat.breeds[0].name}`;
        breedInfoDiv.appendChild(breedTitle);

        const breedDescription = document.createElement('p');
        breedDescription.classList.add('breed-description');
        breedDescription.innerHTML = `<strong></strong> ${cat.breeds[0].description}`;
        breedInfoDiv.appendChild(breedDescription);

        const breedTemperament = document.createElement('p');
        breedTemperament.classList.add('breed-temperament');
        breedTemperament.innerHTML = `<strong>Temperament:</strong> ${cat.breeds[0].temperament}`;
        breedInfoDiv.appendChild(breedTemperament);
      }
    })
    .catch((error) => {
      const errorMessage = document.querySelector('.error');
      errorMessage.classList.add('active');
    });
});



