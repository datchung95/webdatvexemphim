import React from 'react'

export default function Contact() {
    return (
        <div className="pt-32 container min-h-screen">
            <h3>Xin vui lòng liên hệ chúng tôi</h3>
            <p>Địa chỉ: 1360 Huỳnh Tấn Phát, Phú Mỹ, Quận 7, Thành phố Hồ Chí Minh, Việt Nam</p>
            <p>Số điện thoại: 000000000</p>
            <div className="w-full">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5624.755166260943!2d106.73567109508781!3d10.71281315497002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317525453b367465%3A0x7b1022baaf387120!2zVHLGsOG7nW5nIFRIUFQgTmfDtCBRdXnhu4Fu!5e0!3m2!1svi!2s!4v1660648912023!5m2!1svi!2s" height={450} style={{ border: 0, width: "100%" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="bản đồ" />
            </div>
        </div>
    )
}
