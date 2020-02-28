import React ,{useEffect ,useState} from 'react'
import { connect } from 'react-redux'
import { albumsList } from '../../Redux/Actions/albumsList'
import Album from './Album'
import Loader from '../Common/Loader'
import Pagination from '../Common/Pagination'

const ListAlbum = props => {
   
    const [currentAlbums,changecurrentAlbums]=useState([])
    const[totalAlbums,changetotalAlbums]=useState([])

    useEffect(() =>{
        props.albumsList().then(() => {
            changetotalAlbums(props.albums)
        }).catch((err) => {
            console.log(err)
            changetotalAlbums([])
        });
    })
    
    const onPageChanged = data => {
        const { currentPage, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        changecurrentAlbums( props.albums.slice(offset, offset + pageLimit) )

    };

    return (
        <div>
            {totalAlbums !== undefined && totalAlbums.length > 0 ?
                <div>
                    <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                        <div className="d-flex flex-row py-4 align-items-center">
                            <Pagination
                                totalRecords={totalAlbums.length}
                                pageLimit={23}
                                pageNeighbours={1}
                                onPageChanged={onPageChanged}
                            />
                        </div>
                    </div>
                    {currentAlbums.map(albums => (
                        <Album key={albums.id} albums={albums} />
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
        albums: state.albums
    }
}

export default connect(mapStateToProps, { albumsList })(ListAlbum)