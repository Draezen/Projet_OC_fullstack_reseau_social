-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 24 mars 2021 à 10:48
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
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

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
(21, 65, '2021-03-18 13:50:11', '2021-03-18 14:24:00', 'titre image', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet fermentum purus. Nunc volutpat metus id nulla maximus, ultrices dapibus urna molestie. Etiam ultricies ut metus quis faucibus. Ut lorem magna, laoreet eu egestas vel, rutrum sed dui. Vestibulum nulla nisl, suscipit at blandit vitae, eleifend a ligula. Nam at augue libero. Sed luctus mollis sodales. Cras finibus urna augue, eget gravida nisl scelerisque in. Duis imperdiet tristique magna.\r\n\r\nDuis in interdum erat. Nunc id urna elementum lacus molestie laoreet in elementum orci. Sed nunc ligula, vestibulum id fermentum ut, tincidunt non justo. Sed at ullamcorper velit. Etiam euismod lectus et hendrerit tristique. Donec in quam lacus. Phasellus malesuada ac eros et vehicula. Donec tincidunt non felis sit amet aliquam. Nullam elementum commodo placerat. Aenean vehicula sit amet nisl interdum eleifend.', 'http://localhost:3000/images/motivation-721827_1280_1614948997412.jpg'),
(39, 175, '2021-03-22 15:05:42', '2021-03-22 15:05:42', 'tst', 'estset', 'http://localhost:3000/images/guitar-756326_1280_1616421942765.jpg'),
(45, 175, '2021-03-23 10:26:20', '2021-03-23 11:34:10', 'azraztr modif', 'aztaztazt modif', 'http://localhost:3000/images/motivation-721827_1280_1616495650524.jpg'),
(46, 175, '2021-03-23 10:26:52', '2021-03-23 15:34:35', 'hs modif', 'hsrhsrh modif', 'http://localhost:3000/images/turntable-1337986_1920_1616496335772.jpg');

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
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `idAuthor`, `idArticle`, `dateCreation`, `dateModification`, `text`) VALUES
(12, 56, 5, '2021-03-01 15:54:11', '2021-03-01 15:54:11', 'MOn tout 1er commentaire !!'),
(13, 54, 5, '2021-03-02 09:43:52', '2021-03-02 09:43:52', 'Un autre commentaire !'),
(14, 54, 5, '2021-03-02 09:44:11', '2021-03-02 09:44:11', 'Et encore un autre...'),
(16, 61, 5, '2021-03-02 09:44:54', '2021-03-04 10:48:11', 'Pas touche à mon comm !'),
(20, 65, 21, '2021-03-05 14:38:08', '2021-03-05 14:39:00', 'modif du com de art 21 par 65 azerty '),
(21, 65, 21, '2021-03-05 14:40:02', '2021-03-05 14:40:02', 'com de art 15 fait par 63 par 65 azerty '),
(22, 65, 15, '2021-03-05 14:41:04', '2021-03-05 14:43:32', 'modif par moderateur '),
(101, 175, 21, '2021-03-19 14:34:00', '2021-03-19 15:28:04', 'Lorem ipsum dolor sit amet, consectetur adipiscing eliLorem ipsum dolor sit amet, consectetur adipLorem ips'),
(112, 175, 5, '2021-03-22 15:25:52', '2021-03-22 15:25:52', 'arzar'),
(113, 175, 39, '2021-03-22 15:37:58', '2021-03-22 15:37:58', 'tsett');

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
) ENGINE=InnoDB AUTO_INCREMENT=236 DEFAULT CHARSET=utf8;

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
(191, 175, NULL, 14, 1),
(192, 175, NULL, 16, -1),
(195, 53, 21, NULL, 1),
(196, 53, 19, NULL, 1),
(197, 53, 15, NULL, 1),
(198, 53, 13, NULL, -1),
(201, 175, NULL, 21, 1),
(204, 175, NULL, 12, 1),
(206, 175, 5, NULL, 1),
(214, 175, NULL, 101, 1),
(215, 175, 21, NULL, -1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(250) NOT NULL,
  `emailMask` varchar(130) NOT NULL,
  `password` varchar(100) NOT NULL,
  `lastName` varchar(30) DEFAULT NULL,
  `firstName` varchar(30) DEFAULT NULL,
  `avatarId` smallint(5) UNSIGNED NOT NULL DEFAULT '1',
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ind_email` (`email`),
  KEY `fk_users_avatars_id` (`avatarId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=222 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `emailMask`, `password`, `lastName`, `firstName`, `avatarId`, `role`) VALUES
