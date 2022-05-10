import {mockData} from '../EventsShow/EventsShowCommons.js'

export default {
    name: 'events-list',
    components: {},
    props: {
        events: {
            type: Array
        },
        isPdfDownloadable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            listHeader: 'Found events',
            eventModel: mockData
        }
    },
    computed: {},
    mounted() {
    },
    methods: {}
}


