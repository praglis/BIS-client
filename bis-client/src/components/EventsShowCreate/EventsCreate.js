import * as commons from '../EventsShow/EventsShowCommons.js'
import axios from "axios";
import {prepareCreateEventRequest} from "@/requests";

export default {
    name: 'events-create',
    components: {...commons.components},
    props: [],
    data() {//todo stare dane zostają BIS-16
        return {
            title: 'Create new event',
            labels: commons.labels,
            mode: 'create',
            eventModel: commons.emptyMock,
            showErrorMsg: false,
            errorMessage: 'Could not create an event.'
        }
    },
    computed: {
        eventName() {
            return this?.eventModel?.name
        },
        eventType() {
            return this?.eventModel?.type
        },
        dateModel: {
            get() {
                return this?.eventModel?.date
            },
            set(newDate) {
                this.eventModel.date = newDate
            }
        }
    },
    methods: {
        ...commons.methods,
        submitChanges() {
            const request = prepareCreateEventRequest(this.eventModel)
            console.log('[INFO]: createEvent request', request)

            axios.post('http://localhost:8181/soap-api/events?wsdl',
                request,
                {
                    headers:
                        {'Content-Type': 'text/xml'}
                })
                .then(res => {
                    console.log('[INFO]: createEvent response', res);
                    this.$router.replace('/events')
                })
                .catch(err => {
                    this.showErrorMsg = true
                    console.log(err)
                });
        }
    }
}


