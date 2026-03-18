import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { composeWithDevTools } from '@redux-devtools/extension';
import { persistReducer, persistStore } from 'redux-persist';
import { applyMiddleware, createStore } from 'redux';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import expireReducer from 'redux-persist-expire';

import GithubTransform from './redux/github/transform';
import YoutubeTransform from './redux/youtube/transform';
import githubState from './redux/github/reducer';
import { initialState as youtubeState } from './redux/youtube/reducer';
import rootReducer from './redux/reducers';

const persistedReducers = persistReducer(
  {
    key: 'githunt:root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
    transforms: [
      GithubTransform,
      YoutubeTransform,
      expireReducer('github', {
        expireSeconds: 3600,
        expiredState: { ...githubState },
        autoExpire: true
      }),
      expireReducer('youtube', {
        expireSeconds: 3600,
        expiredState: { ...youtubeState },
        autoExpire: true
      })
    ]
  },
  rootReducer,
);

export const store = createStore(persistedReducers, composeWithDevTools(
  applyMiddleware(
    thunk,
  ),
));

export const persist = persistStore(store);
