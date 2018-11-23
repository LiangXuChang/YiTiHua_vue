import Vue from 'vue';
import Vuex from 'vuex';

import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
// import router from '../routes'
// Vue.prototype.$message.error(res.data.Msg);
Vue.use(Vuex);
Vue.use(Element)
// Vue.use(router)

var instance = axios.create({
    headers: {'content-type': 'application/x-www-form-urlencoded'}
});

var store = new Vuex.Store({
  // 定义状态
    state: {
        loginMsg:'',//后面留意一下，这里可能出问题
        classMsg:'',
        OneClassMsg:'',
        OnePrepareMsg:'',
        Allfenshu:'',
        code1:'',
        code2:'',
        ClassByT:'',
        shixun:'',
        oneshixun:0,
        wenti:'',
        onewenti:'',
        code3:'',
        code4:'',
        code5:'',
        Allyiwen:'',
        c1:'',
        c2:''
        // class_id:'',
        // class_address:'',
        // class_home:'',
    },
  actions: {
      //获取所有课程信息
      getClass (context) {
        console.log("aaaa")
          instance({
              method: 'get',
              url: 'http://47.92.98.224:8080/school-0.0.1-SNAPSHOT/school/class/showAll',
          }).then(function (res) {
              store.state.classMsg=res.data.data
          }).catch(function (err) {
              console.log(err)
              console.log("失败")
          })
      },
      //新建课程
      addClass (context,addForm) {
          instance({
              method: 'get',
              url: 'http://47.92.98.224:8080/school-0.0.1-SNAPSHOT/school/class/add',
              params:{
                  teacherId:addForm.teacherId,
                  className:addForm.className,
                  classProject:addForm.classProject,
                  classTime:addForm.classTime,
                  classLevel:addForm.classLevel,
                  classTeacher:addForm.classTeacher,
                  classHome:addForm.classHome,
                  classProjectTime:addForm.classProjectTime,
                  classAddress:addForm.classAddress,
              }
          }).then(function (res) {

          }).catch(function (err) {
              console.log(err)

          })
      },
      //课程信息编辑
      editClass (context,editForm) {
          instance({
              method: 'get',
              url: 'http://47.92.98.224:8080/school-0.0.1-SNAPSHOT/school/class/update',
              params:{
                  classId:editForm.classId,
                  className:editForm.className,
                  classProject:editForm.classProject,
                  classTime:editForm.classTime,
                  classLevel:editForm.classLevel,
                  classTeacher:editForm.classTeacher,
                  classHome:editForm.classHome,
                  classProjectTime:editForm.classProjectTime,
                  classAddress:editForm.classAddress
              }
          }).then(function (res) {

          }).catch(function (err) {
              console.log(err)
              console.log("失败")
              alert("编辑失败")
          })
      },
      //删除课程
      shanChu (context,classId) {
          instance({
              method: 'get',
              url: 'http://47.92.98.224:8080/school-0.0.1-SNAPSHOT/school/class/delete',
              params:{
                  classID:classId
              }
          }).then(function (res) {
          }).catch(function (err) {
          })
      },
      //显示一个课程内容
      showOneClass (context,id) {
          instance({
              method: 'get',
              url: 'http://47.92.98.224:8080/school-0.0.1-SNAPSHOT/school/class/showOne',
              params:{
                  classId:id
              }
          }).then(function (res) {
              store.state.OneClassMsg=res.data.data

          }).catch(function (err) {

          })
      },
      //手动评分
      pingfeng (context,addForm) {
          instance({
              method: 'get',
              url: 'http://47.92.98.224:8080/school-0.0.1-SNAPSHOT/school/evaluation/add',
              params:{
                  classId:addForm.classId,
                  eGrade:addForm.eGrade,
                  className:addForm.className,
                  studentId:addForm.studentId
              }
          }).then(function (res) {
              // store.state.test=res.data
              // console.log(store.state.test)
              // console.log(editForm)
              // console.log("更新成功")
          }).catch(function (err) {
              console.log(err)
              console.log("失败")
              alert("编辑失败")
          })
      },
      //学生进行相关资源上传
      userLogin (context,loginParams) {
          var _this = this;
          instance({
              method: 'get',
              url: 'http://47.92.98.224:8080/school-0.0.1-SNAPSHOT/school/implementation/add',
              params:{
                  studentId:'',
                  classId:'',
                  className:'',
                  ImplFont:'',
                  ImplImg:'',
                  ImplVideo:''
              }
          }).then(res => {
              store.state.loginMsg = res.data.Code;
          }).catch(function (err) {
              console.log(err)
              console.log("失败")
          })
      },
      //显示单个学生上传的资源
      showImplOne (context,id) {
          var _this = this;
          instance({
              method: 'get',
              url: 'http://47.92.98.224:8080/school-0.0.1-SNAPSHOT/school/implementation/showOne',
              params:{
                  ImplId:id
              }
          }).then(res => {
              store.state.oneshixun=res.data.data
              // console.log("添加班级成功")
          }).catch(function (err) {
              console.log(err)
              console.log("失败")
          })
      },
      //添加教程
      getClass1 (context,schoolID) {
          var _this = this;
          instance({
              method: 'get',
              url: 'http://47.92.98.224:8080/school-0.0.1-SNAPSHOT/school/prepare/add',
              params:{
                  teacherId:'',
                  classId:'',
                  pTFont:'',
                  pTImg:'',
                  pVideo:'',
                  pAssessment:''
              }
          }).then(res => {
              store.state.classes=res.data
              console.log("调用getClass方法")
          }).catch(function (err) {
              console.log(err)
              console.log("失败")
          })
      },
      //学生提出疑难问题
      getClassByID (context,classID) {
          var _this = this;
          instance({
              method: 'get',
              url: 'http://47.92.98.224:8080/school-0.0.1-SNAPSHOT/school/question/add',
              params:{
                  studentId:'',
                  classId:'',
                  qFont:'',
                  qImg:'',
                  qVideo:'',
              }
          }).then(res => {
              store.state.className=res.data.ClassName
          }).catch(function (err) {
              console.log(err)
              console.log("失败")
          })
      },
      //添加校区
      addSchool (context,addSchoolForm) {
          var _this = this;
          instance({
              method: 'get',
              url: 'http://47.92.98.224:8080/school-0.0.1-SNAPSHOT/school/class/showAll',
              params:{
                  schoolName:addSchoolForm.schoolName,
              }
          }).then(res => {

          }).catch(function (err) {
              console.log(err)
              console.log("失败")
          })
      },
      //修改密码
      updatePsw (context,updatePasswordForm) {
          var _this = this;
          instance({
              method: 'get',
              url: 'http://47.92.98.224:8080/school-0.0.1-SNAPSHOT/school/class/showAll',
              params:{
                  mobile:updatePasswordForm.mobile,
                  oldPwd:updatePasswordForm.oldPwd,
                  newPwd:updatePasswordForm.newPwd
              }
          }).then(res => {

          }).catch(function (err) {
              console.log(err)
              console.log("失败")
          })
      },
      //显示一个课程教程
      showOnePrepare (context,id) {
          instance({
              method: 'get',
              url: 'http://47.92.98.224:8080/school-0.0.1-SNAPSHOT/school/prepare/showByC',
              params:{
                  classId:id
              }
          }).then(function (res) {
              store.state.OnePrepareMsg=res.data.data
          }).catch(function (err) {

          })
      },
      //显示学生所有课程分数
      showAllfenshu (context,id) {
          instance({
              method: 'get',
              url: 'http://47.92.98.224:8080/school-0.0.1-SNAPSHOT/school/evaluation/showBySid',
              params:{
                  studentId:id
              }
          }).then(function (res) {
              store.state.Allfenshu=res.data.data
              console.log(store.state.Allfenshu)
          }).catch(function (err) {

          })
      },
      //根据教师id查询课程
      showByT (context,id) {
          instance({
              method: 'get',
              url: 'http://47.92.98.224:8080/school-0.0.1-SNAPSHOT/school/class/showByT',
              params:{
                  teacherId:id
              }
          }).then(function (res) {
              store.state.ClassByT=res.data.data
          }).catch(function (err) {

          })
      },
      //根据课程id查询实训
      showByClassId (context,id) {
          instance({
              method: 'get',
              url: 'http://47.92.98.224:8080/school-0.0.1-SNAPSHOT/school/implementation/showByClassId',
              params:{
                  classId:id
              }
          }).then(function (res) {
              store.state.shixun=res.data.data
          }).catch(function (err) {

          })
      },
      //根据课程id查询所有问题
      Allwenti (context,id) {
          instance({
              method: 'get',
              url: 'http://47.92.98.224:8080/school-0.0.1-SNAPSHOT/school/question/showByCid',
              params:{
                  classId:id
              }
          }).then(function (res) {
              store.state.wenti=res.data.data
          }).catch(function (err) {

          })
      },
      //根据问题id查询问题
      Onewenti (context,id) {
          instance({
              method: 'get',
              url: 'http://47.92.98.224:8080/school-0.0.1-SNAPSHOT/school/question/showOne',
              params:{
                  qId:id
              }
          }).then(function (res) {
              store.state.onewenti=res.data.data
          }).catch(function (err) {

          })
      },
      //根据学生账号查询问题
      allyiwen (context,id) {
          instance({
              method: 'get',
              url: 'http://47.92.98.224:8080/school-0.0.1-SNAPSHOT/school/question/showBySid',
              params:{
                  studentAccount:id
              }
          }).then(function (res) {
              store.state.Allyiwen=res.data.data
          }).catch(function (err) {

          })
      },
  },

})

export default store
