/*
DROP DATABASE mini_textbook
CREATE DATABASE mini_textbook
*/

create table `subject` (
  `id` int primary key,
  `name` varchar(50),
  `is_active` boolean default true
);

create table `publisher` (
  `id` int primary key,
  `name` varchar(100),
  `is_active` boolean default true
);

create table `series` (
  `id` int primary key,
  `name` varchar(50),
  `image` longtext,
  `is_active` boolean default true
);

create table `book` (
  `id` int primary key,
  `name` longtext,
  `image` longtext,
  `grade` int,
  `subject` int,
  `publisher` int,
  `price` decimal,
  `is_active` boolean default true,
  constraint FK_Book_Subject foreign key (`subject`) references `subject`(`id`),
  constraint FK_Book_Publisher foreign key (`publisher`) references `publisher`(`id`)
);

create table `book_series` (
  `id` int primary key auto_increment,
  `book` int,
  `series` int,
  constraint FK_BookSeries_Book foreign key (`book`) references `book`(`id`),
  constraint FK_BookSeries_Series foreign key (`series`) references `series`(`id`)
);

create table `user` (
  `id` int primary key auto_increment,
  `username` varchar(50) unique,
  `password` longtext,
  `fullname` varchar(100),
  `address` longtext,
  `phone` varchar(12),
  `email` varchar(200),
  `avatar` longtext default "/src/images/avatar/default.jpg",
  `status` enum("Đang sử dụng", "Mới khôi phục", "Đã khóa") default "Đang sử dụng"
);

create table `role` (
  `id` int primary key,
  `name` varchar(50)
);

create table `permission_group` (
  `id` int primary key,
  `name` varchar(50)
);

create table `permission` (
  `id` int primary key,
  `name` varchar(50),
  `group` int,
  constraint FK_Permission_PermissionGroup foreign key (`group`) references `permission_group`(`id`)
);

create table `role_permission` (
  `id` int primary key,
  `role` int,
  `permission` int,
  constraint FK_RolePermission_Role foreign key (`role`) references `role`(`id`),
  constraint FK_RolePermission_Permission foreign key (`permission`) references `permission`(`id`)
);

create table `admin` (
  `id` int primary key,
  `password` longtext,
  `fullname` varchar(100),
  `time_begin` time,
  `time_end` time,
  `role` int,
  `is_active` bool default true,
  constraint FK_Admin_Role foreign key (`role`) references `role`(`id`)
);

create table `cart` (
  `id` int primary key auto_increment,
  `user` int,
  `book` int,
  `quantity` int,
  constraint FK_Cart_User foreign key (`user`) references `user`(`id`),
  constraint FK_Cart_Book foreign key (`book`) references `book`(`id`)
);

create table `favorite` (
  `id` int primary key auto_increment,
  `user` int,
  `book` int,
  constraint FK_Favorite_User foreign key (`user`) references `user`(`id`),
  constraint FK_Favorite_Book foreign key (`book`) references `book`(`id`)
);

create table `order` (
  `id` int primary key auto_increment,
  `user` int,
  `receiver` varchar(100),
  `address` longtext,
  `phone` varchar(12),
  `total` decimal,
  `date_purchased` date,
  `date_vertified` date,
  `date_received` date,
  `date_canceled` date,
  `status` enum("Đã hủy", "Chưa xác nhận", "Đã xác nhận", "Đang giao hàng", "Đã giao hàng", "Đã nhận hàng") default "Chưa xác nhận",
  `vertify_admin` int,
  `is_paid` boolean default false,
  `paid_method` enum("Tiền mặt", "VNPay"),
  constraint FK_Order_User foreign key (`user`) references `user`(`id`),
  constraint FK_Order_Admin foreign key (`vertify_admin`) references `admin`(`id`)
);

create table `order_detail` (
  `id` int primary key auto_increment,
  `order` int,
  `book` int,
  `quantity` int,
  `price` decimal,
  constraint FK_OrderDetail_Order foreign key (`order`) references `order`(`id`),
  constraint FK_OrderDetail_Book foreign key (`book`) references `book`(`id`)
);

insert into `admin` (`id`, `password`, `fullname`, `time_begin`, `time_end`) values
(1, "AQAAAAIAAYagAAAAEO7XPdtR0pz3irpCiXo67ua01/+LcVjf4WsXbvzrbCqvIUOn19+oXpBH4eu15pCXlQ==", "Admin", "00:00", "00:00")

insert into permission_group (`id`, `name`) values
(1, "Sách"),
(2, "Bộ sách"),
(3, "Nhà xuất bản"),
(4, "Môn học"),
(5, "Hóa đơn"),
(6, "Tài khoản khách hàng"),
(7, "Phân quyền");

insert into permission(`id`, `name`, `group`) values
(1, "Xem danh sách sách", 1),
(2, "Thêm sách", 1),
(3, "Cập nhật sách", 1),
(4, "Khóa sách", 1),
(5, "Xem danh sách bộ sách", 2),
(6, "Thêm bộ sách", 2),
(7, "Cập nhật bộ sách", 2),
(8, "Khóa bộ sách", 2),
(9, "Xem danh sách nhà xuất bản", 3),
(10, "Thêm nhà xuất bản", 3),
(11, "Cập nhật nhà xuất bản", 3),
(12, "Khóa nhà xuất bản", 3),
(13, "Xem danh sách môn học", 4),
(14, "Thêm môn học", 4),
(15, "Cập nhật môn học", 4),
(16, "Khóa môn học", 4),
(17, "Xem danh sách đơn hàng", 5),
(18, "Cập nhật trạng thái đơn hàng", 5),
(19, "Xem danh sách khách hàng", 6),
(20, "Khóa khách hàng", 6),
(21, "Mở khóa khách hàng", 6),
(22, "Xem danh sách quản trị viên", 7),
(23, "Thêm quản trị viên", 7),
(24, "Sửa quản trị viên", 7),
(25, "Khóa quản trị viên", 7),
(26, "Mở khóa quản trị viên", 7),
(27, "Xem danh sách vai trò", 7),
(28, "Thêm vài trò", 7),
(29, "Sửa vai trò", 7),
(30, "Khóa vai trò", 7),
(31, "Cập nhật quyền cho vai trò", 7);