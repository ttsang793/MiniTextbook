import { House, Phone, Envelope } from "@phosphor-icons/react";

const Footer = () => {
  return (
    <footer className="mt-8">
      <div className="flex justify-between bg-pink-200 text-pink-900 px-15 pt-4 pb-2">
        <div>
          <img src="/mt-vlogo.png" alt="Mini Textbook logo" className="h-8 mb-4" />
          <p className="m-0 font-bold bold italic text-xl">Hệ thống nhà sách MiniTextbook</p>        
          <p className="m-0">
            <House size={24} className="inline" /> : 348 Dương Bá Trạc, P. Chánh Hưng, TP. Hồ Chí Minh
          </p>
          <p className="m-0">
            <Phone size={24} weight="fill" className="inline" /> : (028) 1234 5678 -
            <Envelope size={24} className="inline" />: minitextbookdbt@gmail.com
          </p>
        </div>

        <div>
          <img src="/bo-cong-thuong.png" alt="Bộ công thương" className="w-50" />
        </div>
      </div>
      <p className="text-center bg-pink-800/90 text-pink-50 py-1">
        &copy; {new Date().getFullYear()} - Bản quyền thuộc về MiniTextbook
      </p>
    </footer>
  )
}

export default Footer;