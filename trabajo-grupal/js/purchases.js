
export let userPurchases = [
    {id: 10, name: 'juan', items:[]},
    {id: 11, name: 'pepe', items:[]},
    {id: 12, name: 'roke', items:[]}
];
    
export function CheckUserId() {
    const userSelect = document.getElementById('userSelect');
    const selectedUser = userSelect.value;
    return selectedUser;
};




