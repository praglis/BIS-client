import {getWeekNumber} from "@/helpers";

export default {
    name: 'events-list',
    components: {},
    props: [],
    data() {
        return {
            filters: [
                {title: 'All events', icon: 'mdi-view-dashboard', hasDatePicker: false, id: 'ALL'},
                {title: 'Events by day', icon: 'mdi-image', hasDatePicker: true, id: 'BY_DAY'},
                {title: 'Events by week', icon: 'mdi-help-box', hasDatePicker: true, id: 'BY_WEEK'},
            ],
            date: new Date().toISOString().substring(0, 10),
        }
    },
    computed: {},
    methods: {
        prepareRequestInfo(filter) {
            switch (filter.id) {
                case 'ALL':
                    return {filterType: 'NONE'}
                case 'BY_DAY':
                    return {
                        filterType: 'DAY',
                        day: this.date
                    }
                case 'BY_WEEK':
                    return {
                        filterType: 'WEEK',
                        week: getWeekNumber(new Date(this.date))
                    }
            }
        }
    }
}


