import { connection } from "../..";
import openNotificationWithIcon from "../../Notification/Notification";
import { quanLyDatVeServices } from "../../services/QuanLyDatVeServices"
import { CHUYEN_TAB_LICH_SU_DAT_VE, DAT_VE_HOAN_TAT, LAY_DANH_SACH_PHONG_VE, QUAN_LY_GHE_DANG_DAT } from "../types/QuanLyDatVeTypes";
import { displayLoaidng, hiddenLoading } from "./LoadingAction";

export const layDanhSachPhongVeAction = (maLichChieu) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoaidng);
            const { data } = await quanLyDatVeServices.layDanhSachPhongVe(maLichChieu);
            await dispatch({
                type: LAY_DANH_SACH_PHONG_VE,
                phongVe: data.content
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

export const datVeAction = (thongTinDatVe) => {
    return async (dispatch, getState) => {
        try {
            dispatch(displayLoaidng)
            const { data } = await quanLyDatVeServices.datVe(thongTinDatVe);
            await dispatch(layDanhSachPhongVeAction(thongTinDatVe.maLichChieu));
            await dispatch({type: DAT_VE_HOAN_TAT});
            setTimeout(() => {
                dispatch(hiddenLoading);
            }, 500)
            let { userLogin } = getState().QuanLyNguoiDungReducers;
            await connection.invoke("datGheThanhCong", userLogin.taiKhoan, thongTinDatVe.maLichChieu);
            await dispatch({type: CHUYEN_TAB_LICH_SU_DAT_VE})
            openNotificationWithIcon("success", data.content);
        } catch (err) {
            setTimeout(() => {
                dispatch(hiddenLoading);
            }, 500)
            openNotificationWithIcon("error", "Đặ vé thất bại")
        }
    }
}

export const datVeSocketAction = (ghe, maLichChieu) => {
    return async (dispatch, getState) => {
        await dispatch({
            type: QUAN_LY_GHE_DANG_DAT,
            gheDuocChon: ghe
        })
        let { danhSachDangDat } = getState().QuanLyDatVeReducers;
        let taiKhoan = getState().QuanLyNguoiDungReducers.userLogin.taiKhoan;
        danhSachDangDat = JSON.stringify(danhSachDangDat);
        connection.invoke('datGhe', taiKhoan, danhSachDangDat, maLichChieu)
    }
}

export const taoLichChieuAction = (lichChieu) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoaidng)
            const { data } = await quanLyDatVeServices.taoLichChieu(lichChieu);
            setTimeout(() => {
                dispatch(hiddenLoading);
            }, 500);
            openNotificationWithIcon("success", "Tạo lịch chiếu thành công");
        } catch (err) {
            setTimeout(() => {
                dispatch(hiddenLoading);
            }, 500)
            openNotificationWithIcon("error", err.response.data.content)
        }
    }
}