(52, '90d6f2a2abcac5152d00b796729aabfb3086774499d80b7cc0090dcfdd73133aed1edb4618c9f89165decf51f61aef64a71afe63848e8f0b7553dad26cf8a12e1899d6bf106c4334dd99c461e806d8a69f0839bcf89f77b4e5cdf7432f6409eda7902c51fa490a904788cdf9f39240e04e23351702dfad73af5f', 'mod*******@*************om', '$2b$10$z/WUolFF/ARz9ULBHMeO6.SueKMQGAcTdr6XvcwG5Hx813wBt.q0G', 'groupo', 'modo', 2, 'admin'),
(53, '674c0b7a036010d6241c3313cbffb3d4f14aaed0bb3106b172b2d56f04522fcf36f10915a9c179717ab3461e002bac3d74e65703cd6a26a27f60a09f30610ae3f076f98b223049ee73c219f2749bac065100a11bd36757ec7a1245db64ee7b188a2f377d0dc2922604acbe9caabd458d12e76bcfcf0d', 'tho***@*************om', '$2b$10$Q10.HKfEsfsp6PDSSBCNK.P6triLnqvVfFG3Kelc5LWUO4Et/CwQy', 'Danger', 'Thomas', 2, 'user'),
(54, '00bb31179172d0aaf9de10328d994b03ddb91589dec9cf9e299da8f44167a1281e45feb10e066c564c695ab64f4131f2fa3e8b275859277df9e4d3cc5c45a09e166debb515431cc791682e4077cdb615ad7596278cc37ee70846377c2f2c9481f0ba332f9a34469f30530f21770419d8db615e6ce5', 'sim**@*************om', '$2b$10$HgmyLA857TsmqiQ257mNtu.YicVMQHT/qr6RyDcWBIk2is5WCIup.', 'dang', 'simon', 2, 'user'),
(55, 'd20822a7b847a22463a2f3d75115b80ae063d50b3aca3eb256b5ac0251aa63f5a81636ee5a844787dc317a0dd2c6402f3a959283d79a1e6fb860e3b17399c55dd65dcff1360311cb8ba4d61f5d2fcac497f9de64bb5b990896a710ae226dae488d789beff8584bf16d614cf2554296f6ea863c0d7c2a47cc2e', 'gui******@*************om', '$2b$10$.jRHfi6In/G4yRRZtaFbBO/oSV7HaqMNj7lg5FGKCjZu8WVBuM1aG', 'faure', 'guillaume', 2, 'user'),
(56, 'd803ed8ab7e95ddc4b6fa40e36038876a5d44afbea6111a5be7785b2224592afe00ee4ce88138fcbbbb7ce432c6d210158bb15941507bf6d39b9716e528213298c76102e23e751dc7cfb78dbd42836d21d0df5dbaf9bf834c1555a3988faabd26d8aad4269b7c8c0ede9a951ab559eb80c2c05763e', 'flo**@*************om', '$2b$10$ShKIiVovFqflm8hbcIH.heeAi9urVIMBbr4kj3vCoLWCYjcAXYYa.', 'Chaoaza', 'Flora', 1, 'user'),
(61, 'a4bf03f6e0f41bb9b8e8af3251d5a469cf4d57f24bdf165bf61ef43819013c09719f3c0ce1a5203246c2692f3e28a512e5d13e13ac951b111a8edb659359d3a48efc89d6295c6918c7ff69e6c13130e10b388cccdc0898c831b311766065591733514c08992a528289c69fad4000eb44946bf415', 'tes*@*************om', '$2b$10$VAH2sVghyb8O1mumCVYYquItGynwEpkcyEPl9RgenGnZbayzyjDKS', 'nom ', 'prénom', 1, 'user'),
(63, '3b54933c27f3d94836449c640deaa0b6116e38cc89a3cce1d1aa879e13ab598f7650aa285c5cc08a6ac61d21a205982cb1323c715619c176e3565f1770100ed3e88ef1da58f2a85459fdca254d60267351ac774d06117426d0a176a63f97b8418cbbc4e9978fa3e264ce65ffe0bd016255c1fde4d069', 'mic***@*************om', '$2b$10$PLVnY8XuiNZO4Ios0kltlOl4iSVWdhdQfk90HiSRSqOOpyuySuPzu', 'Vaillant', 'Michel', 3, 'user'),
(65, '37880496d7a823ff1c87519a327e21ac28de2e508be2f91073af770259613ef264053757ff5d75529c51048e51b56251ee33c143a6658f1d72ae93d36bb948451a95dc17e532b7d00baa1859f3e19b8b8664bef9cedbb67f0db6cda4975bf93108adadc17bdf762b60c79c68d1d65713fd2e1b6b4ed5', 'aze***@*************om', '$2b$10$z7cSRn5qmi4JcXZreAMoSus2t9OIME5im6v/v1Vv5eLh/jeASnq3W', 'Azer', 'Ty', 1, 'user'),
(175, '58fa9bac0b104ebad8fa017e4d04e80a2dd67cf933ea071a037e11067b6ab4bced03e61b93b39b790c8edf4df8b87087f47cbc7bedf372a10a79ff1eb3a92656cff0e31a7e95387ba1e13aba6860d8f25e6e05fb7dd884dacc955d00ffba0e9a2e7cba7633752774213efced8128d26130a739', 'bob@*************om', '$2b$10$3jM7RH8rF0TvMv5nr8.sbO2FR.otpRdqq5XAATewFCYd6KmKkndZq', 'Le Bricoleur', 'Bob', 5, 'user'),
(220, 'ba6085e783aa4208a82139c12f89554ba756752cd8f7b476bf0f8a2d675b91cfc93230bb05f731f7a6f4460fa849a4a2f0cf983b4ed6a6c4fa21dd25df4106f4d07e6809e5e5bf4c711048aa5aaeb4dc8798d70fa46bad65294888bebac278a2374aa42a9a183b143003e171e2861272ba744600', 'tot*@*************om', '$2b$10$wB/ko8zj40IDzJwCdwemteGeSI.UYYKM33PkjlQbtmzmsArSEPE0m', 'toto', 'titi', 5, 'user'),
(221, '9ed198e9a97ff96f74f40f1ad8c5bce57c58a9f1a2d38058be33ac04ab85421862b6116f6d07d54608969f30cdfc6f7693084bd37c1a0277cf9441dfe6ac54bd12916b8a93f047f379d0941985494a7d62bdb55e88133171136645c38367f56c647987aa241243467b877d55015bd42b569a3847', 'tit*@*************om', '$2b$10$u4VpEd0XzYME7TQwx6kov.qGCwax7DLzMfuAFSqxEqLMYRqWbG3MC', 'nom titi', 'iti', 3, 'user');

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
