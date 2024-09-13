import * as components from './components/indexPadre.js';

class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
       
    }

    connectedCallback() {
        this.render();
    }

    

    render() {
        this.shadowRoot.innerHTML = `
            <h1>holi</h1>
            
            <task-list></task-list>
        `;
    }
}

customElements.define('app-container', AppContainer);


