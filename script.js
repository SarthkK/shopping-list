const itemform = document.querySelector('#item-form');
const iteminput = document.querySelector('#item-input');
const itemlist = document.querySelector('#item-list');
const clearbtn = document.querySelector('#clear');
const filter = document.querySelector('#filter');

function displayitems(){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(n => addItemToDOM(n));
    checkUI();
}

function addItemToDOM(item){
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item))
    const button = createButton("remove-item btn-link text-red");
    button.appendChild(createIcon('fa-solid fa-xmark'));
    li.appendChild(button);

    itemlist.appendChild(li);
}

function createButton(classes){
    const btn = document.createElement('button');
    btn.className = classes;
    return btn;
}

function addItemToStorage(item){
    let itemsFromStorage = getItemsFromStorage();

    if(localStorage.getItem('items') === null){
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    itemsFromStorage.push(item);
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}

function createIcon(classes){
    const icn = document.createElement('i');
    icn.className = classes;
    return icn;
}

function addItem(e){
    e.preventDefault();
    const newItem = iteminput.value;
    // Validate input
    if(newItem === ''){
        alert('please add an item');
        return
    }

    // create list item
    addItemToDOM(newItem);

    addItemToStorage(newItem);

    checkUI();
    iteminput.value = '';
}

function getItemsFromStorage(){
    let itemsFromStorage;

    if(localStorage.getItem('items') === null){
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

function onClickRemoveItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement);
    }
    
}

function removeItem(item){
    item.remove();

    removeItemFromStorage(item.textContent);
    checkUI();
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage = itemsFromStorage.filter(n => n !== item);
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}

function clearItems(e){
    if(confirm('Are you sure?')){
        while(itemlist.firstChild){
            itemlist.removeChild(itemlist.firstChild);
        }
    }
    localStorage.removeItem('items');

    checkUI();
}


function checkUI(){
     const items = itemlist.querySelectorAll('li');
     if(items.length === 0){
        filter.style.display = 'none';
        clearbtn.style.display = 'none';
     } else {
        filter.style.display = 'block';
        clearbtn.style.display = 'block';
     }
}

function filteritems(e){
    let value = filter.value.toLowerCase();
    itemlist.querySelectorAll('li').forEach(n => {
        if(n.innerText.toLowerCase().indexOf(value) === -1){
            n.style.display = 'none';
        }else{
            n.style.display = 'flex';
        }
    })
}


// Event Listeners
itemform.addEventListener('submit', addItem);

itemlist.addEventListener('click', onClickRemoveItem);

clearbtn.addEventListener('click', clearItems);

filter.addEventListener('input', filteritems)

document.addEventListener('DOMContentLoaded', displayitems)

checkUI();