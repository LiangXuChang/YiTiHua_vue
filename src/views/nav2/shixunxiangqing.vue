<template>
	<section>
	<el-form ref="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="实训内容">
			<strong class="title">{{oneshixun.implFont}}</strong>
		</el-form-item>
		<!--<el-form-item label="实训图片">-->
			<!--<img :src=oneshixun.implImg style="width:400px;height:400px;border-radius:5px;"/>-->
		<!--</el-form-item>-->
		<el-form-item label="实训视频">
			<video-player  class="video-player vjs-custom-skin"
						   ref="videoPlayer"
						   :playsinline="true"
						   :options="playerOptions"
			></video-player>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="pingfen">评分</el-button>
		</el-form-item>
	</el-form>

		<!--评分界面-->
		<el-dialog title="新增" v-model="pingfenVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="课程分数" prop="mobile">
					<el-input v-model="addForm.eGrade" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="pingfenVisible = false">取消</el-button>
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
                oneshixun:'',
                addForm:{
                    // grade:''
				},
				form: {

				},
                pingfenVisible:false,
                playerOptions : {
                    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: false, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                        type: "",
                        src: '' //url地址
                        // http://huanxianghk-work.oss-cn-shenzhen.aliyuncs.com/upload/avatar/WeChat_20180918172854.mp4
                    }],
                    // poster: "../../static/images/test.jpg", //你的封面地址
                    // width: document.documentElement.clientWidth,
                    notSupportedMessage: '视频播放成功', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true  //全屏按钮
                    }
                }
			}
		},
		methods: {
            pingfen(){
                this.pingfenVisible=true;
			},
			onSubmit() {
				console.log('submit!');
			},
			getMsg(){
                var instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                var _this = this;
                instance({
                    method: 'get',
                    url: 'http://47.92.98.224:8080/school-0.0.1-SNAPSHOT/school/implementation/showOne',
                    params:{
                        ImplId:this.$route.query.ImplId
                    }
                }).then(res => {
                    _this.oneshixun=res.data.data
                    _this.playerOptions.sources[0].src=res.data.data.implVideo
                }).catch(function (err) {
                    console.log(err)
                    console.log("失败")
                })
			},
            addSubmit(){
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            console.log(store.state.c1)
                            this.addLoading = true;
                            var user = JSON.parse(sessionStorage.getItem('user'));
                            this.sysUserName = user.studentAccount;
                            this.addForm.classId=store.state.c1;
							this.addForm.className=store.state.c2,
                            this.addForm.studentId=this.sysUserName
                            store.dispatch('pingfeng',this.addForm)
                            this.pingfenVisible = false;
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
			}
		},
		created(){
		    this.getMsg();
		}
	}

</script>