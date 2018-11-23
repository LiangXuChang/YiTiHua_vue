<template>
	<div>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="课程编号">
			<el-input v-model="form.classId"></el-input>
		</el-form-item>
		<el-form-item label="考核点">
			<el-input v-model="form.pAssessment"></el-input>
		</el-form-item>
		<el-form-item label="教学内容">
			<el-input v-model="form.pTFont"></el-input>
		</el-form-item>
		<!--<el-form-item label="教学图片">-->
			<!--<el-input v-model="form.pTImg"></el-input>-->
		<!--</el-form-item>-->
		<el-form-item label="教学视频">
			<el-input v-model="form.pVideo"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary">立即创建</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
		<el-upload
				:auto-upload="false"
				:action="uploadUrl"
				ref="upload"
				:before-upload="fnBeforeUpload"
				:on-success="fnUploadSuccess"
				:on-exceed="fnUploadExceed"
				:data="data_extra"
				:headers="uploadHeaders"
				:http-request="fnUploadRequest"
				drag
				:limit="files"
				:disabled="disabled"
				multiple>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			<div slot="tip" class="el-upload__tip">上传文件大小不能超过 1G</div>
		</el-upload>
	</el-form>
	<video-player  class="video-player vjs-custom-skin"
				   ref="videoPlayer"
				   :playsinline="true"
				   :options="playerOptions"
	></video-player>
		<img src="https://huanxianghk-work.oss-cn-shenzhen.aliyuncs.com/upload/avatar/无标题.png" style="width:100px;height:100px;border-radius:5px;"/>
	</div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    classId: '',
                    pAssessment: '',
                    pTFont: '',
                    pTImg: '',
                    pVideo: '',
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
                        src: "http://huanxianghk-work.oss-cn-shenzhen.aliyuncs.com/upload/avatar/WeChat_20180918172854.mp4" //url地址
                    }],
                    poster: "../../static/images/test.jpg", //你的封面地址
                    // width: document.documentElement.clientWidth,
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true  //全屏按钮
                    }
                }
            }
        },
	}

</script>
<style>
	.video-js .vjs-big-play-button{}
</style>