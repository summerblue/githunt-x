import { combineReducers } from 'redux';

import preference from './preference/reducer';
import github from './github/reducer';
import youtube from './youtube/reducer';

export default combineReducers({
  github,
  youtube,
  preference,
});
