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
            eventModel: null
        }
    },
    computed: {},
    mounted() {

    },
    methods: {
        ...commons.methods
    }
}


