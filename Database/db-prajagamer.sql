-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2024 at 11:16 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db-prajagamer`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `admin_name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updateAt` datetime(3) NOT NULL,
  `nip` varchar(191) NOT NULL,
  `telp_admin` varchar(191) NOT NULL,
  `role` varchar(191) NOT NULL DEFAULT 'admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `admin_name`, `email`, `password`, `createdAt`, `updateAt`, `nip`, `telp_admin`, `role`) VALUES
(4, 'admin4', 'admin4@gmail.com', '$2a$10$9DvSms1PMcce3BLEHy6.2uCx0t9bMgXbhDH.J4qkNodXsIT0O55ga', '2024-09-03 02:49:04.422', '2024-09-03 02:49:04.422', '1312421465353543', '08654656', 'admin'),
(5, 'admin5', 'admin5@gmail.com', '$2a$10$skhi6/MNahxfuhLI7lJ9eeSgbas8E3MtF1IWrEJNFw2VLXmiQC/TW', '2024-09-03 02:53:17.475', '2024-09-03 02:53:17.475', '1312425353543', '08654656', 'admin'),
(6, 'Rizal', 'rizal@gmail.com', '$2a$10$psxYot.V4H/hU2NMPv0QRulzHddbL3Rd/MuxAufVtWlo2q7BDz9MK', '2024-09-05 04:22:30.604', '2024-09-05 04:22:30.604', '1234325431432', '08131684', 'admin'),
(8, 'adit', 'adit@gmail.com', '$2a$10$F3YO/.2Oon2vc0XOUCis1.WHwm.xBjTMLNv8yepP3NYI0Rauqw21C', '2024-09-05 04:26:49.631', '2024-09-05 04:26:49.631', '1234322345', '081345678987', 'admin'),
(9, 'oktav', 'oktav@gmail.com', '$2a$10$rhHITwi/XVdbxUkig0VtlOCpSW6Ny7hUVmoT3Ibqtm2.gyMCrNJoa', '2024-09-05 04:30:40.795', '2024-09-05 04:30:40.795', '15877589708', '08141269874', 'admin'),
(10, 'kepin', 'kepin@gmail.com', '$2a$10$B2JhdTizhvLhFtluJXznzO1b2DJd.nJ6aC1Yd2apNYaniSjB2tZwm', '2024-09-05 04:31:28.775', '2024-09-05 04:31:28.775', '16787567322332', '08165646461', 'admin'),
(11, 'ayat', 'ayat@gmail.com', '$2a$10$Sj8oQhoC12lH0dkPPscs3OXZCbITPum25DgcA9hM5XQQsGJLQ63wG', '2024-09-05 04:35:31.948', '2024-09-05 04:35:31.948', '183452827464', '08526846658', 'admin'),
(12, 'kopet', 'kopet@gmail.com', '$2a$10$tU19eaeOLeJ/XSZT47Qxwe1yC9LUZs/Me8Bz68Nzg0KJgaF2HY8h.', '2024-09-05 04:38:48.259', '2024-09-05 04:38:48.259', '187654567890987654', '034567887654', 'admin'),
(14, 'vela', 'vela@gmail.com', '$2a$10$BjzLP8eVzH0x/.1sfpewLeS3gVYYdw4KLgOmINkh/i1eEKslcQIXi', '2024-09-05 04:44:18.390', '2024-09-05 04:44:18.390', '132548636899', '083325469', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `telp_user` varchar(191) NOT NULL,
  `nik` varchar(191) NOT NULL,
  `photo` varchar(191) NOT NULL,
  `place_birth` varchar(191) NOT NULL,
  `birth_date` varchar(191) NOT NULL,
  `province_domicile` varchar(191) NOT NULL,
  `city_domicile` varchar(191) NOT NULL,
  `address_domicile` varchar(191) NOT NULL,
  `province_ktp` varchar(191) NOT NULL,
  `city_ktp` varchar(191) NOT NULL,
  `address_ktp` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updateAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`id`, `user_id`, `telp_user`, `nik`, `photo`, `place_birth`, `birth_date`, `province_domicile`, `city_domicile`, `address_domicile`, `province_ktp`, `city_ktp`, `address_ktp`, `createdAt`, `updateAt`) VALUES
(1, 1, '089616857439', '028331330123821', 'C:\\Users\\Virnika Shefira\\Desktop\\Kuliah\\Semester 7\\KP\\prajagamer-1\\src\\uploads\\photo\\1725191819529-WhatsApp Image 2023-09-29 at 21.48.39_f145f89a.jpg', 'Semarang', '2003-01-20', 'Jawa Tengah', 'Semarang', 'Jl.Pemuda no.18', 'Kalimantan Barat', 'Pontianak', 'Jl.Lingkar', '2024-09-01 11:57:00.008', '2024-09-01 12:02:34.786'),
(2, 2, '081337272669', '2356511', 'C:\\Users\\LENOVO\\OneDrive\\Documents\\Backend\\src\\uploads\\photo\\1725198796723-disdukcapil.png', '', '', '', '', '', '', '', '', '2024-09-01 13:53:16.893', '2024-09-01 13:53:16.893'),
(3, 5, '085643408961', '4567898765456789876', 'C:\\Users\\LENOVO\\OneDrive\\Documents\\Backend\\src\\uploads\\photo\\1725199228176-disdukcapil.png', '', '', '', '', '', '', '', '', '2024-09-01 14:00:28.328', '2024-09-01 14:00:28.328'),
(7, 10, '085643408961', '1365311391', 'C:\\Users\\LENOVO\\OneDrive\\Documents\\Backend\\src\\uploads\\photo\\1725199766670-WhatsApp Image 2024-08-27 at 15.51.22_2c360218.jpg', '', '', '', '', '', '', '', '', '2024-09-01 14:09:26.780', '2024-09-01 14:09:26.780'),
(8, 11, '088899997777', '1290389012839', 'C:\\Users\\LENOVO\\OneDrive\\Documents\\Backend\\src\\uploads\\photo\\1725200858439-disdukcapil.png', '', '', '', '', '', '', '', '', '2024-09-01 14:27:38.744', '2024-09-01 14:27:38.744'),
(9, 12, '089231031021', '3102993910012', 'C:\\Users\\LENOVO\\OneDrive\\Documents\\Backend\\src\\uploads\\photo\\1725201706412-WhatsApp Image 2024-08-26 at 07.55.31_97908970.jpg', '', '', '', '', '', '', '', '', '2024-09-01 14:41:46.666', '2024-09-01 14:41:46.666'),
(10, 16, '0856632485148', '132124214325325', 'C:\\Users\\LENOVO\\OneDrive\\Documents\\prajagamer\\Backend\\src\\uploads\\photo\\1725597020284-feed 28 (1).jpg', '', '', '', '', '', '', '', '', '2024-09-06 04:30:20.514', '2024-09-06 04:30:20.514');

-- --------------------------------------------------------

--
-- Table structure for table `regist`
--

CREATE TABLE `regist` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `cv` varchar(191) NOT NULL,
  `recommend_letter` varchar(191) NOT NULL,
  `score_list` varchar(191) NOT NULL,
  `portofolio` varchar(191) DEFAULT NULL,
  `available_space` tinyint(1) DEFAULT NULL,
  `first_period` datetime(3) DEFAULT NULL,
  `last_period` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updateAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `regist`
--

INSERT INTO `regist` (`id`, `user_id`, `cv`, `recommend_letter`, `score_list`, `portofolio`, `available_space`, `first_period`, `last_period`, `createdAt`, `updateAt`) VALUES
(1, 1, 'src/uploads/cv/1726127631210.pdf', 'src/uploads/recommend_letter/1726127631202.pdf', 'C:\\Users\\Virnika Shefira\\Desktop\\Kuliah\\Semester 7\\KP\\prajagamer-1\\src\\uploads\\score_list\\1725191819544-score.pdf', NULL, 1, '2024-09-10 00:00:00.000', '2024-10-01 00:00:00.000', '2024-09-01 11:57:00.008', '2024-09-12 07:53:51.224'),
(2, 2, 'C:\\Users\\LENOVO\\OneDrive\\Documents\\Backend\\src\\uploads\\cv\\1725198796749-stuxnet-ieee-spectrum.pdf', '', 'C:\\Users\\LENOVO\\OneDrive\\Documents\\Backend\\src\\uploads\\score_list\\1725198796756-A7cYEnNChkS0O4-lIhNh1Ot_6e8RR9nLiAPFz3Z0.pdf', '', 1, NULL, NULL, '2024-09-01 13:53:16.893', '2024-09-01 13:53:16.893'),
(3, 5, 'C:\\Users\\LENOVO\\OneDrive\\Documents\\Backend\\src\\uploads\\cv\\1725199228200-mNUi9vRDzKf48b7X_rf2Fh9io6anJVlZoE7ybXX3.pdf', '', 'C:\\Users\\LENOVO\\OneDrive\\Documents\\Backend\\src\\uploads\\score_list\\1725199228209-SKPL Pustakanesia.pdf', '', NULL, NULL, NULL, '2024-09-01 14:00:28.328', '2024-09-01 14:00:28.328'),
(7, 10, 'C:\\Users\\LENOVO\\OneDrive\\Documents\\Backend\\src\\uploads\\cv\\1725199766675-krs_tawar_A11.2021.13254.pdf', '', 'C:\\Users\\LENOVO\\OneDrive\\Documents\\Backend\\src\\uploads\\score_list\\1725199766676-SKPL Pustakanesia.pdf', '', NULL, NULL, NULL, '2024-09-01 14:09:26.780', '2024-09-01 14:09:26.780'),
(8, 11, 'C:\\Users\\LENOVO\\OneDrive\\Documents\\Backend\\src\\uploads\\cv\\1725200858489-stuxnet-ieee-spectrum.pdf', '', 'C:\\Users\\LENOVO\\OneDrive\\Documents\\Backend\\src\\uploads\\score_list\\1725200858503-gtnKQY-kTVj56nrMwzbeKAu4i0vMdiO6X853jfCI.pdf', '', NULL, NULL, NULL, '2024-09-01 14:27:38.744', '2024-09-01 14:27:38.744'),
(9, 12, 'C:\\Users\\LENOVO\\OneDrive\\Documents\\Backend\\src\\uploads\\cv\\1725201706423-krs_tawar_A11.2021.13254.pdf', '', 'C:\\Users\\LENOVO\\OneDrive\\Documents\\Backend\\src\\uploads\\score_list\\1725201706425-SKPL Pustakanesia.pdf', '', NULL, NULL, NULL, '2024-09-01 14:41:46.666', '2024-09-01 14:41:46.666'),
(10, 16, 'C:\\Users\\LENOVO\\OneDrive\\Documents\\prajagamer\\Backend\\src\\uploads\\cv\\1725597020286-gtnKQY-kTVj56nrMwzbeKAu4i0vMdiO6X853jfCI.pdf', '', 'C:\\Users\\LENOVO\\OneDrive\\Documents\\prajagamer\\Backend\\src\\uploads\\score_list\\1725597020301-SKPL Pustakanesia.pdf', '', NULL, NULL, NULL, '2024-09-06 04:30:20.514', '2024-09-06 04:30:20.514');

-- --------------------------------------------------------

--
-- Table structure for table `university`
--

CREATE TABLE `university` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `univ_name` varchar(191) NOT NULL,
  `nim` varchar(191) NOT NULL,
  `major` varchar(191) NOT NULL,
  `ipk` double NOT NULL,
  `semester` varchar(191) NOT NULL,
  `name_supervisor` varchar(191) NOT NULL,
  `telp_supervisor` varchar(191) NOT NULL,
  `email_supervisor` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updateAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `university`
--

INSERT INTO `university` (`id`, `user_id`, `univ_name`, `nim`, `major`, `ipk`, `semester`, `name_supervisor`, `telp_supervisor`, `email_supervisor`, `createdAt`, `updateAt`) VALUES
(1, 1, 'Universitas Dian Nuswantoro', 'a11.2021.13xxx', 'Teknik Informatika', 3.5, '7', 'Dady', '08193816331', 'dady@gmail.com', '2024-09-01 11:57:00.008', '2024-09-01 12:02:34.803'),
(2, 2, 'dasdsdsaasddasadsdaas', 'A11.2021.13254', 'teknik informatika', 0, '', '', '', '', '2024-09-01 13:53:16.893', '2024-09-01 13:53:16.893'),
(3, 5, 'virvirvir', 'B11.2021.06900', 'virvirvir', 0, '', '', '', '', '2024-09-01 14:00:28.328', '2024-09-01 14:00:28.328'),
(7, 10, 'Universitas Dian Nuswantoro', 'B11.2021.0691', 'teknik informatika', 0, '', '', '', '', '2024-09-01 14:09:26.780', '2024-09-01 14:09:26.780'),
(8, 11, 'udinus', 'A11.2021.99999', 'teknik informatika', 0, '', '', '', '', '2024-09-01 14:27:38.744', '2024-09-01 14:27:38.744'),
(9, 12, 'udinus', 'a11.2021.139xx', 'teknik informatika', 0, '', '', '', '', '2024-09-01 14:41:46.666', '2024-09-01 14:41:46.666'),
(10, 16, 'udinus', '121454235325', 'TI', 0, '', '', '', '', '2024-09-06 04:30:20.514', '2024-09-06 04:30:20.514');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `status` enum('Pending','Verifying','Accepted','Rejected') NOT NULL DEFAULT 'Pending',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updateAt` datetime(3) NOT NULL,
  `deleteAt` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `status`, `createdAt`, `updateAt`, `deleteAt`) VALUES
