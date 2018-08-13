import './my-feedback-form';
import './my-feedback-list';

import {html, LitElement} from '@polymer/lit-element';
import {setPassiveTouchGestures} from '@polymer/polymer/lib/utils/settings.js';
import {connect} from 'pwa-helpers/connect-mixin.js';
import {updateMetadata} from 'pwa-helpers/metadata.js';
import {installOfflineWatcher} from 'pwa-helpers/network.js';
import {installRouter} from 'pwa-helpers/router.js';

import {navigate, updateOffline} from '../actions/app.js';
import {store} from '../store.js';

class MyApp extends connect
(store)(LitElement) {
  _render({appTitle, _offline}) {
    return html`
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
      
      img {
        width: 200px;
        margin-right: 16px;
      }

      h1 {
        color: var(--lumo-body-text-color);
        font-weight: 500;
        font-size: var(--lumo-font-size-xl);
      }

      .toolbar-list > a {
        display: inline-block;
        color: black;
        text-decoration: none;
        padding: 0 8px;
      }

      .toolbar-list > a[selected] {
        font-weight: bold;
      }

      main {
        display: block;
      }

      .page {
        display: none;
      }

      .page[active] {
        display: block;
      }

      footer {
        border-top: 1px solid #f5f5f5;
        color: var(--lumo-secondary-text-color);
        font-weight: 500;
        font-size: var(--lumo-font-size-s);
        text-align: center;
      }

      @media (min-width: 460px) {
        header {
          flex-direction: row;
        }

        [main-title] {
          padding-right: 0px;
        }
      }
    </style>

    <header>
      <h1>${appTitle}</h1>
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

  _firstRendered() {
    // installRouter((location) =>
    // store.dispatch(navigate(window.decodeURIComponent(location.pathname))));
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