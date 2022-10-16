import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CLOSE_TRAILER_POPUP } from '../../redux/types/CarouselTypes';

export default function TrailerPopup(props) {

    const { trailerPopup } = useSelector(state => state.CarouselReducer);

    const dispatch = useDispatch();

    return (
        <div className="relative z-10" style={{ display: trailerPopup ? "block" : "none" }}>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                    <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex justify-center sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <iframe style={{ width: "100%", height: "250px" }} src="https://www.youtube.com/embed/RlOB3UALvrQ" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => { dispatch({
                                type: CLOSE_TRAILER_POPUP
                            }) }}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
