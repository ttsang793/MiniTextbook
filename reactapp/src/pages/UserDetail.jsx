import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";

const UserDetail = () => {
  const defaultThumbnail = "/src/images/avatar/default.jpg";
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [deletePass, setDeletePass] = useState("");
  
  const [defaultUsername, setDefaultUsername] = useState("");
  const [defaultFullname, setDefaultFullname] = useState("");
  const [defaultAddress, setDefaultAddress] = useState("");
  const [defaultPhone, setDefaultPhone] = useState("");
  const [defaultEmail, setDefaultEmail] = useState("");
  const [defaultAvatar, setDefaultAvatar] = useState("");

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const loadingRef = useRef(false);

  useEffect(() => {
    if (!loadingRef.current) {
      document.title = "Cài đặt - Nhà sách MiniTextbook";
      axios.get("/user/get").then(response => {
        const user = response.data;
        setUsername(user.username);
        setFullname(user.fullname);
        setAddress(user.address || "");
        setPhone(user.phone || "");
        setEmail(user.email || "");
        setAvatar(user.avatar);
        
        setDefaultUsername(user.username);
        setDefaultFullname(user.fullname);
        setDefaultAddress(user.address || "");
        setDefaultPhone(user.phone || "");
        setDefaultEmail(user.email || "");
        setDefaultAvatar(user.avatar);
      });
      loadingRef.current = true;
    }
  }, []);

  return (!loadingRef.current) ? <>Hello World</> : (
    <main className="bg-pink-100 grid grid-cols-1 lg:grid-cols-2 gap-x-10 p-8">
      {/* Cài đặt */}
      <section className="bg-white rounded-2xl box-shadow p-4">
        <h1 className='font-bold text-center mb-4 text-3xl text-pink-800'>THÔNG TIN</h1>

        <div className="grid grid-cols-[1fr_120px] gap-x-4">
          <div className='lg:order-2'>
            <img src={avatar} alt="avatar" className='h-30 cursor-pointer rounded-full' id="thumbnail-preview" onClick={() => document.getElementById("thumbnail-upload").click()} />

            <input type="file" id="thumbnail-upload" className='hidden' onChange={handleThumbnailUpload} />
          </div>

          <div>
            <div className="mb-6">
              <label htmlFor="username" className="block italic medium">Username: </label>
              <input type="text" id="username" value={username} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" placeholder='Username' onChange={e => setUsername(e.target.value)} onInput={() => clearUsernameValidation()} />
              <p id="error-username" className="text-red-700 italic"></p>
            </div>

            <div className="mb-6">
              <label htmlFor="fullname" className="block italic medium">Họ và tên: </label>
              <input type="text" id="fullname" value={fullname} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" placeholder='Họ và tên' onChange={e => setFullname(e.target.value)} onInput={() => clearFullnameValidation()} />
              <p id="error-fullname" className="text-red-700 italic"></p>
            </div>

            <div className="mb-6">
              <label htmlFor="address" className="block italic medium">Địa chỉ: </label>
              <input type="text" id="address" value={address} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" placeholder='Địa chỉ' onChange={e => setAddress(e.target.value)} onInput={() => clearAddressValidation()} />
              <p id="error-address" className="text-red-700 italic"></p>
            </div>
            
            <div className="mb-6">
              <label htmlFor="phone" className="block italic medium">Số điện thoại: </label>
              <input type="tel" id="phone" value={phone} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" placeholder='Số điện thoại' onChange={e => setPhone(e.target.value)} onInput={() => clearPhoneValidation()} />
              <p id="error-phone" className="text-red-700 italic"></p>
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block italic medium">Email: </label>
              <input type="email" id="email" value={email} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" placeholder='Email' onChange={e => setEmail(e.target.value)} onInput={() => clearEmailValidation()} />
              <p id="error-email" className="text-red-700 italic"></p>
            </div>
            
            <div className="mb-6 hidden" id="delete-pass-input">
              <label htmlFor="deletepass" className="block italic medium">Nhập mật khẩu: </label>
              <input type="password" id="deletepass" value={deletePass} className="rounded-full py-1 px-4 w-full focus-error" onChange={e => setDeletePass(e.target.value)} onInput={() => restoreDeleteValidation()} />
              <p id="error-deletepass" className="text-red-700 italic">Vui lòng nhập mật khẩu để hoàn thành xóa tài khoản!</p>
            </div>
          </div>          

          <div className="text-center order-3 lg:col-span-2 text-lg mb-4">
            <button className="bg-radial px-4 py-1 cursor-pointer from-pink-700 to-pink-900 hover:from-pink-600 hover:to-pink-800 text-pink-50 me-2" onClick={updateInfo}>
              Lưu
            </button>
            <button className="bg-pink-100 text-pink-700 px-4 py-1 cursor-pointer hover:bg-radial hover:from-pink-600 hover:to-pink-800 hover:text-pink-50 duration-150 me-2" onClick={resetDefault}>
              Hủy bỏ
            </button>
            <button className="bg-red-800 text-white px-4 py-1 cursor-pointer hover:bg-red-700 duration-150" onClick={deleteAccount}>
              Xóa tài khoản
            </button>
          </div>
        </div>
      </section>
      
      {/* Đổi mật khẩu */}
      <section className="bg-white rounded-2xl box-shadow p-4 h-fit">
        <h1 className='font-bold text-center mb-4 text-3xl text-pink-800'>MẬT KHẨU</h1>

        <div className="mb-6">
          <label htmlFor="oldpass" className="block italic medium">Mật khẩu cũ: </label>
          <input type="password" id="oldpass" value={oldPass} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" placeholder='Mật khẩu cũ' onChange={e => setOldPass(e.target.value)} onInput={() => clearOldPassValidation()} />
          <p id="error-oldpass" className="text-red-700 italic"></p>
        </div>

        <div className="mb-6">
          <label htmlFor="newpass" className="block italic medium">Mật khẩu mới: </label>
          <input type="password" id="newpass" value={newPass} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" placeholder='Mật khẩu mới' onChange={e => setNewPass(e.target.value)} onInput={() => clearNewPassValidation()} />
          <p id="error-newpass" className="text-red-700 italic"></p>
        </div>

        <div className="mb-6">
          <label htmlFor="confirm" className="block italic medium">Xác nhận mật khẩu: </label>
          <input type="password" id="confirm" value={confirmPass} className="bg-pink-50 border-1 border-pink-50 rounded-full py-1 px-4 w-full focus:bg-pink-100 focus:border-pink-800 duration-150" placeholder='Nhập lại mật khẩu' onChange={e => setConfirmPass(e.target.value)} onInput={() => clearConfirmValidation()} />
          <p id="error-confirm" className="text-red-700 italic"></p>
        </div>

        <div className="text-center">
          <button className="bg-radial px-4 py-1 cursor-pointer from-pink-700 to-pink-900 hover:from-pink-600 hover:to-pink-800 text-pink-50 text-lg mb-4" onClick={updatePassword}>
            Đổi mật khẩu
          </button>
        </div>
      </section>
    </main>
  )

  function handleThumbnailUpload(e) {
    try {
      setAvatar(e.target.files[0]);

      const reader = new FileReader();
      reader.onload = e => document.getElementById('thumbnail-preview').src = e.target.result;
      reader.readAsDataURL(e.target.files[0]);
    }
    catch {
      setAvatar(defaultAvatar);
    }
  }

  function clearUsernameValidation() {
    document.getElementById("error-username").innerHTML = "";
    document.getElementById("username").classList.remove("focus-error");
  }

  function clearFullnameValidation() {
    document.getElementById("error-fullname").innerHTML = "";
    document.getElementById("fullname").classList.remove("focus-error");
  }

  function clearAddressValidation() {
    document.getElementById("error-address").innerHTML = "";
    document.getElementById("address").classList.remove("focus-error");
  }

  function clearPhoneValidation() {
    document.getElementById("error-phone").innerHTML = "";
    document.getElementById("phone").classList.remove("focus-error");

    if (email === "") document.getElementById("error-email").innerHTML = "";
  }

  function clearEmailValidation() {
    document.getElementById("error-email").innerHTML = "";
    document.getElementById("email").classList.remove("focus-error");
  }  

  function updateInfo() {
    clearUsernameValidation();
    clearFullnameValidation();
    clearAddressValidation();
    clearPhoneValidation();
    clearEmailValidation();
    let errorFlag = false;

    if (username === "") {
      document.getElementById("error-username").innerHTML = "Vui lòng nhập username.";
      document.getElementById("username").classList.add("focus-error");
      document.getElementById("username").focus();
      errorFlag = true;
    }

    if (fullname === "") {
      document.getElementById("error-fullname").innerHTML = "Vui lòng nhập họ tên đầy đủ.";
      document.getElementById("fullname").classList.add("focus-error");
      if (!errorFlag) document.getElementById("fullname").focus();
      errorFlag = true;
    }

    if (address === "") {
      document.getElementById("error-address").innerHTML = "Vui lòng nhập địa chỉ mặc định.";
      document.getElementById("address").classList.add("focus-error");
      if (!errorFlag) document.getElementById("address").focus();
      errorFlag = true;
    }

    if (phone === "" && email == "") {
      document.getElementById("error-email").innerHTML = "Vui lòng nhập số điện thoại hoặc email";
      errorFlag = true;
    }
    else if (phone !== "" && /^0(([1,3-5,7-9]\d{8})|(2\d{9}))$/.test(phone) == false) {
      document.getElementById("error-phone").innerHTML = "Số điện thoại phải bắt đầu bằng số 0, và có 10 hoặc 11 số.";
      document.getElementById("phone").classList.add("focus-error");
      if (!errorFlag) document.getElementById("phone").focus();
      errorFlag = true;
    }
    else if (email !== "" && /^.+@.+(\..+)+/.test(email) === false) {
      document.getElementById("error-email").innerHTML = "Email phải có định dạng someone@email.com.";
      document.getElementById("email").classList.add("focus-error");
      if (!errorFlag) document.getElementById("email").focus();
      errorFlag = true;
    }

    if (!errorFlag) {
      if (confirm("Bạn có muốn cập nhật thông tin?")) {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("fullname", fullname);
        formData.append("address", address);
        formData.append("phone", phone);
        formData.append("email", email);

        if (avatar && avatar instanceof File) {
          formData.append("avatar", avatar.name);
          formData.append("file", avatar);        
        }
        else {
          formData.append("avatar", avatar);
          const emptyFile = new File([], "empty.jpg");
          formData.append("file", emptyFile)
        }

        axios.put("/user/update", formData, { 'Content-Type': 'multipart/form-data' })
        .then(() => {
          alert("Cập nhật thành công!");
          location.reload();
        })
        .catch(response => {
          if (response.status === 404) {
            document.getElementById("error-username").innerHTML = "Username đã tồn tại.";
            document.getElementById("username").classList.add("focus-error");
            document.getElementById("username").focus();
          }
          else {
            alert("Đã có lỗi xảy ra, vui lòng thử lại!");
            console.error(response);
          }
        })
      }
    }
  }

  function resetDefault() {
    setUsername(defaultUsername);
    setFullname(defaultFullname);
    setAddress(defaultAddress);
    setPhone(defaultPhone);
    setEmail(defaultEmail);
    setAvatar(defaultAvatar);
    document.getElementById("delete-pass-input").classList.add("hidden");
  }

  function clearOldPassValidation() {
    document.getElementById("error-oldpass").innerHTML = "";
    document.getElementById("oldpass").classList.remove("focus-error");
  }

  function clearNewPassValidation() {
    document.getElementById("error-newpass").innerHTML = "";
    document.getElementById("newpass").classList.remove("focus-error");
  }

  function clearConfirmValidation() {
    document.getElementById("error-confirm").innerHTML = "";
    document.getElementById("confirm").classList.remove("focus-error");
  }

  function updatePassword() {
    clearOldPassValidation();
    clearNewPassValidation();
    clearConfirmValidation();
    let errorFlag = false;

    if (oldPass === "") {
      document.getElementById("error-oldpass").innerHTML = "Vui lòng nhập mật khẩu cũ.";
      document.getElementById("oldpass").classList.add("focus-error");
      if (!errorFlag) document.getElementById("oldpass").focus();
      errorFlag = true;
    }

    if (newPass === "") {
      document.getElementById("error-newpass").innerHTML = "Vui lòng nhập mật khẩu mới.";
      document.getElementById("newpass").classList.add("focus-error");
      if (!errorFlag) document.getElementById("newpass").focus();
      errorFlag = true;
    }
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(newPass)) {
      document.getElementById("error-newpass").innerHTML = "Mật khẩu cần có 1 chữ hoa, 1 chữ thường, 1 chữ số, và có tối thiểu 6 ký tự";
      document.getElementById("newpass").classList.add("focus-error");
      if (!errorFlag) document.getElementById("newpass").focus();
      errorFlag = true;
    }

    if (confirmPass !== newPass) {
      document.getElementById("error-confirm").innerHTML = "Cần nhập lại mật khẩu trùng với mật khẩu mới ở trên.";
      document.getElementById("confirm").classList.add("focus-error");
      if (!errorFlag) document.getElementById("confirm").focus();
      errorFlag = true;
    }

    if (!errorFlag) {
      if(confirm("Bạn có muốn cập nhật mật khẩu không?")) {
        const pass = { oldPassword: oldPass, newPassword: newPass };

        axios.put("/user/update-key", pass, { 'Content-Type': 'multipart/form-data' })
        .then(() => {
          alert("Đổi mật khẩu thành công! Vui lòng đăng nhập lại!")
          location.href = "/";
        })
        .catch(response => {
          if (response.status === 404) {
            document.getElementById("error-oldpass").innerHTML = "Mật khẩu cũ không chính xác!";
            document.getElementById("oldpass").classList.add("focus-error");
            document.getElementById("oldpass").focus();
          }
          else {
            alert("Đã có lỗi xảy ra, vui lòng thử lại!");
            console.error(response);
          }
        })
      }
    }
  }

  function restoreDeleteValidation() {
    document.getElementById("error-deletepass").innerHTML = "Vui lòng nhập mật khẩu để hoàn thành xóa tài khoản!";
  }

  function deleteAccount() {
    document.getElementById("delete-pass-input").classList.remove("hidden");
    if (deletePass !== "") {
      if (confirm("Bạn có muốn xóa tài khoản của bạn?")) {          
        axios.delete("/user/delete", { data: { oldPassword: deletePass }, headers: { 'Content-Type': 'application/json' } } )
        .then(() => {
          alert("Cảm ơn bạn đã quan tâm đến MiniTextbook. Mong sớm ngày gặp lại bạn!")
          location.href = "/";
        })
        .catch(response => {
          if (response.status === 404) {
            document.getElementById("error-deletepass").innerHTML = "Mật khẩu không chính xác!";
            document.getElementById("deletepass").classList.add("focus-error");
            document.getElementById("deletepass").focus();
          }
          else {
            alert("Đã có lỗi xảy ra, vui lòng thử lại!");
            console.error(response);
          }
        })
      }
    }
    else document.getElementById("deletepass").focus();
  }
}

export default UserDetail;