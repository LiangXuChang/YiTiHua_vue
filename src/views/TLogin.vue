<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">教师登陆</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit3" :loading="logining">登录</el-button>
    </el-form-item>
    <el-button size="small" @click="handleSubmit2">切换至学生登陆</el-button>
  </el-form>
</template>

<script>
    import router from '../routes'
  // import { requestLogin } from '../api/api';
  import store from '../store/index'
  //import NProgress from 'nprogress'
    import axios from 'axios'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        // rules2: {
        //   account: [
        //     { required: true, message: '请输入账号', trigger: 'blur' },
        //   ],
        //   checkPass: [
        //     { required: true, message: '请输入密码', trigger: 'blur' },
        //   ]
        // },
        checked: true
      };
    },
    methods: {
        tiaozhuan:function(index,row){
            this.$router.push({ path: '/login' });
        },
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
          var instance = axios.create({
              headers: {'content-type': 'application/x-www-form-urlencoded'}
          });
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
            if (valid) {
                this.logining = true;
                instance({
                    url:"http://47.92.98.224:8080/school-0.0.1-SNAPSHOT/school/student/login",
                    params:{
                        studentAccount:this.ruleForm2.account,
                        studentPassword:this.ruleForm2.checkPass
                    },
                }).then(res => {
                    if(res.data.Code == -1){
                        _this.logining = false;
                        _this.$message({
                            message: "用户名或密码错误",
                            type: 'error'
                        });
                    }else {
                        _this.logining = false;
                        // store.state.code=res.data.Code;
                        // store.dispatch('permissions',res.data.Code)
                        this.queryParams={studentAccount:this.ruleForm2.account};
                        sessionStorage.setItem('user',JSON.stringify(this.queryParams))
                        // store.state.userID=res.data.Code
                        // console.log(store.state.userID)
                        _this.$router.push({ path: '/login' });
                    }
                }).catch(function (err) {
                    console.log(err)
                    console.log("失败")
                })
            } else {
                console.log('error submit!!');
                return false;
            }
        });
      },
        handleSubmit3(ev) {
            var instance = axios.create({
                headers: {'content-type': 'application/x-www-form-urlencoded'}
            });
            var _this = this;
            this.$refs.ruleForm2.validate((valid) => {
                if (valid) {
                    this.logining = true;
                    instance({
                        url:"http://47.92.98.224:8080/school-0.0.1-SNAPSHOT/school/teacher/login",
                        params:{
                            teacherAccount:this.ruleForm2.account,
                            teacherPassword:this.ruleForm2.checkPass
                        },
                    }).then(res => {
                        if(res.data.data.code != 0){
                            _this.logining = false;
                            _this.$message({
                                message: "用户名或密码错误",
                                type: 'error'
                            });
                        }else {
                            _this.logining = false;
                            // store.state.code=res.data.Code;
                            // store.dispatch('permissions',res.data.Code)
                            this.queryParams={studentAccount:this.ruleForm2.account};
                            _this.$store.state.code1=false;
                            _this.$store.state.code2=true;
                            _this.$store.state.code3=false;
                            _this.$store.state.code4=true;
                            _this.$store.state.code5=true;
                            sessionStorage.setItem('user',JSON.stringify(this.queryParams))
                            // store.state.userID=res.data.Code
                            // console.log(store.state.userID)
                            _this.$router.push({ path: '/user' });
                        }
                    }).catch(function (err) {
                        console.log(err)
                        console.log("失败")
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>