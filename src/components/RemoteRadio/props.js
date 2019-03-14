const props = {
    formitem:{
        type:Object,
        radioUrl: String
    },
    loadingkey: {
        type: String,
        required: true
    },
    radioParams: {
    type: Object,
    default: () => {
        return {
        }
    }
    }
}

export default props