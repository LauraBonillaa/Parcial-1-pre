import '../contador/index.js'
class TaskItem extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: 'open'});
    }


    connectedCallback(){
        this.title = this.getAttribute('title');
      this.content = this.getAttribute('content');
      this.render();
      this.shadowRoot.querySelector('button').addEventListener('click', () => {
        this.remove();
      });
    }

    attributeChangedCallback(propName, oldValue, newValue){
        this.render()
        if (oldValue !== newValue) {
            this[propName] = propName === 'state' ? newValue === 'true' : newValue
            this.render()
        }
    }

    toggleTask(){
        this.state = !this.state
        this.render()
    }

    render(){
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./src/components/TaskItem/styles.css">
        <li class=${this.state ? "completed" : "task"}>
            <h3>${this.title}</h3>
            <p>${this.description}</p>
            <p>${!this.state ? "Pendiente" : "Completada"}</p>
            <input type="checkbox" ${this.state ? "checked" : ""} class="task-checkbox">
            </br>
            <button>Borrar</button>
            <button1>Contar</button1>

        </li>
        `

        const checkbox = this.shadowRoot.querySelector('.task-checkbox')
        checkbox.addEventListener('change', () => this.toggleTask())
    }
}

customElements.define('task-item', TaskItem)
export default TaskItem