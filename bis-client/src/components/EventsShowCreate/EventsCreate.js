import * as commons from '../EventsShow/EventsShowCommons.js'

export default {
    name: 'events-create',
    componentsa: {...commons.components},
    props: [],
    data() {
        return {
            title: 'Create new event',
            labels: commons.labels,
            mode: 'create',
            eventModel: null,
        }
    },
    computed: {
        dateModel() {
            this?.eventModel?.date?.substr(0, 10)
        }
    },
    mounted() {

    },
    methods: {
        ...commons.methods
    }
}


