// Variables

const form = document.getElementById( 'form' );
const input = document.getElementById( 'task-input' );
const list = document.getElementById('list');

// Functions

const loadFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem( 'tasks' )) || [];
};

const createList = tasks => {
    list.innerHTML = '';
    tasks.forEach(( text, i ) => {
        const li = document.createElement( 'li' );
        list.appendChild( li );

        const ram = li.appendChild( document.createElement( 'span' ) );
        ram.className = 'ram';
        ram.textContent = '🐏';

        const taskText = li.appendChild( document.createElement( 'span' ) );
        taskText.className = 'task-text';
        taskText.textContent = text;

        const remove = li.appendChild( document.createElement( 'span' ) );
        remove.classList = 'fa-solid fa-delete-left remove';
        remove.addEventListener( 'click', () => removeFromLocalStorage( i ) );
    });
};

const removeFromLocalStorage = index => {
    const tasks = loadFromLocalStorage();
    tasks.splice( index, 1 );
    localStorage.setItem( 'tasks', JSON.stringify( tasks ) );
    createList( loadFromLocalStorage() );
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
document.addEventListener( 'DOMContentLoaded', () => createList( loadFromLocalStorage() ) );

