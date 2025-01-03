/*
 Navicat Premium Data Transfer

 Source Server         : test
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 03/01/2025 09:14:25
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for _prisma_migrations
-- ----------------------------
DROP TABLE IF EXISTS `_prisma_migrations`;
CREATE TABLE `_prisma_migrations`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) NULL DEFAULT NULL,
  `migration_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `rolled_back_at` datetime(3) NULL DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of _prisma_migrations
-- ----------------------------
INSERT INTO `_prisma_migrations` VALUES ('06840fe3-4029-4811-b444-d4edd62e4f2c', 'c24175ea3400268fecc604f5c5e2aa88379f65cd759bf720486f345cc8fbc0a2', '2024-12-20 08:55:11.900', '20241127054140_', NULL, NULL, '2024-12-20 08:55:11.863', 1);
INSERT INTO `_prisma_migrations` VALUES ('2e957fa1-b0c2-474c-af02-df99c5535c5c', '5d4317fef5bdb60e1fe14e12c087619f966f6556269d6ec85ebf6887802a1e47', '2024-12-20 08:55:34.537', '20241220085534_', NULL, NULL, '2024-12-20 08:55:34.525', 1);
INSERT INTO `_prisma_migrations` VALUES ('38796453-85de-4121-94ed-984a6f693815', '3ccd46ce5c6c08c13b2681b2fcc7a6f21c5f3200bb50baa5eaf89f5a2b51bcbf', '2024-12-20 08:55:12.641', '20241211031755_fix_dict_type_data_relation', NULL, NULL, '2024-12-20 08:55:12.455', 1);
INSERT INTO `_prisma_migrations` VALUES ('637016c2-2059-4ff8-a2bc-a103d5371ada', '4bbb2e86b1ca4dd5e0729a17d81c7fe4fe7fbd3fcbdd95463549db50d2a71ca2', '2024-12-20 08:55:11.845', '20241122063028_', NULL, NULL, '2024-12-20 08:55:11.828', 1);
INSERT INTO `_prisma_migrations` VALUES ('68dced86-9cf1-47ac-8662-87e544c62f8d', '27f88e4b96622f71add322114d038ec97b65ff53667cf96de9d558c4ed097a50', '2024-12-20 08:55:12.453', '20241211031334_fix_dict_type_data_relation', NULL, NULL, '2024-12-20 08:55:12.261', 1);
INSERT INTO `_prisma_migrations` VALUES ('7312c2f9-590e-4be5-8828-357e130e1229', '1f0e96c290e7166f1a72f68b2f32ad7e62ecf11108af18bf363b7b5b4de052b0', '2024-12-20 08:55:12.788', '20241213092343_', NULL, NULL, '2024-12-20 08:55:12.763', 1);
INSERT INTO `_prisma_migrations` VALUES ('7780ee55-6ac8-4436-ae0f-2ee233e7b945', 'ace62d2eedc56029a77e6965cedda8c6af4202271b5b9c620108453e0bb67a38', '2024-12-20 08:55:12.084', '20241210092117_init', NULL, NULL, '2024-12-20 08:55:12.029', 1);
INSERT INTO `_prisma_migrations` VALUES ('8f2719fc-f460-408f-9eb0-0b075bfce033', '98d89bb5e2de1de877177c9e9be338add4899d0b99a22b0ee978e886e01a2346', '2024-12-20 08:55:12.878', '20241220083609_add_logs_table', NULL, NULL, '2024-12-20 08:55:12.866', 1);
INSERT INTO `_prisma_migrations` VALUES ('ac9928c3-ae83-4048-9151-24c5f654a137', '631ac2624cadd3283ddb692fd07c4c6859d27875068ce536e542d908f8ff2fdf', '2024-12-20 08:55:12.761', '20241213092038_', NULL, NULL, '2024-12-20 08:55:12.642', 1);
INSERT INTO `_prisma_migrations` VALUES ('c87fd376-02b9-4a0f-98d7-6d248e189936', 'a6599033a94e06e720ebb0af6e59912fc4d7a7450e470521966706e3c15c72f8', '2024-12-20 08:55:11.861', '20241126062949_', NULL, NULL, '2024-12-20 08:55:11.847', 1);
INSERT INTO `_prisma_migrations` VALUES ('da368f89-3584-4fc2-9afc-b0e61ed6b010', 'ddc5be8c5c83d880f9fb13a097a4eb38ba0b196de174c2120ab8db3525bf4e97', '2024-12-20 08:55:12.864', '20241216065355_add_parent_child_to_menu', NULL, NULL, '2024-12-20 08:55:12.818', 1);
INSERT INTO `_prisma_migrations` VALUES ('dc53cef2-cc96-44c1-9b4c-3cccbf639388', '22491f8dea420f3d11faf988d0c390a1c96029241e14d61b5175840482f32f49', '2024-12-20 08:55:12.028', '20241206074918_update_user_table', NULL, NULL, '2024-12-20 08:55:11.902', 1);
INSERT INTO `_prisma_migrations` VALUES ('e5ac5abb-1925-4a68-882e-8af738a8f53b', 'a1d72056bb33caf49f638d67a54409a87479d026567661851e3d243fe5da8d3f', '2024-12-20 08:55:12.816', '20241213092509_', NULL, NULL, '2024-12-20 08:55:12.790', 1);
INSERT INTO `_prisma_migrations` VALUES ('eaf3c7ff-7845-4080-97f8-e515f3a29c23', 'fdcc84d5ed35b957ed18270bb3a848767ea0f609393363247440bd6ba8ff1977', '2024-12-20 08:55:12.260', '20241211030725_fix_dict_type_data_relation', NULL, NULL, '2024-12-20 08:55:12.085', 1);

-- ----------------------------
-- Table structure for dict_data
-- ----------------------------
DROP TABLE IF EXISTS `dict_data`;
CREATE TABLE `dict_data`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `dict_type_id` int NOT NULL,
  `data_label` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_value` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `create_time` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `createdById` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `dict_data_dict_type_id_fkey`(`dict_type_id`) USING BTREE,
  INDEX `dict_data_createdById_fkey`(`createdById`) USING BTREE,
  CONSTRAINT `dict_data_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `dict_data_dict_type_id_fkey` FOREIGN KEY (`dict_type_id`) REFERENCES `dict_type` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dict_data
-- ----------------------------
INSERT INTO `dict_data` VALUES (2, 1, '男', '1', 1, '2024-12-23 14:24:24.374', NULL);
INSERT INTO `dict_data` VALUES (3, 1, '女', '2', 1, '2024-12-23 14:24:34.126', NULL);

-- ----------------------------
-- Table structure for dict_type
-- ----------------------------
DROP TABLE IF EXISTS `dict_type`;
CREATE TABLE `dict_type`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `dict_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dict_type` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `create_time` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `createdById` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `dict_type_dict_name_key`(`dict_name`) USING BTREE,
  UNIQUE INDEX `dict_type_dict_type_key`(`dict_type`) USING BTREE,
  INDEX `dict_type_createdById_fkey`(`createdById`) USING BTREE,
  CONSTRAINT `dict_type_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dict_type
-- ----------------------------
INSERT INTO `dict_type` VALUES (1, '用户性别', 'user_sex', 1, '2024-12-23 14:24:20.635', 1);

-- ----------------------------
-- Table structure for log
-- ----------------------------
DROP TABLE IF EXISTS `log`;
CREATE TABLE `log`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `endpoint` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `method` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `requestBody` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `response` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1339 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of log
-- ----------------------------

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_num` int NOT NULL,
  `menu_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` int NULL DEFAULT NULL,
  `icon` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `create_time` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `Menu_parent_id_fkey`(`parent_id`) USING BTREE,
  CONSTRAINT `Menu_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `menu` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES (1, 1, '工具箱', '/Toolbox', NULL, 'icon-tubiao_gongjuxiang', '2024-12-20 17:21:12.349');
INSERT INTO `menu` VALUES (2, 2, '图片转换', '/Toolbox/PictureConversion', 1, 'icon-base64tupianzhuanhuan', '2024-12-20 17:21:25.135');
INSERT INTO `menu` VALUES (3, 3, '系统设置', '/system', NULL, 'icon-xitongshezhi', '2024-12-20 17:21:50.907');
INSERT INTO `menu` VALUES (4, 4, '用户管理', '/system/user', 3, 'icon-yonghuguanli', '2024-12-20 17:22:05.872');
INSERT INTO `menu` VALUES (5, 5, '角色管理', '/system/role', 3, 'icon-jiaoseguanli', '2024-12-20 17:22:18.640');
INSERT INTO `menu` VALUES (6, 6, '操作日志', '/system/log', 3, 'icon-xitongcaozuorizhi', '2024-12-23 11:10:06.668');
INSERT INTO `menu` VALUES (7, 7, '实时视频', '/liveRoom', NULL, NULL, '2024-12-31 10:30:46.781');
INSERT INTO `menu` VALUES (8, 8, '观看室', '/watchRoom', NULL, NULL, '2024-12-31 10:32:07.629');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `createdById` int NULL DEFAULT NULL,
  `create_time` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `Role_role_name_key`(`role_name`) USING BTREE,
  INDEX `Role_createdById_fkey`(`createdById`) USING BTREE,
  CONSTRAINT `Role_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, '超级管理员', 1, NULL, '2024-12-20 17:15:36.480');
INSERT INTO `role` VALUES (2, '普通牛马', 1, 1, '2024-12-23 06:34:05.822');
INSERT INTO `role` VALUES (3, '普通吗喽', 1, 1, '2024-12-23 06:34:33.098');

-- ----------------------------
-- Table structure for role_menu
-- ----------------------------
DROP TABLE IF EXISTS `role_menu`;
CREATE TABLE `role_menu`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `menu_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `role_menu_role_id_menu_id_key`(`role_id`, `menu_id`) USING BTREE,
  INDEX `role_menu_menu_id_fkey`(`menu_id`) USING BTREE,
  CONSTRAINT `role_menu_menu_id_fkey` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_menu_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_menu
-- ----------------------------
INSERT INTO `role_menu` VALUES (1, 1, 1);
INSERT INTO `role_menu` VALUES (2, 1, 2);
INSERT INTO `role_menu` VALUES (3, 1, 3);
INSERT INTO `role_menu` VALUES (4, 1, 4);
INSERT INTO `role_menu` VALUES (5, 1, 5);
INSERT INTO `role_menu` VALUES (6, 1, 6);
INSERT INTO `role_menu` VALUES (15, 1, 7);
INSERT INTO `role_menu` VALUES (16, 1, 8);
INSERT INTO `role_menu` VALUES (11, 2, 1);
INSERT INTO `role_menu` VALUES (9, 2, 2);
INSERT INTO `role_menu` VALUES (12, 2, 3);
INSERT INTO `role_menu` VALUES (10, 2, 4);
INSERT INTO `role_menu` VALUES (14, 3, 1);
INSERT INTO `role_menu` VALUES (13, 3, 2);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_time` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `phone_number` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `update_time` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `user_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nick_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `user_age` int NULL DEFAULT NULL,
  `user_sex` int NULL DEFAULT NULL,
  `createdById` int NULL DEFAULT NULL,
  `roleId` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `User_user_name_key`(`user_name`) USING BTREE,
  INDEX `User_roleId_fkey`(`roleId`) USING BTREE,
  INDEX `User_createdById_fkey`(`createdById`) USING BTREE,
  CONSTRAINT `User_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '2024-12-20 09:20:02.689', '$2a$10$cx0thlxcfdjnKNL/QjYkSeTTYw5qJEPApQ1DdDZLy/pJGqFrbvMy2', '110', 1, '2024-12-20 09:20:02.689', 'admin', '超级管理员', 10, 1, 1, 1);
INSERT INTO `user` VALUES (2, '2024-12-23 06:33:34.105', '$2a$10$xYK1BMy8B6bGJ9mKfIhFWeajYoXfc5cURVcJZUGabIf99hrUjFGMK', '15555555555', 1, '2024-12-23 06:58:08.295', 'test', '打工牛马', 11, 2, 1, 2);

SET FOREIGN_KEY_CHECKS = 1;
