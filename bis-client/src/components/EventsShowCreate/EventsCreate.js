import * as commons from '../EventsShow/EventsShowCommons.js'

export default {
    name: 'events-create',
    components: {...commons.components},
    props: [],
    data() {
        return {
            title: 'Create new event',
            labels: commons.labels,
            mode: 'create',
            eventModel: null,
            // picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
        }
    },
    computed: {},
    mounted() {

    },
    methods: {
        ...commons.methods
    }
}


