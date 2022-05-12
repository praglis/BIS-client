import * as commons from '../EventsShow/EventsShowCommons.js'
import axios from "axios";
import {xml2json} from "xml-js";
import {getPayloadFromSoapJson, isArray, isObject} from "@/helpers";
import {prepareCreateEventRequest} from "@/requests";

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
        eventName() {
            return this?.eventModel?.name ?? ''
        },
        eventType() {
            return this?.eventModel?.type ?? ''
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
            console.log('createEvent request', request)

            axios.post('http://localhost:8181/soap-api/events?wsdl',
                request.data,
                {
                    headers: {
                        'Content-Type': 'application/xml'
                    }
                })
                .then(res => {
                    console.log('createEvent response', res);
                    const jsonResponse = JSON.parse(xml2json(res.data, {compact: true}))
                    console.log('getEvents response in JSON', jsonResponse);

                    let responsePayload = getPayloadFromSoapJson(jsonResponse, 'ns2:getEventsResponse')
                    if (isObject(responsePayload)) {
                        responsePayload = [responsePayload]
                    } else if (!isArray(responsePayload)) {
                        console.log('ERROR: Response payload is neither an object or an array.')
                        this.events = []
                        this.showNoEventsMsg = true
                        return
                    }
                    console.log('response payload1', responsePayload);
//
                    if (responsePayload) {
                        this.$router.replace('/events/show/' + responsePayload.id)
                    } else {
                        this.events = []
                        this.showNoEventsMsg = true
                    }
                })
                .catch(err => {
                    console.log(err)
                });
        }
    }
}


