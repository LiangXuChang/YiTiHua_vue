<template>
	<section>
		<!--工具条-->
		<el-col :span="19" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
			</el-form>
		</el-col>
		<el-col :span="5" class="toolbar" style="padding-bottom: 0px;">
		</el-col>
		<el-table :data="this.$store.state.Allfenshu" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="classId" label="课程编号" min-width sortable>
			</el-table-column>
			<el-table-column prop="className" label="课程名称" min-width sortable>
			</el-table-column>
			<el-table-column prop="egrade" label="课程分数" min-width sortable>
			</el-table-column>
			<el-table-column label="操作"  min-width>
				<template scope="scope">
					<el-button size="small" @click="tiaozhuan1(scope.$index, scope.row)">提出问题</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
		</el-col>

		<!--编辑界面-->
		<el-dialog title="新增" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" ref="editForm">
				<el-form-item label="课程编号" prop="mobile">
					<el-input v-model="editForm.classId" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="课程名称" prop="name">
					<el-input v-model="editForm.className" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="任课教师" prop="departmentID">
					<el-input v-model="editForm.classTeacher" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="课程学时" prop="schoolID">
					<el-input v-model="editForm.classTime" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="难易程度" prop="schoolID">
					<el-input v-model="editForm.classLevel" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="上课班级" prop="schoolID">
					<el-input v-model="editForm.classHome" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="上课地点" prop="schoolID">
					<el-input v-model="editForm.classAddress" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="实训项目" prop="schoolID">
					<el-input v-model="editForm.classProject" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="计划上课时间" prop="schoolID">
					<el-input v-model="editForm.classProjectTime" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

	</section>
</template>

<script>
    import axios from 'axios'
    // import util from '../../common/js/util'
    import store from '../../store/index'
    // import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
    export default {
        data() {
            return {
                filters: {
                    name: ''
                },
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {

                },
                //编辑界面数据
                editForm: {
                    classId:'',
                    className:'',
                    classTeacher:'',
                    classTime:'',
                    classLevel:'',
                    classHome:'',
                    classAddress:'',
                    classProject:'',
                    classProjectTime:''
                },

                // addFormVisible: false,
            }
        },
        methods: {
            tiaozhuan1:function(index,row){
                this.$router.push({ path: '/Tichuwenti'});
            },
            tiaozhuan2:function(index,row){
                this.$router.push({ path: '/Kechengxiangqing',query:{classId:row.classId} });
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            //获取用户列表
            getUsers() {
                var user = JSON.parse(sessionStorage.getItem('user'));
                this.sysUserName = user.studentAccount;
                // console.log("调用之前")
                store.dispatch('showAllfenshu',this.sysUserName)
                // console.log("调用getUsers方法")
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            // var date = new Date(this.editForm.Birth);
                            // this.editForm.Birth = date.getTime();
                            store.dispatch('editClass',this.editForm)
                            this.editFormVisible = false;
                            this.editLoading = false;
                            this.$message({
                                message: "编辑成功",
                                type: 'success'
                            });
                            this.getUsers();
                        });
                    }
                });
            },

            selsChange: function (sels) {
                this.sels = sels;
            },

        },
        mounted() {
            this.getUsers();
        }
    }

</script>

<style scoped>

</style>