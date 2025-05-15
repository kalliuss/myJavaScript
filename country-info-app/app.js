// arama butonu
const searchBtn = document.getElementById("searchBtn");

// arama kutusu
const countryInput = document.getElementById("countryInput");

// sonuç kutusu
const result = document.getElementById("result");

// butonu tıklanınca çalışacak fonks
searchBtn.addEventListener("click", () => {
    // Kullanıcının yazdığı ülke adını alıyoruz
    const countryName = countryInput.value.trim();

    // eğer boşsa uyarı veriyoruz
    if(countryName == ""){
        result.innerHTML = `<p>Lütfen bir ülke adı giriniz!</p>`;
        return;
    }

    const baseURL = 'https://restcountries.com/v3.1/name/';
    const fields = '?fields=name,capital,population,currencies,flags';

    const url = baseURL + encodeURIComponent(countryName) + fields;

    fetch(url)
    .then(response => {
        if(!response.ok){
        throw new Error("Ülke Bulunamadı!");
        }
        return response.json();
    })
    .then(data =>  {
        displayCountryInfo(data[0]);
    })
    .catch(error => {
        result.innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
    
});


function displayCountryInfo(country){
    // country, apiden gelen ülke objesi

    // ülke adı 
    const countryName = country.name.common;

    // bayrak urlsi
    const flagUrl = country.flags.png;

    // başkent (bazı ülkelerde birden fazla olabilir, ilkini alıyoruz)
    const capital = country.capital ? country.capital[0] : "Bilgi yok";

    // nüfus
    const population = country.population.toLocaleString();

    // para birimi bilgisi
    // API'de currencies objesi, örn: { TRY: { name: "Turkish lira", symbol: "₺" } }
    const currencies = country.currencies;
    let currencyName = "Bilgi yok";
    let currencySymbol = "";

    if (currencies){
        const currencyKey = Object.keys(currencies)[0]; // ilk para birimi kodu
        currencyName = currencies[currencyKey].name;
        currencySymbol = currencies[currencyKey].symbol;
    }

    // HTML içeriği oluşturuyoruz
    result.innerHTML = `
    <div class="country-card">
      <h2>${countryName}</h2>
      <img src="${flagUrl}" alt="Bayrak - ${countryName}" />
      <p><strong>Başkent:</strong> ${capital}</p>
      <p><strong>Nüfus:</strong> ${population}</p>
      <p><strong>Para Birimi:</strong> ${currencyName} (${currencySymbol})</p>
    </div>
  `;

}