create table category(
	id serial,
	name text,
	primary key(id)
);

create table products(
	id serial,
	categoryId int,
	name text,
	image text,
	quantity int,
	price dec(10,2),
	description text,
	review int,
	primary key(id),
	foreign key (categoryId) references category(id)
);

create extension pgcrypto;

create table customers(
	id serial,
	address text,
	phoneNumber text,
	userName text,
	password text,
	email text,
	role text [] default '{CUSTOMER}',
	primary key(id)
);

create table payment(
	id serial,
	paymentType text,
	paymentStatus int,
	paymentDate date,
	primary key(id)
);

create table orders(
	id serial,
	customerId int,
	paymentId int,
	orderDate date,
	info text,
	primary key(id),
	foreign key (paymentId) references payment(id),
	foreign key (customerId) references customers(id)
);

create table orderDetails(
	id serial,
	orderId int,
	productId int,
	price dec(10,2),
	quantity int,
	total int,
	primary key(id),
	foreign key (productid) references products(id),
	foreign key (orderId) references orders(id)
);

insert into category(name) values ('Thịt'),('Cá'),('Rau củ'), ('Trái cây');

insert into products(categoryId, name, image, quantity, price, description, review) values 
(1, 'Thịt lợn', 'thitlon.jpg', 10, 90000, 'Mô tả thịt lợn', 5),
(1, 'Thịt bò','thitbo.jpg', 10, 220000, 'Mô tả thịt bò', 4),
(2, 'Cá thu','cathu.jpg', 10, 70000, 'Mô tả cá thu', 5),
(2, 'Cá hồi','cahoi.jpg', 10, 150000, 'Mô tả cá hồi', 5),
(3, 'Rau muống', 'raumuong.jpg', 10, 15000, 'Mô tả rau muống', 4),
(3, 'Mướp hương', 'muophuong.jpg', 10, 20000, 'Mô tả mướp hương', 5),
(4, 'Dưa hấu','duahau.jpg', 10, 25000, 'Mô tả dưa hấu', 5),
(4, 'Xoài','xoai.jpg', 10, 50000, 'Mô tả xoài', 4);

insert into customers(username, password, email, phoneNumber, role) values
('Khanh', crypt('khanh123456', gen_salt('bf', 4)), 'khanh@gmail.com', '0123456789', ARRAY ['ADMIN', 'MANAGER']),
('Duong', crypt('duong123456', gen_salt('bf', 4)), 'duong@gmail.com', '0123456789', ARRAY ['CUSTOMER']);

insert into payment(paymentType) values
('Tiền mặt'),
('VNPAY');
