import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { Table, Input, Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getDanhSachPhim, xoaPhimAction } from '../../../redux/actions/QuanLyPhimActions'
import { DeleteOutlined, EditOutlined, CalendarOutlined } from '@ant-design/icons'
import history from '../../../util/libs/history';
import _ from 'lodash'
import { displayLoaidng, hiddenLoading } from '../../../redux/actions/LoadingAction';

const { Search } = Input;

export default function Film(props) {

    const { arrMovieDefault } = useSelector(state => state.QuanLyPhimReducers);

    const dispatch = useDispatch();

    const [keyword, setKeyword] = useState("");

    const confirm = (maPhim) => {
        dispatch(xoaPhimAction(maPhim))
    };

    const onSearch = (value) => {
        dispatch(displayLoaidng);
        dispatch(getDanhSachPhim(value));
        setTimeout(() => {
            dispatch(hiddenLoading);
        }, 500)
    }

    const debounceSearch = useCallback(_.debounce(() => {dispatch(getDanhSachPhim(keyword))}, 1000), [keyword]);

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
            title: 'Mã phim',
            dataIndex: 'maPhim',
            sorter: (a, b) => a.maPhim - b.maPhim,
            sortDirections: ['descend'],
            width: "150px"
        },
        {
            title: 'Hình Ảnh',
            dataIndex: 'hinhAnh',
            render: (text, record, index) => {
                return <img style={{ width: "50px", height: "70px" }} src={text} alt="img" onError={(e) => {
                    e.target.onError = null;
                    e.target.src = "https://picsum.photos/50/70"
                }} />
            },
            width: "150px"
        },
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
            sorter: (a, b) => a.tenPhim.toLowerCase().trim().localeCompare(b.tenPhim.toLowerCase().trim())
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            render: (text, record, index) => {
                return <Fragment>{text.length > 80 ? <p>{text.slice(0, 80)} ...</p> : <p>{text}</p>}</Fragment>
            }
        },
        {
            title: 'Hành động',
            render: (text, record, index) => {
                return <div className="flex">
                    <button className="mr-1 p-3 bg-transparent text-green-500 rounded-lg text-xl" onClick={() => {
                        history.push(`/quantri/quanlyphim/capnhatphim/${record.maPhim}`)
                    }}><EditOutlined /></button>
                    <button className="mr-1 p-3 bg-transparent text-blue-500 rounded-lg text-xl" onClick={() => {
                        dispatch(displayLoaidng);
                        history.push(`/quantri/lichchieu/${record.maPhim}/${record.tenPhim}`)
                        setTimeout(() => {
                            dispatch(hiddenLoading);
                        }, 500)
                    }}><CalendarOutlined /></button>
                    <Popconfirm
                        placement="bottom"
                        title="Bạn có muốn xóa phim này?"
                        onConfirm={() => { confirm(record.maPhim) }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button className="p-3 bg-transparent text-red-500 rounded-lg text-xl"><DeleteOutlined /></button>
                    </Popconfirm>
                </div>
            }
        }
    ];

    useEffect(() => {
        dispatch(getDanhSachPhim())
    }, [])

    return (
        <div>
            <h3 className="text-3xl">Tất cả phim</h3>
            <Search
                placeholder="Tìm kiếm phim"
                allowClear
                enterButton="Search"
                size="large"
                className="my-3"
                onSearch={onSearch}
                onChange={handleChangeSearch}
            />
            <Table rowKey="maPhim" columns={columns} dataSource={arrMovieDefault} />
        </div>
    )
}
