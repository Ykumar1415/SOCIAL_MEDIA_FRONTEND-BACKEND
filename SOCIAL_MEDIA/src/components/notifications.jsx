import React from 'react'
import ReactDOM from 'react-dom'
import { createPortal } from 'react-dom'
import NoticicationContent from './notificationContent';
function notifications() {
    return ReactDOM.createPortal(
    <NoticicationContent></NoticicationContent>,
        document.getElementById('notifctn')
      );
}

export default notifications