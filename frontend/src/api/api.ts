// Methods for interacting with the backend API

import axios from 'axios';
import { FAKE_DATA } from './fake_data';
import { House } from '../models/House';

// Load the local JSON file 'top-10k.json' into memory
//const TENK_FAKE_DATA = require('./top-10k.json');

const api = axios.create({
    baseURL: 'https://api.mikasa.tech',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getAppliances = async (searchTerms: string[], forStudents: boolean, sustainable: boolean, orderBy: string) => {
    const response = await api.post('/getAppliances', { params: { params: searchTerms, forStudents: forStudents, sustainable: sustainable, orderBy: orderBy } });
    return response.data;
}

export const getCompletion = async (text: string) => {
    //return 'do';
    const response = await api.get('/getCompletion', { params: { text: text } });
    // Only keep the text after the last 'Answer: '
    const answer = response.data[0]['generated_text'].split('Answer: ').pop();
    return answer;
}

export const getReview = async (house: House) => {
    try {
        // First, build a representation of the house
        var representation = JSON.stringify(house.rooms_and_appliances);
        // Build a representation of the houses rooms and appliances.
        console.log(house)
        console.log(JSON.stringify(house['rooms_and_appliances']))

        representation += "{\n";
        house.rooms_and_appliances.forEach((value, key) => {

            representation += `"${key}": [`;
            for (const appliance of value) {
                representation += `"${appliance}", `;
            }
            //representation = representation.slice(0, -2);
            representation += "],\n";
        });

        representation += "}";
        console.log(representation);

        const response = await api.post('/getReview', { params: { params: representation } });
        return response.data;
    } catch (e) {
        return "A lovely home!";
    }
}

const turn_es_doc_into_house = (doc: any) => {
    var rooms_and_appliances: Map<string, string[]> = new Map();
    console.log(doc);
    for (let [key, value] of Object.entries(doc['image_data']['features_by_room_type'])) {
        if (value === undefined || value === null)
            continue;

        var appliances: string[] = [];
        for (const appliance of (value as any)['unique_features']) {
            appliances.push(appliance['label']);
        }
        rooms_and_appliances.set(key, appliances);
    }

    const house: House = {
        id: doc['id'],
        description: doc['description'],
        address: doc['neighborhood'],
        price: doc['price'],
        image: doc['images'].length > 0 ? doc['images'][0] : undefined,
        name: 'Name',
        rooms_and_appliances: rooms_and_appliances,
    };
    return house;
};


export const getHouses = async (searchTerms: string[], forStudents: boolean, sustainable: boolean, orderBy: string) => {
    try {
        const list_of_houses = [];
        while (list_of_houses.length < 10) {
            const response = await api.get('/getES', { params: { term: searchTerms[0] } });
            // In the response, replace 'None' with 'null'
            console.log(response.data);
            if ((response.data as string).charAt(0) === '{') {
                const replacedResponse = response.data.replace(/None/g, 'null');
                const processed = turn_es_doc_into_house(JSON.parse(replacedResponse));
                list_of_houses.push(processed);
            } else {
                break;
            }
        }

        return list_of_houses;
    } catch (e) {
        console.log(e);
        return FAKE_DATA['hits']['hits'].map((doc: any) => turn_es_doc_into_house(doc['_source']));
    }
};