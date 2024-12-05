import Swal from "sweetalert2";

// 알림을 보여주는 공통 함수
const showAlert = ({ title, icon, text, confirmButtonText }) => {
  Swal.fire({
    title,
    icon,
    text,
    confirmButtonText,
  });
};

export default showAlert;
