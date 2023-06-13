/*
 * @Author: Vinton
 * @Date: 2023-06-05 17:47:31
 * @Description: file content
 */
const baseUrlApi = {
  '/api': ['/chat', '/config', '/chat-process', '/session'],
  '/backend': ['/user/login', '/user/sms_code', '/user/info', '/user/mock_sms_code', '/user/logout', '/user/orders', '/vip/products'],
}
const UserPermissionConfig = {
  chatCount: 10, // 用户聊天免费次数的配置
}

export {
  UserPermissionConfig,
  baseUrlApi,
}
