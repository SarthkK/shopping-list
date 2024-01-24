const itemform = document.querySelector('#item-form');
const iteminput = document.querySelector('#item-input');
const itemlist = document.querySelector('#item-list');

function createButton(classes){
    const btn = document.createElement('button');
    btn.className = classes;
    return btn;
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
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem))
    const button = createButton("remove-item btn-link text-red");
    button.appendChild(createIcon('fa-solid fa-xmark'));
    li.appendChild(button);

    // add to list
    itemlist.appendChild(li);
    iteminput.value = '';
}

// Event Listeners
itemform.addEventListener('submit', addItem);
