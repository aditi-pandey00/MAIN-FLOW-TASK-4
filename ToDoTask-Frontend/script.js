document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Fetch and display tasks on page load
    fetchTasks();

    addTaskBtn.addEventListener('click', () => {
        const description = taskInput.value;
        if (description) {
            addTask(description);
            taskInput.value = '';
        }
    });

    function fetchTasks() {
        fetch('http://localhost:8080/tasks')
            .then(response => response.json())
            .then(tasks => {
                taskList.innerHTML = '';
                tasks.forEach(task => {
                    displayTask(task);
                });
            });
    }

    function addTask(description) {
        fetch('http://localhost:8080/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description, completed: false })
        })
        .then(response => response.json())
        .then(task => {
            console.log(task);
            
            displayTask(task);
        });
    }

    function displayTask(task) {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.description}</span>
            <div>
                <button onclick="toggleComplete('${task.id}')">Complete</button>
                <button onclick="deleteTask('${task.id}')">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    }

    window.toggleComplete = function(id) {
        // Fetch the current task data using GET
        fetch(`http://localhost:8080/tasks/${id}`)
            .then(response => response.json())
            .then(task => {
                // Toggle the completed status
                task.completed = !task.completed;
    
                // Send the updated task data using PUT
                fetch(`http://localhost:8080/tasks/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(task)
                })
                .then(response => response.json())
                .then(updatedTask => {
                    // Refresh the task list or update the UI
                    fetchTasks();
                })
                .catch(error => console.error('Error updating task:', error));
            })
            .catch(error => console.error('Error fetching task:', error));
    };
    

    window.deleteTask = function(id) {
        fetch(`http://localhost:8080/tasks/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            fetchTasks();
        });
    };
});
