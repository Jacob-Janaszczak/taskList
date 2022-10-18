{
    const hidenbutton = document.querySelector(".button_deleteAll");
    hidenbutton.style.display = 'none';

    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    };
    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li  class="list__item">
            <button class="button__done js-done">${task.done ? "✔" : ""}</button> 
            <span class="list__content${task.done ? " list__item--done" : ""}">${task.content}</span>
            <button class="button__remove js-remove">🗑</button>
           
            </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();

    };

    /* const removeAllDone = () => {
         console.log("coś nie działa");
         
         if (tasks.includes("done"))
         {
             removeTask();
         };
 
     };
 
 */

    const onFormSubmit = (event) => {

        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();



        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);


    };

    const showbuttons = (event, newTaskContent) => {
        event.preventDefault();
        const emptytask= document.querySelector(".js-newTask").value.trim();
        
        if (emptytask === "") {
            return;
        }
        hidenbutton.style.display = 'inline';
        
    };

    const clear = (event) => {
        event.preventDefault();
        const clearTask = document.querySelector(".js-newTask");
        clearTask.focus();
        clearTask.value = "";

    }

    const init = () => {

        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
        form.addEventListener("submit", showbuttons);
        form.addEventListener("submit", clear);
        
        /* hidenbutton.addEventListener("click", removeAllDone); */

    };

    init();

}