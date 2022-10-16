import React, { Fragment, useEffect } from 'react'
import { UserAddOutlined, UserOutlined, VideoCameraOutlined, FileAddOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { NavLink, Route } from 'react-router-dom';
import { Content } from 'antd/lib/layout/layout';
import Logout from '../../components/Logout/Logout';
import { USER_LOGIN_LOCAL } from '../../util/setting/config';
import history from '../../util/libs/history';
import { useDispatch, useSelector } from 'react-redux'
import openNotificationWithIcon from '../../Notification/Notification';
import { displayLoaidng, hiddenLoading } from '../../redux/actions/LoadingAction';

const { Sider, Header } = Layout;

export default function AdminTemplate(props) {

    const { Component, ...restProps } = props;

    const classTextLogout = "text-black";

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducers);

    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    if (USER_LOGIN_LOCAL === "") {
        dispatch(displayLoaidng);
        history.push("/trangchu");
        setTimeout(() => {
            dispatch(hiddenLoading);
        }, 500)
        openNotificationWithIcon("warning", "Bạn không có quyền truy cập vào trang này");
    }

    if (userLogin.maLoaiNguoiDung !== "QuanTri") {
        dispatch(displayLoaidng);
        history.push("/trangchu");
        setTimeout(() => {
            dispatch(hiddenLoading);
        }, 500)
        openNotificationWithIcon("warning", "Bạn không có quyền truy cập vào trang này")
    }

    const getItem = (label, key, icon, children, type) => {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    const items = [
        getItem('Quản người dùng', '1', <UserOutlined />, [
            getItem(<NavLink to="/quantri/quanlynguoidung" onClick={() => {
                dispatch(displayLoaidng);
                setTimeout(() => {
                    dispatch(hiddenLoading);
                }, 500)
            }}>
                Tất cả người dùng
            </NavLink>, '2', <UserOutlined />),
            getItem(<NavLink to="/quantri/quanlynguoidung/themnguoidung" onClick={() => {
                dispatch(displayLoaidng);
                setTimeout(() => {
                    dispatch(hiddenLoading);
                }, 500)
            }}>
                Thêm người dùng
            </NavLink>, '3', <UserAddOutlined />),
        ]),
        getItem('Quản lý phim', '4', <VideoCameraOutlined />, [
            getItem(<NavLink to="/quantri/quanlyphim" onClick={() => {
                dispatch(displayLoaidng);
                setTimeout(() => {
                    dispatch(hiddenLoading);
                }, 500)
            }}>
                Tất cả phim
            </NavLink>, '5', <VideoCameraOutlined />),
            getItem(<NavLink to="/quantri/quanlyphim/themphim" onClick={() => {
                dispatch(displayLoaidng);
                setTimeout(() => {
                    dispatch(hiddenLoading);
                }, 500)
            }}>
                Thêm phim
            </NavLink>, '6', <FileAddOutlined />),
        ]),
    ]

    return <Route {...restProps} render={(propsRoute) => {
        return (
            <Fragment>
                <Layout>
                    <Sider
                        breakpoint="xl"
                        collapsedWidth="0"
                    >
                        <div>
                            <NavLink to="/trangchu">
                                <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="logo" className="p-5" />
                            </NavLink>
                        </div>
                        <Menu theme="dark" mode="inline" items={items} />
                    </Sider>
                    <Layout>
                        <Header className="!bg-white">
                            <div className="flex justify-end">
                                <Logout classTextLogout={classTextLogout} />
                            </div>
                        </Header>
                        <Content className="!min-h-screen" style={{
                            margin: '24px 16px 0',
                        }}>
                            <div style={{
                                padding: 24,
                                backgroundColor: "#fff",
                                minHeight: "100%"
                            }}>
                                <Component {...propsRoute} />
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Fragment>
        );
    }} />
}
