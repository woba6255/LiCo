import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import "./toaster.css";

export function ToasterProvider() {

    return (
        <ToastContainer
            position="bottom-left"
            autoClose={2500}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            stacked
        />
    )
}
