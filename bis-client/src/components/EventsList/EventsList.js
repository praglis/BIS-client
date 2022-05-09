import {mockData} from '../EventsShow/EventsShowCommons.js'

export default {
    name: 'events-list',
    components: {},
    props: [],
    data() {
        return {
            events: [
                {
                    id: 1,
                    "name": "Reid Compton Pivitol New Hampshire",
                    "type": "HungaryEventType",
                    "date": "2021-04-28T05:03:26 -02:00"
                },
                {
                    id: 2,
                    "name": "Margo Cash Adornica Hawaii",
                    "type": "MauritaniaEventType",
                    "date": "2017-04-04T01:03:23 -02:00"
                },
                {
                    id: 3,
                    "name": "Franklin Gaines Applidec Virginia",
                    "type": "GuatemalaEventType",
                    "date": "2017-02-20T03:27:33 -01:00"
                },
                {
                    id: 4,
                    "name": "Sheryl Black Vortexaco Palau",
                    "type": "PeruEventType",
                    "date": "2017-09-17T11:57:16 -02:00"
                },
                {
                    id: 5,
                    "name": "Carmen Hanson Iplax Pennsylvania",
                    "type": "TajikistanEventType",
                    "date": "2014-11-11T02:33:27 -01:00"
                },
                {
                    id: 6,
                    "name": "Gregory Beasley Brainclip Virgin Islands",
                    "type": "Burkina FasoEventType",
                    "date": "2017-07-28T10:43:02 -02:00"
                }
            ],
            listHeader: 'Found events',
            eventModel: mockData
        }
    },
    computed: {},
    mounted() {
        console.log('--- START ---')
        console.log('this', this)
        console.log('this.eventModel', this.eventModel)
        console.log('(new Date())', (new Date()))
        console.log('(new Date()).getTimezoneOffset()', (new Date()).getTimezoneOffset())
        const offsetMagic = this.eventModel //- (new Date()).getTimezoneOffset() * 60000
        console.log('offsetMagic', offsetMagic)
        const newDat = new Date()
        console.log('newDat', newDat)
        const toISO = (newDat).toISOString()
        console.log(toISO)
        const res = toISO.substr(0, 10)
        console.log(res)
        return res
    },
    methods: {}
}


