import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";
import { baseServices } from "./baseServices";


class QuanLyDatVeServices extends baseServices {
    constructor() {
        super();
    }
    layDanhSachPhongVe(maLichChieu) {
        return this.get(`api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
    }
    datVe(thongTinDatVe = new ThongTinDatVe()) {
        return this.post("api/QuanLyDatVe/DatVe", thongTinDatVe);
    }
    taoLichChieu(lichChieu) {
        return this.post("api/QuanLyDatVe/TaoLichChieu", lichChieu);
    }
}

export const quanLyDatVeServices = new QuanLyDatVeServices();