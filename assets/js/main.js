function createCards(cards){
    for (let card of cards){
        $(".flexbox").append(
            `<a href="country.html?${card.name}" class="card-wrapper">
                <div class="card">
                    <div class="image" style="background-image:url(${card.flag})"></div>
                    <div class="text">
                        <h2 class="title">${card.name}</h2>
                        <p><span>Population:</span> ${card.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<p>
                        <p><span>Region:</span> ${card.region}<p>
                        <p><span>Capital:</span> ${card.capital}<p>
                    </div>
                </div>
            </a>
            `
        )
    }
}

function loadCountries(search, region){
    let items = []
    if(search){
        $.getJSON("https://restcountries.eu/rest/v2/name/" + search, (data) => {
            $(".flexbox").html("")
            console.log((data));
            $.each(data, function( key, obj ) {
                items.push(obj);
            });
            createCards(items); 
        }).fail(function(){
            $(".flexbox").html("")
            $(".flexbox").append(`<p>No countries found</p>`)
        })
    }else{
        $.getJSON("https://restcountries.eu/rest/v2/all", (data) => {
            $(".flexbox").html("")
            $.each(data, function( key, obj ) {
                if(!region || obj.region == region)
                    items.push(obj);
            });
            createCards(items); 
        })
    }
}

$(function() {
    loadCountries();

    $(".options span").click(function(){
        let region = $(this).data("region")
        loadCountries(null ,region);       
    });

    $("input").keyup(function(){
        let search = $(this).val()
        loadCountries(search, null);
    })
});