import React, { useEffect, useState } from 'react'
import './Feed.css'
import thumbnail1 from '../../assets/thumbnail1.png'
import thumbnail2 from '../../assets/thumbnail2.png'
import thumbnail3 from '../../assets/thumbnail3.png'
import thumbnail4 from '../../assets/thumbnail4.png'
import thumbnail5 from '../../assets/thumbnail5.png'
import thumbnail6 from '../../assets/thumbnail6.png'
import thumbnail7 from '../../assets/thumbnail7.png'
import thumbnail8 from '../../assets/thumbnail8.png'
import { Link } from 'react-router-dom'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'

const Feed = ({ category, searchText }) => {

    const [data, setData] = useState([]);

    const fetchData = async () => {
        const searchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchText}&key=${API_KEY}`;
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`;
        // https://content-youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&regionCode=US&videoCategoryId=0&maxResults=50&chart=mostPopular&key=AIzaSyBeo4NGA__U6Xxy-aBE6yFm19pgq8TY-TM
        if (searchText != null) {
            console.log('search text');
            await fetch(searchUrl)
                .then(response => response.json())
                .then(data => setData(data.items));

        }
        else {
            console.log('normal url');
            await fetch(url)
                .then(response => response.json())
                .then(data => setData(data.items));
        }
    }

    useEffect(() => {
        fetchData();
    }, [category,searchText]);


    return (
        <div className='feed'>
            {
                data.map((item, index) => {
                    console.log(item);
                    return (
                        <Link to={ searchText ? `/video/${category}/${item.id.videoId}`:`/video/${item.snippet.categoryId}/${item.id}`} className='card'>
                            <img src={item.snippet.thumbnails.medium.url} alt="" />
                            <h2>{item.snippet.title}</h2>
                            <h3>{item.snippet.channelTitle}</h3>
                            <p>{ item.statistics && item.statistics.viewCount ? value_converter(item.statistics.viewCount) : ""} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                        </Link>
                    )
                })
            }


        </div>
    )
}

export default Feed