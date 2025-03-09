-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: localhost    Database: indistays_web
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accommodation_amenity`
--

DROP TABLE IF EXISTS `accommodation_amenity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accommodation_amenity` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `accommodation_id` bigint unsigned NOT NULL,
  `amenity_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `accommodation_amenity_accommodation_id_amenity_id_unique` (`accommodation_id`,`amenity_id`),
  KEY `accommodation_amenity_amenity_id_foreign` (`amenity_id`),
  CONSTRAINT `accommodation_amenity_accommodation_id_foreign` FOREIGN KEY (`accommodation_id`) REFERENCES `accommodations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `accommodation_amenity_amenity_id_foreign` FOREIGN KEY (`amenity_id`) REFERENCES `amenities` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accommodation_amenity`
--

LOCK TABLES `accommodation_amenity` WRITE;
/*!40000 ALTER TABLE `accommodation_amenity` DISABLE KEYS */;
INSERT INTO `accommodation_amenity` VALUES (27,6,1,NULL,NULL),(28,6,2,NULL,NULL),(29,6,7,NULL,NULL),(30,6,8,NULL,NULL),(31,6,10,NULL,NULL),(32,6,11,NULL,NULL),(33,6,12,NULL,NULL),(34,7,1,NULL,NULL),(35,7,2,NULL,NULL),(36,7,3,NULL,NULL),(37,7,4,NULL,NULL),(38,7,7,NULL,NULL),(39,7,8,NULL,NULL),(40,7,9,NULL,NULL),(41,8,1,NULL,NULL),(42,8,2,NULL,NULL),(43,8,3,NULL,NULL),(44,8,4,NULL,NULL),(45,8,8,NULL,NULL),(46,8,9,NULL,NULL);
/*!40000 ALTER TABLE `accommodation_amenity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accommodations`
--

DROP TABLE IF EXISTS `accommodations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accommodations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,2) DEFAULT '0.00',
  `description` text COLLATE utf8mb4_unicode_ci,
  `camping_id` bigint unsigned DEFAULT NULL,
  `beds_available` decimal(10,2) DEFAULT '0.00',
  `discount_price` decimal(10,2) DEFAULT '0.00',
  `profile_image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `weekend_price` decimal(8,2) DEFAULT '0.00',
  `weekend_discount_price` decimal(8,2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `accommodations_camping_id_foreign` (`camping_id`),
  CONSTRAINT `accommodations_camping_id_foreign` FOREIGN KEY (`camping_id`) REFERENCES `campings` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accommodations`
--

LOCK TABLES `accommodations` WRITE;
/*!40000 ALTER TABLE `accommodations` DISABLE KEYS */;
INSERT INTO `accommodations` VALUES (6,'Camping Tent - Food included',1600.00,NULL,8,20.00,1400.00,'/storage/profile-images/accommodation-profile-6.png','2024-03-03 05:53:43','2024-03-03 08:00:29',1600.00,1400.00),(7,'Superior Double Hut - Food included',3500.00,NULL,8,20.00,3000.00,'/storage/profile-images/accommodation-profile-7.png','2024-03-03 07:37:50','2024-03-03 08:00:02',0.00,0.00),(8,'Lakeview Rooms',6000.00,NULL,9,10.00,4500.00,'/storage/profile-images/accommodation-profile-8.png','2024-03-18 17:10:32','2024-09-13 06:18:08',8000.00,5999.00);
/*!40000 ALTER TABLE `accommodations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `amenities`
--

DROP TABLE IF EXISTS `amenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `amenities` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amenities`
--

LOCK TABLES `amenities` WRITE;
/*!40000 ALTER TABLE `amenities` DISABLE KEYS */;
INSERT INTO `amenities` VALUES (1,'Wi-Fi','/assets/images/amenities/wifi.png','2023-10-14 07:23:33','2023-10-14 07:23:33'),(2,'Air conditioner','/assets/images/amenities/air-conditioner.png','2023-10-14 07:23:33','2023-10-14 07:23:33'),(3,'TV','/assets/images/amenities/monitor.png','2023-10-14 07:23:33','2023-10-14 07:23:33'),(4,'Fan','/assets/images/amenities/fan.png','2023-10-14 07:23:33','2023-10-14 07:23:33'),(5,'Daily housekeeping','/assets/images/amenities/cleaner.png','2023-10-14 07:23:33','2023-10-14 07:23:33'),(6,'Pillow','/assets/images/amenities/pillows.png','2023-10-14 07:23:33','2023-10-14 07:23:33'),(7,'Single bed','/assets/images/amenities/single-bed.png','2023-10-14 07:23:33','2023-10-14 07:23:33'),(8,'Double bed','/assets/images/amenities/double-bed.png','2023-10-14 07:23:33','2023-10-14 07:23:33'),(9,'Blanket','/assets/images/amenities/blanket.png','2023-10-14 07:23:33','2023-10-14 07:23:33'),(10,'Coffee maker','/assets/images/amenities/coffee-cup.png','2023-10-14 07:23:33','2023-10-14 07:23:33'),(11,'Linen','/assets/images/amenities/table-napkin.png','2023-10-14 07:23:33','2023-10-14 07:23:33'),(12,'Electric kettle','/assets/images/amenities/lightning.png','2023-10-14 07:23:33','2023-10-14 07:23:33');
/*!40000 ALTER TABLE `amenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assets`
--

DROP TABLE IF EXISTS `assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `asset_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assets`
--

LOCK TABLES `assets` WRITE;
/*!40000 ALTER TABLE `assets` DISABLE KEYS */;
INSERT INTO `assets` VALUES (1,'Web Banner','website_banner','/storage/images/asset-1.png','2024-01-03 15:20:53','2024-01-03 15:20:53'),(2,'Website Banner','website_banner','/storage/images/asset-2.png','2024-01-03 15:21:13','2024-01-03 15:21:13'),(4,'Mobile Banner','mobile_banner','/storage/images/asset-4.png','2024-01-03 15:21:45','2024-01-03 15:21:45'),(5,'Mobile Banner','mobile_banner','/storage/images/asset-5.png','2024-01-03 15:22:00','2024-01-03 15:22:00'),(7,'Mobile Banner','mobile_banner','/storage/images/asset-7.png','2024-01-05 17:44:07','2024-01-05 17:44:07'),(9,'banner','mobile_banner','/storage/images/asset-9.png','2024-01-05 19:04:50','2024-01-05 19:04:50'),(11,'mobile','mobile_banner','/storage/images/asset-11.png','2024-01-05 19:27:32','2024-01-05 19:27:32'),(17,'Banner','website_banner','/storage/images/asset-17.png','2024-01-06 14:08:54','2024-01-06 14:08:54');
/*!40000 ALTER TABLE `assets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campings`
--

DROP TABLE IF EXISTS `campings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `location_map_link` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `destination_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `campings_destination_id_foreign` (`destination_id`),
  CONSTRAINT `campings_destination_id_foreign` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campings`
--

LOCK TABLES `campings` WRITE;
/*!40000 ALTER TABLE `campings` DISABLE KEYS */;
INSERT INTO `campings` VALUES (8,'Wilson Vally Retreat','<p>Nestled in the lap of the Sahyadri mountain range, Wilson Valley Retreat emerges as a hidden gem in the picturesque landscape of <strong>Bhandardara</strong>. This enchanting retreat offers a perfect blend of tranquility and luxury, making it an ideal destination for those seeking respite from the chaos of city life. </p><p><strong>Location and Surroundings:</strong> Wilson Valley Retreat is strategically located amidst the lush greenery of the Western Ghats, overlooking the pristine waters of Lake Arthur. The sprawling acres of the retreat are surrounded by dense forests, creating a natural barrier that enhances the sense of seclusion and peace. The panoramic views of the valley and the nearby mountains provide a visual treat for the guests, making every moment a postcard-worthy experience. </p><p><strong>Accommodation:</strong> The retreat boasts a range of accommodation options, from cozy cottages to luxurious suites, each designed to offer a harmonious blend of modern comfort and rustic charm. The architecture reflects the local ethos, with thatched roofs and wooden accents that seamlessly integrate with the natural surroundings. Every room is thoughtfully designed to maximize the views, allowing guests to wake up to the sight of mist-covered mountains or the gentle ripples of Lake Arthur. </p><p><strong>Dining Experience:</strong> At Wilson Valley Retreat, gastronomic delights are crafted to perfection, drawing inspiration from the rich culinary traditions of the region. The in-house restaurant serves a delectable array of local and international cuisines, prepared with fresh, locally-sourced ingredients. Guests can enjoy their meals in an open-air setting, surrounded by the soothing sounds of nature. </p><p><strong>Activities and Recreation:</strong> For those seeking adventure, Wilson Valley Retreat offers a range of outdoor activities. Guided nature walks take guests through the enchanting trails surrounding the retreat, allowing them to connect with the biodiversity of the region. Boating on Lake Arthur, fishing excursions, and bird watching expeditions are also available for nature enthusiasts. For a more laid-back experience, the retreat provides yoga sessions and spa facilities to rejuvenate the mind, body, and soul. </p><p><strong>Community and Sustainability:</strong> Wilson Valley Retreat is committed to sustainable and responsible tourism. The retreat actively engages with the local community, promoting cultural exchanges and supporting local artisans. The property is designed with eco-friendly practices in mind, ensuring minimal environmental impact while offering guests a chance to immerse themselves in the beauty of nature.</p>','5 km from shendi forest tollpost, Panjare, Bhandardara, Maharashtra 422604','<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3759.6989788870565!2d73.7301801!3d19.554533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd77b132744e0d%3A0x5efca1315b90e4b6!2sWilson%20Valley%20Retreat!5e0!3m2!1sen!2sin!4v1709396308677!5m2!1sen!2sin\" style=\"border:0;\" allowfullscreen=\"\" width=\"100%\" height=\"100%\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>','/storage/profile-images/camping-profile-8.png',11,'2024-03-02 16:26:00','2024-03-03 05:46:36'),(9,'Niwanta Stays','<p><strong>Niwanta Stays</strong> is a lakefront property which gives a immense pleasure to enjoy nature’s beauty at doorstep. they also serves fingerlicking veg &amp; nonveg food. Seafood options are also available.</p>','Hotel Niwanta, near murshet village, 4 km from shendi forest tollpost, shendi, Tal.- akole, Dist.- Ahilyanagar.','<iframe src=\"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3759.8449950461163!2d73.7285466!3d19.5482672!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd77ab959d4465%3A0x12226bbdca58356e!2sHotel%20NIVANTA%20Bhandardara!5e0!3m2!1sen!2sin!4v1716626027080!5m2!1sen!2sin\" width=\"200\" height=\"200\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>','/storage/profile-images/camping-profile-9.png',11,'2024-03-18 17:07:03','2024-05-25 08:34:22');
/*!40000 ALTER TABLE `campings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `custom_bookings`
--

DROP TABLE IF EXISTS `custom_bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `custom_bookings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `accommodation_id` bigint unsigned DEFAULT NULL,
  `beds` int NOT NULL DEFAULT '0',
  `booking_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_number` bigint unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `custom_bookings_accommodation_id_foreign` (`accommodation_id`),
  CONSTRAINT `custom_bookings_accommodation_id_foreign` FOREIGN KEY (`accommodation_id`) REFERENCES `accommodations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `custom_bookings`
--

LOCK TABLES `custom_bookings` WRITE;
/*!40000 ALTER TABLE `custom_bookings` DISABLE KEYS */;
INSERT INTO `custom_bookings` VALUES (41,'2024-06-12','2024-06-14','2024-06-13 06:23:55','2024-06-13 06:23:55',7,1,3000.00,'manishavoc@gmail.com','manish',7400316456),(42,'2024-07-10','2024-07-14','2024-07-12 16:46:06','2024-07-12 16:46:06',7,1,3000.00,'siddharthb1616@gmail.com','Sidd',8975761559),(43,'2024-08-15','2024-08-16','2024-07-25 17:47:19','2024-07-25 17:47:19',8,1,4500.00,'amoldpagare@gmail.com','Amol',9850066708),(44,'2024-08-09','2024-08-10','2024-08-08 17:49:38','2024-08-08 17:49:38',6,2,1400.00,'avinashmali22@gmail.com','Avinash',9594494774),(45,'2024-08-16','2024-08-17','2024-08-16 14:25:27','2024-08-16 14:25:27',7,2,3000.00,'dhirajp688@gmail.com','Dhiraj Patil',9724341849),(46,'2024-08-23','2024-08-25','2024-08-24 09:40:41','2024-08-24 09:40:41',7,2,3000.00,'rajrocker674@gmail.com','Raj patel',8866324059),(47,'2024-10-05','2024-10-09','2024-10-07 09:09:23','2024-10-07 09:09:23',6,1,1400.00,'ggg@yahoo.com','Ggg',7777777777),(48,'2024-10-09','2024-10-13','2024-10-11 16:00:26','2024-10-11 16:00:26',6,1,1400.00,'fjdh@gmail.com','Nxnxhd',8452751554),(49,'2024-10-31','2024-11-01','2024-10-29 10:46:44','2024-10-29 10:46:44',7,1,3000.00,'pal_yeshi@yahoo.com','Yolmo',9108871002),(50,'2024-11-22','2024-11-25','2024-11-04 10:41:29','2024-11-04 10:41:29',8,10,4500.00,'sdvcd@gmail.com','dsv',9207512235),(51,'2024-11-09','2024-11-13','2024-11-11 05:50:40','2024-11-11 05:50:40',6,5,1400.00,'xgkxkxgc@gmail.com','jfsitzjfz',5665567712),(52,'2024-11-09','2024-11-13','2024-11-11 12:46:31','2024-11-11 12:46:31',8,1,4500.00,'cgh@gmail.com','Ghg',8667578907),(53,'2024-11-09','2024-11-13','2024-11-11 16:41:11','2024-11-11 16:41:11',6,1,1400.00,'asf@gmail.co','SSSS',9718262525),(54,'2024-11-18','2024-11-22','2024-11-20 07:52:54','2024-11-20 07:52:54',6,1,1400.00,'hv@gmail.com','nb',6748768476),(55,'2024-11-20','2024-11-24','2024-11-22 12:19:15','2024-11-22 12:19:15',7,1,3000.00,'justforfun14728@gmail.com','Sujan Ghimire',9812345678),(56,'2024-11-26','2024-11-30','2024-11-28 14:12:03','2024-11-28 14:12:03',6,2,1400.00,'vermasaksham100@gmail.com','Sakshm',7876171479),(57,'2024-12-06','2024-12-10','2024-12-08 22:30:39','2024-12-08 22:30:39',7,1,3000.00,'bb@g.com','Hhh',9444444444),(58,'2024-12-07','2024-12-11','2024-12-09 01:55:13','2024-12-09 01:55:13',6,2,1400.00,'abcd@gmail.com','Get',5642267532),(59,'2024-12-08','2024-12-12','2024-12-10 03:54:11','2024-12-10 03:54:11',6,3,1400.00,'test@gmail.com','test',9876543218),(60,'2024-12-09','2024-12-13','2024-12-11 11:00:56','2024-12-11 11:00:56',6,2,1400.00,'hanzlasib@gmail.com','jjj',9565334555),(61,'2024-12-19','2024-12-23','2024-12-20 20:41:55','2024-12-20 20:41:55',6,1,1400.00,'heueu@mail.com','Jrue',9913402367),(62,'2024-12-21','2024-12-25','2024-12-23 04:52:32','2024-12-23 04:52:32',6,2,1400.00,'mm@test.com','mm',9123131111),(63,'2024-12-23','2024-12-27','2024-12-25 18:00:46','2024-12-25 18:00:46',8,1,4500.00,'coco@gmail.com','Goals',9966393929),(64,'2024-12-26','2024-12-30','2024-12-28 04:09:57','2024-12-28 04:09:57',7,1,3000.00,'admin@gmail.com','admin',1235678990),(65,'2024-12-28','2024-12-29','2024-12-28 16:58:32','2024-12-28 16:58:32',7,1,3000.00,'pranitlakde@yahoo.in','Pranit',8898583373),(66,'2025-01-01','2025-01-03','2024-12-29 21:19:23','2024-12-29 21:19:23',6,3,1400.00,'john@gmail.com','johndoe',1231233333),(67,'2025-01-10','2025-01-11','2025-01-02 09:43:01','2025-01-02 09:43:01',7,2,3000.00,'rothesuraj04@gmail.com','Suraj',9527103905),(68,'2025-01-19','2025-01-23','2025-01-21 09:04:32','2025-01-21 09:04:32',6,1,1400.00,'kkkk@gmail.com','kkkk',4545645464),(69,'2025-02-15','2025-02-19','2025-02-17 11:13:16','2025-02-17 11:13:16',6,1,1400.00,'jiu@gmail.com','dfdf',3243243243);
/*!40000 ALTER TABLE `custom_bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `custom_pricings`
--

DROP TABLE IF EXISTS `custom_pricings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `custom_pricings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `price` decimal(8,2) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `discount_price` decimal(8,2) NOT NULL,
  `accommodation_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `custom_pricings_accommodation_id_foreign` (`accommodation_id`),
  CONSTRAINT `custom_pricings_accommodation_id_foreign` FOREIGN KEY (`accommodation_id`) REFERENCES `accommodations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `custom_pricings`
--

LOCK TABLES `custom_pricings` WRITE;
/*!40000 ALTER TABLE `custom_pricings` DISABLE KEYS */;
/*!40000 ALTER TABLE `custom_pricings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_reviews`
--

DROP TABLE IF EXISTS `customer_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_reviews` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `review` text COLLATE utf8mb4_unicode_ci,
  `ratings` decimal(10,2) DEFAULT '0.00',
  `camping_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_reviews_camping_id_foreign` (`camping_id`),
  CONSTRAINT `customer_reviews_camping_id_foreign` FOREIGN KEY (`camping_id`) REFERENCES `campings` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_reviews`
--

LOCK TABLES `customer_reviews` WRITE;
/*!40000 ALTER TABLE `customer_reviews` DISABLE KEYS */;
INSERT INTO `customer_reviews` VALUES (7,'Best Camping Experience',5.00,8,'2024-03-03 07:40:28','2024-03-03 07:40:28'),(8,'best location.',5.00,9,'2024-03-18 17:15:40','2024-03-18 17:15:40'),(9,'good one',5.00,9,'2024-03-18 17:15:53','2024-03-18 17:15:53'),(10,'good one',5.00,9,'2024-03-18 17:15:53','2024-03-18 17:15:53'),(11,'good one',5.00,9,'2024-03-18 17:15:53','2024-03-18 17:15:53'),(12,'Very bad',1.00,8,'2024-11-11 05:50:13','2024-11-11 05:50:13'),(13,'er',1.00,8,'2024-11-22 14:19:48','2024-11-22 14:19:48'),(14,'Worst experience',1.00,8,'2025-01-30 16:08:49','2025-01-30 16:08:49'),(15,'AC doesn\'t work properly',1.00,8,'2025-01-30 16:09:34','2025-01-30 16:09:34'),(16,'Not good',1.00,8,'2025-01-30 16:10:13','2025-01-30 16:10:13'),(17,'Ok ok',1.00,8,'2025-01-30 16:10:29','2025-01-30 16:10:29'),(18,'Tumchya aichi',1.00,8,'2025-01-30 16:10:52','2025-01-30 16:10:52'),(19,'0 star',1.00,9,'2025-01-30 16:11:27','2025-01-30 16:11:27'),(20,'Haule',1.00,9,'2025-01-30 16:11:54','2025-01-30 16:11:54'),(21,'Aand',1.00,9,'2025-01-30 16:12:02','2025-01-30 16:12:02'),(22,'Whaat',1.00,9,'2025-01-30 16:12:07','2025-01-30 16:12:07'),(23,'Make better website',1.00,9,'2025-01-30 16:12:17','2025-01-30 16:12:17'),(24,'Fake reviews',1.00,9,'2025-01-30 16:12:43','2025-01-30 16:12:43'),(25,'Yanga pode',1.00,9,'2025-01-30 16:12:52','2025-01-30 16:12:52'),(26,'Missal anna',1.00,9,'2025-01-30 16:13:00','2025-01-30 16:13:00'),(27,'Ooo ma goo',1.00,9,'2025-01-30 16:13:11','2025-01-30 16:13:11');
/*!40000 ALTER TABLE `customer_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `destinations`
--

DROP TABLE IF EXISTS `destinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `destinations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destinations`
--

LOCK TABLES `destinations` WRITE;
/*!40000 ALTER TABLE `destinations` DISABLE KEYS */;
INSERT INTO `destinations` VALUES (11,'Bhandardara','Bhandardara, nestled in the Sahyadri mountain range of Maharashtra, India, is a serene and picturesque destination. Known for its stunning landscapes, it features a tranquil lake surrounded by lush greenery and hills. The Wilson Dam, Arthur Lake, and Randha Falls add to the natural beauty, attracting nature enthusiasts and trekkers. The pristine environment and cool climate make it an ideal retreat, offering a peaceful escape from the hustle and bustle of city life.','/storage/profile-images/destination-profile-11.png','2024-02-16 08:16:53','2024-03-02 16:09:29');
/*!40000 ALTER TABLE `destinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enquiries`
--

DROP TABLE IF EXISTS `enquiries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enquiries` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lead_source` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquiries`
--

LOCK TABLES `enquiries` WRITE;
/*!40000 ALTER TABLE `enquiries` DISABLE KEYS */;
INSERT INTO `enquiries` VALUES (1,'shubham','shubhammandlik25@gmail.com','8788707579','Social Media','2023-12-10 11:30:43','2023-12-10 11:30:43'),(2,'Aashish Bhagwat','aashishbhagwat4u@gmail.com','8208690072','Social Media','2024-01-19 15:34:58','2024-01-19 15:34:58'),(3,'Yolmo','pal_yeshi@yahoo.com','9108871002','Social Media','2024-10-29 10:42:41','2024-10-29 10:42:41');
/*!40000 ALTER TABLE `enquiries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_profile_image` tinyint(1) NOT NULL DEFAULT '0',
  `imageable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageable_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `images_imageable_type_imageable_id_index` (`imageable_type`,`imageable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (41,'/storage/images/destination-5-0.png',0,'App\\Models\\Destination',5,'2023-11-18 07:35:25','2023-11-18 07:35:25'),(42,'/storage/images/destination-5-1.png',0,'App\\Models\\Destination',5,'2023-11-18 07:35:25','2023-11-18 07:35:25'),(43,'/storage/images/destination-5-2.png',0,'App\\Models\\Destination',5,'2023-11-18 07:35:25','2023-11-18 07:35:25'),(44,'/storage/images/destination-5-3.png',0,'App\\Models\\Destination',5,'2023-11-18 07:35:25','2023-11-18 07:35:25'),(45,'/storage/images/destination-5-4.png',0,'App\\Models\\Destination',5,'2023-11-18 07:35:25','2023-11-18 07:35:25'),(46,'/storage/images/destination-6-0.png',0,'App\\Models\\Destination',6,'2023-11-18 07:36:50','2023-11-18 07:36:50'),(47,'/storage/images/destination-6-1.png',0,'App\\Models\\Destination',6,'2023-11-18 07:36:50','2023-11-18 07:36:50'),(48,'/storage/images/destination-6-2.png',0,'App\\Models\\Destination',6,'2023-11-18 07:36:50','2023-11-18 07:36:50'),(49,'/storage/images/destination-6-3.png',0,'App\\Models\\Destination',6,'2023-11-18 07:36:50','2023-11-18 07:36:50'),(50,'/storage/images/destination-6-4.png',0,'App\\Models\\Destination',6,'2023-11-18 07:36:50','2023-11-18 07:36:50'),(51,'/storage/images/destination-7-0.png',0,'App\\Models\\Destination',7,'2023-11-18 07:38:24','2023-11-18 07:38:24'),(52,'/storage/images/destination-7-1.png',0,'App\\Models\\Destination',7,'2023-11-18 07:38:24','2023-11-18 07:38:24'),(53,'/storage/images/destination-7-2.png',0,'App\\Models\\Destination',7,'2023-11-18 07:38:24','2023-11-18 07:38:24'),(54,'/storage/images/destination-7-3.png',0,'App\\Models\\Destination',7,'2023-11-18 07:38:24','2023-11-18 07:38:24'),(55,'/storage/images/destination-7-4.png',0,'App\\Models\\Destination',7,'2023-11-18 07:38:24','2023-11-18 07:38:24'),(56,'/storage/images/destination-8-0.png',0,'App\\Models\\Destination',8,'2023-11-18 07:40:22','2023-11-18 07:40:22'),(57,'/storage/images/destination-8-1.png',0,'App\\Models\\Destination',8,'2023-11-18 07:40:22','2023-11-18 07:40:22'),(58,'/storage/images/destination-8-2.png',0,'App\\Models\\Destination',8,'2023-11-18 07:40:22','2023-11-18 07:40:22'),(59,'/storage/images/destination-8-3.png',0,'App\\Models\\Destination',8,'2023-11-18 07:40:22','2023-11-18 07:40:22'),(60,'/storage/images/destination-8-4.png',0,'App\\Models\\Destination',8,'2023-11-18 07:40:22','2023-11-18 07:40:22'),(71,'/storage/images/camping-5-0.png',0,'App\\Models\\Camping',5,'2023-11-18 07:45:14','2023-11-18 07:45:14'),(72,'/storage/images/camping-5-1.png',0,'App\\Models\\Camping',5,'2023-11-18 07:45:14','2023-11-18 07:45:14'),(73,'/storage/images/camping-5-2.png',0,'App\\Models\\Camping',5,'2023-11-18 07:45:14','2023-11-18 07:45:14'),(74,'/storage/images/camping-5-3.png',0,'App\\Models\\Camping',5,'2023-11-18 07:45:14','2023-11-18 07:45:14'),(75,'/storage/images/camping-5-4.png',0,'App\\Models\\Camping',5,'2023-11-18 07:45:14','2023-11-18 07:45:14'),(76,'/storage/images/camping-6-0.png',0,'App\\Models\\Camping',6,'2023-11-18 07:47:04','2023-11-18 07:47:04'),(77,'/storage/images/camping-6-1.png',0,'App\\Models\\Camping',6,'2023-11-18 07:47:04','2023-11-18 07:47:04'),(78,'/storage/images/camping-6-2.png',0,'App\\Models\\Camping',6,'2023-11-18 07:47:04','2023-11-18 07:47:04'),(79,'/storage/images/camping-6-3.png',0,'App\\Models\\Camping',6,'2023-11-18 07:47:04','2023-11-18 07:47:04'),(80,'/storage/images/camping-6-4.png',0,'App\\Models\\Camping',6,'2023-11-18 07:47:04','2023-11-18 07:47:04'),(81,'/storage/images/camping-7-0.png',0,'App\\Models\\Camping',7,'2023-11-18 07:48:34','2023-11-18 07:48:34'),(82,'/storage/images/camping-7-1.png',0,'App\\Models\\Camping',7,'2023-11-18 07:48:34','2023-11-18 07:48:34'),(83,'/storage/images/camping-7-2.png',0,'App\\Models\\Camping',7,'2023-11-18 07:48:34','2023-11-18 07:48:34'),(84,'/storage/images/camping-7-3.png',0,'App\\Models\\Camping',7,'2023-11-18 07:48:34','2023-11-18 07:48:34'),(85,'/storage/images/camping-7-4.png',0,'App\\Models\\Camping',7,'2023-11-18 07:48:34','2023-11-18 07:48:34'),(101,'/storage/images/destination-9-0.png',0,'App\\Models\\Destination',9,'2024-02-15 11:32:44','2024-02-15 11:32:44'),(102,'/storage/images/destination-9-1.png',0,'App\\Models\\Destination',9,'2024-02-15 11:32:44','2024-02-15 11:32:44'),(103,'/storage/images/destination-9-2.png',0,'App\\Models\\Destination',9,'2024-02-15 11:32:44','2024-02-15 11:32:44'),(104,'/storage/images/destination-9-3.png',0,'App\\Models\\Destination',9,'2024-02-15 11:32:44','2024-02-15 11:32:44'),(105,'/storage/images/destination-9-4.png',0,'App\\Models\\Destination',9,'2024-02-15 11:32:44','2024-02-15 11:32:44'),(111,'/storage/images/destination-11-0.png',0,'App\\Models\\Destination',11,'2024-02-16 08:16:53','2024-02-16 08:16:53'),(112,'/storage/images/destination-11-1.png',0,'App\\Models\\Destination',11,'2024-02-16 08:16:53','2024-02-16 08:16:53'),(113,'/storage/images/destination-11-2.png',0,'App\\Models\\Destination',11,'2024-02-16 08:16:53','2024-02-16 08:16:53'),(114,'/storage/images/destination-11-3.png',0,'App\\Models\\Destination',11,'2024-02-16 08:16:53','2024-02-16 08:16:53'),(115,'/storage/images/destination-11-4.png',0,'App\\Models\\Destination',11,'2024-02-16 08:16:53','2024-02-16 08:16:53'),(116,'/storage/images/camping-8-0.png',0,'App\\Models\\Camping',8,'2024-03-02 16:26:00','2024-03-02 16:26:00'),(117,'/storage/images/camping-8-1.png',0,'App\\Models\\Camping',8,'2024-03-02 16:26:00','2024-03-02 16:26:00'),(118,'/storage/images/camping-8-2.png',0,'App\\Models\\Camping',8,'2024-03-02 16:26:00','2024-03-02 16:26:00'),(119,'/storage/images/camping-8-3.png',0,'App\\Models\\Camping',8,'2024-03-02 16:26:00','2024-03-02 16:26:00'),(120,'/storage/images/camping-8-4.png',0,'App\\Models\\Camping',8,'2024-03-02 16:26:00','2024-03-02 16:26:00'),(121,'/storage/images/accommodation-6-0.png',0,'App\\Models\\Accommodation',6,'2024-03-03 05:53:43','2024-03-03 05:53:43'),(122,'/storage/images/accommodation-6-1.png',0,'App\\Models\\Accommodation',6,'2024-03-03 05:53:43','2024-03-03 05:53:43'),(123,'/storage/images/accommodation-6-2.png',0,'App\\Models\\Accommodation',6,'2024-03-03 05:53:43','2024-03-03 05:53:43'),(124,'/storage/images/accommodation-6-3.png',0,'App\\Models\\Accommodation',6,'2024-03-03 05:53:43','2024-03-03 05:53:43'),(125,'/storage/images/accommodation-6-4.png',0,'App\\Models\\Accommodation',6,'2024-03-03 05:53:43','2024-03-03 05:53:43'),(126,'/storage/images/accommodation-7-0.png',0,'App\\Models\\Accommodation',7,'2024-03-03 07:37:50','2024-03-03 07:37:50'),(127,'/storage/images/accommodation-7-1.png',0,'App\\Models\\Accommodation',7,'2024-03-03 07:37:50','2024-03-03 07:37:50'),(128,'/storage/images/accommodation-7-2.png',0,'App\\Models\\Accommodation',7,'2024-03-03 07:37:50','2024-03-03 07:37:50'),(129,'/storage/images/accommodation-7-3.png',0,'App\\Models\\Accommodation',7,'2024-03-03 07:37:50','2024-03-03 07:37:50'),(130,'/storage/images/accommodation-7-4.png',0,'App\\Models\\Accommodation',7,'2024-03-03 07:37:50','2024-03-03 07:37:50'),(131,'/storage/images/camping-9-0.png',0,'App\\Models\\Camping',9,'2024-03-18 17:07:03','2024-03-18 17:07:03'),(132,'/storage/images/camping-9-1.png',0,'App\\Models\\Camping',9,'2024-03-18 17:07:03','2024-03-18 17:07:03'),(133,'/storage/images/camping-9-2.png',0,'App\\Models\\Camping',9,'2024-03-18 17:07:03','2024-03-18 17:07:03'),(134,'/storage/images/camping-9-3.png',0,'App\\Models\\Camping',9,'2024-03-18 17:07:03','2024-03-18 17:07:03'),(135,'/storage/images/camping-9-4.png',0,'App\\Models\\Camping',9,'2024-03-18 17:07:03','2024-03-18 17:07:03');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_reset_tokens_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2019_12_14_000001_create_personal_access_tokens_table',1),(5,'2023_08_28_152956_create_user_roles_table',1),(6,'2023_08_29_175708_create_destinations_table',1),(7,'2023_08_29_175715_create_campings_table',1),(8,'2023_08_29_175731_create_accommodations_table',1),(9,'2023_08_29_175751_create_custom_pricings_table',1),(10,'2023_08_29_175811_create_custom_bookings_table',1),(11,'2023_08_29_175826_create_amenities_table',1),(12,'2023_08_29_190117_create_images_table',1),(13,'2023_08_31_163430_add_role_column_users_table',1),(14,'2023_09_13_164925_create_accommodation_amenity_table',1),(15,'2023_09_24_161505_add_columns_to_custom_pricings',1),(16,'2023_09_24_161940_remove_camping_id_from_custom_bookings',1),(17,'2023_09_24_162020_add_accommodation_id_to_custom_bookings',1),(18,'2023_09_28_085245_add_beds_and_price_to_custom_bookings',1),(19,'2023_11_16_062624_add_column_to_custom_bookings_table',2),(20,'2023_11_18_145407_create_enquiry_table',3),(21,'2023_12_10_071746_add_columns_to_accommodations_table',4),(22,'2024_01_03_093902_create_assets_table',5),(23,'2024_01_04_074520_create_customer_reviews_table',6);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,'admin','2023-10-14 07:23:32','2023-10-14 07:23:32'),(2,'customer','2023-10-14 07:23:32','2023-10-14 07:23:32');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_role_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_user_role_id_foreign` (`user_role_id`),
  CONSTRAINT `users_user_role_id_foreign` FOREIGN KEY (`user_role_id`) REFERENCES `user_roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'My Admin','admin@indistays.com','2023-10-14 07:23:33','$2y$10$wiQHnX9m7cPhnSye64ofk.ji./8NEScZ7wEDQTAgcabIclTDveMuS','Q6315M8KCa','2023-10-14 07:23:33','2023-10-14 07:23:33',1),(2,'My Customer','customer@indistays.com','2023-10-14 07:23:33','$2y$10$PqEovRePAhbYMXtFU84rZu8ypPzNkDodzHwoa.VSyTXSZUuDfC7xO','QnqJrZHe8h','2023-10-14 07:23:33','2023-10-14 07:23:33',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-09  5:48:03
