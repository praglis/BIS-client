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
            eventModel: commons.emptyMock,
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
    created() {
        this.eventModel = this.sendGetRequest(this.$route.params['id'])
    },
    methods: {
        ...commons.methods,
        sendGetRequest(id) {
            console.log('Request: getEvent, id = ', id)
            // axios.post('http://www.webservicex.com/CurrencyConvertor.asmx?wsdl',
            //     xmls,
            //     {
            //         headers:
            //             {'Content-Type': 'text/xml'}
            //     })
            //     .then(res => {
            //         console.log(res);
            //     })
            //     .catch(err => {
            //         console.log(err)
            //     });
            return commons.mockData
        },
        submitChanges() {
            console.log('Request: updateEvent, event = ', this.eventModel)
        }
    }
}


