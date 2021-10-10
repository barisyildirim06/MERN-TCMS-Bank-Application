import React, { useEffect, useState } from 'react';

import { Modal } from 'antd';

/* Styles */
import './dialog.css';

export default function Dialog({ visible = false, overflow = 'hidden', width = 1000, children, onClose, className }) {


    return (
        <Modal
            bodyStyle={{ overflow, padding: '0px' }}
            centered
            className={className}
            destroyOnClose={true}
            footer={null}
            maskClosable={false}
            title={null}
            visible={visible}
            width={width}
            onCancel={onClose}
        >
            {children}
        </Modal>
    );
}
