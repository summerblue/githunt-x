import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import Launcher from './components/launcher';
import { persist, store } from './store';
import AppRoutes from './router';

class ThemeManager extends Component {
  componentDidMount() {
    this.applyTheme();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.theme !== this.props.theme) {
      this.applyTheme();
    }
  }

  applyTheme() {
    const theme = this.props.theme || 'dark';
    document.documentElement.setAttribute('data-bs-theme', theme);
    document.body.className = theme === 'dark' ? 'theme-dark' : 'theme-light';
  }

  render() {
    return <AppRoutes />;
  }
}

const ConnectedThemeManager = connect(
  state => ({ theme: state.preference.theme })
)(ThemeManager);

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <PersistGate loading={ <Launcher/> } persistor={ persist }>
          <ConnectedThemeManager />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
