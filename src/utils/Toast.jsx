import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultStyle = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

// Inject custom CSS for confirm toast
if (typeof document !== "undefined" && !document.getElementById("toastify-custom-css")) {
  const style = document.createElement("style");
  style.id = "toastify-custom-css";
  style.innerHTML = `
    .my-confirm-toast {
      align-items: flex-start;
}
  .my-confirm-toast .Toastify__toast-icon{
   margin-top: 2px;
  }
  `;
  
  document.head.appendChild(style);
}

// Simple success & error toasts
export const successToast = (message) => toast.success(message, defaultStyle);
export const errorToast = (message) => toast.error(message, defaultStyle);

// Promise toast
export const promiseToast = async (func, loading, success, error) => {
  try {
    let res = await toast.promise(
      typeof func.unwrap === "function" ? func.unwrap : func,
      {
        pending: { render: () => loading || "Hold on...", ...defaultStyle },
        success: {
          render({ data }) {
            if (typeof success === "function") return success();
            return success || data?.message || "Success";
          },
          ...defaultStyle,
        },
        error: {
          render(res) {
            if (Array.isArray(res?.data?.error))
              return (
                <>
                  {res.data.error.map((item, index) => (
                    <p key={index} className="mb-0">{item.msg}</p>
                  ))}
                </>
              );
            return error || res?.data?.message || "Something went wrong";
          },
          ...defaultStyle,
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};

// ----------------------------
// Confirmation Toast
// ----------------------------
export const confirmToast = ({ message, onConfirm, onCancel }) => {
  toast.info(
    ({ closeToast }) => (
      <div>
        <p className="test">{message || "Are you sure?"}</p>
        <div className="d-flex gap-2 justify-content-end mt-2">
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              onConfirm?.();
              closeToast();
            }}
          >
            Yes
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              onCancel?.();
              closeToast();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    ),
    {
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      className: "my-confirm-toast",
    }
  );
};
