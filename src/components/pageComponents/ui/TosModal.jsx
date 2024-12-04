import { IoClose } from "react-icons/io5";
import ReactDOM from 'react-dom';

const TosModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Map이 약관을 뚫고 나오는 오류 수정
  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex items-center justify-center"
      style={{ zIndex: 1050 }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[20px] w-3/4 max-w-lg p-9 relative overflow-y-auto max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[28px] text-[#333] mb-8">위치기반서비스 이용약관</h2>
        <p className="text-[16px] text-[#666] font-medium leading-7">
          <span>제 1 조 (목적)</span>
          <br />
          본 약관은 “마운틴 듀” (이하 “서비스”)가 제공하는 위치기반서비스(이하 “서비스”)의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          <br /><br />
          <span>제 2 조 (위치정보의 수집 및 이용 목적)</span>
          <br />
          1. 본 서비스는 사용자의 현재 위치 정보를 기반으로 사용자의 주변 클라이밍장 정보를 제공하기 위해 위치 정보를 수집 및 이용합니다.
          <br />
          2. 사용자의 위치정보는 실시간으로 카카오 맵 API를 통해 수집되며, 해당 위치정보는 저장되지 않습니다.
          <br />
          3. 위치정보는 오직 서비스의 기능 제공을 위해서만 사용됩니다.
          <br /><br />
          <span>제 3 조 (카카오 맵 API의 활용)</span>
          <br />
          1. 본 서비스는 위치 정보를 처리하기 위해 카카오 맵 API를 활용하며, 카카오의 API 이용 약관 및 정책을 준수합니다.
          <br />
          2. 카카오 맵 API 사용과 관련된 데이터 처리는 카카오의 개인정보 처리방침 및 API 이용 약관를 따릅니다.
          <br />
          3. 사용자는 서비스를 이용함으로써 카카오 맵 API를 통해 위치 정보가 처리될 수 있음을 이해하고 동의합니다.
          <br /><br />
          <span>제 4 조 (이용자의 권리)</span>
          <br />
          1. 이용자는 위치정보 제공에 대해 동의를 거부하거나 철회할 권리가 있으며, 위치정보 제공 거부 시 서비스의 일부 기능이 제한될 수 있습니다.
          <br />
          2. 이용자는 서비스 내 설정을 통해 언제든지 위치정보 제공 동의를 철회할 수 있습니다.
          <br /><br />
          <span>제 5 조 (위치정보의 보호 및 관리)</span>
          <br />
          1. 회사는 위치정보 보호를 위해 관련 법령과 카카오 정책을 준수하며, 필요한 기술적·관리적 조치를 시행합니다.
          <br />
          2. 위치정보는 사용 목적이 달성된 후 즉시 파기되며, 회사는 위치정보를 저장하거나 제3자와 공유하지 않습니다.
          <br /><br />
          <span>제 6 조 (약관의 변경)</span>
          <br />
          1. 본 약관은 관련 법령, 회사 정책 또는 카카오 정책 변경에 따라 수정될 수 있습니다.
          <br />
          2. 약관 변경 시 회사는 최소 7일 전, 중대한 변경 사항은 30일 전에 공지합니다.
          <br /><br />
          <span>부칙</span>
          <br />
          본 약관은 2024. 12. 5 부터 시행됩니다.
        </p>
        <button
          className="absolute top-10 right-4 text-[#666] hover:text-[#333] text-[32px]"
          onClick={onClose}
        >
          <IoClose />
        </button>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default TosModal;