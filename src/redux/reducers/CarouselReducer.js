import { CLOSE_TRAILER_POPUP, GET_CAROUSEL, OPEN_TRAILER_POPUP } from "../types/CarouselTypes"

const carouselState = {
    arrCarousel: [],
    trailerPopup: false
}

const CarouselReducer = (state = carouselState, action) => {
    switch (action.type) {
        case GET_CAROUSEL: {
            return {...state, arrCarousel: action.arrCarousel}
        }
        case OPEN_TRAILER_POPUP: {
            state.trailerPopup = true;
            return {...state};
        }
        case CLOSE_TRAILER_POPUP: {
            state.trailerPopup = false;
            return {...state};
        }
        default: return {...state}
    }
}

export default CarouselReducer