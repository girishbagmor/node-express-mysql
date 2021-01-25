-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 11, 2020 at 03:06 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce_node`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL,
  `_order` varchar(200) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `sub_total` int(11) NOT NULL,
  `shipping` double NOT NULL,
  `total` double NOT NULL,
  `payment_method` int(11) NOT NULL COMMENT '1 - cash on delivery',
  `order_status_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `_order`, `user_id`, `sub_total`, `shipping`, `total`, `payment_method`, `order_status_id`, `created`, `updated`) VALUES
(25, 'X_10025', 19, 2800, 0, 2800, 1, 1, '2020-08-13 01:45:06', '0000-00-00 00:00:00'),
(26, 'T10026', 19, 1400, 0, 1400, 1, 1, '2020-08-22 18:30:00', '0000-00-00 00:00:00'),
(27, 'T10027', 19, 4700, 0, 4700, 1, 1, '2020-08-24 18:30:00', '0000-00-00 00:00:00'),
(28, 'T10028', 19, 4700, 0, 4700, 1, 1, '2020-09-01 12:37:16', '0000-00-00 00:00:00'),
(29, 'T10029', 19, 4700, 0, 4700, 1, 1, '2020-09-01 12:37:16', '2020-09-01 18:07:16');

--
-- Triggers `orders`
--
DELIMITER $$
CREATE TRIGGER `MY_ORDER_ID` BEFORE INSERT ON `orders` FOR EACH ROW IF NEW._order IS NULL or NEW._order ='' THEN
          SET NEW._order = (SELECT CONCAT('T',((SELECT id FROM orders ORDER BY id DESC LIMIT 1) + 1)+10000));
          END IF
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `order_address`
--

CREATE TABLE `order_address` (
  `id` bigint(20) NOT NULL,
  `order_id` bigint(20) NOT NULL,
  `firstname` varchar(200) NOT NULL,
  `lastname` varchar(200) NOT NULL,
  `phone` varchar(200) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `address_line_2` varchar(255) NOT NULL,
  `city` varchar(200) NOT NULL,
  `state` varchar(100) NOT NULL,
  `pincode` varchar(100) NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `archive` tinyint(4) NOT NULL COMMENT '0- Not/ 1 - Yes'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_address`
--


-- --------------------------------------------------------

--
-- Table structure for table `order_products`
--

CREATE TABLE `order_products` (
  `id` bigint(20) NOT NULL,
  `order_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `qty` int(11) NOT NULL,
  `gst` double NOT NULL,
  `sub_total` double NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated` datetime NOT NULL,
  `archive` tinyint(4) NOT NULL COMMENT '0 - Not/1 - Yes'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_products`
--



-- --------------------------------------------------------

--
-- Table structure for table `order_status`
--

CREATE TABLE `order_status` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `key_name` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `created` datetime NOT NULL,
  `archive` tinyint(4) NOT NULL COMMENT '0 - Not/1 - Yes'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_status`
--

INSERT INTO `order_status` (`id`, `name`, `key_name`, `description`, `created`, `archive`) VALUES
(1, 'Pending', 'pending', '', '2020-08-28 00:00:00', 0),
(2, 'Processing', 'processing', '', '2020-08-28 00:00:00', 0),
(3, 'Shipped', 'shipped', '', '2020-08-28 00:00:00', 0),
(4, 'Delivered ', 'delivered', '', '2020-08-28 00:00:00', 0),
(5, 'Cancelled', 'cancelled', '', '2020-08-28 00:00:00', 0),
(6, 'Returned', 'returned ', '', '2020-08-28 00:00:00', 0),
(7, 'Cancelled by Seller', 'cancelled_by_seller', '', '2020-08-28 00:00:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) NOT NULL,
  `category_id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `description` text NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `archive` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `price`, `description`, `created`, `updated`, `archive`) VALUES
