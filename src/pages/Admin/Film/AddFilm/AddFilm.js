import React, { useState } from 'react'
import {
    DatePicker,
    Form,
    Input,
    InputNumber,
    Switch,
} from 'antd';
import { useFormik } from 'formik'
import moment from 'moment';
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import { themPhimAction } from '../../../../redux/actions/QuanLyPhimActions';
import { GROUPDSPHIM } from '../../../../util/setting/config';

export default function AddFilm() {

    const [imgSrc, setImgSrc] = useState("");

    const dispatch = useDispatch();

    const formatDate = "DD/MM/YYYY";

    const formik = useFormik({
        initialValues: {
            maNhom: "",
            tenPhim: "",
            trailer: "",
            moTa: "",
            ngayKhoiChieu: "",
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: "",
            hinhAnh: null
        },
        onSubmit: (value) => {
            value.maNhom = GROUPDSPHIM
            let formData = new FormData();
            for (let key in value) {
                if (key !== "hinhAnh") {
                    formData.append(key, value[key])
                } else {
                    formData.append("hinhAnh", value.hinhAnh, value.hinhAnh.name)
                }
            }
            console.log(value)
            dispatch(themPhimAction(formData));
        },
        validationSchema: Yup.object().shape({
            tenPhim: Yup.string().trim().required("Tên phim không được bỏ trống"),
            trailer: Yup.string().trim().required("Trailer không được bỏ trống"),
            moTa: Yup.string().trim().required("Mô tả không được bỏ trống"),
            ngayKhoiChieu: Yup.string().trim().required("Ngày khởi chiếu không được bỏ trống"),
            danhGia: Yup.string().trim().required("Số sao không được bỏ trống"),
            hinhAnh: Yup.mixed().required("Hình ảnh không được bỏ trống")
        }),
    })

    const handleChangeDate = (value) => {
        let ngayKhoiChieu = moment(value).format(formatDate);
        formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
    }

    const handleChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeNumber = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeFile = async (e) => {
        let file = e.target.files[0];
        await formik.setFieldValue("hinhAnh", file);
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setImgSrc(e.target.result);
        }
    }

    return (
        <Form
            onSubmitCapture={formik.handleSubmit}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            initialValues={{
                size: "default",
            }}
        >
            <h3 className="text-3xl mb-6">Thêm phim mới</h3>
            <Form.Item label="Tên phim">
                <Input name="tenPhim" onChange={formik.handleChange} />
                {formik.touched.tenPhim && <p className="text-red-500">{formik.errors.tenPhim}</p>}
            </Form.Item>
            <Form.Item label="Trailer">
                <Input name="trailer" type="url" onChange={formik.handleChange} />
                {formik.touched.trailer && <p className="text-red-500">{formik.errors.trailer}</p>}
            </Form.Item>
            <Form.Item label="Mô tả">
                <Input name="moTa" onChange={formik.handleChange} />
                {formik.touched.moTa && <p className="text-red-500">{formik.errors.moTa}</p>}
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu">
                <DatePicker format={formatDate} onChange={handleChangeDate} />
                {formik.touched.ngayKhoiChieu && <p className="text-red-500">{formik.errors.ngayKhoiChieu}</p>}
            </Form.Item>
            <Form.Item label="Đang chiếu" valuePropName="checked">
                <Switch onChange={handleChangeSwitch("dangChieu")} />
            </Form.Item>
            <Form.Item label="Sắp chiếu" valuePropName="checked">
                <Switch onChange={handleChangeSwitch("sapChieu")} />
            </Form.Item>
            <Form.Item label="Hot" valuePropName="checked">
                <Switch onChange={handleChangeSwitch("hot")} />
            </Form.Item>
            <Form.Item label="Đánh giá">
                <InputNumber min="0" max="10" onChange={handleChangeNumber("danhGia")} />
                {formik.touched.danhGia && <p className="text-red-500">{formik.errors.danhGia}</p>}
            </Form.Item>
            <Form.Item label="Hình ảnh">
                <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg, image/jpg" />
                <br />
                <img style={{ width: "100px", height: "150px" }} src={imgSrc} alt="..." />
                {formik.touched.hinhAnh && <p className="text-red-500">{formik.errors.hinhAnh}</p>}
            </Form.Item>
            <Form.Item label="Tác vụ">
                <button type="submit" className="p-2 bg-blue-400 text-white rounded-lg">Thêm phim</button>
            </Form.Item>
        </Form>
    )
}
