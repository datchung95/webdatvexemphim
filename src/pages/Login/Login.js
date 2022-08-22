import React from 'react'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { dangNhap } from '../../redux/actions/QuanLyNguoiDungActions';
import * as Yup from 'yup'
import { NavLink } from 'react-router-dom'
import { displayLoaidng, hiddenLoading } from '../../redux/actions/LoadingAction';

export default function Login() {

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
        },
        validationSchema: Yup.object().shape({
            taiKhoan: Yup.string().trim().required("Tài khoản không được bỏ trống").min(6, "Tài khoản tối thiểu 6 ký tự").max(15, "Tài khoản tối đa 15 ký tự"),
            matKhau: Yup.string().trim().required("Mật khẩu không được bỏ trống").min(6, "Mật khẩu tối thiểu 6 ký tự").max(15, "Mật khẩu tối đa 15 ký tự")
        }),
        onSubmit: values => {
            dispatch(dangNhap(values))
        },
    });

    return (
        <div className="lg:w-full xl:max-w-screen-sm">
            <div className="mt-10 px-12 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                <h2 className="text-center text-4xl text-white font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold">Đăng nhập</h2>
                <div className="mt-12 mb-5">
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <div className="text-sm font-bold text-white tracking-wide">Tài khoản</div>
                            <input name="taiKhoan" onChange={formik.handleChange} className="w-full text-lg p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="Nhập tài khoản của bạn" />
                            {formik.touched.taiKhoan && <p className="text-red-500">{formik.errors.taiKhoan}</p>}
                        </div>
                        <div className="mt-8">
                            <div>
                                <div className="text-sm font-bold text-white tracking-wide">
                                    Mật khẩu
                                </div>
                            </div>
                            <input name="matKhau" onChange={formik.handleChange} className="w-full text-lg p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" placeholder="Nhập mật khẩu của bạn" />
                            {formik.touched.matKhau && <p className="text-red-500">{formik.errors.matKhau}</p>}
                        </div>
                        <div className="mt-10">
                            <button className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg">
                                Đăng nhập
                            </button>
                        </div>
                    </form>
                    <div className="mt-12 mb-5 text-sm font-display font-semibold text-white text-center">
                        Bạn chưa có mật khẩu ? <NavLink to="/dangky" className="cursor-pointer text-red-500 hover:text-red-900" onClick={() => {
                            dispatch(displayLoaidng);
                            setTimeout(() => {
                                dispatch(hiddenLoading);
                            }, 500)
                        }}>Đăng ký</NavLink>
                    </div>
                    <div className="mb-12 text-center">
                        <NavLink to="/trangchu" className="cursor-pointer text-red-500 hover:text-red-900" onClick={() => {
                            dispatch(displayLoaidng);
                            setTimeout(() => {
                                dispatch(hiddenLoading);
                            }, 500)
                        }}>Quay về trang chủ</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
