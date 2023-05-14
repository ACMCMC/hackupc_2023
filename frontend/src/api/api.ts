// Methods for interacting with the backend API

import axios from 'axios';
import { FAKE_DATA } from './fake_data';
import { House } from '../models/House';

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
    //return 'do';

    // First, build a representation of the house

    const response = await api.get('/getReview', { params: { params: house.rooms_and_appliances } });
    return response.data;
}

const turn_es_doc_into_house = (doc: any) => {
    var rooms_and_appliances: Map<string, string[]> = new Map();
    for (let [key, value] of Object.entries(doc['image_data']['features_by_room_type'])) {
        if (key === undefined)
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
        address: 'abc',
        price: doc['price'],
        image: doc['images'].length > 0 ? doc['images'][0] : undefined,
        name: 'rez',
        rooms_and_appliances: rooms_and_appliances,
    };
    return house;
};
        

export const getHouses = async (searchTerms: string[], forStudents: boolean, sustainable: boolean, orderBy: string) => {
    return FAKE_DATA['hits']['hits'].map((doc: any) => turn_es_doc_into_house(doc['_source']));
};