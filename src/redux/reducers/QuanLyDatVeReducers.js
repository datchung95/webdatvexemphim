import { ThongTinLichChieu } from "../../_core/models/ThongTinLichChieu";
import { CHUYEN_TAB_LICH_SU_DAT_VE, CHUYEN_TAB__DAT_VE, DAT_VE_HOAN_TAT, LAY_DANH_SACH_PHONG_VE, QUAN_LY_GHE_DANG_DAT, QUAN_LY_GHE_DANG_DAT_SIGNALR } from "../types/QuanLyDatVeTypes";

const stateDatVe = {
    phongVe: new ThongTinLichChieu(),
    danhSachDangDat: [],
    danhSachGheKhachDangDat: [],
    tabActive: 1
}

const QuanLyDatVeReducers = (state = stateDatVe, action) => {
    switch (action.type) {
        case LAY_DANH_SACH_PHONG_VE: {
            state.phongVe = action.phongVe;
            return {...state};
        }
        case QUAN_LY_GHE_DANG_DAT: {
            let index = state.danhSachDangDat.findIndex(item => item.maGhe === action.gheDuocChon.maGhe);
            if (index !== -1) {
                state.danhSachDangDat.splice(index, 1)
            } else {
                state.danhSachDangDat.push(action.gheDuocChon);
            }
            state.danhSachDangDat = [...state.danhSachDangDat];
            return {...state};
        }
        case DAT_VE_HOAN_TAT: {
            state.danhSachDangDat = [];
            return {...state};
        }
        case CHUYEN_TAB_LICH_SU_DAT_VE: {
            state.tabActive = 2;
            return {...state};
        }
        case CHUYEN_TAB__DAT_VE: {
            state.tabActive = action.num;
            return {...state};
        }
        case QUAN_LY_GHE_DANG_DAT_SIGNALR: {
            state.danhSachGheKhachDangDat = action.danhSachGheKhachDangDat;
            return {...state};
        }
        default: return {...state}
    }
}

export default QuanLyDatVeReducers;