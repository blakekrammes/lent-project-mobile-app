export const toggleAudioStatus = () => {
    type: 'TOGGLE_AUDIO_STATUS'
}

export const changePlayButtonIcon = iconSource => {
    type: 'CHANGE_PLAY_BUTTON_ICON',
    iconSource
}