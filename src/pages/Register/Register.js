import { useFormik } from 'formik';
import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup'
import { displayLoaidng, hiddenLoading } from '../../redux/actions/LoadingAction';
import { dangKyAction } from '../../redux/actions/QuanLyNguoiDungActions';
import { GROUPDSPHIM } from '../../util/setting/config';

export default function Register() {

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            maNhom: GROUPDSPHIM,
            taiKhoan: '',
            matKhau: '',
            hoTen: '',
            email: '',
            soDt: ''
        },
        validationSchema: Yup.object().shape({
            taiKhoan: Yup.string().trim().required("Tài khoản không được bỏ trống").min(6, "Tài khoản tối thiểu 6 ký tự").max(15, "Tài khoản tối đa 15 ký tự"),
            matKhau: Yup.string().trim().required("Mật khẩu không được bỏ trống").min(6, "Mật khẩu tối thiểu 6 ký tự").max(15, "Mật khẩu tối đa 15 ký tự"),
            hoTen: Yup.string().trim().required("Họ tên không được bỏ trống"),
            email: Yup.string().trim().required("Email không được bỏ trống").email("Email không đúng định dạng"),
            soDt: Yup.string().nullable().trim().required("Số điện thoại không được bỏ trống").min(10, "Số điện thoại tối thiểu 10 số").max(11, "Số điện thoại tối đa 11 số")
        }),
        onSubmit: values => {
            dispatch(dangKyAction(values));
        },
    });

    return (
        <div className="lg:w-full h-full xl:max-w-screen-sm">
            <div className="mt-10 xs:px-5 sm:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                <h2 className="text-center text-4xl text-white font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold">Đăng ký</h2>
                <div className="mt-12 mb-5">
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <div className="text-sm text-white tracking-wide">Tài khoản</div>
                            <input name="taiKhoan" onChange={formik.handleChange} className="w-full text-lg p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="Nhập tài khoản của bạn" />
                            {formik.touched.taiKhoan && <p className="text-red-500">{formik.errors.taiKhoan}</p>}
                        </div>
                        <div className="mt-8">
                            <div className="text-sm text-white tracking-wide">
                                Mật khẩu
                            </div>
                            <input name="matKhau" onChange={formik.handleChange} className="w-full text-lg p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" placeholder="Nhập mật khẩu của bạn" />
                            {formik.touched.matKhau && <p className="text-red-500">{formik.errors.matKhau}</p>}
                        </div>
                        <div className="mt-8">
                            <div className="text-sm text-white tracking-wide">
                                Họ tên
                            </div>
                            <input name="hoTen" onChange={formik.handleChange} className="w-full text-lg p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="Nhập họ tên của bạn" />
                            {formik.touched.hoTen && <p className="text-red-500">{formik.errors.hoTen}</p>}
                        </div>
                        <div className="mt-8">
                            <div className="text-sm text-white tracking-wide">
                                Email
                            </div>
                            <input name="email" onChange={formik.handleChange} className="w-full text-lg p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="email" placeholder="Nhập email của bạn" />
                            {formik.touched.email && <p className="text-red-500">{formik.errors.email}</p>}
                        </div>
                        <div className="mt-8">
                            <div className="text-sm text-white tracking-wide">
                                Số điện thoại
                            </div>
                            <input name="soDt" onChange={formik.handleChange} className="w-full text-lg p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="number" placeholder="Nhập số điện thoại của bạn" />
                            {formik.touched.soDt && <p className="text-red-500">{formik.errors.soDt}</p>}
                        </div>
                        <div className="mt-10 mb-8">
                            <button type="submit" className="bg-indigo-500 text-gray-100 p-4 mr-2 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg">
                                Đăng ký
                            </button>
                        </div>
                        <div className="mt-5 text-sm font-display font-semibold text-white text-center">
                        Bạn đã có mật khẩu ? <NavLink to="/dangnhap" className="cursor-pointer text-red-500 hover:text-red-900" onClick={() => {
                            dispatch(displayLoaidng);
                            setTimeout(() => {
                                dispatch(hiddenLoading);
                            }, 500)
                        }}>Quay về đăng nhập</NavLink>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
