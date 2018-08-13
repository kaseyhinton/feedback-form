import {html, LitElement} from '@polymer/lit-element';
import {connect} from 'pwa-helpers/connect-mixin.js';
import {store} from '../store.js';

const ComponentStyles = html`
<style>
 :host {
    display: block;
    padding: 16px;
  }
  
   </style>
`;

class MyFeedbackList extends connect
(store)(LitElement) {
  static get properties() {
    return {
      feedback: Array
    }
  };

  _render(props) {
    return html`
     ${ComponentStyles}
    <vaadin-progress-bar hidden?="${!props.isLoading}" indeterminate="${props.isLoading}" value="0"></vaadin-progress-bar>
    <section>
      <h2>List</h2>
      ${props.feedback.map(feedback => html`${feedback.Description} ${feedback.Type} ${feedback.Date}`)}
    </section>
  `;
  }

  _stateChanged(state) {
    this.feedback = state.feedback.feedback;
  }
}

window.customElements.define('my-feedback-list', MyFeedbackList);
