import * as actions from '../actions'
import { defaultImage } from '../../../../config'

const initialState = {
    current: {
        result_uri: defaultImage,
    },
    outputShape: {
        width: window.innerWidth,
        height: window.innerHeight,
    },
    prepping: false,
    id: 'defaultUser', // userID
}

export default function app(state = initialState, action) {
    switch(action.type) {

        case actions.UPDATE_CURRENT:
            return {
                ...state,
                current: action.current,
            }

        case actions.PREP_CAPTURE:
            return {
                ...state,
                prepping: action.prepping,
            }

        case actions.UPDATE_OUTPUT_SHAPE:
            return {
                ...state,
                outputShape: action.shape,
            }

        default:
            return state
    }
}
