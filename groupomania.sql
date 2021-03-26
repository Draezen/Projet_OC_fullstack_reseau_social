-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 26 mars 2021 à 10:17
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
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;

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
(46, 175, '2021-03-23 10:26:52', '2021-03-23 15:34:35', 'hs modif', 'hsrhsrh modif', 'http://localhost:3000/images/turntable-1337986_1920_1616496335772.jpg'),
(47, 52, '2021-03-26 10:26:08', '2021-03-26 10:47:13', 'test modif', 'teste', NULL),
(48, 52, '2021-03-26 11:06:12', '2021-03-26 11:06:52', 'azeaze modeif', 'aeaze', NULL),
(49, 52, '2021-03-26 11:06:58', '2021-03-26 11:06:58', 'azeaz', 'eaze', NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `idAuthor`, `idArticle`, `dateCreation`, `dateModification`, `text`) VALUES
(12, 56, 5, '2021-03-01 15:54:11', '2021-03-01 15:54:11', 'MOn tout 1er commentaire !!'),
(13, 54, 5, '2021-03-02 09:43:52', '2021-03-02 09:43:52', 'Un autre commentaire !'),
(14, 54, 5, '2021-03-02 09:44:11', '2021-03-02 09:44:11', 'Et encore un autre...'),
(20, 65, 21, '2021-03-05 14:38:08', '2021-03-05 14:39:00', 'modif du com de art 21 par 65 azerty '),
(21, 65, 21, '2021-03-05 14:40:02', '2021-03-05 14:40:02', 'com de art 15 fait par 63 par 65 azerty '),
(22, 65, 15, '2021-03-05 14:41:04', '2021-03-05 14:43:32', 'modif par moderateur '),
(101, 175, 21, '2021-03-19 14:34:00', '2021-03-19 15:28:04', 'Lorem ipsum dolor sit amet, consectetur adipiscing eliLorem ipsum dolor sit amet, consectetur adipLorem ips'),
(112, 175, 5, '2021-03-22 15:25:52', '2021-03-22 15:25:52', 'arzar'),
(113, 175, 39, '2021-03-22 15:37:58', '2021-03-22 15:37:58', 'tsett'),
(114, 52, 5, '2021-03-26 10:25:33', '2021-03-26 10:25:33', 'zrazr'),
(115, 52, 47, '2021-03-26 10:50:04', '2021-03-26 11:02:02', 'azrazr a a zr');

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
) ENGINE=InnoDB AUTO_INCREMENT=216 DEFAULT CHARSET=utf8;

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
  `lastName` varchar(250) DEFAULT NULL,
  `firstName` varchar(250) DEFAULT NULL,
  `avatarId` smallint(5) UNSIGNED NOT NULL DEFAULT '1',
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ind_email` (`email`),
  KEY `fk_users_avatars_id` (`avatarId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=235 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `emailMask`, `password`, `lastName`, `firstName`, `avatarId`, `role`) VALUES
