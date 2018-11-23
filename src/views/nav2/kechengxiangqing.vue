<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="考核内容">
			<strong class="title">{{OnePrepareMsg.passessment}}</strong>
		</el-form-item>
		<el-form-item label="教学内容">
			<strong class="title">{{OnePrepareMsg.ptfont}}</strong>
		</el-form-item>
		<!--<el-form-item label="教学图片">-->
			<!--<img :src=OnePrepareMsg.ptimg style="width:400px;height:400px;border-radius:5px;"/>-->
		<!--</el-form-item>-->
		<el-form-item label="教学视频">
			<video-player  class="video-player vjs-custom-skin"
						   ref="videoPlayer"
						   :playsinline="true"
						   :options="playerOptions"
			></video-player>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="tiaozhuan">上交实训</el-button>
			<!--<el-button @click.native.prevent>返回</el-button>-->
		</el-form-item>
	</el-form>
</template>

<script>
    import store from '../../store/index'
    import axios from 'axios'
	export default {
		data() {
			return {
                OnePrepareMsg:'',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
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
                    notSupportedMessage: '视频成功播放', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
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
			onSubmit() {
				console.log('submit!');
			},
			getMsg(){
                // store.dispatch("showOnePrepare",this.$route.query.classId)
				console.log("调用")
                var instance = axios.create({
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                });
                var _this = this;
                instance({
                    method: 'get',
                    url: 'http://47.92.98.224:8080/school-0.0.1-SNAPSHOT/school/prepare/showByC',
                    params:{
                        classId:this.$route.query.classId
                    }
                }).then(function (res) {
                    _this.OnePrepareMsg=res.data.data
                    _this.playerOptions.sources[0].src=res.data.data.pvideo
					console.log(this.OnePrepareMsg)
                }).catch(function (err) {
                    console.log(err)
                })
                console.log("调用1")
			},
            tiaozhuan(){
                this.$router.push({ path: '/Shangjiaoshixun',query:{cId:this.$route.query.classId} });
			}
		},
		created(){
		    this.getMsg();
		}
	}

</script>