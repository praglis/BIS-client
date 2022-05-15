<template src="./App.html"></template>

<script>

import axios from "axios";
import {downloadFile} from "@/helpers";

export default {
  name: 'App',

  components: {},

  data: () => ({
    appTitle: 'Bialystok Info Service',
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
    }
  }),
};
</script>
