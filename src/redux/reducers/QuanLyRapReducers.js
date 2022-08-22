import { GET_FILM_DETAIL, GET_HE_THONG_RAP, GET_LICH_CHIEU_HE_THONG_RAP } from "../types/QuanLyRapTypes";

const stateHeThongRap = {
    heThongRap: [],
    heThongRapChieu: [],
    filmDetail: {}
}

const QuanLyRapReducers = (state = stateHeThongRap, action) => {
    switch (action.type) {
        case GET_HE_THONG_RAP: {
            state.heThongRap = action.heThongRap;
            return {...state};
        }
        case GET_LICH_CHIEU_HE_THONG_RAP: {
            state.heThongRapChieu = action.heThongRapChieu;
            return {...state};
        }
        case GET_FILM_DETAIL: {
            state.filmDetail = action.filmDetail;
            return {...state};
        }
        default: return {...state}
    }
}

export default QuanLyRapReducers;