import "./style.scss"
import {HiOutlineSearch} from "react-icons/hi"
import {SlMenu} from "react-icons/sl"
import {VscChromeClose} from "react-icons/vsc"
import logo from "../../assets/movix-logo.svg"
import { useEffect, useState } from "react"
import {useLocation, useNavigate, Link} from "react-router-dom"
import ContentWrapper from "../contentWrapper/ContentWrapper"

const Header = () => {
  
  const [show,setShow] = useState("top")
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [query,setQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  
  useEffect(()=>{
    window.scrollTo(0,0)
  },[location])
  
  const controlNavbar = () =>{
    if(window.scrollY > 200){
      if(window.scrollY > lastScrollY && !mobileMenu){
        setShow("hide")
      }else{
        setShow("show")
      }
    }else{
      setShow("top")
    }
    setLastScrollY(window.scrollY)
  }

  useEffect(()=>{
    window.addEventListener("scroll", controlNavbar)
    return () =>{
      window.removeEventListener("scroll", controlNavbar)
    }
  },[lastScrollY])

  const openSearch = () =>{
    setMobileMenu(false)
    setShowSearch(true)
  }
  
  const openMobileMenu = () => {
    setMobileMenu(true)
    setShowSearch(false)
  }

  const handleQuery = (e) =>{
    if(e.key === "Enter" && query.length > 0){
      navigate(`/search/${query}`)
      setTimeout(()=>{
        setShowSearch(false)
      },500)
    }
  }

  const navigationHandler = (type) =>{
    if(type === "movie"){
      navigate("/explore/movie")
    }else{
      navigate("/explore/tv")
    }
    setMobileMenu(false)
  }

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
        </Link>
        <ul className="menuItems">
          <li className="menuItem" onClick={()=>navigationHandler("movie")}>Movie</li>
          <li className="menuItem" onClick={()=>navigationHandler("tv")}>TV Shows</li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} className="searchIcon"/>
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} className="searchIcon"/>
          {mobileMenu ? (
            <VscChromeClose onClick={()=>setMobileMenu(false)}/>
            ) : (
            <SlMenu onClick={openMobileMenu}/>
          )}
        </div>
      </ContentWrapper>
      {showSearch && <div className="searchBar">
        <ContentWrapper>
        <div className="searchInput">
              <input
                autoFocus={true}
                type="text" 
                placeholder='Search for a movie or tv show....'
                onChange={(e)=>setQuery(e.target.value)}
                onKeyUp={handleQuery}
                />
                <VscChromeClose onClick={()=>setShowSearch(false)}/>
            </div>
        </ContentWrapper>
      </div>}
    </header>
  )
}

export default Header
 