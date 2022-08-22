import React, { Fragment } from 'react'
import './Loading.css'
import { useSelector } from 'react-redux'

export default function Loading() {

    const { isLoading } = useSelector(state => state.LoadingReducer);

    return (
        <Fragment>
            {isLoading ? <div className='loading'>
                <div>
                    <img src={require("../../assets/loadingCircle.gif")} alt="loadingGif" />
                </div>
            </div> : ""}
        </Fragment>
    )
}
