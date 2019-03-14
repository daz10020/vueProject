const isShowInput = {
    state:{
        hideInputValue:''
    },
    mutations:{
        MODIFY_HIDE_ID(state,value){
            state.hideInputValue = value
        }
    },
    actions:{
       MODIFY_ID({commit},value){
           commit('MODIFY_HIDE_ID',value)
       }
    }
}

export default isShowInput