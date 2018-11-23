<template>
	<section>
		<!--工具条-->
		<el-col :span="19" class="toolbar" style="padding-bottom: 0px;">

        </el-col>
        <el-col :span="5" class="toolbar" style="padding-bottom: 0px;">

        </el-col>
		<el-table :data="this.$store.state.wenti" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="qid" label="问题编号" min-width sortable>
			</el-table-column>
			<el-table-column prop="studentAccount" label="学生账号" min-width sortable>
			</el-table-column>
			<el-table-column prop="studentName" label="学生名称" min-width sortable>
			</el-table-column>
			<el-table-column label="操作" min-width>
				<template scope="scope">
					<el-button size="small" @click="tiaozhuan1(scope.$index, scope.row)">问题详情</el-button>
					<!--<el-button size="small" @click="tiaozhuan2(scope.$index, scope.row)">查看疑问</el-button>-->
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">

		</el-col>

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
				editLoading: false,
				addLoading: false,
			}
		},
		methods: {
            tiaozhuan1:function(index,row){
                this.$router.push({ path: '/Wentixiangqing',query:{qId:row.qid}});
            },
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
                store.dispatch('Allwenti',this.$route.query.clId)
			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>

</style>