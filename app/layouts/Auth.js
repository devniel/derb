import React, { Component } from 'react';

import './../styles/layouts/Auth.pcss';
import './../styles/Loaders.pcss';

class Auth extends Component {
  render() {
		return (
            <div className="auth">
                {this.props.children}
            </div>
		);
  }
}

export default Auth;


