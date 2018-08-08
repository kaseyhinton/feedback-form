import { html,LitElement } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';

import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
import '@vaadin/vaadin-text-field/vaadin-text-area.js';
import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar.js';

import { addFeedback } from '../actions/feedback.js';
import { updateLoading } from '../actions/app.js';

import feedback from '../reducers/feedback.js';

store.addReducers({
  feedback
});

const ComponentStyles = html`
<style>
  :host {
    display: block;
    padding: 16px;
  }
  
   vaadin-combo-box,
   vaadin-text-field,
   vaadin-date-picker,
   vaadin-checkbox,
   vaadin-text-area {
        display: flex;
        margin: 16px 0;
     }

    vaadin-progress-bar {
      position: fixed;
      top: -8px;
      left: 0;
      right: 0;
    }
   </style>
`;

class MyFeedbackForm extends connect(store)(LitElement) {
  constructor(){
    super();
    this.types = ['Issue', 'Feature', 'Comment'];
  }

  static get properties() { return {
    isLoading: Boolean,
    types: Array
  }};

  _render(props) {
   return html`
    ${ComponentStyles}
    <vaadin-progress-bar hidden?="${!props.isLoading}" indeterminate="${props.isLoading}" value="0"></vaadin-progress-bar>
    <section>
      <vaadin-combo-box disabled="${props.isLoading}" items="${props.types}" placeholder="Type"></vaadin-combo-box>
      <vaadin-date-picker disabled="${props.isLoading}" placeholder="Date"></vaadin-date-picker>
      <vaadin-text-area disabled="${props.isLoading}" placeholder="Description"></vaadin-text-area>
      <vaadin-button disabled="${props.isLoading}" on-click="${() => this._submit()}">SAVE</vaadin-button>
    </section>
  `;
  }

  _submit(){ 
    store.dispatch(updateLoading(true));
    
    setTimeout(()=> {
      const feedback = this._createFeedback();
       store.dispatch(addFeedback(feedback));
       store.dispatch(updateLoading(false));
       this._resetForm();
    }, 800);
  }

  _createFeedback() {
    const typeElement = this.shadowRoot.querySelector('vaadin-combo-box');
    const dateElement = this.shadowRoot.querySelector('vaadin-date-picker');
    const descriptionElement = this.shadowRoot.querySelector('vaadin-text-area');
    return {
        Type: typeElement.value,
        Date: dateElement.value,
        Description: descriptionElement.value
      }
  }

  _resetForm(){
    const typeElement = this.shadowRoot.querySelector('vaadin-combo-box');
    const dateElement = this.shadowRoot.querySelector('vaadin-date-picker');
    const descriptionElement = this.shadowRoot.querySelector('vaadin-text-area');
    typeElement.value = '';
    dateElement.value = '';
    descriptionElement.value = '';
  }

  _stateChanged(state) {
    this.isLoading = state.app.isLoading;
  }
}

window.customElements.define('my-feedback-form', MyFeedbackForm);