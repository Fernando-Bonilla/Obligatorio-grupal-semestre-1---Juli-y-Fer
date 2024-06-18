
export let userPurchases = [
    {id: 1, name: 'juan', items:[]},
    {id: 2, name: 'pepe', items:[]},
    {id: 3, name: 'roke', items:[]}
];
    
export function CheckUser() {
    const userSelect = document.getElementById('userSelect');
    const selectedUser = userSelect.value;
    return selectedUser;
};




