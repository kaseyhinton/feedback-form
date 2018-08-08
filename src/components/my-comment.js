import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';

import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
import '@vaadin/vaadin-checkbox/vaadin-checkbox.js';
import '@vaadin/vaadin-text-field/vaadin-text-area.js';
import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '@vaadin/vaadin-dropdown-menu/vaadin-dropdown-menu.js';
import '@vaadin/vaadin-list-box/vaadin-list-box.js';
import '@vaadin/vaadin-item/vaadin-item.js';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar.js';

import '@polymer/iron-icon';

import { addComment } from '../actions/comment.js';
import { getAgencies } from '../actions/agencies.js';
import { updateLoading } from '../actions/app.js';

import comment from '../reducers/comment.js';
import agencies from '../reducers/agencies';

store.addReducers({
  comment,
  agencies
});

const CheckboxStyles = html`
<dom-module id="custom-checkbox" theme-for="vaadin-checkbox">
  <template>
    <style>
      label {
        align-items: center;
      }

      [part="label"] {
        color: var(--lumo-secondary-text-color);
        font-weight: 500;
        font-size: var(--lumo-font-size-s);
      }      
      
      :host([disabled]) [part="label"]{
        color: var(--lumo-disabled-text-color);
      }
    </style>
  </template>
</dom-module>`;

const ComponentStyles = html`
<style>
  :host {
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

    form {
      display: flex;
      flex-direction: column;
    }

    vaadin-button {
       margin: 8px 0;
       align-self: flex-end;
     }
   </style>
`;

class MyComment extends connect(store)(PageViewElement) {
  static get properties() { return {
    agencies: Array,
    isLoading: Boolean
  }};

  _render(props) {
   return html`
    ${ComponentStyles}
    ${CheckboxStyles}
    
    <section>
      <vaadin-progress-bar hidden?="${!props.isLoading}" indeterminate="${props.isLoading}" value="0"></vaadin-progress-bar>
      <p>
        <vaadin-combo-box disabled="${props.isLoading}" item-value-path="id" item-label-path="AgencyName" items="${props.agencies}" placeholder="Agency"></vaadin-combo-box>
        <vaadin-date-picker disabled="${props.isLoading}" placeholder="Date"></vaadin-date-picker>
        <vaadin-text-area disabled="${props.isLoading}" placeholder="Comment"></vaadin-text-area>
        <vaadin-checkbox disabled="${props.isLoading}">Is Completed?</vaadin-checkbox>
        <vaadin-button disabled="${props.isLoading}" on-click="${() => this._submit()}">
          <iron-icon slot="prefix" icon="vaadin:check"></iron-icon>
          SAVE
        </vaadin-button>
      </p>
    </section>
  `;
  }

  _submit(){ 
    store.dispatch(updateLoading(true));
    
    setTimeout(()=> {
      const comment = this._createComment();
       store.dispatch(addComment(comment));
       store.dispatch(updateLoading(false));
       this._resetForm();
    }, 3000);
  }

  _createComment() {
    const agencyEl = this.shadowRoot.querySelector('vaadin-combo-box');
    const dateEl = this.shadowRoot.querySelector('vaadin-date-picker');
    const commentEl = this.shadowRoot.querySelector('vaadin-text-area');
    const isCompletedEl = this.shadowRoot.querySelector('vaadin-checkbox');
    return {
        agency: agencyEl.value,
        date: dateEl.value,
        comment: commentEl.value,
        isCompleted: isCompletedEl.value
      }
  }

  _resetForm(){
    const agencyEl = this.shadowRoot.querySelector('vaadin-combo-box');
    const dateEl = this.shadowRoot.querySelector('vaadin-date-picker');
    const commentEl = this.shadowRoot.querySelector('vaadin-text-area');
    const isCompletedEl = this.shadowRoot.querySelector('vaadin-checkbox');
    agencyEl.value = '';
    dateEl.value = '';
    commentEl.value = '';
    isCompletedEl.checked = false;
  }

  _stateChanged(state) {
    this.agencies = state.agencies.agencies;
    this.isLoading = state.app.isLoading;
  }
}

window.customElements.define('my-comment', MyComment);
export { getAgencies };
