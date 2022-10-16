import React, { useCallback, useEffect, useState } from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Input, Popconfirm, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { layDanhSachNguoiDungAction, xoaNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungActions';
import _ from 'lodash'
import { displayLoaidng, hiddenLoading } from '../../../redux/actions/LoadingAction';
import history from '../../../util/libs/history';

const { Search } = Input;

export default function Users() {

    const dispatch = useDispatch();

    const { dsNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducers);

    const [keyword, setKeyword] = useState("");

    const [page, setPage] = useState(1);

    const debounceSearch = useCallback(_.debounce(() => { dispatch(layDanhSachNguoiDungAction(keyword)) }, 1000), [keyword]);

    const handleChangeSearch = (e) => {
        let value = e.target.value
        setKeyword(value);
    }

    useEffect(() => {
        debounceSearch();
        return () => {
            debounceSearch.cancel();
        }
    }, [keyword, debounceSearch])

    const columns = [
        {
            title: 'STT',
            render: (text, record, index) => {
                return <p>{(page - 1) * 10 + index + 1}</p>
            },
        },
        {
            title: 'Tài khoản',
            dataIndex: 'taiKhoan',
            sorter: (a, b) => a.taiKhoan.trim().toLowerCase().localeCompare(b.taiKhoan.trim().toLowerCase()),
        },
        {
            title: 'Mật khẩu',
            dataIndex: 'matKhau',
        },
        {
            title: 'Họ tên',
            dataIndex: 'hoTen',
            sorter: (a, b) => a.hoTen.trim().toLowerCase().localeCompare(b.hoTen.trim().toLowerCase()),
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDt',
        },
        {
            title: 'Hành động',
            render: (text, record, index) => {
                return <div className="flex">
                    <button onClick={() => {
                        dispatch(displayLoaidng);
                        localStorage.setItem("userEdit", JSON.stringify(record))
                        history.push(`/quantri/quanlynguoidung/chinhsuanguoidung/${record.taiKhoan}`)
                        setTimeout(() => {
                            dispatch(hiddenLoading);
                        }, 500)
                    }} className="mr-1 p-3 bg-transparent text-green-500 rounded-lg text-xl"><EditOutlined /></button>
                    <Popconfirm
                        placement="bottom"
                        title="Bạn có muốn xóa người dùng này?"
                        onConfirm={() => { confirm(record.taiKhoan) }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button className="p-3 bg-transparent text-red-500 rounded-lg text-xl"><DeleteOutlined /></button>
                    </Popconfirm>
                </div>
            },
        },
    ];

    useEffect(() => {
        dispatch(layDanhSachNguoiDungAction());
    }, [])

    const onSearch = (value) => {
        dispatch(displayLoaidng);
        dispatch(layDanhSachNguoiDungAction(value))
        setTimeout(() => {
            dispatch(hiddenLoading);
        }, 500)
    };

    const confirm = (taiKhoan) => {
        dispatch(xoaNguoiDungAction(taiKhoan))
    };

    return (
        <div>
            <h3 className="text-3xl">Tất cả người dùng</h3>
            <div className="mt-5">
                <Search
                    placeholder="Nhập vào tài khoản hoặc họ tên người dùng"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                    onChange={handleChangeSearch}
                />
            </div>
            <div className="mt-5">
                <Table scroll={{
                    x: 900,
                    y: 500,
                }} columns={columns} dataSource={dsNguoiDung} rowKey="taiKhoan" pagination={{
                    onChange(current) {
                        setPage(current);
                    }
                }} />
            </div>
        </div>
    )
}
