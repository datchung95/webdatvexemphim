import React, { useEffect, useState } from 'react'
import openNotificationWithIcon from '../../Notification/Notification'
import history from '../../util/libs/history'
import { GROUPDSPHIM, USER_LOGIN_LOCAL } from '../../util/setting/config'
import { Tabs, Input, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { capNhatThongTinNguoiDungProfileAction, layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungActions';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment';

const { TabPane } = Tabs;

const pageSize = 3;

export default function Profile() {

    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducers);

    const dispatch = useDispatch();

    const formatDate = "DD/MM/YYYY hh:mm:ss";

    const [pageState, setPageState] = useState({
        totalPage: thongTinNguoiDung.thongTinDatVe?.length / pageSize,
        current: 1,
        minIndex: 0,
        maxIndex: pageSize
    })

    if (!localStorage.getItem(USER_LOGIN_LOCAL)) {
        history.push("/dangnhap")
        openNotificationWithIcon("warning", "Bạn chưa đăng nhập");
    }

    useEffect(() => {
        dispatch(layThongTinNguoiDungAction())
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinNguoiDung.taiKhoan,
            matKhau: thongTinNguoiDung.matKhau,
            email: thongTinNguoiDung.email,
            soDt: thongTinNguoiDung.soDT,
            maNhom: GROUPDSPHIM,
            maLoaiNguoiDung: "",
            hoTen: thongTinNguoiDung.hoTen
        },
        onSubmit: (values) => {
            if (thongTinNguoiDung.loaiNguoiDung === "Quản trị") {
                values.maLoaiNguoiDung = "QuanTri";
            } else {
                values.maLoaiNguoiDung = "KhachHang";
            }
            dispatch(capNhatThongTinNguoiDungProfileAction(values));
        },
        validationSchema: Yup.object().shape({
            matKhau: Yup.string().trim().required("Mật khẩu không được bỏ trống").min(6, "Mật khẩu tối thiểu 6 ký tự").max(15, "Mật khẩu tối đa 15 ký tự"),
            hoTen: Yup.string().trim().required("Họ tên không được bỏ trống"),
            email: Yup.string().trim().required("Email không được bỏ trống").email("Email không đúng định dạng"),
            soDt: Yup.string().nullable().trim().required("Số điện thoại không được bỏ trống")
        })
    })

    const handleChangePagination = (page) => {
        setPageState({
            ...pageState,
            current: page,
            minIndex: (page - 1) * pageSize,
            maxIndex: page * pageSize
        })
    }

    const renderLichSuDatVe = () => {
        return thongTinNguoiDung.thongTinDatVe?.map((item, index) => {
            return index >= pageState.minIndex && index < pageState.maxIndex && (
                <div className="py-3 grid grid-cols-6 gap-3" key={index}>
                    <div className="col-span-1">
                        <img src={item.hinhAnh} alt={item.tenPhim} />
                    </div>
                    <div className="col-span-5 text-left">
                        <div key={index}>
                            <p className="mb-2">{item.danhSachGhe[0].tenHeThongRap}</p>
                        </div>
                        <div className="mb-2">Ngày đặt: <span>{moment(item.ngayDat).format(formatDate)} - </span><span>{item.danhSachGhe[0].tenCumRap}</span></div>
                        <div className="flex items-center flex-wrap">
                            <span className="mr-2">Ghế:</span>
                            {item.danhSachGhe?.map((ghe, index) => {
                                return <p className="mb-2 mr-2 text-blue-400 border border-blue-400 p-2" key={index}>{ghe.tenGhe}</p>
                            })}
                        </div>
                    </div>
                </div>)
        })
    }

    return (
        <section className="text-gray-600 body-font py-10">
            <div className="container py-24 mx-auto flex flex-col">
                <div className="lg:w-4/6 mx-auto">
                    <div className="rounded-lg h-64 overflow-hidden">
                        <img alt="content" className="object-cover object-center h-full w-full" src={`https://picsum.photos/${window.innerWidth}/${window.innerHeight}`} />
                    </div>
                    <div className="flex flex-col sm:flex-row mt-10">
                        <div className="sm:w-1/3 text-center xs:py-3 sm:px-8 sm:py-8 bg-gradient-to-r from-sky-600 to-sky-300">
                            <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400 text-5xl">
                                {thongTinNguoiDung.taiKhoan.slice(0, 1)}
                            </div>
                            <div className="flex flex-col items-center text-center justify-center">
                                <h2 className="font-medium title-font mt-4 text-white text-lg">{thongTinNguoiDung.hoTen}</h2>
                                <div className="w-12 h-1 bg-white rounded mt-4" />
                            </div>
                        </div>
                        <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                            <Tabs defaultActiveKey="1">
                            <TabPane tab="Lịch sử đặt vé" key="1">
                                    {thongTinNguoiDung.thongTinDatVe?.length > 0 ? renderLichSuDatVe() : "Bạn chưa đặt vé"}
                                    <div className="mt-5">
                                        <Pagination
                                            pageSize={pageSize}
                                            current={pageState.current}
                                            total={thongTinNguoiDung.thongTinDatVe?.length}
                                            onChange={handleChangePagination}
                                            style={{ bottom: "0px" }}
                                        />
                                    </div>
                                </TabPane>
                                <TabPane tab="Chỉnh sửa thông tin" key="2">
                                    <h3 className="xs:text-xl sm:text-4xl">Chỉnh sửa thông tin cá nhân</h3>
                                    <hr className="mb-5" />
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="grid xs:grid-cols-1 xs:gap-0 sm:grid-cols-2 sm:gap-5 mb-3">
                                            <div className="xs:text-center sm:text-left xs:mb-3 sm:mb-0">
                                                <p className="mb-1 font-semibold text-lg">Họ tên</p>
                                                <Input placeholder="Nhập họ tên của bạn" type="text" name="hoTen" onChange={formik.handleChange} value={formik.values.hoTen} />
                                                {formik.touched.hoTen && <p className="text-red-500">{formik.errors.hoTen}</p>}
                                            </div>
                                            <div className="text-left xs:text-center sm:text-left">
                                                <p className="mb-1 font-semibold text-lg">Tài khoản</p>
                                                <Input disabled={true} type="text" value={formik.values.taiKhoan} />
                                            </div>
                                        </div>
                                        <div className="grid xs:grid-cols-1 xs:gap-0 sm:grid-cols-2 sm:gap-5 mb-3">
                                            <div className="xs:text-center sm:text-left xs:mb-3 sm:mb-0">
                                                <p className="mb-1 font-semibold text-lg">Số điện thoại</p>
                                                <Input placeholder="Nhập số điện thoại của bạn" type="number" name="soDt" onChange={formik.handleChange} value={formik.values.soDt} />
                                                {formik.touched.soDt && <p className="text-red-500">{formik.errors.soDt}</p>}
                                            </div>
                                            <div className="xs:text-center sm:text-left">
                                                <p className="mb-1 font-semibold text-lg">Mật khẩu</p>
                                                <Input placeholder="Nhập mật khẩu của bạn" type="text" name="matKhau" onChange={formik.handleChange} value={formik.values.matKhau} />
                                                {formik.touched.matKhau && <p className="text-red-500">{formik.errors.matKhau}</p>}
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <div>
                                                <p className="mb-1 font-semibold text-lg">Email</p>
                                                <Input placeholder="Nhập email của bạn" type="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
                                                {formik.touched.email && <p className="text-red-500">{formik.errors.email}</p>}
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button className="p-3 bg-blue-500 rounded-md text-white hover:bg-blue-300 transition-all">Cập nhật</button>
                                        </div>
                                    </form>
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
