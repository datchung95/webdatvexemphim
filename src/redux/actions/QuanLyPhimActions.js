import openNotificationWithIcon from "../../Notification/Notification";
import { quanLyPhimServices } from "../../services/QuanLyPhimServices"
import history from "../../util/libs/history";
import { GET_LIST_MOVIE, GET_MOVIE_ID } from "../types/QuanLyPhimTypes";
import { displayLoaidng, hiddenLoading } from "./LoadingAction";

export const getDanhSachPhim = (keyword = "") => {
    return async (dispatch) => {
        try {
            const { data } = await quanLyPhimServices.layDanhSachPhim(keyword);
            dispatch({
                type: GET_LIST_MOVIE,
                arrMovie: data.content
            })
        } catch (err) {
            openNotificationWithIcon("error", err.response.data.content);
        }
    }
}

export const themPhimAction = (formData) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoaidng);
            const { data } = await quanLyPhimServices.themPhim(formData);
            setTimeout(() => {
                dispatch(hiddenLoading);
            }, 500)
            openNotificationWithIcon("success", "Thêm phim thành công");
        } catch (err) {
            setTimeout(() => {
                dispatch(hiddenLoading);
            }, 500)
            openNotificationWithIcon("error", err.response.data.content);
        }
    }
}

export const layPhimTheoMaAction = (maPhim) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoaidng);
            const { data } = await quanLyPhimServices.layPhimTheoMa(maPhim);
            await dispatch({
                type: GET_MOVIE_ID,
                movie: data.content
            })
            setTimeout(() => {
                dispatch(hiddenLoading);
            }, 500)
        } catch (err) {
            setTimeout(() => {
                dispatch(hiddenLoading);
            }, 500)
            openNotificationWithIcon("error", err.response.data.content);
        }
    }
}

export const capNhatPhimAction = (formData) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoaidng);
            const { data } = await quanLyPhimServices.capNhatPhim(formData);
            await dispatch(getDanhSachPhim());
            history.push("/quantri/quanlyphim");
            setTimeout(() => {
                dispatch(hiddenLoading);
            }, 500)
            openNotificationWithIcon("success", "Cập nhật phim thành công");
        } catch (err) {
            setTimeout(() => {
                dispatch(hiddenLoading);
            }, 500)
            openNotificationWithIcon("error", err.response.data.content);
        }
    }
}

export const xoaPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoaidng);
            const { data } = await quanLyPhimServices.xoaPhim(maPhim);
            await dispatch(getDanhSachPhim());
            history.push("/quantri/quanlyphim");
            setTimeout(() => {
                dispatch(hiddenLoading);
            }, 500)
            openNotificationWithIcon("success", "Xóa phim thành công");
        } catch (err) {
            setTimeout(() => {
                dispatch(hiddenLoading);
            }, 500)
            openNotificationWithIcon("error", err.response.data.content);
        }
    }
}