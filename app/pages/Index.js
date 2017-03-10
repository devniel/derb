import React, {Component} from 'react';
import AppStore from './../stores/AppStore';
import {Loader} from 'react-loaders';

// CSS
import './../styles/Loaders.pcss';
import './../styles/Index.pcss';

export default class Index extends Component {
  
  constructor(props){
      super(props);
      props = props || {};
      
      this.state = {
        ready : AppStore.ready
      }

  }

  componentDidMount() {
    AppStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange);
  }

  _onChange = () => {
      this.setState({
          ready: AppStore.ready
      });
  }
  
  render() {

    if(!this.state.ready){

      return(
        <div className="Index-Loader-Wrapper">
            <Loader type="line-scale" active={true}/>
        </div>
      )

    }else{
      
      return (

        <div className="Index">

          <h1>Hello Devniel</h1>

        </div>

      );

    }
  }

}