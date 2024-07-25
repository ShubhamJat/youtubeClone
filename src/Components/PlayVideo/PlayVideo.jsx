import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'

const PlayVideo = () => {
  const {videoId} = useParams();
  const [vidData, setVidData] = useState(null);
  const [chnData, setChnData] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const fetchVideoData = async () => {
    const dataUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(dataUrl).then(response => response.json()).then(data => setVidData(data.items[0]));
  }

  const fetchChnData = async () => {
    const chndataUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${vidData.snippet.channelId}&key=${API_KEY}`;
    await fetch(chndataUrl).then(response => response.json()).then(data => setChnData(data.items[0]));

    const commentdataUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
    await fetch(commentdataUrl).then(response => response.json()).then(data => setCommentData(data.items));

  }

  const [showMore, setShowMore] = useState(true);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId])
  useEffect(() => {
    fetchChnData();
  }, [vidData])
  return (
    <div className='play-video'>
      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=true`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <h3>{vidData ? vidData.snippet.title : "Title Here"}</h3>
      <div className="play-video-info">
        <p>{value_converter(vidData ? vidData.statistics.viewCount : 0)} View &bull; {vidData ? moment(vidData.statistics.publishedAt).fromNow() : ""}</p>
        <div>
          <span><img src={like} alt="" />{vidData ? value_converter(vidData.statistics.likeCount) : 0}</span>
          <span><img src={dislike} alt="" /> </span>
          <span><img src={share} alt="" /> Share </span>
          <span><img src={save} alt="" /> Save </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={chnData ? chnData.snippet.thumbnails.default.url : ""} alt="" />
        <div>
          <p>{vidData ? vidData.snippet.channelTitle : "Channel Title here"}</p>
          <span>{chnData ? value_converter(chnData.statistics.subscriberCount) : ""} Subscibers</span>
        </div>
        <button>Subscibe</button>
      </div>
      <div className={`vid-description ${showMore ? 'more' : ''}`}>
        <p>{vidData ? vidData.snippet.description : "Description here"}</p>
        {!showMore && <a onClick={toggleShowMore}>Read more</a>}
        <hr />
      </div>
      <div>
        <h4>{vidData ? value_converter(vidData.statistics.commentCount) : 0} Comments</h4>
        {commentData ? commentData.map((item, index) => {
          return (
            <div className="comments">
              <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
              <div >
                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="comment-actions">
                  <img src={like} alt="" />
                  <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          )
        }) : ""}

      </div>
    </div>
  )
}

export default PlayVideo