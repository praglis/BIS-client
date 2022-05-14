import EventsList from "@/components/EventsList/EventsList.vue";
import EventsFilter from "@/components/EventsFilter/EventsFilter.vue";
import {getSoapPayloadFromHttpResponse, isArray, isObject, mapObjectPropsToStringsInArray} from "@/helpers";
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
                    this.sendGetByWeekRequest(requestInfo.week)
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
                    console.log('deleteEvent response', res);
                    this.sendFilteredRequest();
                })
                .catch(err => {
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
                    console.log('[ERROR]: Could not fetch events by day.')
                    console.log(err)
                });
        },
        sendGetByWeekRequest(weekNumber) {
            console.log('[INFO] getEventsByWeek for week number', weekNumber)
            const request = prepareGetEventsByWeekRequest(weekNumber)
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
                            console.log('generatePdf response', res);
                            fileData = res.data.split('<return>')[1].split('</return>')[0]
                            console.log(res)
                            var link = document.createElement('a');
                            link.innerHTML = 'Download PDF file';
                            link.download = 'file.pdf';
                            link.href = 'data:application/octet-stream;base64,' + fileData;
                            document.body.appendChild(link);
                            link.click();
                            setTimeout(() => {
                                document.body.removeChild(link);
                            }, 0);
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
