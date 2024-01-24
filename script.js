const itemform = document.querySelector('#item-form');
const iteminput = document.querySelector('#item-input');
const itemlist = document.querySelector('#item-list');
const clearbtn = document.querySelector('#clear');
const filter = document.querySelector('#filter');

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
    checkUI();
    iteminput.value = '';
}

function removeItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        e.target.parentElement.parentElement.remove();
        checkUI();
    }
}

function clearItems(e){
    if(confirm('Are you sure?')){
        while(itemlist.firstChild){
            itemlist.removeChild(itemlist.firstChild);
        }
    }
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

itemlist.addEventListener('click', removeItem);

clearbtn.addEventListener('click', clearItems);

filter.addEventListener('input', filteritems)

checkUI();