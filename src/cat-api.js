const API_KEY = 'live_s4bpib1CcnqyLXZpdvtQ8UHhHrW6PfJFBBOongvitKRD2z36L989zxDZ1vq2g7RV';

// Виконання HTTP-запитів
async function fetchJson(url) {
  const loader = document.querySelector('p.loader');
  loader.classList.add('visible'); // Показываем загрузчик
  
  try {
    const response = await fetch(url, {
      headers: {
        'x-api-key': API_KEY
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } finally {
    loader.classList.remove('visible'); // Скрываем загрузчикк
  }
}

//Отримання пород
export function fetchBreeds() {
  const breedSelect = document.querySelector('select.breed-select');
  breedSelect.style.display = 'none'; 
  
  const loader = document.querySelector('p.loader');
  loader.classList.add('visible'); 
  
  const url = 'https://api.thecatapi.com/v1/breeds';
  return fetchJson(url)
    .then(breeds => {
      breedSelect.style.display = 'block'; 
      
      return breeds;
    })
    .finally(() => {
      loader.classList.remove('visible'); 
    });
}

// Функція для отримання данних про кота за ідентифікатором порід
export function fetchCatByBreed(breedId) {
  const catInfo = document.querySelector('div.cat-info');
  catInfo.style.display = 'none'; // 
  
  const loader = document.querySelector('p.loader');
  loader.classList.add('visible'); 
  
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return fetchJson(url)
    .then(catData => {
      catInfo.style.display = 'block'; 
      
      return catData;
    })
    .finally(() => {
      loader.classList.remove('visible'); 
    });
}

