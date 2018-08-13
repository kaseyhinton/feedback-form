import './my-feedback-form';
import './my-feedback-list';

import {html, LitElement} from '@polymer/lit-element';
import {setPassiveTouchGestures} from '@polymer/polymer/lib/utils/settings.js';
import {connect} from 'pwa-helpers/connect-mixin.js';
import {installOfflineWatcher} from 'pwa-helpers/network.js';

import {updateOffline} from '../actions/app.js';
import {store} from '../store.js';

const ComponentStyles = html`
    <style>
      :host {
        display: block;
        padding: 24px;
        max-width: 600px;
        margin: 0 auto;
      }

      header {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-left: 16px;
      }

      h1 {
        color: var(--lumo-body-text-color);
        font-weight: 500;
        font-size: var(--lumo-font-size-xl);
      }

      footer {
        border-top: 1px solid #f5f5f5;
        color: var(--lumo-secondary-text-color);
        font-weight: 500;
        font-size: var(--lumo-font-size-s);
        text-align: center;
      }
    </style>
    `

class MyApp extends connect
(store)(LitElement) {
  _render({appTitle, _offline}) {
    return html`
    ${ComponentStyles}
    <header>
      <h1>${appTitle} SHAWN</h1>
      hey
    </header>

    <main role="main" class="main-content">
      <my-feedback-form></my-feedback-form>
      <my-feedback-list></my-feedback-list>
    </main>

    <footer>
      <p>Feedback 2018</p>
    </footer>
    `;
  }

  static get properties() {
    return {
      appTitle: String, _offline: Boolean
    }
  }

  constructor() {
    super();
    setPassiveTouchGestures(true);
  }

  _firstRendered() {
    installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
  }

  _stateChanged(state) {
    this._offline = state.app.offline;
  }
}

window.customElements.define('my-app', MyApp);

const buttonTemplate = (title = 'submit') => html`
<button title="${title}">
  Click
  <div>
<div>
</div>
  </div>
</button>
`