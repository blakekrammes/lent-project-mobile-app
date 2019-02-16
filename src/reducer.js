import * as actions from './actions.js';

const intialState = {
    audioPlaying: false
};

export const reducer = (state=intialState, action) => {
    if (action.type === actions.AUDIO_PLAYING) {
        return Object.assign({}, state, {
            audioPlaying: !audioPlaying
        });
    }
    return state;
};

