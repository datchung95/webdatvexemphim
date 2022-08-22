import { Fragment, useEffect } from 'react'
import { Route } from 'react-router-dom';
import Login from '../../pages/Login/Login';

export const AccountTemplate = (props) => {

    const { Component, ...restProps } = props;

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    return <Route {...restProps} render={(propsRoute) => {
        return <Fragment>
            <div className="w-full h-screen md:-mx-4" style={{ filter: 'blur(6px)', backgroundImage: `url(${require("../../assets/phimBackground.jpeg")})` }}></div>
            <div className="absolute w-2/5 rounded-lg" style={{ transform: 'translate(-50%, -50%)', top: '50%', left: '50%', backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
                <Component {...propsRoute} />
            </div>
        </Fragment >
    }} />
}
