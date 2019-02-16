import * as actions from './actions.js';

const intialState = {
    audioPlaying: false
};

export const reducer = (state=intialState, action) => {
    if (action.type === actions.TOGGLE_AUDIO_STATUS) {
        return Object.assign({}, state, {
            audioPlaying: !audioPlaying
        });
    }
    else if (action.type === actions.CHANGE_PLAY_BUTTON_ICON) {
        return Object.assign({}, state, {
            playButtonSource: action.iconSource
        });
    }
    return state;
};

