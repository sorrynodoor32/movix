import { useState } from "react"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import VideoPopup from "../../../components/videoPopup/VideoPopup"
import "./style.scss"
import { PlayIcon } from "../Playbtn"
import Img from "../../../components/lazyLoadImage/Img"

const VideosSection = ({data,loading}) => {

    const [show,setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)

    const skeleton = ()=>{
        return (
            <div className="skItem">
            <div className="thumb skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row2 skeleton"></div>
        </div>
        )
    }
  return (
    <div className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">Official Videos</div>
        {!loading ? (
            <div className="videos">
                {data?.results?.map((video)=>{
                  return (
                    <div 
                      key={video.id} 
                      className="videoItem"
                      onClick={()=>{
                        setShow(true)
                        setVideoId(video.key)
                      }}
                    >
                      <div className="videoThumbnail">
                        <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}/>
                        <PlayIcon />  
                      </div> 
                      <div className="videoTitle">
                        {video.name}
                      </div> 
                    </div>
                  )
                })}
            </div>
        ) : (
            <div className="videoSkeleton">
                {skeleton()}
                {skeleton()}
                {skeleton()}
                {skeleton()}
                {skeleton()}
                {skeleton()}
            </div>
        )}
      </ContentWrapper>
      <VideoPopup 
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  )
}

export default VideosSection
