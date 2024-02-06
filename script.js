let numberOfIndex = 0;
let likes = [];
let pokemon = [];
let pokemon2 = [];
let loadFrom = 32;
let loadTo = 62;
let showlikes = false;
let pokemonData = [];


async function init(){
    
    showLoadingSpinner(true);
    pokemon.length = 0;
    fillPokemonArray();

    for(let i = 1; i < 31; i++){
        await getPokemonFromApi(i);
        generateHtmlPokemonCard(i);
        setPokemonCardMainData(i);
        generatePokemonCardTypes(i);
    }
    showLoadingSpinner(false);

   
        
    addEventToElement('headerInput');
    addEventToElement('headerInputMobile');
}

async function getPokemonFromApi(index){
    let url = `https://pokeapi.co/api/v2/pokemon/${index}`;
    let response = await fetch(url);
    let responseAsJson = await response.json();

    pokemonData.length = 0;
    pokemonData.push(responseAsJson);
}

// Pokemon Data Card -------------------------------------------------------

async function openPokemonDataCard(index){
    numberOfIndex = index;

    await getPokemonFromApi(index);
    setDataCardLikeButton();
    generateDataCardTypes();
    setDataCardMainData();
    openAboutData(index);
    setDataCardButtonAsSelected('aboutButton');
    document.getElementById("backgroundContainer").style.display = "flex";
}

function closePokemonDataCard(){
    document.getElementById("backgroundContainer").style.display = "none";
}

// Help Functions -----------------------------------------------------------------------

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function returnPokemonId(number){

    if(number < 10){
        return `#00${number}`;
    }
    else if (number < 100){
        return `#0${number}`;
    }
    else{
        return `#${number}`;
    }
}

function pushNameAndId(pokemonName, pokemonId){
        pokemon.push({name : pokemonName, id : pokemonId});
    
}

// Set Functions --------------------------------------------------------------------------------------------------------

function setPokemonCardMainData(index){
    let name = capitalizeFirstLetter(pokemonData[0]['name']);
    let number = pokemonData[0]['id'];

    document.getElementById(`name${index}`).innerHTML = name;
    document.getElementById(`number${index}`).innerHTML = returnPokemonId(pokemonData[0]['id']);
    document.getElementById(`img${index}`).src = pokemonData[0]['sprites']['other']['official-artwork']['front_default'];
    // pushNameAndId(name, number);
}

function setDataCardMainData(){
    document.getElementById(`dataCardName`).innerHTML = capitalizeFirstLetter(pokemonData[0]['name']);
    document.getElementById(`dataCardNumber`).innerHTML = returnPokemonId(pokemonData[0]['id']);
    document.getElementById(`dataCardImg`).src = pokemonData[0]['sprites']['other']['official-artwork']['front_default']; 
}

function setDataAbout(){
    let height = pokemonData[0]['height'] / 10;
    let wheight = pokemonData[0]['weight'] / 10;

    document.getElementById("height").innerHTML = height + " m";
    document.getElementById("weight").innerHTML = wheight + " Kg";
    document.getElementById("abilities").innerHTML += pokemonData[0]['abilities'][0]['ability']['name'] + ", ";
    document.getElementById("abilities").innerHTML += pokemonData[0]['abilities'][1]['ability']['name'];
}

function setDataCardLikeButton(){
    if(likes.includes(numberOfIndex)){
        document.getElementById("likeImageDataCard").src = "./icons/heart-red.svg";
    }
    else{
        document.getElementById("likeImageDataCard").src = "./icons/iconizer-heart.svg";
    }
}


// Open --------------------------------------------------------------------------------------------------------------------------------------------------------

function openAboutData(){
    generateHtmlDataCardAbout();
    setDataAbout();
    setDataCardButtonAsSelected('aboutButton');
}

async function openBaseData(){
    setDataCardButtonAsSelected('baseButton');
    document.getElementById("baseButton").classList.add('selectedButton');
    generateBaseStatsChart(pokemonData);
}

async function openMovesData(){
    document.getElementById("dataCardBottomContent").innerHTML = "";
    setDataCardButtonAsSelected('movesButton');

    for(let i = 0; i < pokemonData[0]['moves'].length; i++){
        generateHtmlMove(pokemonData[0]['moves'][i]['move']['name']);
    }
}

//  remove and reset -------------------------------------------------------------------------------------------------------------------------------------------

