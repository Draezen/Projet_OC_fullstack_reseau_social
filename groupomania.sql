-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 02 mars 2021 à 08:36
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `articles`
--

INSERT INTO `articles` (`id`, `idAuthor`, `dateCreation`, `dateModification`, `heading`, `text`, `image`) VALUES
(5, 52, '2021-03-01 10:14:03', '2021-03-01 10:14:03', 'Mon 1er Article !', 'Mon 1er text', 'http://localhost:3000/images/guitar-756326_1280_1614590043505.jpg'),
(6, 52, '2021-03-01 10:14:58', '2021-03-01 10:14:58', '2eme Article', 'Un peu de blabla', NULL),
(7, 53, '2021-03-01 10:19:10', '2021-03-01 10:19:10', 'Un titre !', '', 'http://localhost:3000/images/piano-1655558_640_1614590350588.jpg'),
(13, 54, '2021-03-01 10:53:47', '2021-03-01 15:05:43', 'A suppr sans image', 'apres modif encore et toujours', NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `avatars`
--

INSERT INTO `avatars` (`id`, `nom`, `url`) VALUES
(1, 'avatar_1', 'http://localhost:3000/images/user-1.svg'),
(2, 'avatar-2', 'http://localhost:3000/images/avatar-2.svg'),
(3, 'avatar-3', 'http://localhost:3000/images/avatar-3.svg'),
(4, 'avatar-4', 'http://localhost:3000/images/avatar-4.svg'),
(5, 'avatar-5', 'http://localhost:3000/images/avatar-5.svg'),
(6, 'avatar-6', 'http://localhost:3000/images/avatar-6.svg');

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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `idAuthor`, `idArticle`, `dateCreation`, `dateModification`, `text`) VALUES
(12, 56, 5, '2021-03-01 15:54:11', '2021-03-01 15:54:11', 'MOn tout 1er commentaire !!');

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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`id`, `idUser`, `idArticle`, `idComment`, `likeDislike`) VALUES
(5, 56, 5, NULL, 1),
(9, 56, 6, NULL, 0),
(31, 56, 7, NULL, 1),
(32, 53, 7, NULL, 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `emailMask`, `password`, `lastName`, `firstName`, `avatarId`, `role`) VALUES
(52, '323ac505f76724928c90f90c3d96363e9814efa82892c9ee7de51968bd845bc1fec97697c9659ee7b45f97cf92a99da71ea5b8fc3a129b9c8f5092231117f532', 'mod*******@*************om', '$2b$10$z/WUolFF/ARz9ULBHMeO6.SueKMQGAcTdr6XvcwG5Hx813wBt.q0G', 'groupo', 'modo', 2, 'admin'),
(53, '416a6830ce097f9850b83860d321dbebda290c1a3d2dd8b101ac96adbca995e04e2845620003163d880a3d4d2ef5d344804bf5246c254c2895a4238a4b1c6f6a', 'tho***@*************om', '$2b$10$kU.MOYdA/LIl0IVz2FvdGOIPBQrDaBMxr9.5QQXbL0hkOo4szMggm', 'dang', 'thomas', 2, 'user'),
(54, 'a7ad9fc6e6532ce61867d2532e5bb4ecff7072326db5b06faaa35daa431a53619357e3faf8b05b87d7827a499cd65d9686631bcb67e9b602ecf7cf466a2d9476', 'sim**@*************om', '$2b$10$HgmyLA857TsmqiQ257mNtu.YicVMQHT/qr6RyDcWBIk2is5WCIup.', 'dang', 'simon', 2, 'user'),
(55, 'f2ee64a47b7eab3c9e5fe453081539018935d38b8899c074fd2fd54f544c913bd5d2bbe13766a898dc71625c917c27cc783f4fa82ca495eed0f24df52a1c4fe4', 'gui******@*************om', '$2b$10$.jRHfi6In/G4yRRZtaFbBO/oSV7HaqMNj7lg5FGKCjZu8WVBuM1aG', 'faure', 'guillaume', 2, 'user'),
(56, '5a817421c65f0559bf939af70661d1b88725af0699703c9702f85b5c550666ec97d706cf390478520ce35f55d960e72f74feadb84e9ccd6528e01882ca532306', 'flo**@*************om', '$2b$10$whU8K4XALuJU.i4F59znK.skhjQk8KHQT4UU/mGoH4bzPTXbRMnYq', 'cha', 'flora', 2, 'user'),
(61, 'f25be1b9483cb5dd35b455eea4610a07682b50b900e6d71d1f2708c2940b5a9f20d66bc040d3779046bfba6803f1eaa5b196d1017f292464cc98e8d79feffb52', 'tes*@*************om', '$2b$10$VAH2sVghyb8O1mumCVYYquItGynwEpkcyEPl9RgenGnZbayzyjDKS', NULL, NULL, 1, 'user');

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
