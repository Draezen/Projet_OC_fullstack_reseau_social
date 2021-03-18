-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 18 mars 2021 à 13:26
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `articles`
--

DROP TABLE IF EXISTS `articles`;
CREATE TABLE IF NOT EXISTS `articles` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `idAuthor` smallint(5) UNSIGNED NOT NULL,
  `dateCreation` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dateModification` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `heading` varchar(255) NOT NULL,
  `text` text,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_articles_users_id` (`idAuthor`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `articles`
--

INSERT INTO `articles` (`id`, `idAuthor`, `dateCreation`, `dateModification`, `heading`, `text`, `image`) VALUES
(5, 52, '2021-03-01 10:14:03', '2021-03-01 10:14:03', 'Mon 1er Article !', 'Mon 1er text', 'http://localhost:3000/images/guitar-756326_1280_1614590043505.jpg'),
(6, 52, '2021-03-01 10:14:58', '2021-03-16 13:40:56', '2eme Article', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultricies enim tortor, eget facilisis dolor lobortis vel. Praesent viverra interdum nulla nec lacinia. Donec tempor, odio id ullamcorper condimentum, est nisi sollicitudin diam, nec blandit tortor velit id purus. Phasellus non bibendum nisl. Donec non molestie urna. Pellentesque fringilla ex vitae ultrices feugiat. Fusce faucibus purus ligula, quis placerat nisl semper consequat. Quisque vestibulum pellentesque efficitur.', NULL),
(7, 53, '2021-03-01 10:19:10', '2021-03-01 10:19:10', 'Un titre !', '', 'http://localhost:3000/images/piano-1655558_640_1614590350588.jpg'),
(13, 54, '2021-03-01 10:53:47', '2021-03-01 15:05:43', 'A suppr sans image', 'apres modif encore et toujours', NULL),
(15, 63, '2021-03-04 09:49:55', '2021-03-16 13:41:02', 'essetset', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultricies enim tortor, eget facilisis dolor lobortis vel. Praesent viverra interdum nulla nec lacinia. Donec tempor, odio id ullamcorper condimentum, est nisi sollicitudin diam, nec blandit tortor velit id purus. Phasellus non bibendum nisl. Donec non molestie urna. Pellentesque fringilla ex vitae ultrices feugiat. Fusce faucibus purus ligula, quis placerat nisl semper consequat. Quisque vestibulum pellentesque efficitur.', 'http://localhost:3000/images/meeting-1453895_1280_1614847795128.png'),
(19, 65, '2021-03-05 13:49:13', '2021-03-16 13:40:32', 'Full text', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel purus maximus, vehicula lectus et, volutpat lorem. Mauris lorem ex, lacinia ut elementum vitae, auctor eget massa. Nulla facilisi. Nam molestie lorem enim, ut lacinia libero viverra in. Vivamus porttitor nibh sit amet maximus dapibus. Vivamus in dolor eu dui egestas efficitur eu nec orci. Suspendisse accumsan ullamcorper elit eget lobortis. Pellentesque ac ex accumsan, porttitor velit sed, varius ipsum. Cras auctor lectus ut diam fringilla, sit amet varius mi volutpat. Sed porta mattis velit et pellentesque. Cras a nunc pulvinar, luctus libero nec, tincidunt velit.\r\n\r\nCras tristique pellentesque tincidunt. Curabitur pretium eros tellus, imperdiet rhoncus nisl blandit interdum. Integer congue accumsan turpis sed dictum. Proin tempus risus non volutpat bibendum. In metus nisl, maximus ac euismod ac, fringilla eu sem. Nam in efficitur eros, ullamcorper tempor enim. Nulla congue, eros id scelerisque tristique, velit neque sagittis magna, interdum sagittis lorem justo quis enim. Sed vestibulum mi odio, in imperdiet tortor varius eget. Donec vel vulputate ex. In eleifend lorem sed accumsan semper. Nulla eu augue felis. Praesent rhoncus varius rhoncus. Nullam dapibus metus nec mauris tincidunt pharetra. Duis porttitor efficitur libero pulvinar efficitur. Praesent in placerat lorem, quis volutpat elit. Mauris a porta diam, et venenatis eros.\r\n\r\nMauris tincidunt dapibus nunc nec scelerisque. Etiam nec nulla tellus. Morbi id efficitur nibh. Aliquam vel auctor odio. Ut dapibus elit in felis sagittis, ut posuere sapien efficitur. Morbi sit amet neque malesuada, pulvinar nibh ac, molestie ante. Sed bibendum odio et sem maximus fringilla. Ut ultricies, est ut egestas tincidunt, neque magna sodales tortor, luctus lacinia lacus elit sed felis.\r\n\r\nMorbi vitae turpis libero. Sed hendrerit ornare nisl nec scelerisque. Maecenas tristique nisl libero, nec sollicitudin mi interdum et. Nunc luctus nisl at ultricies dapibus. Sed porta ac libero ac aliquet. Donec facilisis sollicitudin magna, sit amet mattis purus ullamcorper at. Ut consequat quam est, vitae volutpat lorem vulputate accumsan.\r\n\r\nPellentesque vulputate elit et libero molestie auctor. Donec id sagittis magna, vel tristique enim. Aenean ut nunc at ipsum ornare rhoncus. Suspendisse eleifend in nunc ac imperdiet. Sed justo quam, placerat ac leo in, facilisis lobortis arcu. Aenean justo mi, aliquet quis turpis vel, tristique condimentum ligula. Etiam quis neque vel ipsum malesuada pharetra in id dui. Morbi ante magna, ultrices a pharetra iaculis, hendrerit et nisi. Mauris efficitur, leo at venenatis vestibulum, lorem turpis congue est, id imperdiet urna enim ac tellus.', NULL),
(21, 65, '2021-03-18 13:50:11', '2021-03-18 14:24:00', 'titre image', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet fermentum purus. Nunc volutpat metus id nulla maximus, ultrices dapibus urna molestie. Etiam ultricies ut metus quis faucibus. Ut lorem magna, laoreet eu egestas vel, rutrum sed dui. Vestibulum nulla nisl, suscipit at blandit vitae, eleifend a ligula. Nam at augue libero. Sed luctus mollis sodales. Cras finibus urna augue, eget gravida nisl scelerisque in. Duis imperdiet tristique magna.\r\n\r\nDuis in interdum erat. Nunc id urna elementum lacus molestie laoreet in elementum orci. Sed nunc ligula, vestibulum id fermentum ut, tincidunt non justo. Sed at ullamcorper velit. Etiam euismod lectus et hendrerit tristique. Donec in quam lacus. Phasellus malesuada ac eros et vehicula. Donec tincidunt non felis sit amet aliquam. Nullam elementum commodo placerat. Aenean vehicula sit amet nisl interdum eleifend.', 'http://localhost:3000/images/motivation-721827_1280_1614948997412.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `avatars`
--

DROP TABLE IF EXISTS `avatars`;
CREATE TABLE IF NOT EXISTS `avatars` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom` varchar(30) NOT NULL,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `avatars`
--

INSERT INTO `avatars` (`id`, `nom`, `url`) VALUES
(1, 'avatar1', 'http://localhost:3000/images/user-1.svg'),
(2, 'avatar2', 'http://localhost:3000/images/user-2.svg'),
(3, 'avatar3', 'http://localhost:3000/images/user-3.svg'),
(4, 'avatar4', 'http://localhost:3000/images/user-4.svg'),
(5, 'avatar5', 'http://localhost:3000/images/user-5.svg'),
(6, 'avatar6', 'http://localhost:3000/images/user-6.svg'),
(7, 'avatar7', 'http://localhost:3000/images/user-7.svg'),
(8, 'avatar8', 'http://localhost:3000/images/user-8.svg'),
(9, 'avatar9', 'http://localhost:3000/images/user-9.svg'),
(10, 'avatar10', 'http://localhost:3000/images/user-10.svg'),
(11, 'avatar11', 'http://localhost:3000/images/user-11.svg'),
(12, 'avatar12', 'http://localhost:3000/images/user-12.svg'),
(13, 'avatar13', 'http://localhost:3000/images/user-13.svg'),
(14, 'avatar14', 'http://localhost:3000/images/user-14.svg');

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `idAuthor` smallint(5) UNSIGNED NOT NULL,
  `idArticle` smallint(5) UNSIGNED NOT NULL,
  `dateCreation` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dateModification` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `text` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comments_articles_id` (`idArticle`),
  KEY `fk_comments_users_id` (`idAuthor`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `idAuthor`, `idArticle`, `dateCreation`, `dateModification`, `text`) VALUES
(12, 56, 5, '2021-03-01 15:54:11', '2021-03-01 15:54:11', 'MOn tout 1er commentaire !!'),
(13, 54, 5, '2021-03-02 09:43:52', '2021-03-02 09:43:52', 'Un autre commentaire !'),
(14, 54, 5, '2021-03-02 09:44:11', '2021-03-02 09:44:11', 'Et encore un autre...'),
(16, 61, 5, '2021-03-02 09:44:54', '2021-03-04 10:48:11', 'Pas touche à mon comm !'),
(18, 61, 5, '2021-03-02 13:55:12', '2021-03-04 14:39:21', 'test 1 2'),
(20, 65, 21, '2021-03-05 14:38:08', '2021-03-05 14:39:00', 'modif du com de art 21 par 65 azerty '),
(21, 65, 21, '2021-03-05 14:40:02', '2021-03-05 14:40:02', 'com de art 15 fait par 63 par 65 azerty '),
(22, 65, 15, '2021-03-05 14:41:04', '2021-03-05 14:43:32', 'modif par moderateur ');

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `idUser` smallint(5) UNSIGNED NOT NULL,
  `idArticle` smallint(5) UNSIGNED DEFAULT NULL,
  `idComment` smallint(5) UNSIGNED DEFAULT NULL,
  `likeDislike` tinyint(4) NOT NULL DEFAULT '0' COMMENT '1 = like, -1 = dislike',
  PRIMARY KEY (`id`),
  KEY `fk_likes_articles_id` (`idArticle`),
  KEY `fk_likes_comments_id` (`idComment`),
  KEY `fk_likes_users_id` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=202 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`id`, `idUser`, `idArticle`, `idComment`, `likeDislike`) VALUES
(5, 56, 5, NULL, 1),
(31, 56, 7, NULL, 1),
(32, 53, 7, NULL, 1),
(35, 53, NULL, 12, -1),
(36, 54, NULL, 12, 1),
(38, 53, NULL, 14, 1),
(39, 54, NULL, 14, 1),
(40, 54, NULL, 18, 1),
(41, 54, NULL, 16, -1),
(42, 61, 13, NULL, -1),
(43, 61, NULL, 13, -1),
(50, 63, 13, NULL, -1),
(51, 63, 7, NULL, -1),
(53, 63, 5, NULL, 1),
(57, 54, 13, NULL, 1),
(58, 56, 13, NULL, -1),
(61, 65, 19, NULL, -1),
(182, 175, NULL, 20, -1),
(183, 175, 19, NULL, -1),
(184, 175, 15, NULL, 1),
(185, 175, 13, NULL, -1),
(188, 175, 7, NULL, 1),
(189, 175, 6, NULL, 1),
(190, 175, 5, NULL, 1),
(191, 175, NULL, 14, 1),
(192, 175, NULL, 16, -1),
(193, 175, NULL, 18, -1),
(194, 175, NULL, 12, 1),
(195, 53, 21, NULL, 1),
(196, 53, 19, NULL, 1),
(197, 53, 15, NULL, 1),
(198, 53, 13, NULL, -1),
(200, 175, 21, NULL, 1),
(201, 175, NULL, 21, 1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(130) NOT NULL,
  `emailMask` varchar(130) NOT NULL,
  `password` varchar(100) NOT NULL,
  `lastName` varchar(30) DEFAULT NULL,
  `firstName` varchar(30) DEFAULT NULL,
  `avatarId` smallint(5) UNSIGNED NOT NULL DEFAULT '1',
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ind_email` (`email`),
  KEY `fk_users_avatars_id` (`avatarId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=176 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `emailMask`, `password`, `lastName`, `firstName`, `avatarId`, `role`) VALUES
(52, '323ac505f76724928c90f90c3d96363e9814efa82892c9ee7de51968bd845bc1fec97697c9659ee7b45f97cf92a99da71ea5b8fc3a129b9c8f5092231117f532', 'mod*******@*************om', '$2b$10$z/WUolFF/ARz9ULBHMeO6.SueKMQGAcTdr6XvcwG5Hx813wBt.q0G', 'groupo', 'modo', 2, 'admin'),
(53, '416a6830ce097f9850b83860d321dbebda290c1a3d2dd8b101ac96adbca995e04e2845620003163d880a3d4d2ef5d344804bf5246c254c2895a4238a4b1c6f6a', 'tho***@*************om', '$2b$10$Q10.HKfEsfsp6PDSSBCNK.P6triLnqvVfFG3Kelc5LWUO4Et/CwQy', 'Danger', 'Thomas', 2, 'user'),
(54, 'a7ad9fc6e6532ce61867d2532e5bb4ecff7072326db5b06faaa35daa431a53619357e3faf8b05b87d7827a499cd65d9686631bcb67e9b602ecf7cf466a2d9476', 'sim**@*************om', '$2b$10$HgmyLA857TsmqiQ257mNtu.YicVMQHT/qr6RyDcWBIk2is5WCIup.', 'dang', 'simon', 2, 'user'),
(55, 'f2ee64a47b7eab3c9e5fe453081539018935d38b8899c074fd2fd54f544c913bd5d2bbe13766a898dc71625c917c27cc783f4fa82ca495eed0f24df52a1c4fe4', 'gui******@*************om', '$2b$10$.jRHfi6In/G4yRRZtaFbBO/oSV7HaqMNj7lg5FGKCjZu8WVBuM1aG', 'faure', 'guillaume', 2, 'user'),
(56, '5a817421c65f0559bf939af70661d1b88725af0699703c9702f85b5c550666ec97d706cf390478520ce35f55d960e72f74feadb84e9ccd6528e01882ca532306', 'flo**@*************om', '$2b$10$ShKIiVovFqflm8hbcIH.heeAi9urVIMBbr4kj3vCoLWCYjcAXYYa.', 'Chaoaza', 'Flora', 1, 'user'),
(61, 'f25be1b9483cb5dd35b455eea4610a07682b50b900e6d71d1f2708c2940b5a9f20d66bc040d3779046bfba6803f1eaa5b196d1017f292464cc98e8d79feffb52', 'tes*@*************om', '$2b$10$VAH2sVghyb8O1mumCVYYquItGynwEpkcyEPl9RgenGnZbayzyjDKS', 'nom ', 'prénom', 1, 'user'),
(63, '37d3fc4df61649a402238157e262f2beb4dc91a81fb6854cc28ed2f27680ab2e2b62b416b139c8d8e2b4fda3d4d738b66912dbf65e1af7f707fb4d11b7986ef8', 'mic***@*************om', '$2b$10$PLVnY8XuiNZO4Ios0kltlOl4iSVWdhdQfk90HiSRSqOOpyuySuPzu', 'Vaillant', 'Michel', 3, 'user'),
(65, 'e23b16b5894b50dd80376014bc39b500227d7605e7f865297f627089c4b9e87e2251ae21ed06aca10daee840998e9811430e16911d6d856fc15e05228e954657', 'aze***@*************om', '$2b$10$z7cSRn5qmi4JcXZreAMoSus2t9OIME5im6v/v1Vv5eLh/jeASnq3W', 'Azer', 'Ty', 1, 'user'),
(175, '2f9d0ec03bff6936bbb893e8feea2010c1b48a93cde9e9b081b102af9fa3b5787a2edb8270aaa57966118816a6325a33275bfe1f623a3f515e17e45665854d5f', 'bob@*************om', '$2b$10$3jM7RH8rF0TvMv5nr8.sbO2FR.otpRdqq5XAATewFCYd6KmKkndZq', 'Le Bricoleur', 'Bob', 5, 'user');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `fk_users_id` FOREIGN KEY (`idAuthor`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_comments_articles_id` FOREIGN KEY (`idArticle`) REFERENCES `articles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_comments_users_id` FOREIGN KEY (`idAuthor`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `fk_likes_articles_id` FOREIGN KEY (`idArticle`) REFERENCES `articles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_likes_comments_id` FOREIGN KEY (`idComment`) REFERENCES `comments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_likes_users_id` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_avatars_id` FOREIGN KEY (`avatarId`) REFERENCES `avatars` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
