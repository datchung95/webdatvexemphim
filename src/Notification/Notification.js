import { notification } from 'antd';

const openNotificationWithIcon = (type, message) => {
    notification[type]({
        message: message
    });
};

export default openNotificationWithIcon;