

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

    
    
    



    //Uso de graficas 
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {            
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 1
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



