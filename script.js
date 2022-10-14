// ELEMENTS
const whereBtn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const searchBar = document.querySelector('.searchBar');
const searchBtn = document.querySelector('.searchBut');

///////////////////////////////////////

const showCountry = (data, className = '') => {
  countriesContainer.innerHTML = '';

  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
     <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>🌆</span>${data.capital[0]}</p>
    <p class="country__row"><span>🗣️</span> ${
      Object.values(data.languages)[0]
    }</p>
    <p class="country__row"><span>👫</span>${(
      data.population / 1000000
    ).toFixed(1)} M</p>
    <p class="country__row " ><span class=>💰</span> ${
      Object.values(data.currencies)[0].name
    } ${Object.values(data.currencies)[0].symbol}</p>
    <p class="country__row borders"><span>🔄</span>${data.borders}</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// showCountry();

const showError = message => {
  countriesContainer.innerHTML = ('beforeend', `${message} - TRy AGain!`);
  countriesContainer.style.opacity = 1;
};

let neighbours;
// have no idea
// let s
const getCountryDataByName = async country => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );
    // console.log(response);
    if (!response.ok) throw new Error('Country is not found ❌');
    const data = await response.json();
    if (!data[0].borders) data[0].borders = 'No any Neighbours 🏝';
    neighbours = data[0].borders;

    console.log(neighbours[0]);

    // console.log(data[0]);
    showCountry(data[0]);

    setTimeout(() => {
      showCountry(data[0]);
      searchBar.value = '';
      searchBar.blur();
    });
    // const exi = neighbours[0];

    // const responseNeighbour = await fetch(
    //   `https://restcountries.com/v3.1/alpha/${exi}`
    // );
    // const dataNeighbour = await responseNeighbour.json();
    console.log(dataNeighbour[0]);
    // showCountry(dataNeighbour[0], 'neighbour');
  } catch (err) {
    console.error(`${err} - TRy AGain !`);
    showError(`${err.message} - TRy AGain !`);
    // countriesContainer.insertAdjacentText =
    //   ('beforeend', `${err} - TRy AGain!`);
  } finally {
    countriesContainer.style.opacity = 1;
  }
};
// getCountryDataByName('russia')

const findCountryByName = async () => {
  const countryName = searchBar.value.trim().toLowerCase();
  getCountryDataByName(countryName);
};

searchBtn.addEventListener('click', findCountryByName);

document.addEventListener('keydown', e => {
  e.key === 'Enter' && findCountryByName();
});

//////////////////////////////////////////////////////////////
// Finding Current Location ⤵
const currentPos = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      timeout: 5000,
    });
  });
};

const whereAmI = async () => {
  try {
    const position = await currentPos();
    console.log(position);
    const { latitude: lat, longitude: lng } = position.coords;
    // const responseOfLocation = await fetch(
    //   `https://geocode.xyz/${lat},${lng}?geoit=json`
    // );
    const responseOfLocation = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=642843036877594290458x95959`
      
    );
    console.log(responseOfLocation)
    const dataOfLocation = await responseOfLocation.json();
    console.log(dataOfLocation.country);

    getCountryDataByName(dataOfLocation.country.toLowerCase());
  } catch (err) {
    console.error(err);
    showError(err);
  }
};


whereBtn.addEventListener('click', () => {
  whereAmI();
});

/*
const currentPos = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
    // resolve (console.log('yes'));
  });
};
// currentPos()


const whereAmI1 = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json`
    );

    if (!response.ok) throw new Error('What the fuck bruh?');
    
    const data = await response.json();
    console.log(data);
    console.log(`You are in ${data.city}, ${data.country}`);

    const responseData = await fetch (`https://restcountries.com/v3.1/name/azerbaijan`)
    const dataRes = await responseData.json()
    console.log(dataRes[0]);
  } catch (err) {
    // console.error(err);
    // showError(err);
  }
}
// whereAmI1()

btn.addEventListener('click', function (e) {
  whereAmI(40.4093, 49.8671);
});
*/

// neighbours.forEach(element => {
//   element.addEventListener('click', async function (e) {
//     console.log(e.target);
//     try {
//       const response = await fetch(
//         `https://restcountries.com/v3.1/alpha/${code}`
//       );
//       const data = await response.json();
//     } catch (err) {
//       console.log(err);
//     }
//   });
// });

// const findCountryByCode = () => {
//   const countryName = searchBar.value.trim().toLowerCase();
//   getCountryDataByName(countryName);
//   setTimeout(() => {
//     searchBar.value = '';
//     searchBar.blur();
//   }, 800);
// };
// searchBtn.addEventListener('click', findCountryByCode);

// document.addEventListener('keydown', e => {
//   // console.log(e);
//   e.key === 'Enter' && getCountryData(countryName);
// });

/*
const getCountryDataByCode = async country=> {
  try {
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${country}`)
  console.log(response);
  if (!response.ok) throw new Error ('Something went wrong we don\'t know yet')
  const data = await response.json()
  console.log(data[0]);
  showCountry(data[0])
} catch (err) {
  console.error(err);
}
 
}
getCountryDataByCode('ruse')
*/

/*
const getJSON = (url, errorMessage = '') => {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMessage} (${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    'Country is not found'
  ).then(data => {
    console.log(data[0]);
    showCountry(data[0]);
  });
};
*/
// getCountryData('turkey')

/*
const currencies = {
  AZN: {
    name: 'manat',
    surname: 'azn',
  },
};

console.log(Object.values(currencies)[0].name);
console.log(Object.values(currencies)[0].surname);
console.log(Object.keys(Object.values(currencies)[0]));
console.log(Object.values(Object.values(currencies)[0]));

console.log(Object.keys(currencies));

console.log(currencies);
console.log(currencies[Object.keys(currencies)]);


const currencies2 = {
  name: 'Manat',
  surname: 'azn',
};

console.log(Object.keys(currencies2)[0]);
console.log(Object.values(currencies2)[0]);

console.log(Object.keys(currencies2)[1]);
console.log(Object.values(currencies2)[1]);
*/

// const getCountryDataAndNeighbour = function(country) {
//   const request = new XMLHttpRequest()
//   // old school way ⤴
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`)
//   // form of request ↖, and https ⤴
//   request.send()
//   // waiitng gor fetch to load ⤵

//   request.addEventListener('load', function() {
//     // it will execetute after fetch is done

//     // console.log(this.responseText);
//     // all data⤴
//     const [data] = JSON.parse(this.responseText)
//     console.log(data);
//     // object of data ⤴

//     //Render country 1
//     showCountry(data)
//     // console.log(data.borders);
//     // Get neighbour country
//     const [neighbour] = data.borders
//     if (!neighbour) return

//     const request2 = new XMLHttpRequest()
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`)

//     request2.send()
//     // sent to fetch and after fetch is done ⤵

//     request2.addEventListener('load', function() {
//       // console.log(this.responseText);
//       const [data2] = JSON.parse(this.responseText)
//       // console.log(data2);
//       console.log(data2);
//       showCountry(data2, 'neighbour')
//     })
//   })
//   }
//   getCountryDataAndNeighbour('azerbaijan')

//   // getCountryData('portugal')
//   // getCountryData('usa')
//   // getCountryDataAndNeighbour('azerbaijan')
