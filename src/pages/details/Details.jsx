import { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
import Recommendation from "./carousels/Recommendation"
import Similar from "./carousels/Similar"
import Cast from "./cast/Cast"
import DetailsBanner from "./DetailsBanner/DetailsBanner"
import "./style.scss"
import VideosSection from "./videosSection/VideosSection"



const Details = () => {

  const {mediaType,id} = useParams()
  const {data, loading} = useFetch(`/${mediaType}/${id}/videos`)
  const {data:dataCredit, loadingCredit} = useFetch(`/${mediaType}/${id}/credits`)
  
  
  return (
    <div className="details">
      <DetailsBanner video={data?.results[0]} crew={dataCredit?.crew}/>
      <Cast data={dataCredit?.cast} loading={loadingCredit}/>
      <VideosSection data={data} loading={loading}/>
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id}/>
    </div>
  )
}

export default Details
