// Variables

const form = document.getElementById( 'form' );
const input = document.getElementById( 'task-input' );
const list = document.getElementById('list');
const save = document.getElementById( 'save' );
const style = document.createElement( 'style' );
document.head.appendChild( style );
const styleSheet = style.sheet;

// Functions

const loadFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem( 'tasks' )) || [];
};

const createList = tasks => {
    list.innerHTML = '';
    let liId = 1;
    tasks.forEach(( text, i ) => {
        const li = document.createElement( 'li' );
        list.appendChild( li );

        const remove = li.appendChild( document.createElement( 'span' ) );
        remove.id = `remove-${liId}`;
        remove.classList = 'fa-solid fa-delete-left remove';
        remove.addEventListener( 'click', ( e ) => removeFromLocalStorage( e, i ) );
        styleSheet.insertRule(`#remove-${liId}:hover ~ #task-${liId}{text-decoration:line-through;text-decoration-thickness:3px;}`);

        const taskText = li.appendChild( document.createElement( 'span' ) );
        taskText.id = `task-${liId}`;
        taskText.className = 'task-text';
        taskText.textContent = text;

        const ram = li.appendChild( document.createElement( 'span' ) );
        ram.className = 'ram';
        ram.textContent = '🐏';

        liId++;
    });
};

const removeFromLocalStorage = ( e, index ) => {
    e.target.nextElementSibling.nextElementSibling.className = 'removed-item';
    const tasks = loadFromLocalStorage();
    tasks.splice( index, 1 );
    localStorage.setItem( 'tasks', JSON.stringify( tasks ) );
    setTimeout(() => createList( loadFromLocalStorage() ), 500 );
};

const addToLocalStorage = task => {
    const oldTasks = loadFromLocalStorage();
    const newTasks = [ ...oldTasks, task ];
    localStorage.setItem( 'tasks', JSON.stringify( newTasks ) );
    createList( loadFromLocalStorage() );
};

const handleTask = e => {
    e.preventDefault();
    const task = input.value;
    task && addToLocalStorage( task );
    input.value = '';
};

// Listeners

form.addEventListener( 'submit', handleTask );
save.addEventListener( 'click', handleTask );
document.addEventListener( 'DOMContentLoaded', () => createList( loadFromLocalStorage() ) );
