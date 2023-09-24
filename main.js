const form = document.getElementById('form');
const formInput = document.getElementById('from_name');
const itemList = document.getElementById('item-list');
const allClear = document.getElementById('btn-clear');
const itemFilter = document.getElementById('from_filter')
const formBtn = form.querySelector('button')
let isEditMode = false;

function getFromStoreToDisPlayDOM(){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item))
    checkUI();
}

const addItemToForm = (e) => {
    e.preventDefault();
    const newItem = formInput.value;
    if (newItem === '') {
        alert('Please type something');
        return;
    }
    console.log(newItem); 
    if (isEditMode === true){
        const itemToEdit = itemList.querySelector('.edit'); // to Add a class using Query selector

        console.log('inside addItemToFrom' + itemToEdit);

        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit');
        itemToEdit.remove();
        isEditMode = false;
    }

    const storedItems= getItemsFromStorage();
    if(storedItems.includes(newItem)){
        alert('Item already in List');
              
    } else {
    addItemToDOM(newItem);
    addItemToStorage(newItem);
    }
    checkUI();

    itemList.value = '';
    
}

function resetInputForm(){
    formInput.value= ''
}

function addItemToDOM(item){
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    const button = createBtn('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);

}
function createBtn(classes){
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;

}
const createIcon = (classes) => {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;

}

function addItemToStorage(item){
    const itemFromStorage = getItemsFromStorage()
    

    console.log('IT IS '+itemFromStorage);
    itemFromStorage.push(item);

    localStorage.setItem('items', JSON.stringify(itemFromStorage));
}

function getItemsFromStorage(){
    let itemFromStorage;
    if (localStorage.getItem('items') === null){
        itemFromStorage=[]
    } else {
        itemFromStorage = JSON.parse(localStorage.getItem('items'))
    }
    

    console.log(itemFromStorage)
    return itemFromStorage;

}


function onClickRemove(e){
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement)
    } else {
        updateItems(e.target)
    }
    

}

const removeItem = (item) => {
    if (confirm('Are you sure?')){
        item.remove();

        removeItemFromStorage(item.textContent);

    }
    
    checkUI();
}

function updateItems(item){
    isEditMode = true;
    itemList.querySelectorAll('li').forEach((i)=> {
        // i.style.color = '#f3bcbc'
        i.classList.remove('edit');
    })
    item.classList.add('edit');
    console.log(item);

    formBtn.innerHTML = '<i class="fa-solid fa-pen" ></i> Update Item';
    formBtn.style.backgroundColor = '#fff68f'
    formBtn.style.color = '#000'
    formInput.value= item.textContent;

}


function removeItemFromStorage(item){
    let itemsFromStorage = getItemsFromStorage()
    itemsFromStorage = itemsFromStorage.filter((i) => i!== item)

    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

const removeAll = () => {
    if (confirm('Are you sure?')){
        while (itemList.firstChild){
            itemList.removeChild(itemList.firstChild);
        }
    }
    localStorage.removeItem('items')
    checkUI();
}

const filterItems = (e) => {
    const txt = e.target.value.toLowerCase();
    const allItems = itemList.querySelectorAll('li')

    allItems.forEach(items =>{
        const itemName = items.firstChild.textContent.toLowerCase();
        
        if(itemName.indexOf(txt) != -1){
            items.style.display = 'flex';
        } else
            items.style.display = 'none';
    })


}

const checkUI = () => {
    formInput.value = '';
    const allItems = itemList.querySelectorAll('li')

    if(allItems.length === 0){
        allClear.style.display = 'none';
        itemFilter.style.display = 'none'
    } else {
        allClear.style.display = 'block';
        itemFilter.style.display = 'block'
    }
    formBtn.innerHTML = 'Add Items'
    formBtn.style.backgroundColor = '#333';
    formBtn.style.color = '#fff'
}

function init(){
    form.addEventListener('submit', addItemToForm)
    form.addEventListener('submit', resetInputForm)
    itemList.addEventListener('click', onClickRemove)
    allClear.addEventListener('click', removeAll)
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', getFromStoreToDisPlayDOM)
    checkUI();

}

init();