(1, 'Yohanes Dimas ', 'dimas@gmail.com', '$2a$10$lKx/9gn/fbUIJaMRP9vCn.RQic.YqRBFWfXX/ZNqb2aWZoMizBWwi', 'Rejected', '2024-09-01 11:57:00.008', '2024-09-12 21:13:54.970', NULL),
(2, 'adsasdsadasdasdasdasd', 'admin@admin.com', '$2a$10$LnzAQAXGTwAV.c0E7fWZjeKoST69MC9Jm1oqDJHNTUiTIA8IXpolW', 'Accepted', '2024-09-01 13:53:16.893', '2024-09-12 20:36:37.805', NULL),
(5, 'virvirvir', 'virvirvir@gmail.com', '$2a$10$XNptwClJxKL.zUqXWsGu9uMEHS76XerbEicWMyOvNb8h3fooslEva', 'Accepted', '2024-09-01 14:00:28.328', '2024-09-12 20:35:42.545', NULL),
(10, 'rizal ', 'rizal@gmail.com', '$2a$10$8mzkruykX1d6BiEMCK5BrOINw5hVdA/veh0kxSBJVxbkG73H7f9cu', 'Rejected', '2024-09-01 14:09:26.780', '2024-09-12 19:36:22.208', NULL),
(11, 'yanto', 'yanto@gmail.com', '$2a$10$EoHaSTMh/tQTl/xss5fu.ubr40CdXsJ7MyPTjzN3.GvSUy9.9GOkq', 'Accepted', '2024-09-01 14:27:38.744', '2024-09-01 14:27:38.744', NULL),
(12, 'simon', 'simon@gmail.com', '$2a$10$GLYwS1id8bxcmFOFH7xkfOTg4V0i9CxLzEjMcQPjGkWMlrdX8F8Yq', 'Verifying', '2024-09-01 14:41:46.666', '2024-09-01 14:41:46.666', NULL),
(16, 'Adi', 'adi@gail.com', '$2a$10$Fjn1Z8MZbBDmYRTwSdEZT.91W0BgisQWNfmP5b1K.YUcGNEr4nTze', 'Pending', '2024-09-06 04:30:20.514', '2024-09-06 04:30:20.514', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vacancies`
--

CREATE TABLE `vacancies` (
  `id` int(11) NOT NULL,
  `name_banner` varchar(191) NOT NULL,
  `banner` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vacancies`
--

INSERT INTO `vacancies` (`id`, `name_banner`, `banner`) VALUES
(1, 'Lowongan', 'C:\\Users\\LENOVO\\OneDrive\\Documents\\prajagamer\\Backend\\src\\uploads\\assets\\1726169843913.png');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('437d3859-0e15-4054-a95d-4fc2e9bdd814', '29ee4450c611748203590c9558f8b4b38837d78f269a57ba569bf7fea5dc0d7e', '2024-09-01 08:37:44.529', '20240901083744_add_roleadmin', NULL, NULL, '2024-09-01 08:37:44.523', 1),
('7b2ea50d-ccd6-41db-bfe5-dbc88450b7a8', '0724b66722ddd6d41950a74507e76d965bb5ba0d229c678b3da44ed47624dd9f', '2024-09-01 07:49:40.840', '20240829142840_create_db_prajagamer', NULL, NULL, '2024-09-01 07:49:40.641', 1),
('8e853778-490c-433e-be8b-c15e11625312', '0ab0e77daa14b7ae1c4bc7a11531c0f8fa2ae6256bafcda1f426f4b25992dfcd', '2024-09-01 07:49:52.144', '20240901074952_updated_adminattribute_and_datatype', NULL, NULL, '2024-09-01 07:49:52.129', 1),
('cb690fb6-9a26-4d67-81b5-7bdd28435f38', 'dfd990b44c224960d236b5b71390c9a3b9674a630aad8fa786874d6b868f7258', '2024-09-01 10:38:16.898', '20240901103816_add_table_vacancies', NULL, NULL, '2024-09-01 10:38:16.880', 1),
('f4c9fc20-3908-4afc-ad76-eb9fa100d6aa', 'ef63e4c841c8609cec50ce6a22c5439e578ca54f557db2ff8480d6ce12a730c4', '2024-09-01 07:49:40.886', '20240831100612_update_role', NULL, NULL, '2024-09-01 07:49:40.842', 1),
('f6d6ac3c-de9d-4e85-9885-ac2cd8e0d37e', '7bee0c625bd16b875b13070d064293a39d49e1e9356a7ef6734282d476d2ac4b', '2024-09-01 07:49:40.904', '20240901074539_create_only', NULL, NULL, '2024-09-01 07:49:40.888', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Admin_email_key` (`email`),
  ADD UNIQUE KEY `Admin_nip_key` (`nip`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Profile_user_id_key` (`user_id`),
  ADD UNIQUE KEY `Profile_nik_key` (`nik`);

--
-- Indexes for table `regist`
--
ALTER TABLE `regist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Regist_user_id_key` (`user_id`);

--
-- Indexes for table `university`
--
ALTER TABLE `university`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `University_user_id_key` (`user_id`),
  ADD UNIQUE KEY `University_nim_key` (`nim`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_name_key` (`name`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `vacancies`
--
ALTER TABLE `vacancies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `regist`
--
ALTER TABLE `regist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `university`
--
ALTER TABLE `university`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `vacancies`
--
ALTER TABLE `vacancies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `profile`
--
ALTER TABLE `profile`
  ADD CONSTRAINT `Profile_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `regist`
--
ALTER TABLE `regist`
  ADD CONSTRAINT `Regist_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `university`
--
ALTER TABLE `university`
  ADD CONSTRAINT `University_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
