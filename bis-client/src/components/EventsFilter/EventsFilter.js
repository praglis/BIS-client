export default {
    name: 'events-list',
    components: {},
    props: [],
    data() {
        return {
            filters: [
                {title: 'All events', icon: 'mdi-view-dashboard', hasDatePicker: false},
                {title: 'Events by day', icon: 'mdi-image', hasDatePicker: true},
                {title: 'Events by week', icon: 'mdi-help-box', hasDatePicker: true},
            ],
            right: null,
        }
    },
    computed: {},
    mounted() {

    },
    methods: {}
}


