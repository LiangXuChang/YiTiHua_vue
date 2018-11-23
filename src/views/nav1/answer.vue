<template>
	<section>
		<!--工具条-->
		<el-col :span="19" class="toolbar" style="padding-bottom: 0px;">
        </el-col>
        <el-col :span="5" class="toolbar" style="padding-bottom: 0px;">
        </el-col>
		<el-table :data="this.$store.state.ClassByT" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="classId" label="课程编号" min-width sortable>
			</el-table-column>
			<el-table-column prop="className" label="课程名称" min-width sortable>
			</el-table-column>
			<el-table-column prop="classHome" label="上课班级" min-width sortable>
			</el-table-column>

			<el-table-column label="操作" min-width>
				<template scope="scope">
					<el-button size="small" @click="tiaozhuan1(scope.$index, scope.row)">查看实训</el-button>
					<el-button size="small" @click="tiaozhuan2(scope.$index, scope.row)">查看疑问</el-button>
					<el-button type="danger" size="small" @click="shanchu(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
		</el-col>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">

				<el-form-item label="问题课程" prop="nationality">
					<el-input v-model="addForm.nationality" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="文字描述" prop="examNo">
					<el-input v-model="addForm.examNo" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片描述" prop="identityID">
					<el-input v-model="addForm.identityID" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="视频描述" prop="formalSchooling">
					<el-input v-model="addForm.formalSchooling" auto-complete="off"></el-input>
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
	// import util from '../../common/js/util'
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
            tiaozhuan1:function(index,row){
                this.$router.push({ path: '/Chakanshixun',query:{cid:row.classId,className:row.className}});
            },
            tiaozhuan2:function(index,row){
                this.$router.push({ path: '/Chakanyiwen',query:{clId:row.classId} });
            },
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
                var user = JSON.parse(sessionStorage.getItem('user'));
                this.sysUserName = user.studentAccount;
                store.dispatch('showByT',this.sysUserName)
				// console.log("调用getUsers方法")
			},
            shanchu(index,row){
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    store.dispatch("shanChu",row.classId)
                    this.$message({
                        message: "删除成功",
                        type: 'success'
                    });
                }).catch(() => {

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