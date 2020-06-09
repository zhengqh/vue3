import { MessageBox, Message } from 'element-ui';
// 处理特殊字符串
export function stripscript(str) {
  var pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]"
  );
  var rs = "";
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, "");
  }
  return rs;
}
// 验证邮箱
export function validateUser(value){
	let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
	return reg.test(value) ? false : true
}
// 验证密码
export function validatePass(value){
	let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
	return reg.test(value) ? false : true
}
// 验证验证码
export function validateCode(value){
	 let reg = /^[a-z0-9]{6}$/;
	 return reg.test(value) ? false : true
}

//自定义方法第二种方式
// export function confirm(params) {
//   MessageBox.confirm(params.content, '提示', {
//         confirmButtonText: '确定',
//         cancelButtonText: '取消',
//         type: params.type,
//         center: true
//     }).then(() => {
//         // that.$message({
//         // type: 'success',
//         // message: '删除成功!',
//         // });
//         // console.log(that)
//         Message({
//           type: 'success',
//           message: '删除成功!',
//           })
//         params.fn && params.fn()
//         // if(params.fn) { params.fn() }
//     }).catch(() => {
//         Message({
//         type: 'info',
//         message: '已取消删除'
//         });
//     })
// }