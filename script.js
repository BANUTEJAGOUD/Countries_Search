let spinnerEl = document.getElementById("spinner");
let searchInputEl = document.getElementById("searchInput");
let resultCountriesEl = document.getElementById("resultCountries");
let url = `https://apis.ccbp.in/countries-data`;
let data = [];
let options = {
    method: "GET"
}

function createAndAppendData(obj) {
    let divElement = document.createElement("div");
    divElement.classList.add("country-card", 'col-11', 'col-md-5', 'mr-auto', 'ml-auto', 'd-flex', 'flex-row');
    let imageEl = document.createElement("img");
    imageEl.src = obj.flag;
    imageEl.classList.add("country-flag", 'mt-auto', 'mb-auto');
    divElement.appendChild(imageEl);
    let countryInfoEl = document.createElement('div');
    countryInfoEl.classList.add("d-flex", 'flex-column', 'ml-4');
    divElement.appendChild(countryInfoEl);
    let countryNameEl = document.createElement("p");
    countryNameEl.textContent = obj.name;
    countryNameEl.classList.add("country-name");
    countryInfoEl.appendChild(countryNameEl);
    let populationEl = document.createElement("p");
    populationEl.textContent = obj.population;
    populationEl.classList.add("country-population");
    countryInfoEl.appendChild(populationEl);
    resultCountriesEl.appendChild(divElement);
}
function displayResults(fetchedData) {
        resultCountriesEl.textContent="";
        for (let ele of fetchedData) {
            createAndAppendData(ele);
        }
}
spinnerEl.classList.toggle("d-none");
fetch(url, options)
    .then(function(response) {
        return response.json();
    }).then(function(fectheddata) {
        data = fectheddata;
        displayResults(fectheddata);
        spinnerEl.classList.toggle("d-none");
    });
function filteredResults(){
    let value=searchInputEl.value.toLowerCase();
    let filteredData=[];
    for(let item of data){
        if(item.name.toLowerCase().includes(value)){
            filteredData.push(item);
        }
    }
    displayResults(filteredData);
}
searchInputEl.addEventListener("input", filteredResults);