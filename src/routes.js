import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import My from './views/nav1/my.vue'
import Management from './views/nav1/management.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav3/Page4.vue'
import Page5 from './views/nav3/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'
import store from './store/index'
import Problem from './views/nav1/problem'
import Answer from './views/nav1/answer'
import shixunzhunbei from './views/nav2/shixunzhunbei'
import Kechengxiangqing from './views/nav2/kechengxiangqing'
import Shangjiaoshixun from './views/nav2/shangjiaoshixun'
import Tichuwenti from './views/nav2/tichuwenti'
import aaaa from './views/TLogin'
import Chakanhuida from './views/nav2/chakanhuida'
import Chakanshixun from './views/nav2/chakanshixun'
import Shixunxiangqing from './views/nav2/shixunxiangqing'
import Chakanyiwen from './views/nav2/chakanyiwen'
import Wentixiangqing from './views/nav2/wentixiangqing'
import Huidawenti from './views/nav2/huidawenti'
import chakanyiwen from './views/nav1/chakanyiwen'
import Shangchuanjiaocheng from './views/nav2/shangchuanjiaocheng'

store.dispatch('mokuai')

var abc = store.state.aaaa

let routes = [
    // {
    //     path: '/TLogin',
    //     component: TLogin,
    //     name: '',
    //     hidden: true
    // },
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true,
        // children: [
            // { path: '/table', component: My},
            // { path: '/form', component: Management},
            // { path: '/problem', component: Problem},
            // { path: '/answer', component: Answer},
            // { path: '/main', component: Main, name: '主页', hidden: true },
            // { path: '/user', component: user},
            // { path: '/shixunzhunbei', component: shixunzhunbei},
            // { path: '/Kechengxiangqing', component: Kechengxiangqing},
            // { path: '/Shangjiaoshixun', component: Shangjiaoshixun},
            // { path: '/Tichuwenti', component: Tichuwenti},
            // { path: '/TLogin', component: TLogin},
        // ]
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main g},
    {
        path: '/',
        component: Home,
        name: abc,
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/table', component: My},
            { path: '/form', component: Management},
            { path: '/problem', component: chakanyiwen},
            { path: '/answer', component: Answer},
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/user', component: user},
            { path: '/shixunzhunbei', component: shixunzhunbei},
            { path: '/Kechengxiangqing', component: Kechengxiangqing},
            { path: '/Shangjiaoshixun', component: Shangjiaoshixun},
            { path: '/Tichuwenti', component: Tichuwenti},
            { path: '/Chakanhuida', component: Chakanhuida},
            { path: '/Chakanshixun', component: Chakanshixun},
            { path: '/Shixunxiangqing', component: Shixunxiangqing},
            { path: '/Chakanyiwen', component: Chakanyiwen},
            { path: '/Wentixiangqing', component: Wentixiangqing},
            { path: '/Huidawenti', component: Huidawenti},
            { path: '/Shangchuanjiaocheng', component: Shangchuanjiaocheng},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航二',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '页面4' },
            { path: '/page5', component: Page5, name: '页面5' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '导航三' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    },
    {
        path: '/aaaa',
        component: aaaa,
        name: '',
        hidden: true
    },
];

export default routes;