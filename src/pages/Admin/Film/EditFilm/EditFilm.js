import React, { useEffect, useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhimAction, layPhimTheoMaAction } from '../../../../redux/actions/QuanLyPhimActions';
import { GROUPDSPHIM } from '../../../../util/setting/config';

export default function EditFilm(props) {
    const [imgSrc, setImgSrc] = useState("");

    const { movie } = useSelector(state => state.QuanLyPhimReducers);

    const dispatch = useDispatch();

    const formatDate = "DD/MM/YYYY";

    useEffect(() => {
        dispatch(layPhimTheoMaAction(props.match.params.id))
    },[])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: movie.maPhim,
            maNhom: GROUPDSPHIM,
            tenPhim: movie.tenPhim,
            trailer: movie.trailer,
            moTa: movie.moTa,
            ngayKhoiChieu: moment(movie.ngayKhoiChieu).format(formatDate),
            dangChieu: movie.dangChieu,
            sapChieu: movie.sapChieu,
            hot: movie.hot,
            danhGia: movie.danhGia,
            hinhAnh: null
        },
        onSubmit: (value) => {
            let formData = new FormData();
            for (let key in value) {
                if (key !== "hinhAnh") {
                    formData.append(key, value[key])
                } else {
                    if (value.hinhAnh !== null) {
                        formData.append("hinhAnh", value.hinhAnh, value.hinhAnh.name)
                    }
                }
            }
            console.log(value)
            dispatch(capNhatPhimAction(formData));
        },
        validationSchema: Yup.object().shape({
            tenPhim: Yup.string().trim().required("Tên phim không được bỏ trống"),
            trailer: Yup.string().trim().required("Trailer không được bỏ trống"),
            moTa: Yup.string().trim().required("Mô tả không được bỏ trống"),
            ngayKhoiChieu: Yup.string().trim().nullable().required("Ngày khởi chiếu không được bỏ trống"),
            danhGia: Yup.string().trim().required("Số sao không được bỏ trống")
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
            <h3 className="text-3xl mb-6">Cập nhật phim</h3>
            <Form.Item label="Tên phim">
                <Input name="tenPhim" onChange={formik.handleChange} value={formik.values.tenPhim} />
                {formik.touched.tenPhim && <p className="text-red-500">{formik.errors.tenPhim}</p>}
            </Form.Item>
            <Form.Item label="Trailer">
                <Input name="trailer" type="url" onChange={formik.handleChange} value={formik.values.trailer} />
                {formik.touched.trailer && <p className="text-red-500">{formik.errors.trailer}</p>}
            </Form.Item>
            <Form.Item label="Mô tả">
                <Input name="moTa" onChange={formik.handleChange} value={formik.values.moTa} />
                {formik.touched.moTa && <p className="text-red-500">{formik.errors.moTa}</p>}
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu">
                <DatePicker onChange={handleChangeDate} format={formatDate} defaultValue={moment(formik.values.ngayKhoiChieu, formatDate)} />
                {formik.touched.ngayKhoiChieu && <p className="text-red-500">{formik.errors.ngayKhoiChieu}</p>}
            </Form.Item>
            <Form.Item label="Đang chiếu" valuePropName="checked">
                <Switch onChange={handleChangeSwitch("dangChieu")} checked={formik.values.dangChieu} />
            </Form.Item>
            <Form.Item label="Sắp chiếu" valuePropName="checked">
                <Switch onChange={handleChangeSwitch("sapChieu")} checked={formik.values.sapChieu} />
            </Form.Item>
            <Form.Item label="Hot" valuePropName="checked">
                <Switch onChange={handleChangeSwitch("hot")} checked={formik.values.hot} />
            </Form.Item>
            <Form.Item label="Đánh giá">
                <InputNumber min="0" max="10" onChange={handleChangeNumber("danhGia")} value={formik.values.danhGia} />
                {formik.touched.danhGia && <p className="text-red-500">{formik.errors.danhGia}</p>}
            </Form.Item>
            <Form.Item label="Hình ảnh">
                <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg, image/jpg" />
                <br />
                <img style={{ width: "100px", height: "150px" }} src={imgSrc === "" ? movie.hinhAnh : imgSrc} alt="..." />
                {formik.touched.hinhAnh && <p className="text-red-500">{formik.errors.hinhAnh}</p>}
            </Form.Item>
            <Form.Item label="Tác vụ">
                <button type="submit" className="p-2 bg-blue-400 text-white rounded-lg">Cập nhật</button>
            </Form.Item>
        </Form>
    )
}
