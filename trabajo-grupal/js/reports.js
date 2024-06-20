

import { Game } from "./classGame.js";

document.addEventListener('DOMContentLoaded', () => {
    
    let netSellingAcumulated = JSON.parse(localStorage.getItem('cartAcumulated')) || [];    
    if(netSellingAcumulated.length != 0){  
        netSellingAcumulated = netSellingAcumulated.map(item => new Game(
            item._id,
            item._name,
            item._price,
            item._description,
            item._imgSrc,
            item._category,
            item._clasificacion,
        )); 
    }
    
    let salesPerGame = [];

    function calculateSalesPerGame(netSellingAcumulated){     

        netSellingAcumulated.forEach((gameAcumulated) => {   
            //Crea un objeto gameItem para cada item de netSellingAcumulated
            let gameItem = {id: gameAcumulated.id, name: gameAcumulated.name, price: gameAcumulated.price, total: gameAcumulated.price, unitsSelling: 1};
        
            //Busca si ya existe un item en salesPerGame con el mismo id
            let existingGameItem = salesPerGame.find(item => item.id === gameAcumulated.id);
        
            if (existingGameItem) {
                //Si existe, solo actualiza el total y unitsSelling
                existingGameItem.total = existingGameItem.total + gameAcumulated.price;
                existingGameItem.unitsSelling = existingGameItem.unitsSelling + 1;
            } else {
                //Si no existe, agrega el nuevo gameItem a salesPerGame
                salesPerGame.push(gameItem);
            }
        });
        console.log(salesPerGame) 
        return salesPerGame;  
    }

    calculateSalesPerGame(netSellingAcumulated);
    

    //Uso de graficas 
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {            
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});



