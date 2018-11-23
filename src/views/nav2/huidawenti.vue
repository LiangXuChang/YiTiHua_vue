<template>
	<form enctype="multipart/form-data" method="post" action="http://47.92.98.224:8080/school-0.0.1-SNAPSHOT/school/test/avedioupload" target="nm_iframe">
		<el-tag>学生账号</el-tag>&nbsp;<el-input type="text" name="studentAccount" style="width: 960px"></el-input><br/><br/>
		<!--教师<input type="text" name="studentAccount"><br/>-->
		<el-tag>问题id</el-tag>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-input type="text" name="qid" style="width: 960px"></el-input><br/><br/>
		<el-tag>解答内容</el-tag>&nbsp;<el-input type="textarea" autosize="{ minRows: 2, maxRows: 6 }" name="aFont" style="width: 960px"></el-input><br/><br/>
		<el-tag>解答视频</el-tag>&nbsp;<input type="file" name="file"/><br/><br/>
		<!--<el-tag>解答图片</el-tag>&nbsp;<input type="file" name="file1"/><br/><br/>-->

		<input type="submit" value="上传"/>
	</form>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
            // tiaozhuan(){
            //     this.$router.push({ path: '/Wentixiangqing' });
            // }
		}
	}

</script>