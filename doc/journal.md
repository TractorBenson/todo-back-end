# 开发日志 - Todo App 后端（TypeScript + SQLite）

## 🧱 技术栈
- **后端框架**：Express.js（TypeScript）
- **数据库**：SQLite（使用 better-sqlite3）
- **服务管理**：目前为开发阶段使用自定义脚本启动，考虑后续引入 PM2
- **身份验证**：JWT + bcrypt（密码哈希）

---

## ✅ 当前进度（截至 2025-06-03）

### ✅ 数据库结构
- 完成用户（`users`）表设计
- 其他三个表结构初步确定（tasks、tags、task_tags）

### ✅ User 模块完成度
- [x] 数据库 Model 层（增删查改）
- [x] Service 层（封装逻辑，含密码加密）
- [x] Controller 层（请求响应逻辑）
- [x] Route 配置（全部使用 POST）
- [x] JWT 签发与验证中间件
- [x] 登录、注册、修改用户名、修改密码、获取当前用户、登出

### ✅ 启动服务
- 成功使用 `tsc` 编译后通过脚本运行 `dist/index.js`
- 服务默认监听端口 `3000`

---

## 📝 TODO 待办事项

### 🟡 环境 & 配置
- [ ] 将 `JWT_SECRET` 迁移至 `.env` 配置并全局读取
- [ ] 考虑引入 `dotenv` 并清理硬编码的 fallback secret

### 🟡 API & 模块开发
- [ ] 实现 Task 模块（Model / Service / Controller / Routes）
- [ ] 实现 Tag 模块（含颜色字段）
- [ ] 实现 TaskTag 模块（管理多对多）
- [ ] 支持任务更新、完成状态切换等功能
- [ ] 为每个模块添加 API 文档（OpenAPI 格式）

### 🟡 测试与调试
- [ ] 使用 Postman 或 curl 测试全部已实现 API
- [ ] 添加基础单元测试（优先考虑 userService）

### 🟡 运维优化
- [ ] 配置并使用 PM2 管理服务（开发/部署统一）
- [ ] 考虑 Docker 容器化部署

---

## 📌 注意事项
- 当前开发环境仍使用开发用 secret（`dev-secret`）
- 部署前务必设置环境变量 `JWT_SECRET`，避免使用默认值！
- 所有 API 均通过 POST 实现，前端需统一配合

---

_更新于 2025-06-03_