

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

    console.log(netSellingAcumulated)
    
    let salesPerGame = []
    let gameItem = {}

    netSellingAcumulated.map((gameAcumulated) => {   
                
        //aca recorro la variable netSellingAcumulated, y por cada item adentro de eso creo un objeto gameItem compuesto por lo que se le pasa
        gameItem = {id: gameAcumulated.id, name: gameAcumulated.name, total: gameAcumulated.price, unitsSelling: 1};        
        
        if(salesPerGame.length == 0) {
            salesPerGame.push(gameItem);
            //console.log(salesPerGame)
            
        }else {              
            
            salesPerGame.map(item => {
                               
                if(gameAcumulated.id == item.id){    
                    console.log(item)                
                    item.total = item.total + gameAcumulated.price;
                    item.unitsSelling = item.unitsSelling + 1;                    

                }else {
                    console.log('entra al else')
                    salesPerGame.push(gameItem);
                    console.log(salesPerGame)
                }

            })
        } 
               
        
    })
    //console.log(salesPerGame)
    
    
    function calculateSalesPerGame(){       

    }



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



