import React, { Fragment, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { USER_LOGIN_LOCAL } from '../../../../util/setting/config';
import { Select, Dropdown, Menu, Space } from 'antd';
import { useTranslation } from 'react-i18next'
import Logout from '../../../../components/Logout/Logout';
import { useDispatch } from 'react-redux'
import { displayLoaidng, hiddenLoading } from '../../../../redux/actions/LoadingAction'
import useIsMobileLg from '../../../../components/Resize/ResizeLg/ResizeLg';

const { Option } = Select;

export default function Header() {

    const { t, i18n } = useTranslation();

    const dispatch = useDispatch();

    const handleChange = (value) => {
        i18n.changeLanguage(value);
    };

    const [classTextLogout, setClassTextLogout] = useState("text-white")

    const [displayBlock, setDisplayBlock] = useState("")

    const resizeClassText = useIsMobileLg()

    useEffect(() => {
        if(resizeClassText) {
            setClassTextLogout("text-black")
        } else {
            setClassTextLogout("text-white")
        }
    }, [resizeClassText])
    console.log(classTextLogout)

    useEffect(() => {
        if(resizeClassText) {
            setDisplayBlock("block")
        } else {
            setDisplayBlock("")
        }
    }, [resizeClassText])
    console.log(displayBlock)

    const renderUser = () => {
        if (localStorage.getItem(USER_LOGIN_LOCAL)) {
            return <Fragment>
                <Logout classTextLogout={classTextLogout} />
            </Fragment>
        } else {
            return <Fragment>
                <NavLink to="/dangnhap" className={`self-center px-4 py-3 ${classTextLogout} ${displayBlock}`} onClick={() => {
                    dispatch(displayLoaidng);
                    setTimeout(() => {
                        dispatch(hiddenLoading);
                    }, 500)
                }}>{t("signin")}</NavLink>
                <NavLink to="/dangky" className={`self-center px-4 py-3 ${classTextLogout} ${displayBlock}`} onClick={() => {
                    dispatch(displayLoaidng);
                    setTimeout(() => {
                        dispatch(hiddenLoading);
                    }, 500)
                }}>{t("signup")}</NavLink>
            </Fragment>
        }
    }

    const menu = (
        <Menu
            items={[
                {
                    label: <li className="flex">
                        <NavLink rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 text-black p-5" to="/trangchu" activeClassName="border-b">{t("home")}</NavLink>
                    </li>,
                    key: '0',
                },
                {
                    label: <li className="flex">
                        <NavLink rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 text-black p-5" to="/lienhe" activeClassName="border-b" onClick={() => {
                            dispatch(displayLoaidng);
                            setTimeout(() => {
                                dispatch(hiddenLoading);
                            }, 500)
                        }}>{t("contact")}</NavLink>
                    </li>,
                    key: '1',
                },
                {
                    label: <li className="flex">
                        <NavLink rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 text-black p-5" to="tintuc" activeClassName="border-b" onClick={() => {
                            dispatch(displayLoaidng);
                            setTimeout(() => {
                                dispatch(hiddenLoading);
                            }, 500)
                        }}>{t("news")}</NavLink>
                    </li>,
                    key: '2',
                },
                {
                    label: renderUser(),
                    key: '3',
                },
                {
                    label: <div className='p-5'>
                        <Select
                            defaultValue="vn"
                            style={{
                                width: 100,
                            }}
                            onChange={handleChange}
                        >
                            <Option value="vn">Vietnam</Option>
                            <Option value="en">English</Option>
                            <Option value="cn">China</Option>
                        </Select>
                    </div>,
                    key: '4',
                },
                {
                    label: <NavLink to="/quantri" className="text-black p-5" onClick={() => {
                        dispatch(displayLoaidng);
                        setTimeout(() => {
                            dispatch(hiddenLoading);
                        }, 500)
                    }}>Quản lý</NavLink>,
                    key: '5',
                }
            ]}
        />
    );

    return (
        <header className="p-4 bg-black bg-opacity-40 text-white fixed w-full z-50">
            <div className="container flex justify-between h-16 mx-auto">
                <NavLink to="/trangchu" className="flex items-center p-2">
                    <img className='object-cover' src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="logo" />
                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <NavLink rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 text-white" to="/trangchu" activeClassName="border-b">{t("home")}</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 text-white" to="/lienhe" activeClassName="border-b" onClick={() => {
                            dispatch(displayLoaidng);
                            setTimeout(() => {
                                dispatch(hiddenLoading);
                            }, 500)
                        }}>{t("contact")}</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 text-white" to="tintuc" activeClassName="border-b" onClick={() => {
                            dispatch(displayLoaidng);
                            setTimeout(() => {
                                dispatch(hiddenLoading);
                            }, 500)
                        }}>{t("news")}</NavLink>
                    </li>
                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {renderUser()}
                    <div className="ml-5">
                        <Select
                            defaultValue="vn"
                            style={{
                                width: 100,
                            }}
                            onChange={handleChange}
                        >
                            <Option value="vn">Vietnam</Option>
                            <Option value="en">English</Option>
                            <Option value="cn">China</Option>
                        </Select>
                    </div>
                    <NavLink to="/quantri" className="text-white ml-5" onClick={() => {
                        dispatch(displayLoaidng);
                        setTimeout(() => {
                            dispatch(hiddenLoading);
                        }, 500)
                    }}>Quản lý</NavLink>
                </div>
                
                <Dropdown className="p-4 lg:hidden bg-transperent" overlay={menu} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </header>
    )
}
