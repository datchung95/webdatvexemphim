export class ThongTinNguoiDung {
    email = "";
    hoTen = "";
    loaiNguoiDung = "";
    maNhom = "";
    matKhau = "";
    soDT = "";
    taiKhoan = "";
    thongTinDatVe = [new ThongTinDatVe()];
}

class ThongTinDatVe {
    danhSachGhe = [new DanhSachGhe()]
    giaVe = "";
    hinhAnh = "";
    maVe = "";
    ngayDat = "";
    tenPhim = "";
    thoiLuongPhim = "";
}

class DanhSachGhe {
    maCumRap = "";
    maGhe = "";
    maHeThongRap = "";
    maRap = "";
    tenCumRap = "";
    tenGhe = "";
    tenHeThongRap = "";
    tenRap = "";
}