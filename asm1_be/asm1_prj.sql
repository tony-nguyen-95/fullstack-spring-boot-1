-- MySQL dump 10.13  Distrib 8.0.20, for macos10.15 (x86_64)
--
-- Host: localhost    Database: asm1_prj
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `tour_id` int DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(20) DEFAULT 'pending',
  `adults` int DEFAULT NULL,
  `children` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (2,11,1,'2024-09-08 12:08:38','pending',1,0),(3,11,3,'2024-09-09 09:12:43','pending',2,3),(4,14,3,'2024-09-11 09:00:29','pending',2,4);
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  `text` text,
  `rate` int DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,10,3,'Great!',5,'2024-09-11 07:46:23'),(2,11,3,'Alo Alo!',4,'2024-09-11 08:23:53'),(3,11,2,'Great!',5,'2024-09-11 08:29:23'),(4,11,2,'Amazing!!',4,'2024-09-11 08:31:20'),(5,14,3,'123123',3,'2024-09-11 09:00:19');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `people`
--

DROP TABLE IF EXISTS `people`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `people` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `people`
--

LOCK TABLES `people` WRITE;
/*!40000 ALTER TABLE `people` DISABLE KEYS */;
/*!40000 ALTER TABLE `people` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (2,'Top things to do in Da Lat','/images/bg_3.jpg','<h2>Hidden away in the Central Highlands, Da Lat plays the cooler cousin to Vietnam\'s seaside destinations. Famous for its countryside charm, Da Lat draws couples, wellness seekers and outdoor enthusiasts. This mountain resort town was once a summer getaway for the French, who left their mark in the European-inspired architecture and countless lakes. Da Lat\'s main lake is the centre of the action, but amazing natural wonders await in the hills all around.</h2><h4><i>Click the image below for a 360-degree tour of Đà Lạt</i></h4><p><a href=\"https://vietnam.travel/sites/default/files/360Tour/DaLat/index.htm\"><img src=\"https://vietnam.travel/sites/default/files/360Tour/DaLat/socialThumbnail2.jpg\" width=\"629\" height=\"354\"></a></p><h3><strong>Top things to do in </strong>Da Lat</h3><p><strong>Tour the city\'s landmarks&nbsp;</strong></p><p>Xuan Huong Lake is the focal point of Da Lat city. Nearby, the stalls of the central market are packed with fresh flowers and colourful produce. Colonial architecture abounds in churches, art-deco hotels, and the charming railway station.</p><p><strong>Play a round of golf&nbsp;</strong></p><p>At 5,000 feet above sea level, Da Lat’s golf clubs feature hilly terrains and pine forests. Da Lat is home to one of the country’s oldest courses, the Dalat Palace Golf Club. Opened in 1933, the 18-hole course remains an iconic experience.</p><p><strong>Hike, bike, or find a waterfall</strong></p><p>Da Lat is an adventure destination in its own right. The dramatic terrain lends itself well to hiking, mountain biking and canyoning. Follow local guides to explore Bidoup Nui Ba National Park, or blaze your own trails on Lang Biang mountain.</p><p><strong>Sample local coffee culture</strong></p><p>Coffee is an integral part of Da Lat’s heritage and some of Vietnam’s best coffee is grown on the slopes around the town and served in local cafes. Visit K’Ho Coffee for a full tour of their sustainable farm and roastery.</p><p><strong>Ride the train</strong></p><p>Though Da Lat\'s tracks no longer link up with Vietnam\'s north-south railway line, you can hop on a train out to Trai Mat for a visit to the spectacular, mosaic-covered Linh Phuoc Pagoda, taking in the scenery en route.</p>','2024-09-11 04:16:45'),(3,'12 traditional Vietnamese','/images/bg_4.jpg','<h2>Discover a cultural concoction of manic markets, specialist streets, designer boutiques and cycling vendors. In Hanoi\'s Old Quarter,&nbsp;you\'ll come across&nbsp;everything from tribal textiles to shoes, coffee to crafts, paintings to specialty foods. Gentle haggling&nbsp;is&nbsp;part of the fun. Take a piece of the experience home in these traditional gifts.&nbsp;</h2><p>&nbsp;</p><h3><strong>Tribal Textiles</strong></h3><p><img src=\"https://vietnam.travel/sites/default/files/inline-images/top%20souvenirs%20in%20Vietnam-7.jpg\" alt=\"Vietnam Traditional Souvenirs\" width=\"870\" height=\"580\"></p><p>A Cham woman weaves using an elaborate loom in Chau Doc.</p><p>Tribal textiles are prized possessions for tourists in Vietnam as the opportunity to see and buy such uniquely exquisite, hand-stitched craftsmanship is a rare luxury to those visiting from the West. &nbsp;Vietnam has a rich variety of&nbsp;ethnic groups&nbsp;(especially in the north) that relatively still makes their livings the same way today as they have done for hundreds of years. Buying authentic textiles from recognised dealers helps to keep their way of life and artistic skills alive. Fabrics typically start from 15 USD.</p><h3><strong>Propaganda Posters</strong></h3><p>Propaganda posters &amp; prints are everywhere in Hanoi. Plaster your walls with bold graphic memories of Vietnam’s political ideology and patriotic nationalist past. You can pick up a colourful piece of history for as little as 7 USD.</p><h3><strong>Chopsticks</strong></h3><p><img src=\"https://vietnam.travel/sites/default/files/inline-images/traditional%20vietnamese%20souvenirs-6.jpg\" alt=\"good things to buy in vietnam\" width=\"870\" height=\"580\"></p><p>Pretty and practical, chopsticks make for an excellent souvenir or gift.</p><p>When you return home from your Vietnamese adventures, a set of chopsticks will probably be the cheapest, yet most iconic reminder of all those delicious, piping hot bowls of <i>phở</i> and <i>bún chả </i>you ate on your journey. Starting at 1 USD per pair.</p><h3><strong>Silk Products</strong></h3><p><img src=\"https://vietnam.travel/sites/default/files/inline-images/top%20souvenirs%20in%20Vietnam-5.jpg\" alt=\"traditional souvenirs of vietnam\" width=\"870\" height=\"580\"></p><p>Silk products are some of the easiest to find in Vietnam.</p><p>Silk products are available in most stores around the Old Quarter in Hanoi. Everything from sleeping bag liners to dressing gowns to<i> áo dàis </i>can be bought for very reasonable prices, but the best place to buy authentic Vietnamese silk is on Hang Gai street (Silk Street) where you will find tailor shops stacked sky high with a rainbow selection of silks ready to be sewn into a design of your choice, at 10 USD per meter. &nbsp;</p><h3><strong>Vietnamese Coffee</strong></h3><p><img src=\"https://vietnam.travel/sites/default/files/inline-images/top%20souvenirs%20in%20Vietnam-4.jpg\" alt=\"Vietnam Traditional Souvenirs\" width=\"870\" height=\"580\"></p><p>Fine Vietnamese coffee is always worth it, find the best beans in Da Lat or Buon Ma Thuot.</p><p>Vietnamese coffee is what most tourists would probably write home about. <i>Cà phê đá </i>(black coffee), <i>cà phê sua đá </i>(coffee with sweet milk), <i>cà phê sữa chua</i> (yoghurt coffee), <i>cà phê trứng </i>(egg coffee)... the delectable list of caffeinated beverages just goes on and on. Vietnam is the world’s largest exporter of Robusta coffee and they sure know how to make the most of it. You can pick up a single-cup filter (<i>phin cà phê</i>) and bag of local coffee for just 5 USD.</p><h3><strong>Paper Lanterns</strong></h3><p><img src=\"https://vietnam.travel/sites/default/files/inline-images/top%20souvenirs%20in%20Vietnam-6.jpg\" alt=\"good things to buy in vietnam\" width=\"870\" height=\"580\"></p><p>Paper, silk and bamboo lanterns are around every corner in Hoi An Ancient Town.&nbsp;</p><p>Paper lanterns are never ever a bad idea. Flat, packable and ready-to-go, these traditional lanterns will add a touch of sensual Vietnamese style to any garden or bedroom and are available in a spectrum of spectacular colours and materials from 4 USD. Go for the silk variety if you’re feeling indulgent.</p><h3><strong>Traditional&nbsp;Dó paper</strong></h3><p>Dó paper is handmade paper produced from the bark of the <i>Rhamnoneuron Balansae </i>tree. Traditionally, Vietnamese <i>Đông Hồ </i>paintings depicting ages-old folklore were printed on sheet of dó. This charming artistic process truly encapsulates Vietnam’s history, imagination and craftsmanship. Prices vary depending on the print.</p><h3><strong>Áo D</strong>ài</h3><p><img src=\"https://vietnam.travel/sites/default/files/inline-images/traditional%20vietnamese%20souvenirs-4.jpg\" alt=\"what to buy in Vietnam\" width=\"870\" height=\"580\"></p><p>The&nbsp;<i>áo dài&nbsp;</i>is a timeless symbol of Vietnam, and can be spotted everywhere during Vietnamese holidays.</p><p>The <i>áo dài</i> is a national symbol of traditional Vietnamese beauty, femininity and sophistication, especially in Hanoi. The elegant tunic consists of long sleeves, stand collar and side seam slits up to the waist and is usually worn with palazzo-style pants. Vietnamese women can be seen wearing<i> áo dàis </i>on a daily basis in Hanoi, but it is most popular at weddings and around Tet holiday (Vietnamese New Year). The dress shirt and pants combo start at 25 USD per set.</p>','2024-09-11 05:02:01');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rate`
--

DROP TABLE IF EXISTS `rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rate` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  `rate` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rate`
--

LOCK TABLES `rate` WRITE;
/*!40000 ALTER TABLE `rate` DISABLE KEYS */;
/*!40000 ALTER TABLE `rate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'user'),(2,'admin');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour`
--

DROP TABLE IF EXISTS `tour`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tour` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text,
  `start_date` date DEFAULT NULL,
  `duration_day` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `place` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour`
--

LOCK TABLES `tour` WRITE;
/*!40000 ALTER TABLE `tour` DISABLE KEYS */;
INSERT INTO `tour` VALUES (1,'Tour to Da Lat','/images/room-1.jpg','<p><strong>Tour 1: Discovery Da Lat (3 Days 3 Nights)</strong></p><p><strong>Day 1:</strong></p><ul><li><strong>Night Departure:</strong> Begin your journey to Da Lat.</li><li><strong>Morning Arrival:</strong> Breakfast in Da Lat.</li><li><strong>Morning Activities:</strong> Visit Linh Phuoc Pagoda, explore Da Lat Railway Station.</li><li><strong>Lunch:</strong> Enjoy local cuisine.</li><li><strong>Afternoon Activities:</strong> Discover Valley of Love, walk around Da Lat Flower Gardens.</li><li><strong>Dinner:</strong> Check-in and dinner at a local restaurant.</li></ul><p><strong>Day 2:</strong></p><ul><li><strong>Morning:</strong> Visit Trúc Lâm Zen Monastery, experience Datanla Waterfall.</li><li><strong>Lunch:</strong> Taste Da Lat\'s specialty dishes.</li><li><strong>Afternoon:</strong> Visit Bao Dai\'s Summer Palace, relax at Xuan Huong Lake.</li><li><strong>Dinner:</strong> Enjoy Da Lat night market.</li></ul><p><strong>Day 3:</strong></p><ul><li><strong>Morning:</strong> Visit Langbiang Mountain for a panoramic view.</li><li><strong>Lunch:</strong> Local dishes at a restaurant.</li><li><strong>Afternoon:</strong> Check out and depart back to your city.</li></ul>','2024-09-16',3,1999000.00,'active','Da Lat'),(3,'Tour to Sapa','/images/room-3.jpg','<p><strong>Tour 3: Khám Phá Sapa (3 Days 3 Nights)</strong></p><p><strong>Day 1:</strong></p><ul><li><strong>Night Departure:</strong> Travel overnight to Sapa.</li><li><strong>Morning Arrival:</strong> Breakfast in Sapa.</li><li><strong>Morning Activities:</strong> Trek to Cat Cat Village, visit the local market.</li><li><strong>Lunch:</strong> Enjoy lunch at a local restaurant.</li><li><strong>Afternoon Activities:</strong> Visit Ham Rong Mountain, explore Sapa Church.</li><li><strong>Dinner:</strong> Dinner at a local restaurant, evening free to explore.</li></ul><p><strong>Day 2:</strong></p><ul><li><strong>Morning:</strong> Trek to Lao Chai and Ta Van villages, meet local ethnic groups.</li><li><strong>Lunch:</strong> Picnic lunch along the way.</li><li><strong>Afternoon:</strong> Continue trekking, visit rice terraces.</li><li><strong>Dinner:</strong> Enjoy a hot pot dinner.</li></ul><p><strong>Day 3:</strong></p><ul><li><strong>Morning:</strong> Visit Silver Waterfall and O Quy Ho Pass.</li><li><strong>Lunch:</strong> Traditional lunch at a restaurant.</li><li><strong>Afternoon:</strong> Check out and depart back to your city.</li></ul>','2024-09-20',5,2599000.00,'active','Sapa'),(4,'Tour to Nha Trang','/images/room-4.jpg','<p><strong>Tour 1: Discovery Nha Trang (3 Days 3 Nights)</strong></p><p><strong>Day 1:</strong></p><ul><li><strong>Night Departure:</strong> Begin your journey to Da Lat.</li><li><strong>Morning Arrival:</strong> Breakfast in Da Lat.</li><li><strong>Morning Activities:</strong> Visit Linh Phuoc Pagoda, explore Da Lat Railway Station.</li><li><strong>Lunch:</strong> Enjoy local cuisine.</li><li><strong>Afternoon Activities:</strong> Discover Valley of Love, walk around Da Lat Flower Gardens.</li><li><strong>Dinner:</strong> Check-in and dinner at a local restaurant.</li></ul><p><strong>Day 2:</strong></p><ul><li><strong>Morning:</strong> Visit Trúc Lâm Zen Monastery, experience Datanla Waterfall.</li><li><strong>Lunch:</strong> Taste Da Lat\'s specialty dishes.</li><li><strong>Afternoon:</strong> Visit Bao Dai\'s Summer Palace, relax at Xuan Huong Lake.</li><li><strong>Dinner:</strong> Enjoy Da Lat night market.</li></ul><p><strong>Day 3:</strong></p><ul><li><strong>Morning:</strong> Visit Langbiang Mountain for a panoramic view.</li><li><strong>Lunch:</strong> Local dishes at a restaurant.</li><li><strong>Afternoon:</strong> Check out and depart back to your city.</li></ul>','2024-09-06',3,2000000.00,'active','Nha Trang'),(5,'Tour to Buon Ma Thuot','/images/room-5.jpg','<p><strong>Tour 1: Discovery BMT (3 Days 3 Nights)</strong></p><p><strong>Day 1:</strong></p><ul><li><strong>Night Departure:</strong> Begin your journey to Da Lat.</li><li><strong>Morning Arrival:</strong> Breakfast in Da Lat.</li><li><strong>Morning Activities:</strong> Visit Linh Phuoc Pagoda, explore Da Lat Railway Station.</li><li><strong>Lunch:</strong> Enjoy local cuisine.</li><li><strong>Afternoon Activities:</strong> Discover Valley of Love, walk around Da Lat Flower Gardens.</li><li><strong>Dinner:</strong> Check-in and dinner at a local restaurant.</li></ul><p><strong>Day 2:</strong></p><ul><li><strong>Morning:</strong> Visit Trúc Lâm Zen Monastery, experience Datanla Waterfall.</li><li><strong>Lunch:</strong> Taste Da Lat\'s specialty dishes.</li><li><strong>Afternoon:</strong> Visit Bao Dai\'s Summer Palace, relax at Xuan Huong Lake.</li><li><strong>Dinner:</strong> Enjoy Da Lat night market.</li></ul><p><strong>Day 3:</strong></p><ul><li><strong>Morning:</strong> Visit Langbiang Mountain for a panoramic view.</li><li><strong>Lunch:</strong> Local dishes at a restaurant.</li><li><strong>Afternoon:</strong> Check out and depart back to your city.</li></ul>','2024-09-16',3,3000000.00,'active','Buon Ma Thuot');
/*!40000 ALTER TABLE `tour` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(20) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (10,'anlene.vn','123123','Huy','anlene.vn@fonterra.com','0981231231','active',2,'123 ABC'),(11,'anlene','123456','Huy Nguyen','huynqFX18838@funix.edu.vn','080001111','active',1,'Tầng 9, toà nhà Bitexco Financial Tower, 2 Hải Triều, Phường Bến Nghé, Quận 1, TP HCM'),(14,'huynq','123123','Nguyen Quoc Huy','sss@sss.sss','0123456789','active',1,'');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-11 18:17:30
