import { createStore } from 'redux';

import { reducer } from './reducer.js';

let Store = createStore(reducer);

export default Store;