(1, 1, 'Foxter Attractive Modern Colletion Yellow Dail Analog Watch - For Men', 1400, 'Foam filling cotton slow\r\nrebound pillows\r\nSeamlessly empower fully researched growth strategies and interoperable internal or “organic” sources. Credibly innovate granular internal or “organic” sources whereas high standards in web-readiness. Credibly innovate granular internal or organic sources whereas high standards in web-readiness. Energistically scale future-proof core competencies vis-a-vis impactful experiences. Dramatically synthesize integrated schemas. with optimal networks.', '2020-08-20 09:38:31', '2020-08-20 09:38:31', 0),
(2, 1, 'Fogg 1164-BR Brown Day and Date Unique New Analog Watch - For Men', 1650, 'Foam filling cotton slow\r\nrebound pillows\r\nSeamlessly empower fully researched growth strategies and interoperable internal or “organic” sources. Credibly innovate granular internal or “organic” sources whereas high standards in web-readiness. Credibly innovate granular internal or organic sources whereas high standards in web-readiness. Energistically scale future-proof core competencies vis-a-vis impactful experiences. Dramatically synthesize integrated schemas. with optimal networks.', '2020-08-20 09:38:31', '2020-08-20 09:38:31', 0),
(3, 1, 'Benling 1005-Black Dial Analog Digital Sports Watch For Men\'s BL-1005-ANA-DIGI-TAN Analog-Digital Watch - For Men', 7800, 'Foam filling cotton slow\r\nrebound pillows\r\nSeamlessly empower fully researched growth strategies and interoperable internal or “organic” sources. Credibly innovate granular internal or “organic” sources whereas high standards in web-readiness. Credibly innovate granular internal or organic sources whereas high standards in web-readiness. Energistically scale future-proof core competencies vis-a-vis impactful experiences. Dramatically synthesize integrated schemas. with optimal networks.', '2020-08-20 09:38:31', '2020-08-20 09:38:31', 0),
(5, 1, 'Fastrack 38024PP25 Minimalists Analog Watch - For Men & Women', 1500, 'Foam filling cotton slow\r\nrebound pillows\r\nSeamlessly empower fully researched growth strategies and interoperable internal or “organic” sources. Credibly innovate granular internal or “organic” sources whereas high standards in web-readiness. Credibly innovate granular internal or organic sources whereas high standards in web-readiness. Energistically scale future-proof core competencies vis-a-vis impactful experiences. Dramatically synthesize integrated schemas. with optimal networks.', '2020-08-20 09:38:31', '2020-08-20 09:38:31', 0),
(6, 1, 'Lois Caron LCS-8075 DAY & DATE FUNCTIONING Analog Watch - For Men', 1500, 'Foam filling cotton slow\r\nrebound pillows\r\nSeamlessly empower fully researched growth strategies and interoperable internal or “organic” sources. Credibly innovate granular internal or “organic” sources whereas high standards in web-readiness. Credibly innovate granular internal or organic sources whereas high standards in web-readiness. Energistically scale future-proof core competencies vis-a-vis impactful experiences. Dramatically synthesize integrated schemas. with optimal networks.', '2020-08-20 09:38:31', '2020-08-20 09:38:31', 0),
(7, 1, 'Pixo Fashion PX SRK 2037-SL Rich in Silver Analog Watch - For Men', 1500, 'Foam filling cotton slow\r\nrebound pillows\r\nSeamlessly empower fully researched growth strategies and interoperable internal or “organic” sources. Credibly innovate granular internal or “organic” sources whereas high standards in web-readiness. Credibly innovate granular internal or organic sources whereas high standards in web-readiness. Energistically scale future-proof core competencies vis-a-vis impactful experiences. Dramatically synthesize integrated schemas. with optimal networks.', '2020-08-20 09:38:31', '2020-08-20 09:38:31', 0);

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `featured_image` smallint(6) NOT NULL COMMENT '0 - Not/1 - Yes',
  `filename` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `created` datetime NOT NULL,
  `archive` smallint(6) NOT NULL COMMENT '0 - Not/1 - Yes'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `featured_image`, `filename`, `path`, `created`, `archive`) VALUES
(1, 1, 1, '1.jpeg', '/uploads/products/1.jpeg', '2020-08-26 00:00:00', 0),
(2, 2, 1, '2.jpeg', '/uploads/products/2.jpeg', '2020-08-26 00:00:00', 0),
(3, 3, 1, '3.jpeg', '/uploads/products/3.jpeg', '2020-08-26 00:00:00', 0),
(4, 7, 1, '4.jpeg', '/uploads/products/4.jpeg', '2020-08-26 00:00:00', 0),
(5, 5, 1, '5.jpeg', '/uploads/products/5.jpeg', '2020-08-26 00:00:00', 0),
(6, 6, 1, '6.jpeg', '/uploads/products/6.jpeg', '2020-08-26 00:00:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('A9iZvflatjh8G7KFvnz3CubFhSftzLnA', 1599914094, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"fullname\":\"Girish Bagmor\",\"firstname\":\"Girish\",\"lastname\":\"Bagmor\",\"email\":\"girish@ydt.com.au\",\"user_id\":19,\"isUserLoggedIn\":true}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(200) NOT NULL,
  `lastname` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `gender` tinyint(4) NOT NULL DEFAULT 1 COMMENT '1 - Male/2 - Female/3 - Other',
  `password` varchar(255) NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `phone`, `gender`, `password`, `created`, `updated`) VALUES
(19, 'John', 'Cena', 'john@gmail.com', '123456789', 1, '$2b$10$tGNsLsQavlhf9m5GCOnrdeLQzSwJyY2jySz6dRUXZ12.1DYvqAzsu', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_address`
--
ALTER TABLE `order_address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_2` (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `order_address`
--
ALTER TABLE `order_address`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `order_products`
--
ALTER TABLE `order_products`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `order_status`
--
ALTER TABLE `order_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
