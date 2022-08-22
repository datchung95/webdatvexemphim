import openNotificationWithIcon from "../../Notification/Notification";
import { quanLyRapServices } from "../../services/QuanLyRapServices"
import { GET_FILM_DETAIL, GET_HE_THONG_RAP, GET_LICH_CHIEU_HE_THONG_RAP } from "../types/QuanLyRapTypes";
import { displayLoaidng, hiddenLoading } from "./LoadingAction";

export const getHeThongRap = () => {
    return async (dispatch) => {
        try {
            const { data } = await quanLyRapServices.layThongTinRap();
            await dispatch({
                type: GET_HE_THONG_RAP,
                heThongRap: data.content
            })
        } catch (err) {
            openNotificationWithIcon("error", err.response.data.content)
        }
    }
}

export const getLichChieuHeThongRap = () => {
    return async (dispatch) => {
        try {
            dispatch(displayLoaidng);
            const { data } = await quanLyRapServices.layThongTinLichChieuHeThongRap();
            await dispatch({
                type: GET_LICH_CHIEU_HE_THONG_RAP,
                heThongRapChieu: data.content
            })
            setTimeout(() => {
                dispatch(hiddenLoading);
            }, 500)
        } catch (err) {
            setTimeout(() => {
                dispatch(hiddenLoading);
            }, 500)
            openNotificationWithIcon("error", err.response.data.content)
        }
    }
}

export const getChiTietPhim = (maPhim) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoaidng);
            const { data } = await quanLyRapServices.layThongTinChiTietPhim(maPhim);
            await dispatch({
                type: GET_FILM_DETAIL,
                filmDetail: data.content
            })
            setTimeout(() => {
                dispatch(hiddenLoading);
            }, 500)
        } catch (err) {
            setTimeout(() => {
                dispatch(hiddenLoading);
            }, 500)
            openNotificationWithIcon("error", err.response.data.content)
        }
    }
}