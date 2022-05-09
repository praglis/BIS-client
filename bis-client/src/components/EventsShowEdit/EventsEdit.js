import * as commons from '../EventsShow/EventsShowCommons.js'

export default {
    name: 'events-edit',
    components: {...commons.components},
    props: [],
    data() {
        return {
            title: 'Edit event details',
            labels: commons.labels,
            eventModel: commons.mockData,
            mode: 'edit'
        }
    },
    computed: {},
    mounted() {

    },
    methods: {...commons.methods}
}


