import '../TaskItem/index.js'
import '../contador/index.js'

class TaskList extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.tasks = []
        this.globalCounter = 0; // Contador global para asignar a cada tarea
    }

    connectedCallback() {
        this.render()

        const form = this.shadowRoot.querySelector('.task-form')
        form.addEventListener("submit", (e) => {
            e.preventDefault()

            const title = this.shadowRoot.querySelector('.input-title').value
            const description = this.shadowRoot.querySelector('.input-description').value

            // Incrementar el contador global para asignar a la nueva tarea
            this.globalCounter++

            // Agregar la tarea al array con el contador individual
            this.tasks.push({ title, description, state: false, contador: this.globalCounter })

            this.addTask({ title, description, state: false, contador: this.globalCounter })
            this.incrementCount(); // Actualiza el contador total de tareas

            form.reset()
        });
    }

    incrementCount() {
        // Actualiza el contador de tareas
        this.contador = this.tasks.length;
        this.shadowRoot.querySelector('.task-counter').textContent = `Total de tareas: ${this.contador}`;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <h2>Task List</h2>
            <p class="task-counter">Total de tareas: ${this.contador}</p> <!-- Contador total -->
            <form class="task-form">
                <input type="text" placeholder="Titulo" class="input-title" required>
                <input type="text" placeholder="Descripcion" class="input-description" required>
                <button>Agregar tarea</button>
            </form>
            <ul class="tasks-container"></ul>
        `;

        // Renderiza cada tarea existente en el array tasks
        this.tasks.forEach(task => this.addTask(task))
    }

    addTask({ title, description, state, contador }) {
        const tasksContainer = this.shadowRoot.querySelector('.tasks-container')

        tasksContainer.innerHTML += `
            <li>
                <task-item title="${title}" description="${description}" state="${state}"></task-item>
                <p>Task ID: ${contador}</p> <!-- Mostrar el contador individual para cada tarea -->
            </li>
        `
    }
}

customElements.define('task-list', TaskList)
export default TaskList
