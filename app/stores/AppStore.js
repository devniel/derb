import BaseStore from './BaseStore';
import {READY} from '../constants/AppConstants';

class AppStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._braph = null;
    this._ready = false;
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case READY:
        this._ready = true;
        this.emitChange();
        break;
    }
  }

  set ready(value){
    this._ready = value;
  }

  get ready(){
    return this._ready;
  }

}

export default new AppStore();