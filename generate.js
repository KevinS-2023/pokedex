function generateHtmlPokemonCard(index){
    document.getElementById("contentContainer").innerHTML += `
    <div id="pokemonCard${index}" class="pokemonCard" onclick="openPokemonDataCard(${index})">
        <div class="nameAndOrder">
            <h2 id="name${index}">name</h2> 
            <h5 id="number${index}" class="text-secondary">number</h5>
        </div>
    <div class="test">
        <div class="types" id="types${index}">
           
        </div>
        <img src="" alt="" class="pokemonImg" id="img${index}">
    </div>
    </div>`;
}

function generateHtmlDataCardAbout(){

    document.getElementById("dataCardBottomContent").innerHTML = `
        <table>
            <tr>
                <td class="minWidth120">Height:</td>
                <td id="height"></td>
            </tr>
            <tr>
                <td class="minWidth120">Weight:</td>
                <td id="weight"></td>
            </tr>
            <tr>
                <td class="minWidth120">Abilities:</td>
                <td id="abilities"></td>
            </tr>
        </table>`;
}

function generateBaseStatsChart(jsonArray){
    let stats = [];

    document.getElementById("dataCardBottomContent").innerHTML = '<canvas id="myChart" class="text-start"></canvas>';

    for(let i = 0; i < jsonArray[0]['stats'].length; i++){
        stats.push(jsonArray[0]['stats'][i]['base_stat']);
    }

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
        labels: ['HP', 'Attack', 'Defense', 'Special-Attack', 'Special-Defense', 'Speed'],
        datasets: [{
        label: 'Base Stats',
        data: stats,
        backgroundColor:['rgba(255, 33, 0, 0.7)',
                        'rgba(0, 200, 18, 0.7)',
                        'rgba(255, 33, 0, 0.7)',
                        'rgba(0, 200, 18, 0.7)',
                        'rgba(255, 33, 0, 0.7)',
                        'rgba(0, 200, 18, 0.7)',],
        borderWidth: 1
    }]
    },
    options: {
        indexAxis: 'y',
    scales: {
        y: {
            beginAtZero: true
        }
    }
    }
    });
}

async function generatePokemonCardTypes(index){

    // sets the background color by type
    document.getElementById(`pokemonCard${index}`).classList.add(pokemonData[0]['types'][0]['type']['name']);

    for(let i = 0; i < pokemonData[0]['types'].length; i++){

        let typeName = pokemonData[0]['types'][i]['type']['name'];

        document.getElementById(`types${index}`).innerHTML += `
            <span class="${typeName} paddingAndBorder">
                <h5>${typeName}</h5>
            </span>`
    }
}

async function generateDataCardTypes(){
    document.getElementById(`dataCardTypes`).innerHTML = "";

    // sets the background color by type
    removeTypeColorClasses();
    document.getElementById(`pokemonDataCard`).classList.add(pokemonData[0]['types'][0]['type']['name']);

        for(let i = 0; i < pokemonData[0]['types'].length; i++){

            let typeName = pokemonData[0]['types'][i]['type']['name'];

            document.getElementById(`dataCardTypes`).innerHTML += `
                <span class="${typeName} paddingAndBorder">
                    <h3>${typeName}</h3>
                </span>`
        }
}


function generateHtmlMove(input){
    document.getElementById("dataCardBottomContent").innerHTML += `
        <span> 
            ${input}
        </span>`;
}
