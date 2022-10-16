import openNotificationWithIcon from "../../Notification/Notification";
import { quanLyNguoiDungServices } from "../../services/QuanLyNguoiDungServices"
import history from "../../util/libs/history";
import { LAY_DANH_SACH_LOAI_NGUOI_DUNG, LAY_DANH_SACH_NGUOI_DUNG, LAY_THONG_TIN_NGUOI_DUNG, USER_LOGIN } from "../types/QuanLyNguoiDungTypes";
import { displayLoaidng, hiddenLoading } from "./LoadingAction";

export const dangNhap = (user) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoaidng);
            const { data } = await quanLyNguoiDungServices.dangNhap(user);
            await dispatch({
                type: USER_LOGIN,
                userLogin: data.content
            })
            history.push("/trangcanhan");
            setTimeout(() => {
                dispatch(hiddenLoading);
            }, 500)
            openNotificationWithIcon("success", "Đăng nhập thành công");
        } catch (err) {
            setTimeout(() => {
                dispatch(hiddenLoading);
            }, 500)
            openNotificationWithIcon("error", err.response.data.content);
        }
    }
}

export const layThongTinNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            dispatch(displayLoaidng);
            const { data } = await quanLyNguoiDungServices.layThongTinNguoiDung();
            await dispatch({
                type: LAY_THONG_TIN_NGUOI_DUNG,
                thongTinNguoiDung: data.content
            })
            setTimeout(() => {
                dispatch(hiddenLoading);
            }, 500)
        } catch (err) {
            setTimeout(() => {
                dispatch(hiddenLoading);
            }, 500)
        }
    }
}

export const dangKyAction = (user) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoaidng)
            const { data } = await quanLyNguoiDungServices.dangKy(user);
            history.push("/dangnhap");
            setTimeout(() => {
                dispatch(hiddenLoading);
            }, 500)
            openNotificationWithIcon("success", "Đăng ký thành công");
        } catch (err) {
            setTimeout(() => {
                dispatch(hiddenLoading);
            }, 500)
            openNotificationWithIcon("error", err.response.data.content);
        }
    }
}

export const capNhatThongTinNguoiDungProfileAction = (userUpdate) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoaidng);
            const { data } = await quanLyNguoiDungServices.capNhatThongTinNguoiDungProfile(userUpdate);
            await dispatch({
                type: LAY_THONG_TIN_NGUOI_DUNG,
                thongTinNguoiDung: data.content
            })
            setTimeout(() => {
                dispatch(hiddenLoading);
            }, 500)
            openNotificationWithIcon("success", "Cập nhật thành công");
        } catch (err) {
            setTimeout(() => {
                dispatch(hiddenLoading);
            }, 500)
        }
    }
}

export const layDanhSachNguoiDungAction = (keyword = "") => {
    return async (dispatch) => {
        try {
            const { data } = await quanLyNguoiDungServices.layDanhSachNguoiDung(keyword);
            dispatch({
                type: LAY_DANH_SACH_NGUOI_DUNG,
                dsNguoiDung: data.content
            })
        } catch (err) {

        }
    }
}

export const xoaNguoiDungAction = (taiKhoan) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoaidng)
            const { data } = await quanLyNguoiDungServices.xoaNguoiDung(taiKhoan);
            await dispatch(layDanhSachNguoiDungAction());
            setTimeout(() => {
                dispatch(hiddenLoading);
            }, 500)
            openNotificationWithIcon("success", "Xóa thành công");
        } catch (err) {
            setTimeout(() => {
                dispatch(hiddenLoading);
            }, 500)
            openNotificationWithIcon("error", err.response.data.content)
        }
    }
}

export const layDanhSachLoaiNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            const { data } = await quanLyNguoiDungServices.layDanhSachLoaiNguoiDung();
            dispatch({
                type: LAY_DANH_SACH_LOAI_NGUOI_DUNG,
                dsLoaiNguoiDung: data.content
            })
        } catch (err) {

        }
    }
}

export const themNguoiDungAction = (user) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoaidng);
            const { data } = await quanLyNguoiDungServices.themNguoiDung(user);
            await dispatch(layDanhSachNguoiDungAction());
            history.push("/quantri/quanlynguoidung");
            openNotificationWithIcon("success", "Thêm người dùng thành công");
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

export const capNhatNguoiDungAction = (userUpdate) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoaidng);
            const { data } = await quanLyNguoiDungServices.capNhatNguoiDung(userUpdate);
            await dispatch(layDanhSachNguoiDungAction());
            history.push("/quantri/quanlynguoidung");
            openNotificationWithIcon("success", "Cập nhật người dùng thành công");
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