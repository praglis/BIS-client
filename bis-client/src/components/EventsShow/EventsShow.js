import * as commons from './EventsShowCommons.js'

export default {
    name: 'events-show',
    components: {...commons.components},
    props: [],
    data() {
        return {
            title: 'Event details',
            labels: commons.labels,
            mode: 'show',
            eventModel: commons.mockData,
            // picker: (new Date(this.eventModel - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
        }
    },
    computed: {},
    mounted() {
    },
    methods: {
        ...commons.methods
    }
}


