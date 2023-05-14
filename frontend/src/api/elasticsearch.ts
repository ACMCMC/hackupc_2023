import { Client } from '@elastic/elasticsearch'

export const ESClient = new Client({
    cloud: { id: process.env.REACT_APP_ELASTIC_CLOUD_ID as string },
    auth: { apiKey: process.env.REACT_APP_ELASTIC_CLOUD_API_KEY as string },
})
