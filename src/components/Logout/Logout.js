import React from 'react'
import openNotificationWithIcon from '../../Notification/Notification';
import { Dropdown, Menu, Space } from 'antd';
import history from '../../util/libs/history';
import { DownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { displayLoaidng, hiddenLoading } from '../../redux/actions/LoadingAction';

export default function Logout(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducers);

    const dispatch = useDispatch();

    const { classTextLogout } = props;

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <button className="w-full" onClick={() => {
                            dispatch(displayLoaidng)
                            localStorage.clear();
                            setTimeout(() => {
                                dispatch(hiddenLoading)
                            }, 500)
                            history.push("/trangchu");
                            window.location.reload();
                            openNotificationWithIcon("success", "Đăng xuất thành công");
                        }}>
                            Đăng xuất
                        </button>
                    ),
                }
            ]}
        />
    );

    return (
        <div className="flex items-center">
            <div className="flex items-center cursor-pointer" onClick={() => (history.push("/trangcanhan"))}>
                <div className="w-12 h-12 flex justify-center items-center rounded-full bg-orange-300">{userLogin.taiKhoan.substr(0, 1)}</div>
                <span className={`ml-2 ${classTextLogout}`}>Chào</span>
                <span className={`ml-2 ${classTextLogout}`}>{userLogin.hoTen}</span>
            </div>
            <Dropdown overlay={menu} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <div className={`ml-2 ${classTextLogout}`}><DownOutlined /></div>
                    </Space>
                </a>
            </Dropdown>
        </div>
    )
}
