import EventsList from "@/components/EventsList/EventsList.vue";
import EventsFilter from "@/components/EventsFilter/EventsFilter.vue";
import {
    downloadFile,
    getSoapPayloadFromHttpResponse,
    isArray,
    isObject,
    mapObjectPropsToStringsInArray
} from "@/helpers";
import axios from "axios";

export default {
    name: 'events-index',
    components: {
        EventsList,
        EventsFilter
    },
    props: [],
    data() {
        return {
            events: [],
            lastRequestInfo: null,
            noEventsFound: 'No events found.',
            showNoEventsMsg: false,
        }
    },
    computed: {},
    methods: {
        sendFilteredRequest(requestInfo) {
            this.lastRequestInfo = requestInfo
            console.log('sendFilteredRequest() param requestInfo = ', requestInfo)
            switch (requestInfo.filterType) {
                case 'NONE':
                    this.sendGetAllRequest()
                    break;
                case 'DAY':
                    this.sendGetByDayRequest(requestInfo.day)
                    break;
                case 'WEEK':
                    this.sendGetByWeekRequest(requestInfo.weekNumber)
                    break;

            }
        },
        sendGetAllRequest() {
            axios.get('requests/getEventsRequest.xml')
                .then(getEventsRequest => {
                    console.log('getEvents request', getEventsRequest.data)
                    axios.post('http://localhost:8181/soap-api/events?wsdl',
                        getEventsRequest.data,
                        {
                            headers:
                                {'Content-Type': 'text/xml'}
                        })
                        .then(res => {
                            let responsePayload = getSoapPayloadFromHttpResponse('getEvents', res)

                            if (isObject(responsePayload)) {
                                responsePayload = [responsePayload]
                            } else if (!isArray(responsePayload)) {
                                console.log('ERROR: Response payload is neither an object or an array.')
                                this.events = []
                                this.showNoEventsMsg = true
                                return
                            }

                            if (responsePayload) {
                                responsePayload = mapObjectPropsToStringsInArray(responsePayload)
                                this.events = responsePayload
                            } else {
                                this.events = []
                                this.showNoEventsMsg = true
                            }
                            console.log('response payload', responsePayload);
                        })
                        .catch(err => {
                            console.log(err)
                        });
                })
        },
        sendGetByDayRequest(day) {
            console.log('Request: getEventsByDay, day = ', day)
            console.log('Response: getEventsByDay, events = ', this.fetchedEvents)
            return this.fetchedEvents
        },
        sendGetByWeekRequest(weekNumber) {
            console.log('Request: getEventsByDay, week number = ', weekNumber)
            console.log('Response: getEventsByDay, events = ', this.fetchedEvents)
            return this.fetchedEvents
        },
        sendGetPdfRequest(requestParams) {
            console.log('Request: getPdf, requestParams = ', {requestParams})
            const file = new File([], 'samplePdf', {type: 'application/pdf'});
            console.log('Response: getPdf, PDF = ', file)
            downloadFile(file)
        },
        preparePdfRequestParams() {
            return this.lastRequestInfo
        }
    }
}
