import React, { useEffect, useState } from 'react'
import {
    DatePicker,
    Form,
    InputNumber,
    Select
} from 'antd';
import { useFormik } from 'formik'
import moment from 'moment';
import * as Yup from 'yup'
import { quanLyRapServices } from '../../../services/QuanLyRapServices';
import { useDispatch } from 'react-redux'
import { taoLichChieuAction } from '../../../redux/actions/QuanLyDatVeActions';

export default function ShowTime(props) {

    const formik = useFormik({
        initialValues: {
            maPhim: props.match.params.id,
            ngayChieuGioChieu: "",
            maRap: "",
            giaVe: "",
            heThongRap: ""
        },
        onSubmit: (value) => {
            dispatch(taoLichChieuAction(value));
        },
        validationSchema: Yup.object().shape({
            ngayChieuGioChieu: Yup.string().trim().required("Ngày chiếu giờ chiếu không được bỏ trống"),
            maRap: Yup.string().trim().required("Cụm rạp không được bỏ trống"),
            giaVe: Yup.string().trim().required("Giá vé không được bỏ trống"),
            heThongRap: Yup.string().trim().required("Hệ thống rạp không được bỏ trống"),
        })
    })

    const [state, setState] = useState({
        heThongRap: [],
        cumRap: []
    })

    const formatDate = "DD/MM/YYYY hh:mm:ss";

    const dispatch = useDispatch();

    useEffect(() => {
        layThongTinRap()
    }, [])

    const layThongTinRap = async () => {
        try {
            const { data } = await quanLyRapServices.layThongTinRap();
            setState({
                ...state,
                heThongRap: data.content
            })
        } catch (err) {

        }
    }

    const onChangeHeThongRap = async (value) => {
        formik.setFieldValue("heThongRap", value);
        try {
            const { data } = await quanLyRapServices.layThongTinChiTietCumRap(value);
            setState({
                ...state,
                cumRap: data.content
            })
        } catch (err) {

        }
    };

    const onChangeCumRap = (value) => {
        formik.setFieldValue("maRap", value);
    };

    const onChangeNgayGio = (value) => {
        formik.setFieldValue("ngayChieuGioChieu", moment(value).format(formatDate));
    };

    const onOk = (value) => {
        formik.setFieldValue("ngayChieuGioChieu", moment(value).format(formatDate));
    };

    const handleChangeNumber = (value) => {
        formik.setFieldValue("giaVe", value);
    };

    const arrHeThongRap = () => {
        return state.heThongRap?.map((item, index) => {
            return { label: item.tenHeThongRap, value: item.maHeThongRap }
        })
    }

    const arrCumRap = () => {
        return state.cumRap?.map((item, index) => {
            return { label: item.tenCumRap, value: item.maCumRap }
        })
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
            <h3 className="text-3xl mb-6">Tạo lịch chiếu - {props.match.params.tenphim}</h3>
            <Form.Item label="Hệ thống rạp">
                <Select options={arrHeThongRap()} onChange={onChangeHeThongRap} placeholder="Vui lòng chọn" />
                {formik.touched.heThongRap && <p className="text-red-500">{formik.errors.heThongRap}</p>}
            </Form.Item>
            <Form.Item label="Cụm rạp">
                <Select onChange={onChangeCumRap} options={arrCumRap()} placeholder="Vui lòng chọn" />
                {formik.touched.maRap && <p className="text-red-500">{formik.errors.maRap}</p>}
            </Form.Item>
            <Form.Item label="Ngày chiếu giờ chiếu">
                <DatePicker showTime format={formatDate} onChange={onChangeNgayGio} onOk={onOk} />
                {formik.touched.ngayChieuGioChieu && <p className="text-red-500">{formik.errors.ngayChieuGioChieu}</p>}
            </Form.Item>
            <Form.Item label="Giá vé">
                <InputNumber min="75000" max="150000" onChange={handleChangeNumber} />
                {formik.touched.giaVe && <p className="text-red-500">{formik.errors.giaVe}</p>}
            </Form.Item>
            <Form.Item label="Tác vụ">
                <button type="submit" className="p-2 bg-blue-400 text-white rounded-lg">Tạo lịch chiếu</button>
            </Form.Item>
        </Form>
    )
}
