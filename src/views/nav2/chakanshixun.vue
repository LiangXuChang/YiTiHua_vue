<template>
	<section>
		<!--工具条-->
		<el-col :span="19" class="toolbar" style="padding-bottom: 0px;">

        </el-col>
        <el-col :span="5" class="toolbar" style="padding-bottom: 0px;">

        </el-col>
		<el-table :data="this.$store.state.shixun" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="implId" label="实训编号" min-width sortable>
			</el-table-column>
			<el-table-column prop="studentId" label="学生编号" min-width sortable>
			</el-table-column>
			<el-table-column prop="studentName" label="学生名称" min-width sortable>
			</el-table-column>
			<!--<el-table-column prop="classHome" label="上课班级" min-width sortable>-->
			<!--</el-table-column>-->

			<el-table-column label="操作" min-width>
				<template scope="scope">
					<el-button size="small" @click="tiaozhuan1(scope.$index, scope.row)">实训详情</el-button>
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
				sels: [],//列表选中列
				editLoading: false,
				addFormVisible: false,//新增界面是否显示
				addLoading: false,
			}
		},
		methods: {
            tiaozhuan1:function(index,row){
                store.state.c1=this.$route.query.cid;
                store.state.c2=this.$route.query.className;
                console.log(this.$route.query.cid)
				// console.log(this.$route.query.className)
                this.$router.push({ path: '/Shixunxiangqing',query:{ImplId:row.implId,cd:this.$route.query.cid,studentId:row.studentId,cName:this.$route.query.className}});
            },
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
                store.dispatch('showByClassId',this.$route.query.cid)
			},
			selsChange: function (sels) {
				this.sels = sels;
			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>

</style>