function removeTypeColorClasses(){
    let colors = ['grass', 'fire', 'water', 'bug', 'normal', 'poison', 'electric', 'ground', 'fairy', 'fighting', 'psychic', 'rock', 'ghost', 'ice', 'dragon'];
       
    for(let i = 0; i < colors.length; i++){
        document.getElementById(`pokemonDataCard`).classList.remove(colors[i]);
    }
}

function setDataCardButtonAsSelected(selectedButtonId){
    let buttonId = ['aboutButton', 'baseButton', 'movesButton'];

    for(let i = 0; i < buttonId.length; i++){
        document.getElementById(buttonId[i]).classList.remove('selectedButton');
        document.getElementById(buttonId[i]).classList.add('text-secondary');
    }   
    document.getElementById(selectedButtonId).classList.add("selectedButton"); 
}

function emptyContentContainer(){
    document.getElementById("contentContainer").innerHTML = "";
   }

// load more Pokemon -----------------------------------------------------------------------------

async function loadmorePokemon(){
    if (loadTo < 153){
        document.getElementById("buttonLoadMore").disabled = "true";

        for(let i = loadFrom; i < loadTo; i++){
            await getPokemonFromApi(i);
            generateHtmlPokemonCard(i);
            setPokemonCardMainData(i);
            generatePokemonCardTypes(i);
        }
        document.getElementById("buttonLoadMore").removeAttribute("disabled");
    }
    if(loadTo >= 152){
        document.getElementById("buttonLoadMore").style.display = "none";
    }

    loadFrom += 30;
    loadTo += 30;
   }


// Like ----------------------------------------------------------------------------------------

function showLikesOnly(){
    getLocalStoreg();
    emptyContentContainer();
    document.getElementById("buttonLoadMore").style.display = 'none';

    if(showlikes == false){

        if(likes.length != '0'){
            generateLikedPokemonCards();
        }
        showlikes = true;
        }
        else{
            init();
            document.getElementById("buttonLoadMore").style.display = 'block';
            loadFrom = 32;
            loadTo = 62;
            showlikes = false;
        }
   }

function likePokemon(){
    if(likes.includes(numberOfIndex)){
        dissLikePokemon();
    }
    else{
        givePokemonLike();
    } 
}

async function generateLikedPokemonCards(){
    for(let i = 0; i < likes.length; i++){
        await getPokemonFromApi(likes[i]);
        generateHtmlPokemonCard(likes[i]);
        setPokemonCardMainData(likes[i]);
        generatePokemonCardTypes(likes[i]);
    }
}

function dissLikePokemon(){
    document.getElementById("likeImageDataCard").src = "./icons/iconizer-heart.svg";
    let myIndex = likes.indexOf(numberOfIndex);
    likes.splice(myIndex, 1);
    saveToLocalStorage(likes);
}

function givePokemonLike(){
    document.getElementById("likeImageDataCard").src = "./icons/heart-red.svg";
    likes.push(numberOfIndex);
    saveToLocalStorage(likes);
}

//  Loading Spinner ---------------------------------------------------------------------------------------

function showLoadingSpinner(trueFalse){
    if(trueFalse == true){
        document.getElementById("spinnerContainer").style.display = 'flex';
    }
    else{
        document.getElementById("spinnerContainer").style.display = 'none';
    }
}

// Input Search

async function showSearchHitsOnly(element){
    
    showLoadingSpinner(true);
    let input =  document.getElementById(element).value;
    input = input.toLowerCase();
    let names;
    document.getElementById("contentContainer").innerHTML = "";

    if(input != ""){

        for(let i = 0; i < pokemon.length; i++){
            names = pokemon[i]['name'];
            names = names.toLowerCase();
            
            
            let id = returnPokemonId(pokemon[i][`id`]);
            id.toString();
                
            if(names.includes(input) == false && id.includes(input) == false){
                pokemon.splice(i, 1);
                i--;
            }  
        }

        for(let i = 0; i < pokemon.length; i++){
            let number = parseInt(pokemon[i]["id"]);

            await getPokemonFromApi(number);
            generateHtmlPokemonCard(number);
            setPokemonCardMainData(number);
            generatePokemonCardTypes(number);
        }
        document.getElementById("buttonLoadMore").style.display = "none";
    }
    else{
        init();
    }
    
    showLoadingSpinner(false);
}

async function fillPokemonArray(){
    
    for(let i = 1; i < 152; i++ ){
        await getPokemonFromApi(i);

        let name = capitalizeFirstLetter(pokemonData[0]['name']);
        let number = pokemonData[0]['id'];

        pushNameAndId(name, number);
    }
    
}
    


