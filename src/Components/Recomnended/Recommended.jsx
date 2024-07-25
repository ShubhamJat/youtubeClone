import React, { useEffect, useState } from 'react'
import './Recommended.css'
import thum1 from '../../assets/thumbnail1.png'
import thum2 from '../../assets/thumbnail2.png'
import thum3 from '../../assets/thumbnail3.png'
import thum4 from '../../assets/thumbnail4.png'
import thum5 from '../../assets/thumbnail5.png'
import thum6 from '../../assets/thumbnail6.png'
import thum7 from '../../assets/thumbnail7.png'
import thum8 from '../../assets/thumbnail8.png'
import { API_KEY, value_converter } from '../../data'
import { Link } from 'react-router-dom'

const Recommended = ({categoryId}) => {

    const [data,setData]=useState(null);
    const  fetchData= async () => {
        const url=`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&regionCode=IN&chart=mostPopular&maxResults=50&videoCategoryId=${categoryId}&key=${API_KEY}`;
        await fetch(url).then(res=>res.json()).then(data =>setData(data.items));
       
    }
    useEffect(()=>{
        fetchData();
    },[])
    console.log(data);
  return (
        <div className='recommended'>
            {
            data ? data.map(  (item, index) => {
                return (
                    <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
                        <img src={item.snippet.thumbnails.default.url} alt="" />
                        <div className="vid-info">
                            <h4>{item.snippet.title}</h4>
                            <p>{item.snippet.channelTitle}</p>
                            <p>{value_converter(item.statistics.viewCount)} Views</p>
                        </div>
                    </Link>
                )
            }) : ""}

        </div>
    )
}

export default Recommended