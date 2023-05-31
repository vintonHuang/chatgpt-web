/*
 * @Author: wfj
 * @Date: 2021-03-24 15:21:14
 * @LastEditors: wfj
 * @LastEditTime: 2021-03-24 15:22:19
 * @FilePath: \dc-vizier-tpl-h5\scripts\version.js
 */
import pkg from '../package.json'

console.log(
  `%c ${pkg.name} %c v${pkg.version} %c`,
  'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
  'background:#1890ff ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
  'background:transparent'
)
