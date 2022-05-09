/* eslint-disable */
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
            eventModel: commons.mockData
        }
    },
    computed: {},
    mounted() {

    },
    methods: {...commons.methods}
}


