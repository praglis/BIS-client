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
            eventModel: commons.emptyMock
        }
    },
    computed: {
        dateModel: {
            get() {
                return this?.eventModel?.date
            },
            set(newDate) {
                this.eventModel.date = newDate
            }
        }
    },
    mounted() {

    },
    methods: {
        ...commons.methods,
        submitChanges() {
            console.log('Request: createEvent, event = ', this.eventModel)
            this.$router.replace('/events/show/' + 201)
        }
    }
}


