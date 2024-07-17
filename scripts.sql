CREATE TABLE IF NOT EXISTS "users" (
  "id" SERIAL PRIMARY KEY,
  "email" VARCHAR(50) NOT NULL UNIQUE,
  "password" VARCHAR(60) NOT NULL,
  "username" VARCHAR(50) DEFAULT 'user',
  "avatar" VARCHAR DEFAULT '',
  "status" VARCHAR(255) CHECK ("status" IN ('active', 'pending', 'block')) DEFAULT 'pending',
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS "tokens" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL,
  "refreshToken" VARCHAR DEFAULT '',
  "accessToken" VARCHAR DEFAULT '',
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "categories" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(50) NOT NULL,
  "description" TEXT DEFAULT '',
  "icon" VARCHAR DEFAULT '',
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS "ideas" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR NOT NULL,
  "content" TEXT NOT NULL,
  "userId" INTEGER NOT NULL,
  "categoryId" INTEGER NOT NULL,
  "voteCount" INTEGER DEFAULT 0,
  "commentCount" INTEGER DEFAULT 0,
  "isPublished" BOOLEAN DEFAULT false,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS "comments" (
  "id" SERIAL PRIMARY KEY,
  "content" TEXT NOT NULL,
  "userId" INTEGER NOT NULL,
  "ideaId" INTEGER NOT NULL,
  "parentId" INTEGER DEFAULT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY ("ideaId") REFERENCES "ideas" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY ("parentId") REFERENCES "comments" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "reactions" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(20) NOT NULL,
  "userId" INTEGER NOT NULL,
  "commentId" INTEGER NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY ("commentId") REFERENCES "comments" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "votes" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL,
  "ideaId" INTEGER NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY ("ideaId") REFERENCES "ideas" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);

-- TABLE FOR AUTHORIZATION
CREATE TABLE IF NOT EXISTS "roles" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(20) NOT NULL,
  "description" TEXT DEFAULT '',
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS "permissions" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(20) NOT NULL,
  "description" TEXT DEFAULT '',
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS "role_has_permissions" (
  "id" SERIAL PRIMARY KEY,
  "roleId" INTEGER NOT NULL,
  "permissionId" INTEGER NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  FOREIGN KEY ("roleId") REFERENCES "roles" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY ("permissionId") REFERENCES "permissions" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "user_has_permissions" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL,
  "permissionId" INTEGER NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY ("permissionId") REFERENCES "permissions" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "user_has_roles" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL,
  "roleId" INTEGER NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "users" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY ("roleId") REFERENCES "roles" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);

-- FAKE DATA

INSERT INTO "users" ("email", "password", "username", "avatar", "status", "createdAt", "updatedAt") VALUES
('admin@example.com', '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq', 'Admin User', 'https://example.com/admin.png', 'active', NOW(), NOW()), --password123
('john.doe@example.com', '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq', 'John Doe', 'https://example.com/john.png', 'active', NOW(), NOW()),
('jane.doe@example.com', '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq', 'Jane Doe', 'https://example.com/jane.png', 'active', NOW(), NOW()),
('peter.pan@example.com', '$2a$10$GyqMakjEG34Jjn76BKQk8eFVwiW1aECKdq4TfVcTZMl6Ph6J0mJEq', 'Peter Pan', 'https://example.com/peter.png', 'active', NOW(), NOW());

-- Thêm dữ liệu vào bảng tokens
INSERT INTO "tokens" ("userId", "refreshToken", "accessToken", "createdAt", "updatedAt") VALUES
(1, 'refresh-token-1', 'access-token-1', NOW(), NOW()),
(2, 'refresh-token-2', 'access-token-2', NOW(), NOW()),
(3, 'refresh-token-3', 'access-token-3', NOW(), NOW()),
(4, 'refresh-token-4', 'access-token-4', NOW(), NOW());

-- Thêm dữ liệu vào bảng categories
INSERT INTO "categories" ("title", "description", "icon", "createdAt", "updatedAt") VALUES
('Công nghệ', 'Những ý tưởng liên quan đến công nghệ', 'icon', NOW(), NOW()),
('Giáo dục', 'Những ý tưởng liên quan đến giáo dục', 'icon', NOW(), NOW()),
('Y tế', 'Những ý tưởng liên quan đến y tế', 'icon', NOW(), NOW()),
('Môi trường', 'Những ý tưởng liên quan đến môi trường', 'icon', NOW(), NOW());

-- Thêm dữ liệu vào bảng ideas
INSERT INTO "ideas" ("title", "content", "userId", "categoryId", "voteCount", "commentCount", "createdAt", "updatedAt") VALUES
('Phát triển ứng dụng học tiếng Anh', 'Ứng dụng học tiếng Anh dựa trên trí tuệ nhân tạo', 1, 1, 10, 5, NOW(), NOW()),
('Nâng cao chất lượng giáo dục đại học', 'Cải cách chương trình đào tạo, nâng cao chất lượng giảng dạy', 2, 2, 20, 10, NOW(), NOW()),
('Xây dựng bệnh viện thông minh', 'Ứng dụng công nghệ thông tin trong quản lý và khám chữa bệnh', 1, 3, 15, 8, NOW(), NOW()),
('Bảo vệ môi trường biển', 'Giảm thiểu rác thải nhựa, bảo vệ đa dạng sinh học biển', 3, 4, 25, 12, NOW(), NOW());

-- Thêm dữ liệu vào bảng comments
INSERT INTO "comments" ("content", "userId", "ideaId", "parentId", "createdAt", "updatedAt") VALUES
('Ý tưởng rất hay!', 1, 1, NULL, NOW(), NOW()),
('Cần phải có kế hoạch cụ thể', 2, 2, NULL, NOW(), NOW()),
('Tôi hoàn toàn đồng ý với bạn', 3, 3, NULL, NOW(), NOW()),
('Chúng ta cần hành động ngay bây giờ', 1, 4, NULL, NOW(), NOW()),
('Hoàn toàn đồng ý với bạn. Chúng ta cần hành động ngay bây giờ', 2, 4, 4, NOW(), NOW());


-- Thêm dữ liệu vào bảng reactions
INSERT INTO "reactions" ("name", "userId", "commentId", "createdAt", "updatedAt") VALUES
('like', 1, 1, NOW(), NOW()),
('love', 2, 2, NOW(), NOW()),
('haha', 3, 3, NOW(), NOW()),
('wow', 1, 4, NOW(), NOW());

-- Thêm dữ liệu vào bảng votes
INSERT INTO "votes" ("userId", "ideaId", "createdAt", "updatedAt") VALUES
(1, 1, NOW(), NOW()),
(2, 2, NOW(), NOW()),
(3, 3, NOW(), NOW()),
(1, 4, NOW(), NOW()),
(2, 4, NOW(), NOW());

-- Thêm dữ liệu cho bảng roles
INSERT INTO "roles" ("name", "description", "createdAt", "updatedAt") VALUES
('Admin', 'Administrator', NOW(), NOW()),
('User', 'Normal User', NOW(), NOW()),
('Guest', 'Guest User', NOW(), NOW());

-- users
-- categories
-- ideas
-- comments
-- votes
-- reaction
-- tokens

-- Thêm dữ liệu cho bảng permissions
INSERT INTO "permissions" ("name", "description", "createdAt", "updatedAt") VALUES
('create user', '', NOW(), NOW()),
('read all users', '', NOW(), NOW()),
('read user', '', NOW(), NOW()),
('update user', '', NOW(), NOW()),
('delete user', '', NOW(), NOW());

-- Thêm dữ liệu cho bảng role_has_permissions
INSERT INTO "role_has_permissions" ("roleId", "permissionId", "createdAt", "updatedAt") VALUES
(1, 1, NOW(), NOW()),
(1, 2, NOW(), NOW()),
(1, 3, NOW(), NOW()),
(1, 5, NOW(), NOW()),
(2, 1, NOW(), NOW()),
(2, 3, NOW(), NOW()),
(2, 4, NOW(), NOW());

-- Thêm dữ liệu cho bảng user_has_roles
INSERT INTO "user_has_roles" ("userId", "roleId", "createdAt", "updatedAt") VALUES
(1, 1, NOW(), NOW()),
(2, 2, NOW(), NOW()),
(3, 2, NOW(), NOW()),
(4, 2, NOW(), NOW());
