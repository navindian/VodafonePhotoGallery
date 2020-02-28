import React  ,{useEffect ,useState}from 'react'
import { connect } from 'react-redux'
import { photosList } from '../../Redux/Actions/photosList'
import { albumsList } from '../../Redux/Actions/albumsList'
import Loader from '../Common/Loader'
import Pagination from '../Common//Pagination'
import PhotoCard from './PhotoCard'

const  ListPhoto = props => {
    const [totalPhotos,changetotalPhotos]=useState([])
    const [currentPhotos,changecurrentPhotos]=useState([])
    
    useEffect(() =>{
        props.photosList().then(() => {
            changetotalPhotos(props.photos)
           
        }).catch((err) => {
            console.log(err)
            changetotalPhotos([])
        });
    })

    const onPageChanged = data => {
        const { currentPage, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        changecurrentPhotos(props.photos.slice(offset, offset + pageLimit));
    };
        return (
            <div>
                {totalPhotos !== undefined && totalPhotos.length > 0 ?
                    <div>
                        <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                            <div className="d-flex flex-row py-4 align-items-center">
                                <Pagination
                                    totalRecords={totalPhotos.length}
                                    pageLimit={21}
                                    pageNeighbours={1}
                                    onPageChanged={onPageChanged}
                                />
                            </div>
                        </div>
                        {currentPhotos.map(photos => (
                            <PhotoCard key={photos.id} photos={photos} />
                        ))}
                    </div>
                       :
                    <Loader /> 
                }
            </div>
        )
    }

const mapStateToProps = state => {
    return {
        photos: state.photos,
        albums: state.albums
    }
}

export default connect(mapStateToProps, {photosList,albumsList})(ListPhoto)