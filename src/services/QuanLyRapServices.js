import { GROUPDSPHIM } from "../util/setting/config";
import { baseServices } from "./baseServices";

class QuanLyRapServices extends baseServices {
    constructor() {
        super();
    }
    layThongTinRap() {
        return this.get("api/QuanLyRap/LayThongTinHeThongRap")
    }
    layThongTinLichChieuHeThongRap() {
        return this.get(`api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPDSPHIM}`)
    }
    layThongTinChiTietPhim(maPhim) {
        return this.get(`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
    }
    layThongTinChiTietCumRap(maHeThongRap) {
        return this.get(`api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`);
    }
}

export const quanLyRapServices = new QuanLyRapServices();