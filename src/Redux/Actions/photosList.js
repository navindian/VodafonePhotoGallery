import * as types from '../ActionTypes/Types';
import api from '../../Config/api';

export const listPhotos = (photos) => ({
    type: types.VF_NZ_PHOTOLIST,
    payload: photos,
})

 export const photosList = () => dispatch => {
    api.photos.photosList().then(res =>{
        console.log(res);
        dispatch(listPhotos(res.data));
    })
}
