import * as commons from './EventsShowCommons.js'
import {prepareGetEventRequest} from "@/requests";
import axios from "axios";
import {getSoapPayloadFromHttpResponse, mapObjectPropsToStrings} from "@/helpers";

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
        eventName() {
            return this.eventModel?.name ?? ''
        },
        eventType() {
            return this.eventModel?.type ?? ''
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
    created() {
        this.sendGetRequest(this.$route.params['id'])
    },
    methods: {
        ...commons.methods,
        sendGetRequest(id) {
            const request = prepareGetEventRequest(id);
            console.log('getEvent request', request)
            axios.post('http://localhost:8181/soap-api/events?wsdl',
                request,
                {
                    headers:
                        {'Content-Type': 'text/xml'}
                })
                .then(res => {
                    console.log('getEvent response', res);
                    let responsePayload = getSoapPayloadFromHttpResponse('getEvent', res)
                    mapObjectPropsToStrings(responsePayload)
                    this.eventModel = responsePayload
                    console.log('this.eventModel', this.eventModel);
                })
                .catch(err => {
                    console.log(err)
                });
            return commons.mockData
        },
        submitChanges() {
            console.log('Request: updateEvent, event = ', this.eventModel)
        }
    }
}


