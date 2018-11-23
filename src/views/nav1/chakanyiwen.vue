<template>
	<section>
		<!--工具条-->
		<el-col :span="19" class="toolbar" style="padding-bottom: 0px;">
        </el-col>
        <el-col :span="5" class="toolbar" style="padding-bottom: 0px;">
        </el-col>
		<el-table :data="this.$store.state.Allyiwen" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="qid" label="问题编号" min-width sortable>
			</el-table-column>
			<el-table-column label="操作" min-width>
				<template scope="scope">
					<el-button size="small" @click="tiaozhuan(scope.$index, scope.row)">查看回答</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
		</el-col>
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