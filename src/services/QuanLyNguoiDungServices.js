import { GROUPDSPHIM } from "../util/setting/config";
import { baseServices } from "./baseServices";


class QuanLyNguoiDungServices extends baseServices {
    constructor() {
        super();
    }
    dangNhap(user) {
        return this.post("api/QuanLyNguoiDung/DangNhap", user);
    }
    layThongTinNguoiDung() {
        return this.post("api/QuanLyNguoiDung/ThongTinTaiKhoan");
    }
    dangKy(user) {
        return this.post("api/QuanLyNguoiDung/DangKy", user);
    }
    capNhatThongTinNguoiDungProfile(userUpdate) {
        return this.put("api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", userUpdate);
    }
    layDanhSachNguoiDung(keyword = "") {
        if (keyword === "") {
            return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPDSPHIM}`)
        } else {
            return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPDSPHIM}&tuKhoa=${keyword}`)
        }
        
    }
    xoaNguoiDung(taiKhoan) {
        return this.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
    }
    layDanhSachLoaiNguoiDung() {
        return this.get("api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung");
    }
    themNguoiDung(user) {
        return this.post("api/QuanLyNguoiDung/ThemNguoiDung", user);
    }
    capNhatNguoiDung(userUpdate) {
        return this.post("api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", userUpdate);
    }
}

export const quanLyNguoiDungServices = new QuanLyNguoiDungServices();