(52, '90d6f2a2abcac5152d00b796729aabfb3086774499d80b7cc0090dcfdd73133aed1edb4618c9f89165decf51f61aef64a71afe63848e8f0b7553dad26cf8a12e1899d6bf106c4334dd99c461e806d8a69f0839bcf89f77b4e5cdf7432f6409eda7902c51fa490a904788cdf9f39240e04e23351702dfad73af5f', 'mod*******@*************om', '$2b$10$z/WUolFF/ARz9ULBHMeO6.SueKMQGAcTdr6XvcwG5Hx813wBt.q0G', 'd9951005c3938edd08d470c05796809690810a1ca327ea5974da1672a444d6d06422d35283a47696647dc1ad64ab18f04091dd8c9c815f658890bff2debfc865375fc9bb87872af8a97d0656ca7e0e5b8f353da4829125c586e2a1feb982a89432d3a6a162b9d045684759', '392bdf3d4330edb4bd298c6b8fb692782930b07d121544edec927592dfc22162327d9f40b1d1dec18c4b02665532754d9affc24c81e44927e013cc6cd296860cd4b9fac33d3e235d02bd0082a67b7fa2e8bdd3b396867d709fd2b50a21ef4b22f7b219764fbc7f197133', 2, 'admin'),
(53, '8edb7c176b7b3579cfbe09478a57d5f0526009eb1eaeb3acfaa9c42860b884dc5c6100ee3c64d13c892d93a7dbfbec3eb134c684b0eaf4a0a2353147122abf3334b8d0466aad60329da7c854f698e42c367d79e0861655e514cca27a43daafed4ea44248d71f4060703e202ce20eee7fa261ee0dddd7', 'tho***@*************om', '$2b$10$Q10.HKfEsfsp6PDSSBCNK.P6triLnqvVfFG3Kelc5LWUO4Et/CwQy', '01e55b89dd8d8633965bf09ca17e3c6f09237e69195cb0f43447d5b24c046a4d1f132fbd0b1b81688d50d0ce979c0985cd4f30089c1948774e50bf0812aadb78da556aefbaa512416c52d8778b5104f7e6a51b8518c160030b28f11250dbbdfc2ea7a02ee51d', 'b8fa1683a8f752a8053bd57c8f74a9cb12964f045bd2c407221eb04301312cf8630eb4a5dfcca8edbac6461220f80e23fc38ca3c6051b99647bc57a91970d3981dfd616929d8f8b6df429a33a8a62ba59cc821dbb753a0b239583c46f56334820ac403c0c498', 2, 'user'),
(54, '00bb31179172d0aaf9de10328d994b03ddb91589dec9cf9e299da8f44167a1281e45feb10e066c564c695ab64f4131f2fa3e8b275859277df9e4d3cc5c45a09e166debb515431cc791682e4077cdb615ad7596278cc37ee70846377c2f2c9481f0ba332f9a34469f30530f21770419d8db615e6ce5', 'sim**@*************om', '$2b$10$HgmyLA857TsmqiQ257mNtu.YicVMQHT/qr6RyDcWBIk2is5WCIup.', 'fd3dae9e7b1add88377a4cd54cf3759fbaf0d4a0182e2e4458ed0a173a04d45a63d9a66e39626362150cb73c51c87a60f8b024762162b12f11b32f629d8fc879f197ce584631a55c635818a3ae4f78c076f3d2ebe9a9a23c8a86a5a138a667fd647d016b7926', '5537e0cbaefff2edb0dc9246dff96153f3edc65f499b037cf3aa5f3de614986677caeb66f0b53b19467d2e7ab9b69dd82b007100de2b20b3b557b09da8083840cbbabbb864cd65d8b247d6d22aa6c987776b1c8e54f0d0735691b4c7046691d6bc18822c05', 2, 'user'),
(56, 'd803ed8ab7e95ddc4b6fa40e36038876a5d44afbea6111a5be7785b2224592afe00ee4ce88138fcbbbb7ce432c6d210158bb15941507bf6d39b9716e528213298c76102e23e751dc7cfb78dbd42836d21d0df5dbaf9bf834c1555a3988faabd26d8aad4269b7c8c0ede9a951ab559eb80c2c05763e', 'flo**@*************om', '$2b$10$ShKIiVovFqflm8hbcIH.heeAi9urVIMBbr4kj3vCoLWCYjcAXYYa.', 'fc8f9a6573dc671b1e5d72a21b7bd2a0a7ac7adf3de3ec2360efdb9bc57217703ed827fb0d29866ca55a63cf4784595dd15f03638fd0727d976cb9d6b3fd452b26cde77c67893095352eee3e6a0c0d6ce8640101bdc9e61cd62ce08602bb6ce077483d76b8d158', '0232219e08366a1c5ab620a31da5ecd7c065515fb09858ef01930a6b20fd9462ce6e632b63628ac471b8c3f5589af9ce202f7b78a78ec4736c20d2eb78f7a984eaf7d991f5f4946c2359eb626468dbd917fb2da23b269f96cc546cfd59ae2bd492e203ad22', 1, 'user'),
(63, '3b54933c27f3d94836449c640deaa0b6116e38cc89a3cce1d1aa879e13ab598f7650aa285c5cc08a6ac61d21a205982cb1323c715619c176e3565f1770100ed3e88ef1da58f2a85459fdca254d60267351ac774d06117426d0a176a63f97b8418cbbc4e9978fa3e264ce65ffe0bd016255c1fde4d069', 'mic***@*************om', '$2b$10$PLVnY8XuiNZO4Ios0kltlOl4iSVWdhdQfk90HiSRSqOOpyuySuPzu', 'a5aa9804e4b861e9f1d0dd977e0c16b947ae5de7b4fa1ecb277cc5333b5c07f4d2ec7881173c509ce141a6f255d80fabdeebadc8d9347e8e10a4423bbc208572044e7f32ef2a6d3c921fc5762cdfe37a0eaf4584daa4818cb35880de6daf0bd27f39e0780ec15b71', '9d8e5943dd6d2df7e8907542f63cde0abf1e230bc164a5f0ba8188ef4e3b5e717ee4e6b0833692c064b2e83ee5c0bcc78f55f858d78a995f2f3c4e4560b8a8007181e3fe9a2e78c41e65320a1fbaee31fd9be0da7452da0a25e78296e0cfe66008514b376fd7', 3, 'user'),
(65, '37880496d7a823ff1c87519a327e21ac28de2e508be2f91073af770259613ef264053757ff5d75529c51048e51b56251ee33c143a6658f1d72ae93d36bb948451a95dc17e532b7d00baa1859f3e19b8b8664bef9cedbb67f0db6cda4975bf93108adadc17bdf762b60c79c68d1d65713fd2e1b6b4ed5', 'aze***@*************om', '$2b$10$z7cSRn5qmi4JcXZreAMoSus2t9OIME5im6v/v1Vv5eLh/jeASnq3W', 'aa4c68fdf0658c1a6b612bfe247dd7edee6a725418f6366ce8adefed693c957ab08481963a78bf75e4c99aafbef887ab19a7c9ecc7dca08300b5f1059db0d239cf9f84a6398c58b3d8317d360595db7b2bcf5ed85aeb46308d6d006c17499563d277e044', 'c26f42ac764ab3cb31767eb39bd916f71dcb0a4a30ce6e85c47477199b5ac057433927aa1aa6771af1126fba162aca6cecd9d832276247d27c70c7eecec9ab873f8f9b7a62407b1bb90e74563a194a1f3117a2e497d7b406a40ce48ab6872ce04903', 1, 'user'),
(175, '58fa9bac0b104ebad8fa017e4d04e80a2dd67cf933ea071a037e11067b6ab4bced03e61b93b39b790c8edf4df8b87087f47cbc7bedf372a10a79ff1eb3a92656cff0e31a7e95387ba1e13aba6860d8f25e6e05fb7dd884dacc955d00ffba0e9a2e7cba7633752774213efced8128d26130a739', 'bob@*************om', '$2b$10$3jM7RH8rF0TvMv5nr8.sbO2FR.otpRdqq5XAATewFCYd6KmKkndZq', 'bbed2c41a6d4e79b8bb9d55a6d08644ce1aae1a72893f8ad7d7d64754a39c76aa98be628df370fa8e31551be6320de495261cf8b9b560de381d35250cf04f9c3472a812e6faaa3bfe5b748d17ad24309ff5e699a0aa0e1e0ee7b2f8717deb32d554ed39d14da87948e59e56b', '97957fbaf10838b21cf7fceae7545e972c743c6b6c291956dc4bf6274479bf4a14520237324bd960df5d5cfb41f1402a33e8b9bfd819e0e48a14acf90fd45dedac65172f05801a29572bfd6a52a427207cfe5ab424cd7b63fe46c8f598cacb7763ed8f', 5, 'user'),
(222, 'fd519141698d91628ed51b31120d8f23db98dfbc738d363f93d76c5e453547e3c1fa8c1a6bfb4c85ae9e030d26471ac3ab23251bf315276a728ef10ecf3421b2ea7d18b36f3353b155b2845b9e9a6ee7043e713a0adbab6604279b61e942925f42247796cdacc505e5288ccafbd3e6289577087b', 'tot*@*************om', '$2b$10$k9Dd33eOQGOD4.aC4gFDYumVpus6qH.b2FbE9ylfcow3Ch2yhD1rC', '16f320248b2bef571259536e18d0e868dd8d1dfce9bd5d0b686209202982f768535a8971a8c5dd243758122e822711636513ae771cfe784681745edc9b029da5b2f0bde10768abf738c2251d156734d965ce8282630d89e18c37ed0455854870b897986eb7ab38db', 'b744e7846e79880ae3d4ad48402ecd6167a6e79fab368eb0ae30b974f444db5f92f1455931032e6cb893535ef3c9b7380a95c5634780cb40847781566c85deb0a17363bb53dab7af80989f46e059b18d4ce0f50683a8873dc6b83fb8c8372e229763375c', 10, 'user'),
(226, 'dc4332ef9d6c686247b5070938ede4e2ad37acba8627592e6b10c5710ae20254cca456168bdbaf9cc097bf25549e28c74bb0b99c009036542aa683486850ca0bc505e1219c88a9fdacbdf4405313d72ade68c467f5aa951715eccbbd40c2871eff13df9707b9e0d813c45aca2d79fd5ecbe61eb07651', 'geo***@*************om', '$2b$10$muEpLLAU4rnGGa3vAjvT/eDrBznl0YRMC7TN1h8qFmK899qFaFT.m', 'cbeb2b138ea413269f83fd8d7d9fec37d986cf6b4f3a34aa05c0140a347ea7516d16f0ef090ca58ef81c48a6a67f982953beb79db602cc9bf4d8aed7a7df3a87de19a85d4b4a341d12b9b539be76fc4a7810c7caecce81a129c7cd992fd0e34d5530e15dbbcd9c4e7917057a', 'ae09bb235e5b46f7d03fe3f4fd51fe7f0770b69a83b8890447a14d1a46728ad67d19581e29c56846851fb2bb24979a756107e8b4d87edfbdd36ec89b8c7309a4e220e64bc6038bb285f6957665b123c9fc61c795c897c3082bb0fe6a8dc52f1d76bdaa1f3317', 3, 'user'),
(234, 'd87841a093bf0c409330a0d414a33451d1882d74c593e1aeb10dd434e0ade11b589edf848b3f25983ff4810d34042bc55bd8a03dc438c651664a9c2f4e3f53bd189e1ff1d6416c258696e6b913b150d128bc78216569789c33979f17c368ae8d20cc390f8206da58e91f3c0d6d86dbdef4f76c1917', 'tot**@*************om', '$2b$10$6TH06X2jJqgrcZ8jLFPPZuI.mp4iKZHQSnomuAq0SftMOshv24Qku', '16f320248b2bef571259536e18d0e868dd8d1dfce9bd5d0b686209202982f768535a8971a8c5dd243758122e822711636513ae771cfe784681745edc9b029da5b2f0bde10768abf738c2251d156734d965ce8282630d89e18c37ed0455854870b897986eb7ab38db', 'b744e7846e79880ae3d4ad48402ecd6167a6e79fab368eb0ae30b974f444db5f92f1455931032e6cb893535ef3c9b7380a95c5634780cb40847781566c85deb0a17363bb53dab7af80989f46e059b18d4ce0f50683a8873dc6b83fb8c8372e229763375c', 10, 'user');

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
