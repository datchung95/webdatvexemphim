import { GROUPDSPHIM } from "../util/setting/config";
import { baseServices } from "./baseServices";


class QuanLyPhimServices extends baseServices {
    constructor() {
        super();
    }
    layDanhSachBanner() {
        return this.get("api/QuanLyPhim/LayDanhSachBanner");
    }
    layDanhSachPhim(keyword = "") {
        if (keyword === "") {
            return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPDSPHIM}`);
        } else {
            return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPDSPHIM}&tenPhim=${keyword}`)
        }
    }
    themPhim(formData) {
        return this.post("api/QuanLyPhim/ThemPhimUploadHinh", formData);
    }
    layPhimTheoMa(maPhim) {
        return this.get(`api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
    }
    capNhatPhim(formData) {
        return this.post("api/QuanLyPhim/CapNhatPhimUpload", formData);
    }
    xoaPhim(maPhim) {
        return this.delete(`api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
    }
}

export const quanLyPhimServices = new QuanLyPhimServices();