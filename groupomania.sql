-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 25 fév. 2021 à 14:26
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
  `id_author` smallint(5) UNSIGNED NOT NULL,
  `date_creation` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modification` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `heading` varchar(255) NOT NULL,
  `text` text,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_articles_users_id` (`id_author`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

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
  `id_author` smallint(5) UNSIGNED NOT NULL,
  `id_article` smallint(5) UNSIGNED NOT NULL,
  `date_creation` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modification` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `text` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comments_articles_id` (`id_article`),
  KEY `fk_comments_users_id` (`id_author`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_user` smallint(5) UNSIGNED NOT NULL,
  `id_article` smallint(5) UNSIGNED DEFAULT NULL,
  `id_comment` smallint(5) UNSIGNED DEFAULT NULL,
  `like_dislike` tinyint(4) NOT NULL DEFAULT '0' COMMENT '1 = like, -1 = dislike',
  PRIMARY KEY (`id`),
  KEY `fk_likes_articles_id` (`id_article`),
  KEY `fk_likes_comments_id` (`id_comment`),
  KEY `fk_likes_users_id` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(130) NOT NULL,
  `email_mask` varchar(130) NOT NULL,
  `password` varchar(100) NOT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `first_name` varchar(30) DEFAULT NULL,
  `avatar_id` smallint(5) UNSIGNED NOT NULL DEFAULT '1',
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ind_email` (`email`),
  KEY `fk_users_avatars_id` (`avatar_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `email_mask`, `password`, `last_name`, `first_name`, `avatar_id`, `role`) VALUES
(28, '9c0ed291221558fb0859543b0f9c48c8e6f4fee967283ecac9491692f1df861408244d86e63066fb055d67bbc7d1d9038703c74996767ec1da6b740d103e3f31', '', '$2b$10$GoaFURvTWYRZq0vYuvNgvOXzHD1yl5GhKB9QgWZ.fMSjiPqkQYM7C', 'danger', 'thomas', 4, 'user'),
(29, '8338c457daed33fc44e380b1b3290abecf3badcfa0d27ba8a80a74e19509251c088eba689b93c7a5b7dcbf3350dc0e5635ffa5a2ef2411ac80fab686c2bfdf0b', '', '$2b$10$7cb26vxSO2QvmWIQFPqXbucESJemUmbhlEyBV9uIDgRrF8YJ5KsRu', NULL, NULL, 1, 'user'),
(30, '8175156694b98101cd9cba16dd0c618a7f45d4a5e7eb03a223cea22bf7201cf78fb9f5c6ed68b15937d5036899f572fe321750e9a8ae8565819728d85956c1a9', '', '$2b$10$uSJ65/g14OYyNdHh6BPF0uwV4AgGwiAU2vj5HG0bFe3eRzM.P1D5m', 'danger', 'thomas', 2, 'user'),
(31, 'fb7b6dc2c51e6d9ca9a3b7209567ca4f4db43e617b5d88fe385d560af264a12e781b1c31ec01d920a32e672ecef03cbd085b1d78d2c21f8eb21a78dce4b12cc5', '', '$2b$10$nbCLlHPmnwzOe9MZWCZX.u5q7GxAtGE6g3vyVlXgrp5.G2oh6Z3M6', NULL, NULL, 1, 'user');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `fk_users_id` FOREIGN KEY (`id_author`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_comments_articles_id` FOREIGN KEY (`id_article`) REFERENCES `articles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_comments_users_id` FOREIGN KEY (`id_author`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `fk_likes_articles_id` FOREIGN KEY (`id_article`) REFERENCES `articles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_likes_comments_id` FOREIGN KEY (`id_comment`) REFERENCES `comments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_likes_users_id` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_avatars_id` FOREIGN KEY (`avatar_id`) REFERENCES `avatars` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
