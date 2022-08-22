export class ThongTinLichChieu {
    thongTinPhim = new ThongTinPhim();
    danhSachGhe = [new DanhSachGhe()];
}

class ThongTinPhim {
    maLichChieu = "";
    tenCumRap = "";
    tenRap = "";
    diaChi = "";
    tenPhim = "";
    hinhAnh = "";
    ngayChieu = "";
    gioChieu = "";
}

class DanhSachGhe {
    maGhe = "";
    tenGhe = "";
    maRap = "";
    loaiGhe = "";
    stt = "";
    giaVe = "";
    daDat = "";
    taiKhoanNguoiDat = "";
}