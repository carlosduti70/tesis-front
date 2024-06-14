// notificaciones.js
import React from "react";
import NotificationAlert from "react-notification-alert";

const notificationAlertRef = React.createRef();

export const notify = (message, type, place) => {
    var options = {
        place: place,
        message: (
        <div>
            <div>
            {message}
            </div>
        </div>
        ),
        type: type,
        icon: "tim-icons icon-bell-55",
        autoDismiss: 2,
    };
    notificationAlertRef.current.notificationAlert(options);
    };

    const Notifications = () => {
    return (
        <div className="react-notification-alert-container">
        <NotificationAlert ref={notificationAlertRef} />
        </div>
    );
};

export default Notifications;

// type
// "primary": Notificación primaria.
// "success": Notificación de éxito.
// "danger": Notificación de error.
// "warning": Notificación de advertencia.
// "info": Notificación informativa.

// "tl": Arriba a la izquierda.
// "tc": Arriba en el centro.
// "tr": Arriba a la derecha.
// "bl": Abajo a la izquierda.
// "bc": Abajo en el centro.
// "br": Abajo a la derecha.