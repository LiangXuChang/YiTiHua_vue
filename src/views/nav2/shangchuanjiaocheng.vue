<template>
	<div>
		<form enctype="multipart/form-data" method="post" action="http://47.92.98.224:8080/school-0.0.1-SNAPSHOT/school/test/pvedioupload">
			<!--课程id<input type="text" name="studentName"><br/>-->
			<!--学生账号<input type="text" name="studentId"><br/>-->
			<el-tag>考核点</el-tag>
			<el-input type="text" name="pAssessment" style="width: 960px"></el-input><br/><br/>
			<el-tag>课程id</el-tag>&nbsp;&nbsp;<el-input type="text" name="classId" style="width: 960px"></el-input><br/><br/>
			<el-tag>教程内容</el-tag>&nbsp;<el-input type="textarea" autosize="{ minRows: 2, maxRows: 6 }" name="ptfont" style="width: 950px"></el-input><br/><br/>
			<el-tag>教程视频</el-tag>&nbsp;<input type="file" name="file"/><br/><br/>
			<!--<el-tag>教程图片</el-tag>&nbsp;<input type="file" name="file1"/><br/><br/>-->

			<input type="submit" value="上传"/>
		</form>
		<!--<iframe id="id_iframe" name="nm_iframe" style="display:none;"></iframe>-->
	</div>
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
            tiaozhuan(){
                this.$router.push({ path: '/Kechengxiangqing' });
            }
		}
	}

</script>