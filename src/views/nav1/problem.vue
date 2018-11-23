<template>
	<section>
		<!--工具条-->
		<el-col :span="19" class="toolbar" style="padding-bottom: 0px; height: 56px">
        </el-col>
        <el-col :span="5" class="toolbar" style="padding-bottom: 0px;">
        </el-col>
		<!--列表-->
		<el-table :data="this.$store.state.Allyiwen" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
            <el-table-column prop="qid" label="问题编号" min-width sortable>
            </el-table-column>
			<el-table-column label="操作" min-width>
				<template scope="scope">
					<el-button size="small" @click="tiaozhuan(scope.$index, scope.row)">查看详情</el-button>
					<!--<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>-->
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
		</el-col>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="问题课程" prop="political">
					<el-input v-model="addForm.political" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="文字描述" prop="nationality">
					<el-input v-model="addForm.nationality" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片描述" prop="examNo">
					<el-input v-model="addForm.examNo" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="视频描述" prop="identityID">
					<el-input v-model="addForm.identityID" auto-complete="off"></el-input>
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
	import store from '../../store/index'
    import axios from 'axios'

	export default {
        data() {
            return {
                filters: {
                    name: ''
                },
                listLoading: false,
                sels: [],//列表选中列
                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                },
                //新增界面数据
                addForm: {

                }

            }
        },
        methods: {
            tiaozhuan:function(index,row){
                this.$router.push({ path: '/Chakanhuida',query:{qId1:row.qid}});
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            //获取用户列表
            getUsers() {
                var user = JSON.parse(sessionStorage.getItem('user'));
                this.sysUserName = user.studentAccount;
                store.dispatch('allyiwen',this.sysUserName)
				// console.log("aaaa")
                // console.log("调用getUsers方法")
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {};
            },
            //新增
            addSubmit() {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            var date1 = new Date(this.addForm.birth);
                            this.addForm.birth = date1.getTime();
                            store.dispatch('addStudent', this.addForm)
                            this.addFormVisible = false;
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
            mounted() {
                this.getUsers();
            }
        }
    }

</script>

<style scoped>

</style>