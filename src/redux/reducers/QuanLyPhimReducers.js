import { GET_LIST_MOVIE, GET_LIST_MOVIE_DANG_CHIEU, GET_LIST_MOVIE_SAP_CHIEU, GET_MOVIE_ID } from "../types/QuanLyPhimTypes"

const movieState = {
    arrMovie: [],
    arrMovieDefault: [],
    dangChieu: "",
    sapChieu: "",
    movie: {}
}

const QuanLyPhimReducers = (state = movieState, action) => {
    switch (action.type) {
        case GET_LIST_MOVIE: {
            state.arrMovie = action.arrMovie;
            state.arrMovieDefault = state.arrMovie;
            return {...state}
        }
        case GET_LIST_MOVIE_DANG_CHIEU: {
            state.dangChieu = true;
            state.sapChieu = false;
            state.arrMovie = state.arrMovieDefault.filter(item => item.dangChieu === true);
            return {...state}
        }
        case GET_LIST_MOVIE_SAP_CHIEU: {
            state.dangChieu = false;
            state.sapChieu = true;
            state.arrMovie = state.arrMovieDefault.filter(item => item.sapChieu === true)
            return {...state}
        }
        case GET_MOVIE_ID: {
            state.movie = action.movie;
            return {...state};
        }
        default: return {...state}
    }
}

export default QuanLyPhimReducers;