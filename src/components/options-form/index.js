import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles.css';
import Alert from '../alert';

class OptionsForm extends React.Component {

  state = {
    token: this.props.options.token,
    youtubeApiKey: this.props.options.youtubeApiKey || '',
    success: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.options.token !== prevProps.options.token ||
        this.props.options.youtubeApiKey !== prevProps.options.youtubeApiKey) {
      this.setState({
        success: true
      });
    }
  }

  saveOptions = () => {
    this.props.updateOptions({
      token: this.state.token,
      youtubeApiKey: this.state.youtubeApiKey,
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      success: false
    });
  };

  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.saveOptions();
    }
  };

  render() {
    return (
      <div className="options-form">
        <div className="form-field">
          <h2>GitHub Token</h2>
          <p className="text-muted">Generate a token and add it below to avoid hitting the rate limit.</p>
          <hr/>
          <ul>
            <li>
              Go to the
              <a href="https://github.com/settings/tokens/new?description=GitHunt&scopes=public_repo" target="_blank" rel="noopener noreferrer"><i className="fa fa-external-link me-1"></i>Settings <i className="fa fa-angle-right"></i> Personal Access Tokens <i className="fa fa-angle-right"></i> New personal access token</a> of your github profile
            </li>
            <li>Click <span>Generate Token</span>.</li>
            <li>You will be presented with the generated token. Copy the token and add it below</li>
          </ul>
          <input type="text"
                 name='token'
                 onChange={ this.onChange }
                 onKeyDown={ this.onKeyDown }
                 className="form-control"
                 placeholder="GitHub Personal Access Token"
                 value={ this.state.token }/>
        </div>

        <div className="form-field mt-4">
          <h2>YouTube API Key</h2>
          <p className="text-muted">Add a YouTube Data API v3 key to enable YouTube search.</p>
          <hr/>
          <ul>
            <li>
              Go to the <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer"><i className="fa fa-external-link me-1"></i>Google Cloud Console <i className="fa fa-angle-right"></i> APIs & Services <i className="fa fa-angle-right"></i> Credentials</a>
            </li>
            <li>Create a new API key or use an existing one</li>
            <li>Enable the <strong>YouTube Data API v3</strong> in your project</li>
            <li>Copy the API key and add it below</li>
          </ul>
          <input type="text"
                 name='youtubeApiKey'
                 onChange={ this.onChange }
                 onKeyDown={ this.onKeyDown }
                 className="form-control"
                 placeholder="YouTube Data API v3 Key"
                 value={ this.state.youtubeApiKey }/>
        </div>

        <button className="btn btn-dark btn-lg btn-save shadow" onClick={ this.saveOptions }>
          <i className="fa fa-cog me-2"></i>
          Save Settings
        </button>
        <Link className='btn btn-primary shadow btn-block btn-lg' to='/'>
          <i className="fa fa-arrow-left me-2"></i> Go Home
        </Link>

        {
          this.state.success && (
            <div className="mt-4">
              <Alert type='warning'>Successfully updated</Alert>
            </div>
          )
        }
      </div>
    );
  }
}

OptionsForm.propTypes = {
  updateOptions: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired
};

export default OptionsForm;
