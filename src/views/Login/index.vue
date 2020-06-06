<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="loginTop">
        <li
          v-for="(item, i) in menuTab"
          :key="i"
          :class="{ current: item.current }"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!-- 登录表单Start -->
      <el-form
        class="logForm"
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="80px"
        label-position="top"
      >
        <el-form-item prop="email">
          <label>邮箱</label>
          <el-input v-model="loginForm.email"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <label>密码</label>
          <el-input
            v-model="loginForm.password"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passwords" v-show=" model === 'register' ">
          <label>请输入重复密码</label>
          <el-input
            v-model="loginForm.passwords"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="number">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15"
              ><el-input
                v-model="loginForm.number"
                minlength="6"
                maxlength="6"
              ></el-input
            ></el-col>
            <el-col :span="9"
              ><el-button
                type="success"
                class="block"
                @click="getSms()"
                :disabled="numberButtonStatus.status"
                >{{numberButtonStatus.text}}</el-button
              ></el-col
            >
          </el-row>
        </el-form-item>
        <el-button type="warning" class="block loginBtn" @click="submitForm('loginFormRef')"
        :disabled="isdisabled"
        >{{model === 'login' ? '登录' : '注册'}}</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import {GetSms, Register, Login} from '@/api/login'
import {reactive, ref, onMounted} from '@vue/composition-api';
import {
  stripscript,
  validateUser,
  validatePass,
  validateCode
} from "../../utils/validate.js";
export default {
    name: 'Login',
    // setup(props, context) {
       /**
     *attrs: (...) == this.$attrs
      emit: (...) == this.$emit
      listeners: (...) == this.$listeners
      parent: (...) == this.$parent
      refs: (...) == this.$refs
      root: (...) == this
      */
        setup(props, {refs, root}) {
        //这里放置data数据、生命周期、自定义的函数
        // 邮箱验证规则
        let validateEmail = (rule, value, callback) => {
        if (value === "") {
            callback(new Error("请输入用户邮箱"));
        } else if (validateUser(value)) {
            callback(new Error("请输入正确的邮箱格式"));
        } else {
            callback();
        }
        };
        // 密码验证规则
        let validatePassword = (rule, value, callback) => {
        // console.log(stripscript(value))
        // this.loginForm.password = stripscript(value)
        // value = stripscript(value)

        if (value === "") {
            callback(new Error("请输入用户密码"));
        } else if (validatePass(value)) {
            return callback(new Error("密码为6至20位且必须包含数字和字母"));
        } else {
            callback();
        }
        };
        //重复密码验证规则
        let validatePasswords = (rule, value, callback) => {
        if(model.value === 'login'){
            callback();
        }
        if (value === "") {
            callback(new Error("请再次输入密码"));
        } else if (value !== loginForm.password) {
            return callback(new Error("重复密码输入错误"));
        } else {
            callback();
        }
        };
        // 验证码验证规则
        var validateNumber = (rule, value, callback) => {
        loginForm.number = stripscript(value);
        value = stripscript(value);

        if (value === "") {
            callback(new Error("请输入验证码"));
        } else if (validateCode(value)) {
            callback(new Error("验证码格式有误"));
        } else {
            callback();
        }
        };

        /**
         * 声明数据
         */

        const menuTab = reactive([
            { txt: "登录", current: true, type: "login" },
            { txt: "注册", current: false, type: "register" }
            ]);
        // 模块值
        const model = ref('login');
        // 登录注册按钮是否禁止
        const isdisabled = ref(true)
        // 验证码按钮状态
        const numberButtonStatus = reactive({
          text: '获取验证码',
          status: false
        })
        // 倒计时
        const timer = ref(null)
        // 登录表单数据对象
        const loginForm = reactive({
            email: "1263164912@qq.com",
            password: "asd123",
            number: "",
            passwords: ""
        });
        // 登录表单验证规则对象
        const loginFormRules = reactive({
            email: [{ validator: validateEmail, trigger: "blur" }],
            password: [{ validator: validatePassword, trigger: "blur" }],
            number: [{ validator: validateNumber, trigger: "blur" }],
            passwords: [{ validator: validatePasswords, trigger: "blur" }]
        }) ;
        /**
         * 声明函数
         */
        /**
         * 切换登录或者注册模块
         */
        const toggleMenu = (data => {
        // console.log(data)
        model.value = data.type
        
        menuTab.forEach(items => {
            items.current = false;
        });
        data.current = true;
        resetFormData()
        clearCountDown()
        isdisabled.value = true
        })
        // 清除表单数据
        const resetFormData = (() => {
          refs.loginFormRef.resetFields()
        })
        // 修改获取验证码按钮的状态和文字
        const updataButtonStatus = (params) => {
         numberButtonStatus.text = params.text,
          numberButtonStatus.status = params.status
        }
        // 获取验证码
        const getSms = ( () => {
            if (loginForm.email == '') {
              root.$message.error('邮箱不能为空')
              return false
            }
            if (validateUser(loginForm.email)){
              root.$message.error('邮箱格式有误，请重新输入！')
              return false
            }
            updataButtonStatus({
              text: '发送中',
              status: true
            })
            // 请求参数
            const requestData = {
              username: loginForm.email,
              module: model.model
            }
            GetSms(requestData)
            .then(response => {
              let data = response.data;
              root.$message({
                message: data.message,
                type: 'success'
              })
              isdisabled.value = false
              countDown(60)
            })
            .catch(error => {
              console.log(error)
            })
        }) 
        // 提交表单
        const submitForm = ( formName => {
            refs[formName].validate( valid => {
                if(valid) {
                  model.value === 'login' ? login() : register()
                }else{
                  console.log('error submit!')
                  return false
                }
            })
        })
        /**
         * 登录
         */
        const login = (() => {
          let requestData = {
            username: loginForm.email,
            password: loginForm.password,
            code: loginForm.number
          }
         root.$store.dispatch('app/login',requestData)
         .then(response => {
           root.$router.push({
             name: 'Console'
           })
         })
          .catch(error => {
          })
        })
        /**
         * 注册
         */
        const register = (() => {
          let requestData = {
            username: loginForm.email,
            password: loginForm.password,
            code: loginForm.number
          }
          Register(requestData)
          .then(response => {
            let data = response.data
             root.$message({
             message: data.message,
             type: 'success'
            })
            toggleMenu(menuTab[0])
          })
          .catch(error => {
           
          })
        })
        //倒计时函数
        const countDown = (number) => {
          if (timer.value) {clearInterval(timer.value)}
          timer.value = setInterval(() => {
            number --
            if(number <= 0){
              updataButtonStatus({
                text: '再次发送',
                status: false
              })
            }else{
              updataButtonStatus({
                text: `倒计时${number}`,
                status: true
              })
              // numberButtonStatus.status = true
              // numberButtonStatus.text = `倒计时${number}`
            }
          }, 1000);
        }
        /**
         * 清除倒计时
         */
        const clearCountDown = () => {
          updataButtonStatus({
            text: '获取验证码',
            status: false
          })
          if(timer.value) {clearInterval(timer.value)}
        }
        /**
         * 生命周期
         */
        //挂载完成后
        onMounted(() => {
            // console.log(process.env.VUE_APP_TITLE)
        })
        return {
            menuTab,
            model,
            isdisabled,
            numberButtonStatus,
            submitForm,
            timer,
            loginForm,
            loginFormRules,
            toggleMenu,
            getSms,
            login
        }
        
    }
};
</script>

<style lang="scss" scoped>
#login{
  background-color: #344a5f;
  height: 100vh;
  color: #fff;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.loginTop {
  display: flex;
  justify-content: center;
  li {
    cursor: pointer;
    width: 88px;
    height: 40px;
    line-height: 40px;
    border-radius: 2px;
    font-size: 14px;
    margin: 5px;
    text-align: center;
  }
}
.current {
  background-color: rgba(0, 0, 0, 0.1);
}

.logForm {
  margin-top: 30px;
}
// 表单每行item项的样式
.el-form-item {
  margin-bottom: 13px;
  box-sizing: border-box;
}
.block {
  display: block;
  width: 100%;
}
.loginBtn {
  box-sizing: border-box;
  margin-top: 19px;
}
</style>
