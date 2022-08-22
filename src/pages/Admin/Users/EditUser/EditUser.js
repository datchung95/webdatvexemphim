import React, { useEffect } from 'react'
import { Input, Select } from 'antd';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { capNhatNguoiDungAction, layDanhSachLoaiNguoiDungAction } from '../../../../redux/actions/QuanLyNguoiDungActions';
import { GROUPDSPHIM } from '../../../../util/setting/config';
import { DoubleLeftOutlined } from '@ant-design/icons';
import { displayLoaidng, hiddenLoading } from '../../../../redux/actions/LoadingAction';
import history from '../../../../util/libs/history';

const { Option } = Select;

export default function EditUser(props) {

    const dispatch = useDispatch();

    const { dsLoaiNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducers);

    let userEdit = {};

    if (!localStorage.getItem("useEdit")) {
        userEdit = JSON.parse(localStorage.getItem("userEdit"))
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: userEdit.taiKhoan,
            matKhau: userEdit.matKhau,
            email: userEdit.email,
            soDt: userEdit.soDt,
            maNhom: GROUPDSPHIM,
            maLoaiNguoiDung: userEdit.maLoaiNguoiDung,
            hoTen: userEdit.hoTen
        },
        onSubmit: (values) => {
            dispatch(capNhatNguoiDungAction(values));
        },
        validationSchema: Yup.object().shape({
            taiKhoan: Yup.string().trim().required("Tài khoản không được bỏ trống").min(6, "Tài khoản tối thiểu 6 ký tự").max(15, "Tài khoản tối đa 15 ký tự"),
            matKhau: Yup.string().trim().required("Mật khẩu không được bỏ trống").min(6, "Mật khẩu tối thiểu 6 ký tự").max(15, "TMật khẩu tối đa 15 ký tự"),
            email: Yup.string().trim().required("Mật khẩu không được bỏ trống").email("Email không đúng định dạng"),
            soDt: Yup.string().trim().nullable().required("Số điện thoại không được bỏ trống"),
            maLoaiNguoiDung: Yup.string().trim().required("Loại người dùng không được bỏ trống"),
            hoTen: Yup.string().trim().required("Họ tên không được bỏ trống")
        })
    })

    useEffect(() => {
        dispatch(layDanhSachLoaiNguoiDungAction());
    }, [])

    const handleChangeSelect = (value) => {
        formik.setFieldValue("maLoaiNguoiDung", value);
    };

    const renderLoaiNguoiDung = () => {
        return dsLoaiNguoiDung.map((item, index) => {
            return <Option value={item.maLoaiNguoiDung} key={index}>{item.tenLoai}</Option>
        })
    }

    return (
        <div>
            <h3 className="text-3xl">Cập nhật người dùng</h3>
            <form className="mt-5" onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-2 gap-20">
                    <div>
                        <p>Tài khoản</p>
                        <Input onChange={formik.handleChange} type="text" name="taiKhoan" placeholder="Nhập tài khoản" disabled={true} value={formik.values.taiKhoan} />
                        {formik.touched.taiKhoan && <p className="text-red-500">{formik.errors.taiKhoan}</p>}
                    </div>
                    <div>
                        <p>Email</p>
                        <Input onChange={formik.handleChange} type="email" name="email" placeholder="Nhập email" value={formik.values.email} />
                        {formik.touched.email && <p className="text-red-500">{formik.errors.email}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-20 mt-5">
                    <div>
                        <p>Mật khẩu</p>
                        <Input onChange={formik.handleChange} type="text" name="matKhau" placeholder="Nhập mật khẩu" value={formik.values.matKhau} />
                        {formik.touched.matKhau && <p className="text-red-500">{formik.errors.matKhau}</p>}
                    </div>
                    <div>
                        <p>Số điện thoại</p>
                        <Input onChange={formik.handleChange} type="number" name="soDt" placeholder="Nhập số điện thoại" value={formik.values.soDt} />
                        {formik.touched.soDt && <p className="text-red-500">{formik.errors.soDt}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-20 mt-5">
                    <div>
                        <p>Họ tên</p>
                        <Input onChange={formik.handleChange} type="text" name="hoTen" placeholder="Nhập họ tên" value={formik.values.hoTen} />
                        {formik.touched.hoTen && <p className="text-red-500">{formik.errors.hoTen}</p>}
                    </div>
                    <div>
                        <p>Loại người dùng</p>
                        <Select
                            placeholder="Chọn loại người dùng"
                            onChange={handleChangeSelect}
                            className="w-full"
                            value={formik.values.maLoaiNguoiDung}
                        >
                            {renderLoaiNguoiDung()}
                        </Select>
                        {formik.touched.maLoaiNguoiDung && <p className="text-red-500">{formik.errors.maLoaiNguoiDung}</p>}
                    </div>
                </div>
                <div className="mt-10 flex justify-between">
                    <button onClick={() => {
                        dispatch(displayLoaidng);
                        history.push("/quantri/quanlynguoidung");
                        setTimeout(() => {
                            dispatch(hiddenLoading)
                        }, 500)
                    }} className="text-lg text-blue-400 p-2 flex items-center"><DoubleLeftOutlined /> Trở về</button>
                    <button type="submit" className="p-2 bg-blue-400 hover:bg-blue-700 transition-all text-white rounded-md">Cập nhật</button>
                </div>
            </form>
        </div>
    )
}
