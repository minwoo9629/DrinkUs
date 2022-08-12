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
    timer: 1200,
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

export const loginAlert = () => {
  MySwal.fire({
    icon: "warning",
    text: "로그인이 필요한 서비스입니다.",
    showConfirmButton: false,
    timer: 1200,
  });
};

export const randomDrink = (title) => {
  let timerInterval;
  MySwal.fire({
    title,
    html: "빨리빨리! <b></b> milliseconds.",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft();
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });
};
