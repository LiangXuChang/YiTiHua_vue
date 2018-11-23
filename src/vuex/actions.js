// //test
// import axios from 'axios'
// export const increment = ({commit}) => {
//     commit('INCREMENT')
// }
// export const decrement = ({commit}) => {
//     commit('DECREMENT')
// }
// export const setmokuai = ({commit, state}) => {
//     axios({
//         method: 'get',
//         url: 'http://180.76.117.22:81/EduOAService.asmx/GetAllDepartments',
//         // data: context.state.test02
//     }).then(function (res) {
//         store.state.test=res.data.data
//         store.state.thomeworkTitle=res.data.data[0].thomeworkTitle
//         console.log(store.state.thomeworkTitle)
//     }).catch(function (err) {
//         console.log(err)
//     })
//     commit('DECREMENT')
// }
