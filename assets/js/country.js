function loadBorderCountries(borders){
    if (borders.length == 0)
        return

    $(".border-countries").append(`<div class="countries"><p>Border countries: </p></div>`)
    for (let border of borders){
        $.getJSON("https://restcountries.eu/rest/v2/alpha/" + border, (data) => {
            let border_name = data.name;
            $(".countries").append(`<a href="country.html?${border_name}">${border_name}</a>`)
        });
    }
}

function loadListInfo(list, obj){
    let output = "";
    for (item of list){
        output += item.name + ", ";
    }
    $(obj).append(output.substring(0, output.length - 2))
}

function loadDomains(domains){
    let output = "";
    for (domain of domains){
        output += domain + ", ";
    }
    $(".domain").append(output.substring(0, output.length - 2))
}

function loadCountryInfo(country_info){
    $(".title").append(country_info.name);
    $(".native").append(country_info.nativeName);
    $(".population").append(country_info.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
    $(".region").append(country_info.region);
    $(".subregion").append(country_info.subregion);
    $(".capital").append(country_info.capital);
    loadDomains(country_info.topLevelDomain);
    loadBorderCountries(country_info.borders);
    loadListInfo(country_info.currencies, ".currencies");
    loadListInfo(country_info.languages, ".languages");
    $(".flag").css("background-image", `url(${country_info.flag})`);
}

$(function() {
    let parameter = document.location.search;
    let country = parameter.substring(1, parameter.length)
    if(!country)
        window.location.replace("index.html")
    $.getJSON("https://restcountries.eu/rest/v2/name/" + country, (data) => {
        let country_info = data[0];
        loadCountryInfo(country_info);
    });
});