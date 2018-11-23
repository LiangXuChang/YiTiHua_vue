<template>
	<section>
		<!--工具条-->
		<el-col :span="19" class="toolbar" style="padding-bottom: 0px; height: 50px">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-button type="primary" @click="handleAdd" v-show="this.$store.state.code4">新增课程</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="shangchuan" v-show="this.$store.state.code5">上传教程</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-col :span="5" class="toolbar" style="padding-bottom: 0px; height: 50px">
		</el-col>
		<el-table :data="this.$store.state.classMsg" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="classId" label="课程编号" min-width sortable>
			</el-table-column>
			<el-table-column prop="className" label="课程名称" min-width sortable>
			</el-table-column>
			<el-table-column prop="classTeacher" label="任课教师" min-width sortable>
			</el-table-column>
			<el-table-column prop="classTime" label="课程学时" min-width sortable>
			</el-table-column>
			<el-table-column prop="classLevel" label="难易程度" min-width sortable>
			</el-table-column>
			<el-table-column prop="classHome" label="上课班级" min-width sortable>
			</el-table-column>
			<el-table-column prop="classAddress" label="上课地点" min-width sortable>
			</el-table-column>
			<el-table-column prop="classProject" label="实训项目" min-width sortable>
			</el-table-column>
			<el-table-column prop="classProjectTime" label="计划上课时间" min-width sortable>
			</el-table-column>
			<el-table-column label="操作" min-width>
				<template scope="scope">
					<!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看教程</el-button>-->
					<el-button size="small" @click="tiaozhuan(scope.$index, scope.row)">查看教程</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
		</el-col>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addClassVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="课程名称" prop="name">
					<el-input v-model="addForm.className" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="教师账号" prop="name">
					<el-input v-model="addForm.teacherId" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="任课教师" prop="departmentID">
					<el-input v-model="addForm.classTeacher" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="课程学时" prop="schoolID">
					<el-input v-model="addForm.classTime" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="难易程度" prop="schoolID">
					<el-input v-model="addForm.classLevel" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="上课班级" prop="schoolID">
					<el-input v-model="addForm.classHome" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="上课地点" prop="schoolID">
					<el-input v-model="addForm.classAddress" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="实训项目" prop="schoolID">
					<el-input v-model="addForm.classProject" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="计划上课时间" prop="schoolID">
					<el-input v-model="addForm.classProjectTime" auto-complete="off"></el-input>
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
                addClassVisible:false,//新增界面是否显示
                filters: {
                    name: ''
                },
                listLoading: false,
                sels: [],//列表选中列
                editLoading: false,

                // addFormVisible: false,
                addLoading: false,
                addFormRules: {
                    classId: [
                        { required: true, message: '请输入课程编号', trigger: 'blur' }
                    ],
                    className:[
                        { required: true, message: '请输入课程名称', trigger: 'blur' }
                    ],
                    classTeacher:[
                        { required: true, message: '请输入任课教师', trigger: 'blur' }
                    ],
                    classTime:[
                        { type: 'date', required: true, message: '请输入课时', trigger: 'blur' }
                    ],
                    classLevel:[
                        { type: 'number',required: true, message: '请输入难易程度', trigger: 'change,blur' }
                    ],
                    classHome:[
                        { required: true, message: '请输入上课班级', trigger: 'blur' }
                    ],
                    classAddress:[
                        { required: true, message: '请输入上课地点', trigger: 'blur' }
                    ],
                    classProject:[
                        { required: true, message: '请输入实训项目', trigger: 'blur' }
                    ],
                    classProjectTime:[
                        { required: true, message: '请输入计划上课时间', trigger: 'blur' }
                    ],
                },
                //新增界面数据
                addForm: {
                    classId:'',
                    className:'',
                    classTeacher:'',
                    classTime:'',
                    classLevel:'',
                    classHome:'',
                    classAddress:'',
                    classProject:'',
                    classProjectTime:''
                }

            }
        },
        methods: {
            tiaozhuan:function(index,row){
                this.$router.push({ path: '/Kechengxiangqing',query:{classId:row.classId} });
			},
            //显示新增界面
            handleAdd: function () {
                this.addClassVisible = true;

            },
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            //获取课程列表
            getUsers() {
                // console.log("调用之前")
                store.dispatch('getClass')
                // console.log("调用getUsers方法")
            },
            //新增
            addSubmit() {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            store.dispatch('addClass',this.addForm)
                            this.addClassVisible = false;
                            this.addLoading = false;
                            this.$message({
                                message: "添加成功",
                                type: 'success'
                            });
                            this.getUsers();
                            //NProgress.start();
                        });
                    }
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            shangchuan(){
                this.$router.push({ path: '/Shangchuanjiaocheng' });
			}
        },
        mounted() {
            this.getUsers();
        }
    }

</script>

<style scoped>

</style>