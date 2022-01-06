const todos = document.querySelector('.todo-list');

// real-time listener
db.collection('SwantjeMoritz').onSnapshot(snapshot => {
    //console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
        //console.log(change.type, change.doc.id, change.doc.data());
        if (change.type === 'added') {
            renderToDo(change.doc.data(), change.doc.id);
        }
        if (change.type === 'removed') {
            renderRemoveToDo(change.doc.id);
        }
    });
});


// render recipe data
const renderToDo = (data, id) => {
    const html = `
        <div class="todo" data-id="${id}">
            <div class="content">
                <input type="text" class="text" value="${data.Todo}"
                readonly>
                <img class="trash" data-id="${id}" src="img/trash.png" width="24" height="24">
            </div>
        </div>
    `;
    todos.innerHTML += html;
};

// remove rendered todo
const renderRemoveToDo = (id) => {
    const todo = document.querySelector(`.todo[data-id=${id}]`);
    todo.remove();
};

// add new todo
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
    evt.preventDefault();

    const todo = {
        Todo: form.todotext.value
    };
    db.collection('SwantjeMoritz').add(todo).catch(err => console.log(err));
    form.todotext.value = '';
});

// remove a todo
todos.addEventListener('click', evt => {
    if (evt.target.tagName === 'IMG') {
        const id = evt.target.getAttribute('data-id');
        db.collection('SwantjeMoritz').doc(id).delete();
    }
})