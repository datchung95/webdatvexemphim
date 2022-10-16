import React from 'react'

export default function News() {
    return (
        <div className="p-32 min-h-screen">
            <div className="grid grid-cols-5 gap-10">
                <div className="lg:col-span-2 xs:col-span-5">
                    <div className="sm:flex xs:block">
                        <img className='sm:w-24 xs:w-full sm:h-24 xs:h-full' src={require("../../assets/duyen-ma.jpg")} alt="phim" />
                        <div className="sm:ml-2 xs:ml-0">
                            <h3>Phim 'Duyên ma' yếu kịch bản lẫn hình ảnh</h3>
                            <p>"Duyên ma" - phim chiếu rạp, Ngọc Trinh, Kiều Minh Tuấn đóng - có kịch bản lỏng lẻo, kỹ xảo hình ảnh như web-drama.</p>
                        </div>
                    </div>
                    <div className="sm:flex xs:block mt-10">
                        <img className='sm:w-24 xs:w-full sm:h-24 xs:h-full' src={require("../../assets/JohnnyDepp.jpg")} alt="phim" />
                        <div className="sm:ml-2 xs:ml-0">
                            <h3>Johnny Depp trở lại ghế đạo diễn sau 25 năm</h3>
                            <p>Tài tử Johnny Depp chỉ đạo dự án điện ảnh "Modigliani", đánh dấu trở lại với vai trò đạo diễn kể từ "The Brave" (1997).</p>
                        </div>
                    </div>
                    <div className="sm:flex xs:block mt-10">
                        <img className='sm:w-24 xs:w-full sm:h-24 xs:h-full' src={require("../../assets/quynhkool.jpg")} alt="phim" />
                        <div className="sm:ml-2 xs:ml-0">
                            <h3>'Gara hạnh phúc': Tình yêu của cô nàng ngổ ngáo</h3>
                            <p>Sơn Ca - nữ chính phim "Gara hạnh phúc" - làm nghề sửa ôtô, đánh nhau như cơm bữa.</p>
                        </div>
                    </div>
                    <div className="sm:flex xs:block mt-10">
                        <img className='sm:w-24 xs:w-full sm:h-24 xs:h-full' src={require("../../assets/topthienlac.jpg")} alt="phim" />
                        <div className="sm:ml-2 xs:ml-0">
                            <h3>Cổ Thiên Lạc khóc vì phim thất bại</h3>
                            <p>Tài tử Hong Kong Cổ Thiên Lạc khóc vì phim mới của anh - "Minh nhật chiến ký" - nguy cơ lỗ vốn.</p>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-3 xs:col-span-5">
                    <div>
                        <img style={{ width: "100%", height: "100%" }} src={require("../../assets/jonnyphimmoi.png")} alt="phim" />
                        <div className="mt-2">
                            <h3>Tạo hình Johnny Depp trong phim mới</h3>
                            <p>Johnny Depp vào vai vua Louis XV trong "Jeanne du Barry", đánh dấu sự trở lại của tài tử sau ba năm vắng bóng màn bạc.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
