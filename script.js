const itemform = document.querySelector('#item-form');
const iteminput = document.querySelector('#item-input');
const itemlist = document.querySelector('#item-list');
const clearbtn = document.querySelector('#clear');
const formbtn = itemform.querySelector('button');
const filter = document.querySelector('#filter');
let isEditMode = false;

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

    if(isEditMode){
        const itemtoedit = itemlist.querySelector('.edit-mode');
        removeItemFromStorage(itemtoedit.innerText);
        itemtoedit.classList.remove('edit-mode');
        itemtoedit.remove();
        isEditMode = false;
    }
    else {
        if (checkIfItemExists(newItem)){
            alert('that item already exists!');
            return;
        };
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
    else {
        setItemToEdit(e.target);
    }
}

function setItemToEdit(item){
    isEditMode = true;

    itemlist.querySelectorAll('li').forEach(n => n.classList.remove('edit-mode'))

    item.classList.add('edit-mode');
    formbtn.innerHTML = '<i class="fa-solid fa-pen"</i>    Update Item';
    formbtn.style.backgroundColor = '#228B22'
    iteminput.value = item.innerText;
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
iteminput.value = '';

     const items = itemlist.querySelectorAll('li');
     if(items.length === 0){
        filter.style.display = 'none';
        clearbtn.style.display = 'none';
     } else {
        filter.style.display = 'block';
        clearbtn.style.display = 'block';
     }
     formbtn.innerHTML = '<i class = "fa-solid fa-plus"></i> Add Item';
     formbtn.style.backgroundColor = '#333';

     isEditMode = false;
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

function checkIfItemExists(item){
    const itemfromlocal = getItemsFromStorage();
    return itemfromlocal.includes(item);
}


// Event Listeners
itemform.addEventListener('submit', addItem);

itemlist.addEventListener('click', onClickRemoveItem);

clearbtn.addEventListener('click', clearItems);

filter.addEventListener('input', filteritems)

document.addEventListener('DOMContentLoaded', displayitems)

checkUI();