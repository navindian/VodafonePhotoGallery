import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import {InvokeGetAPI} from '../API/InvokeAPI'
import APIConfig, {APIEndPointConfig} from '../Config/APIConfig'

describe('Validating API data', () => {
    it('Verify albums api return data', done => {
        var mock = new MockAdapter(axios);
        const data = { response: true };
        mock.onGet(APIConfig.apiBaseURL + APIEndPointConfig.listAlbum).reply(200, data);

        InvokeGetAPI(APIConfig.apiBaseURL + APIEndPointConfig.listAlbum).then(response => {
            expect(response).toEqual(data);
            done();
        });
    });    

    it('Verify users api return data', done => {
        var mock = new MockAdapter(axios);
        const data = { response: true };
        mock.onGet(APIConfig.apiBaseURL + APIEndPointConfig.listUsers).reply(200, data);

        InvokeGetAPI(APIConfig.apiBaseURL + APIEndPointConfig.listUsers).then(response => {
            expect(response).toEqual(data);
            done();
        });
    });     
    
    it('Verify Photo list by id api return data', done => {
        var mock = new MockAdapter(axios);
        const data = { response: true };
        mock.onGet(APIConfig.apiBaseURL + APIEndPointConfig.photoList + "/1").reply(200, data);

        InvokeGetAPI(APIConfig.apiBaseURL + APIEndPointConfig.photoList + "/1").then(response => {
            expect(response).toEqual(data);
            done();
        });
    });
    
    it('Verify album name id api return data', done => {
        var mock = new MockAdapter(axios);
        const data = { response: true };
        mock.onGet(APIConfig.apiBaseURL + APIEndPointConfig.album + "/1").reply(200, data);

        InvokeGetAPI(APIConfig.apiBaseURL + APIEndPointConfig.album + "/1").then(response => {
            expect(response).toEqual(data);
            done();
        });
    });    
})