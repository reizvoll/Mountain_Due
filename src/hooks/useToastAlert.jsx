import { toast } from "react-toastify";

const useToastAlert = () => {
    return (message, type = "info", callback = null) => {
      if (type === "success" && callback) {
        // 성공 메시지와 확인 버튼 포함
        toast.success(
          ({ closeToast }) => (
            <div>
              <p>{message}</p>
              <button
                onClick={() => {
                  closeToast(); // Toast 닫기
                  callback(); // 전달된 콜백 실행 (ex. navigate)
                }}
                className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">
                확인
              </button>
            </div>
          ),
          {
            position: "top-center",
            autoClose: false, // 자동 닫힘 비활성화
          }
        );
      } else if (type === "success") {
        // 일반 성공 메시지
        toast.success(message, { position: "top-center" });
      } else if (type === "error") {
        toast.error(message, { position: "top-center" });
      } else {
        toast.info(message, { position: "top-center" });
      }
    };
};

export default useToastAlert;
