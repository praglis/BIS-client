export default {
    name: 'events-list',
    components: {},
    props: [],
    data() {
        return {
            filters: [
                {title: 'All events', hasDatePicker: false, id: 'ALL'},
                {title: 'Events by day', hasDatePicker: true, id: 'BY_DAY'},
                {title: 'Events by week', hasDatePicker: true, id: 'BY_WEEK'},
            ],
            date: new Date().toISOString().substring(0, 10),
        }
    },
    computed: {},
    methods: {
        prepareRequestInfo(filter) {
            let chosenDate
            switch (filter.id) {
                case 'ALL':
                    return {filterType: 'NONE'}
                case 'BY_DAY':
                    return {
                        filterType: 'DAY',
                        day: this.date
                    }
                case 'BY_WEEK':
                    chosenDate = new Date(this.date)
                    return {
                        filterType: 'WEEK',
                        year: chosenDate.getFullYear(),
                        week: chosenDate.getWeek()
                    }
            }
        }
    }
}


