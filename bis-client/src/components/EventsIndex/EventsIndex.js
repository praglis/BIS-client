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
import {
    prepareDeleteEventRequest,
    prepareGetAllEventsRequest,
    prepareGetEventsByDayRequest,
    prepareGetEventsByWeekRequest
} from "@/requests";

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
            lastRequestInfo: {},
            noEventsFound: 'No events found.',
            showNoEventsMsg: false,
        }
    },
    computed: {},
    created() {
        if (this.events.length <= 0) this.sendFilteredRequest()
    },
    methods: {
        sendFilteredRequest(requestInfo = this.lastRequestInfo) {
            console.log('[INFO] sendFilteredRequest() param requestInfo = ', requestInfo)
            this.lastRequestInfo = requestInfo
            switch (requestInfo?.filterType) {
                case 'DAY':
                    this.sendGetByDayRequest(requestInfo.day)
                    break;
                case 'WEEK':
                    this.sendGetByWeekRequest(requestInfo.week, requestInfo.year)
                    break;
                case 'NONE':
                default:
                    this.sendGetAllRequest()
                    break;
            }
        },
        sendGetAllRequest() {
            const request = prepareGetAllEventsRequest();
            console.log('[INFO]: getEvents request', request)
            axios.post('http://localhost:8181/soap-api/events?wsdl',
                request,
                {
                    headers: {'Content-Type': 'text/xml'}
                })
                .then(response => {
                    this.handleEventsResponse(response, 'getEvents')
                })
                .catch(err => {
                    this.showNoEventsMsg = true
                    console.log('[ERROR]: Could not fetch all events.')
                    console.log(err)
                });
        },
        sendDeleteRequest(id) {
            const request = prepareDeleteEventRequest(id);
            console.log('[INFO] deleteEvent request', request)
            axios.post('http://localhost:8181/soap-api/events?wsdl',
                request,
                {
                    headers: {'Content-Type': 'text/xml'}
                })
                .then(res => {
                    console.log('[INFO] deleteEvent response', res);
                    this.sendFilteredRequest();
                })
                .catch(err => {
                    console.log('[ERROR]: Could not delete the event.')
                    console.log(err)
                });
        },
        sendGetByDayRequest(day) {
            console.log('[INFO]: getEventsByDay for day', day)
            const request = prepareGetEventsByDayRequest(day)
            console.log('[INFO]: getEventsByDay request', request)
            axios.post('http://localhost:8181/soap-api/events?wsdl',
                request,
                {
                    headers: {'Content-Type': 'text/xml'}
                })
                .then(response => {
                    this.handleEventsResponse(response, 'getEventsForDay')
                })
                .catch(err => {
                    this.showNoEventsMsg = true
                    console.log('[ERROR]: Could not fetch events by day.')
                    console.log(err)
                });
        },
        sendGetByWeekRequest(weekNumber, year) {
            if (weekNumber == null || year == null) {
                this.showNoEventsMsg = true
                console.log(`[ERROR] Can not create getEventsForWeek request for week number ${weekNumber} and year ${year}`)
                return
            }
            console.log(`[INFO] getEventsByWeek for week number ${weekNumber} and year ${year}`)
            const request = prepareGetEventsByWeekRequest(weekNumber, year)
            console.log('[INFO]: getEventsByWeek request', request)
            axios.post('http://localhost:8181/soap-api/events?wsdl',
                request,
                {
                    headers: {'Content-Type': 'text/xml'}
                })
                .then(response => {
                    this.handleEventsResponse(response, 'getEventsForWeek')
                })
                .catch(err => {
                    this.showNoEventsMsg = true
                    console.log('[ERROR]: Could not fetch events by week.')
                    console.log(err)
                });
        },
        sendGetPdfRequest() {
            let fileData;
            axios.get('requests/generatePdf.xml')
                .then(generatePdf => {
                    console.log('[INFO] generatePdf request')
                    axios.post('http://localhost:8181/soap-api/events?wsdl',
                        generatePdf.data,
                        {
                            headers:
                                {'Content-Type': 'text/xml'}
                        })
                        .then(res => {
                            console.log('[INFO] generatePdf response', res);
                            fileData = res.data.split('<return>')[1].split('</return>')[0]
                            console.log(res)
                            downloadFile('events.pdf', fileData)
                        })
                        .catch(err => {
                            console.log('[ERROR]: Could not get a PDF file.')
                            console.log(err)
                        });
                })
        },
        preparePdfRequestParams() {
            return this.lastRequestInfo
        },
        handleEventsResponse(res, operationName) {
            let responsePayload = getSoapPayloadFromHttpResponse(operationName, res)
            console.log('[INFO]: Response payload', responsePayload);

            if (isObject(responsePayload)) {
                responsePayload = [responsePayload]
            }
            if (!isArray(responsePayload)) {
                console.log('[WARN]: Response payload is neither an object or an array.')
                this.events = []
                this.showNoEventsMsg = true
                return
            }
            responsePayload = mapObjectPropsToStringsInArray(responsePayload)

            this.events = responsePayload
            console.log('[INFO]: fetched this.events', this.events);
        }
    }
}
