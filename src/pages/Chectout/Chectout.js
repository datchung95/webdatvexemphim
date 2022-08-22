import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { datVeAction, datVeSocketAction, layDanhSachPhongVeAction } from '../../redux/actions/QuanLyDatVeActions';
import { CHUYEN_TAB__DAT_VE, QUAN_LY_GHE_DANG_DAT_SIGNALR } from '../../redux/types/QuanLyDatVeTypes';
import './Chectout.css'
import _ from 'lodash'
import { UserOutlined, ArrowLeftOutlined, SmileOutlined } from '@ant-design/icons'
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { Tabs } from 'antd';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungActions';
import { NavLink } from 'react-router-dom'
import moment from 'moment';
import { connection } from '../..';
import Logout from '../../components/Logout/Logout';

function Chectout(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducers);

    const { phongVe, danhSachDangDat, danhSachGheKhachDangDat } = useSelector(state => state.QuanLyDatVeReducers);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(layDanhSachPhongVeAction(props.match.params.id));
        dispatch(layThongTinNguoiDungAction());
        //có 1 client nào đặt vé thành công thì sẽ load lại danh sách phòng vé của lịch chiếu đó
        connection.on("datVeThanhCong", () => {
            dispatch(layDanhSachPhongVeAction(props.match.params.id));
        })
        //Vừa vào trang load tất cả các ghế của người khác đang đặt 
        connection.invoke("loadDanhSachGhe", props.match.params.id);
        //load danh sách ghế đang được đặt từ server về
        connection.on("loadDanhSachGheDaDat", (dsGheDangDat) => {
            //xóa dsGheDangDat có taiKhoan của user đang đăng nhập
            dsGheDangDat = dsGheDangDat.filter(item => item.taiKhoan !== userLogin.taiKhoan);
            //gộp ds ghế khách đặt ở tất cả user thành 1 mảng chung
            let arrGheKhachDat = dsGheDangDat.reduce((res, item, index) => {
                let arrGhe = JSON.parse(item.danhSachGhe);
                return [...res,...arrGhe]
            },[])
            //lọc những ghế trùng mã ghế 
            arrGheKhachDat = _.uniqBy(arrGheKhachDat, "maGhe");
            dispatch({
                type: QUAN_LY_GHE_DANG_DAT_SIGNALR,
                danhSachGheKhachDangDat: arrGheKhachDat
            })
        })
        window.addEventListener("beforeunload", clearGhe);
        return () => {
            clearGhe();
            window.removeEventListener("beforeunload", clearGhe);
        }
    }, [])

    const { thongTinPhim, danhSachGhe } = phongVe;

    const clearGhe = (e) => {
        connection.invoke("huyDat", userLogin.taiKhoan, props.match.params.id)
    }

    const renderGhe = () => {
        return danhSachGhe.map((item, index) => {
            let classGheVip = item.loaiGhe === "Vip" ? "gheVip" : "";
            let classGheDaDat = item.daDat === true ? "gheDaDat" : "";
            let classGheDangDat = "";
            for (let i in danhSachDangDat) {
                if (item.maGhe === danhSachDangDat[i].maGhe) {
                    classGheDangDat = "gheDangDat";
                }
            }
            let classGheUserDat = "";
            if (userLogin.taiKhoan === item.taiKhoanNguoiDat) {
                classGheUserDat = "gheUserDat";
            }
            let classGheKhachDangDat ="";
            let indexGheKhachDat = danhSachGheKhachDangDat.findIndex(ghe => ghe.maGhe === item.maGhe);
            if (indexGheKhachDat !== -1) {
                classGheKhachDangDat = "gheKhachDat";
            }
            return <Fragment key={index}>
                <button onClick={() => {
                    dispatch(datVeSocketAction(item, props.match.params.id))
                }} disabled={item.daDat || classGheKhachDangDat !== ""} className={`ghe ${classGheDaDat} ${classGheVip} ${classGheDangDat} ${classGheUserDat} ${classGheKhachDangDat}`}>{item.daDat ? classGheUserDat !== "" ? <UserOutlined /> : <span>X</span> : classGheKhachDangDat !== "" ? <SmileOutlined /> : item.stt}</button>
                {(index + 1) % 16 === 0 ? <br /> : ""}
            </Fragment>
        })
    }

    const renderMaGheDat = () => {
        return _.sortBy(danhSachDangDat, [ghe => Number(ghe.stt)]).map((item, index) => {
            return <span key={index} className="ml-2 text-green-400 text-xl">{item.stt}</span>
        })
    }

    const renderTongTien = () => {
        return danhSachDangDat.reduce((tong, item, index) => {
            return tong += item.giaVe
        }, 0).toLocaleString()
    }

    return (
        <div className="min-h-screen">
            <div className="grid grid-cols-12 mt-7">
                <div className="col-span-9">
                    <div className="flex flex-col items-center">
                        <div className="bg-black" style={{ width: "80%", height: "15px" }}></div>
                        <div className="trapezoid text-black text-center text-lg">Màn hình</div>
                        <div className="mt-5">
                            {renderGhe()}
                        </div>
                    </div>
                </div>
                <div className="col-span-3 flex flex-col justify-between mr-5">
                    <div>
                        <h3 className="text-center text-2xl text-green-400">{renderTongTien()} đ</h3>
                        <hr />
                        <h3 className="text-xl">{thongTinPhim.tenPhim}</h3>
                        <p><span className="font-bold">Địa điểm: </span>{thongTinPhim.diaChi} - {thongTinPhim.tenRap}</p>
                        <p><span className="font-bold">Ngày chiếu: </span>{thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}</p>
                        <hr />
                        <div className="grid grid-cols-8 my-3">
                            <div className="col-span-6">
                                <div className="w-full flex flex-wrap">
                                    <span className="text-red-400 text-lg">Ghế</span>
                                    {renderMaGheDat()}
                                </div>
                            </div>
                            <div className="col-span-2 text-right">
                                <span className="text-green-400 text-lg">{renderTongTien()} đ</span>
                            </div>
                        </div>
                        <hr />
                        <div className="my-3 flex justify-between">
                            <p className="mb-1 font-bold">Email: </p>
                            <p className="mb-1">{userLogin.email}</p>
                        </div>
                        <hr />
                        <div className="my-3 flex justify-between">
                            <p className="mb-1 font-bold">Số điện thoại: </p>
                            <p className="mb-1">{userLogin.soDT}</p>
                        </div>
                        <hr />
                        <div>
                            <div className="flex items-center">
                                <p className="ghe chiTietGhe"></p>
                                <p>Ghế chưa đặt</p>
                            </div>
                            <div className="flex items-center">
                                <p className="ghe gheVip chiTietGhe"></p>
                                <p>Ghế vip chưa đặt</p>
                            </div>
                            <div className="flex items-center">
                                <p className="ghe gheDangDat chiTietGhe"></p>
                                <p>Ghế đang đặt</p>
                            </div>
                            <div className="flex items-center">
                                <p className="ghe gheDaDat chiTietGhe"></p>
                                <p>Ghế đã đươc đặt</p>
                            </div>
                            <div className="flex items-center">
                                <p className="ghe gheUserDat chiTietGhe"></p>
                                <p>Ghế bạn đã đặt</p>
                            </div>
                            <div className="flex items-center">
                                <p className="ghe gheKhachDat chiTietGhe"></p>
                                <p>Ghế khách đang đặt</p>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div>
                        <div className="w-full">
                            <button onClick={() => {
                                let thongTinDatVe = new ThongTinDatVe();
                                thongTinDatVe = {
                                    maLichChieu: props.match.params.id,
                                    danhSachVe: danhSachDangDat
                                }
                                dispatch(datVeAction(thongTinDatVe))
                            }} className="p-3 bg-green-400 text-white rounded-lg mb-5 w-full">Đặt vé</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function KetQuaDatVe(props) {

    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducers);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(layThongTinNguoiDungAction());
    }, [])

    const renderLichSuDatVe = () => {
        return thongTinNguoiDung.thongTinDatVe.map((item, index) => {
            const ghe = _.first(item.danhSachGhe);
            return <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={item.hinhAnh} />
                    <div className="flex-grow">
                        <h2 className="text-gray-900 title-font font-medium">{item.tenPhim}</h2>
                        <p><span className="font-bold">Ngày chiếu</span>: {moment(item.ngayDat).format("DD-MM-YYYY")} - <span className="font-bold">Giờ chiếu</span>: {moment(item.ngayDat).format("hh:mm A")}</p>
                        <p><span className="font-bold">Địa điểm</span>: {ghe.tenHeThongRap} - {ghe.tenRap}</p>
                        <p className="flex flex-wrap"><span className="font-bold">Số ghế</span>: {_.sortBy(item.danhSachGhe, [sortGhe => Number(sortGhe.tenGhe)]).map((soGhe, index) => { return <span key={index} className="ml-2 mb-1 p-2 text-white bg-red-400 rounded-md" style={{ border: "1px solid transperant" }}>{soGhe.tenGhe}</span> })}</p>
                        <p></p>
                    </div>
                </div>
            </div>
        })
    }

    return <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Lịch sử đặt vé</h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Chúc bạn xem phim vui vẻ</p>
            </div>
            <div className="flex flex-wrap -m-2">
                {renderLichSuDatVe()}
            </div>
        </div>
    </section>
}

const { TabPane } = Tabs;
export default function (props) {

    const { tabActive } = useSelector(state => state.QuanLyDatVeReducers);

    const dispatch = useDispatch();

    const classTextLogout = "text-black";

    const operations = <Logout classTextLogout={classTextLogout} />;

    useEffect(() => {
        dispatch({
            type: CHUYEN_TAB__DAT_VE,
            num: 1
        })
    },[])

    const onChange = (key) => {
        dispatch({
            type: CHUYEN_TAB__DAT_VE,
            num: key
        })
    };

    return <div className="p-5">
        <Tabs tabPosition="top" defaultActiveKey="1" activeKey={tabActive.toString()} onChange={onChange} tabBarExtraContent={operations}>
            <TabPane tab="01 CHỌN GHẾ VÀ THANH TOÁN" key="1">
                <Chectout {...props} />
            </TabPane>
            <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
                <KetQuaDatVe {...props} />
            </TabPane>
            <TabPane tab={<NavLink to="/trangchu" className="text-right text-black flex items-center justify-end">VỀ TRANG CHỦ</NavLink>} key="3"></TabPane>
        </Tabs>
    </div>
}