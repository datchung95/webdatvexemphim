import { TOKEN, USER_LOGIN_LOCAL } from "../../util/setting/config";
import { DanhSachLoaiNguoiDung } from "../../_core/models/DanhSachLoaiNguoiDung";
import { DanhSachNguoiDung } from "../../_core/models/DanhSachTatCaNguoiDung";
import { ThongTinNguoiDung } from "../../_core/models/ThongTinNguoiDung";
import { LAY_DANH_SACH_LOAI_NGUOI_DUNG, LAY_DANH_SACH_NGUOI_DUNG, LAY_THONG_TIN_NGUOI_DUNG, USER_LOGIN } from "../types/QuanLyNguoiDungTypes"

let userLoginLocal = {}; 

if (localStorage.getItem(USER_LOGIN_LOCAL)) {
    userLoginLocal = JSON.parse(localStorage.getItem(USER_LOGIN_LOCAL));
} 

const nguoiDungState = {
    userLogin: userLoginLocal,
    thongTinNguoiDung: new ThongTinNguoiDung(),
    dsNguoiDung: new DanhSachNguoiDung().dsNguoiDung,
    dsLoaiNguoiDung: new DanhSachLoaiNguoiDung().dsLoaiNguoiDung
}

const QuanLyNguoiDungReducers = (state = nguoiDungState, action) => {
    switch (action.type) {
        case USER_LOGIN: {
            localStorage.setItem(USER_LOGIN_LOCAL, JSON.stringify(action.userLogin));
            localStorage.setItem(TOKEN, action.userLogin.accessToken);
            state.userLogin = action.userLogin;
            return {...state};
        }
        case LAY_THONG_TIN_NGUOI_DUNG: {
            state.thongTinNguoiDung = action.thongTinNguoiDung;
            return {...state};
        }
        case LAY_DANH_SACH_NGUOI_DUNG: {
            state.dsNguoiDung = action.dsNguoiDung;
            return {...state};
        }
        case LAY_DANH_SACH_LOAI_NGUOI_DUNG: {
            state.dsLoaiNguoiDung = action.dsLoaiNguoiDung;
            return {...state}
        }
        default: return {...state};
    }
}

export default QuanLyNguoiDungReducers