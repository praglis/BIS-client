import {getStringValOrElse} from '@/helpers'

export default {
    name: 'app-text-field',
    components: {},
    props: {
        name: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        inValue: {
            type: String
        }
    },
    data() {
        return {
            actualValue: this.inValue
        }
    },
    computed: {
        computedActualValue: {
            get() {
                return this.inValue
            },
            set(newVal) {
                this.actualValue = newVal
            }
        }
    },
    methods: {
        getStringValOrElse
    }
}
