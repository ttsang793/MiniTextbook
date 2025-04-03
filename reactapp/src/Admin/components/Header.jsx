import { Book, Books, PaperPlaneTilt, Atom, CurrencyDollarSimple, UserCircle } from "@phosphor-icons/react";
import "./Header.css";

const AHeader = () => {
  return (
    <header className="bg-linear-to-br from-pink-700 to-pink-900 flex justify-between items-center">
      {/* Dàn nút trong header */}
      <div className="flex">
        <a href="/quan-tri/">
          <button className="admin-header-btn">
            <svg
              width="54"
              height="36"
              viewBox="0 0 23.812499 15.875"
              className="mntb-svg"
            >
              <g id="layer1">
                <path
                  d="m 20.374087,3.0964415 c -0.04653,-0.01994 -0.08973,-0.03988 -0.136257,-0.06314 v -0.239282 c 0,-0.136258 -0.07311,-0.259223 -0.192755,-0.32569 C 17.346502,0.97281449 14.608047,0.94290449 11.906151,2.3719495 9.2042589,0.94290249 6.4691279,0.97613649 3.7672322,2.4683295 3.6475911,2.5347995 3.574477,2.6577615 3.574477,2.7940195 v 0.239282 c -0.046527,0.01994 -0.089731,0.03988 -0.1362579,0.06314 -0.2492525,0.119641 -0.408774,0.372217 -0.408774,0.65138 V 13.784385 c 0,0.37554 0.3589236,0.641409 0.717847,0.538385 2.7185128,-0.787638 5.4403498,-0.7112 8.1588589,0.229312 2.718514,-0.940512 5.440351,-1.01695 8.158863,-0.229312 0.358924,0.103024 0.717847,-0.162845 0.717847,-0.538385 V 3.7478215 c 0.0066,-0.279163 -0.156197,-0.531739 -0.408774,-0.65138 z M 4.3255576,3.0166805 c 2.4227333,-1.276172 4.7889693,-1.276172 7.2117004,0 V 12.96019 c -1.19641,-0.38551 -2.4027911,-0.578265 -3.6058491,-0.578265 -1.203058,0 -2.40944,0.192755 -3.6058513,0.578265 z m 15.1678394,0 V 12.96019 c -2.396147,-0.771021 -4.815558,-0.771021 -7.211705,0 V 3.0166805 c 2.426058,-1.276172 4.788969,-1.276172 7.211705,0 z"
                />
              </g>
            </svg>
            Trang chủ
          </button>
        </a>
        <a href="/quan-tri/sach">
          <button className="admin-header-btn">
            <Book size={36} weight="fill" />Sách
          </button>
        </a>
        <a href="/quan-tri/bo-sach">
          <button className="admin-header-btn">
            <Books size={36} weight="fill" />Bộ sách
          </button>
        </a>
        <a href="/quan-tri/nha-xuat-ban">
          <button className="admin-header-btn">
            <PaperPlaneTilt size={36} weight="fill" />NXB
          </button>
        </a>
        <a href="/quan-tri/mon-hoc">
          <button className="admin-header-btn">
            <Atom size={36} />Môn học
          </button>
        </a>
        <a href="/quan-tri/don-hang">
          <button className="admin-header-btn">
            <CurrencyDollarSimple size={36} weight="fill" />Đơn hàng
          </button>
        </a>
        <a href="/quan-tri/quan-tri-vien">
          <button className="admin-header-btn">
            <UserCircle size={36} weight="fill" />Phân quyền
          </button>
        </a>
      </div>

      {/* Nút đăng xuất và cài đặt */}
      <div className="flex gap-x-1.5">
        <div className="text-right text-pink-50">
          <a href="" className="block text-lg font-bold hover:underline!">250101 - Trần Tuấn Sang</a>
          <a href="/" className="block hover:underline!">Đăng xuất</a>
        </div>
        <img src="/src/images/avatar/250101.avif" alt="250101" className="h-13 rounded-full" />
      </div>
    </header>
  )
}

export default AHeader;