import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
export const SuccessAlert = (text, navigate) => {
  MySwal.fire({
    icon: "success",
    text: `${text}`,
    showConfirmButton: false,
    timer: 1200,
  }).then(({ isDismissed }) => {
    if (isDismissed) {
      navigate("/");
    }
  });
};

export const FailAlert = (text) => {
  MySwal.fire({
    icon: "error",
    text: `${text}`,
    showConfirmButton: false,
    timer: 1000,
  });
};

export const EmptyAlert = (text) => {
  MySwal.fire({
    icon: "info",
    text: `${text}`,
    showConfirmButton: false,
    timer: 1000,
  });
};
