# Mini Textbook
<p align="justify">
Đây là website cửa hàng bán sách giáo khoa (textbook). Do mục đích của project này chỉ đơn thuần là củng cố hiểu biết của bản thân về kiến trúc Onion và TailwindCSS, nên project này có quy mô rất nhỏ (mini), do đó project có tên là Mini Textbook. Project được thực hiện với sự hỗ trợ của ReactJS và TailwindCSS ở frontend, .NET 8.0 ở backend.
</p>

<p align="center">
  <img src="https://lh3.googleusercontent.com/pw/AP1GczNSL9wVzWrdB5qKimkzeM14n5PWl__ToUPPUOrHsx9hueZs_zxr-t32wvPjVDe12yCLgAvJ7IlBI_8kKVyoAb2FMhG6UFLZtCAnftcumVLHydfvcak=s720-no" alt="Logo Mini Textbook" width="200px" />
</p>

## Hình ảnh một số trang của Mini Textbook
![Trang chủ của Mini Textbook](https://lh3.googleusercontent.com/pw/AP1GczOuUdZIIup__xg60GHklt63n-1QKPoohSzZwIg0UdKGugxY8UrB7I0HWLim2RPfqNq83EahNgadzZ2ckHw0tILoi9Nxd3-Vibuz7Joj4eKGOocjEB2XumgSfzOJV8pSROhcdxUvPkCaojzrrTUvN78T=w1860-h1046-s-no-gm "Trang chủ của Mini Textbook")
<p align="center">Trang chủ của Mini Textbook</p>

![Trang sản phẩm của Mini Textbook](https://lh3.googleusercontent.com/pw/AP1GczOLW6insT6NL4LpjESD-pi-E-NKLB0KHOKd0Z8VITWKf4tTN3CUanW0N5Eump46c5HRtmo568JLD53H9RLuSywJZCuHguwOuRNSB22j3wt2rzbmHCpmZ0rb8V5Sjx44p9Tf_mPvITjPbbBQSllwfWtJ=w1860-h1046-s-no-gm "Trang sản phẩm")
<p align="center">Trang sản phẩm</p>

![Trang admin thống kê](https://lh3.googleusercontent.com/pw/AP1GczOKXvDc6GbbTduOMPZPM8Coe4xoxQo0EhRlP2S9lMXeBnIxy5J86Ii4VbGqoyPwxXiQtm8lSHw0MP-OshQNxpS8H8PttkqM1ahFydasPkx1tS8487APsfZVi3bO0m3YtrwHpJVdqeFUN0VNuggK_-jK=w1860-h1046-s-no-gm "Trang admin thống kê")
<p align="center">Trang admin thống kê</p>

![Trang chủ của Mini Textbook](https://lh3.googleusercontent.com/pw/AP1GczMHL1CSyQ319dHJaMCtCYV2Gyj_A32FpteQyAz2dDXgDuDLnV9DdvgIZ1iyTGOIKS14IqWcdt8Y-kCsCOuwJee6ZcCWQhfqAzqg-mXDpB6HurtrBJOhReQZBfOS6vtcrDCTJiHp1EFcXN9Oek-DUmQa=w1860-h1046-s-no-gm "Trang admin sản phẩm")
<p align="center">Trang admin sản phẩm</p>

## Hướng dẫn cài đặt
* Bước 1: Cài đặt [XAMPP](https://www.apachefriends.org/download.html) (PHP >= 8.2.0).
* Bước 2: Cài đặt [.NET 8.0](https://dotnet.microsoft.com/en-us/download/dotnet/8.0). Nếu bạn sử dụng IDE như Visual Studio thì có thể bỏ qua bước này.
* Bước 3: Chạy cơ sở dữ liệu
    * Bước 3.1: Khởi động XAMPP. Kích hoạt 2 dịch vụ sau: Apache và MySQL.
    * Bước 3.2. Mở trình soạn thảo SQL của máy tính của bạn. Ví dụ, bạn có thể bỏ vào PHPMyAdmin của XAMPP:
        ```
        https://localhost/phpmyadmin
        ```
    * Bước 3.3: Copy các câu lệnh trong file /Database/empty_db.sql vào trình soạn thảo SQL vửa mở, rồi sau đó thực thi.
* Bước 4: Chạy trang web:
  * Ở frontend, di chuyển tới thư mục reactapp
    ```
    cd reactapp
    ```
  * Sau đó chạy câu lệnh sau để khởi động trang web:
    ```
    npm run dev
    ```
  * Ở backend, mở Visual Studio hoặc IDE C# mà bạn dùng. Sau đó bắt đầu chạy.
  * Nếu bạn dùng Visual Studio Code, gõ câu lệnh sau:
    ```
    dotnet run
    ```

## Thành viên thực hiện
[Trần Tuấn Sang](https://ttsang793.github.io)