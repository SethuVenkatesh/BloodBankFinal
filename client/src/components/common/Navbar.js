import styled from 'styled-components'
import Logo from '../../assets/logo.jpg'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import styledEngine from '@mui/styled-engine';
import { style } from '@mui/system';
export const Navbar = ({logout,data}) => {
    const [mobileSideBar,setMobileSideBar]=useState(false);
  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 798) {
        setMobileSideBar(false);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Container>

    <NavContainer>
        <NavWrapper>
            <NavLeft>
                <NavImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIeXm9Mtcle8RpRxVWw1dG5COyIvL9DuJL7w&usqp=CAU"></NavImage>
                <NavTitle>Blood Bank Management</NavTitle>
            </NavLeft>
            <NavMiddle>
                <NavMiddleList>Home</NavMiddleList>
                <NavMiddleList>Blogs</NavMiddleList>
                <NavMiddleList>News</NavMiddleList>
                <NavMiddleList>About Us</NavMiddleList>
                <NavMiddleList>Contact Us</NavMiddleList>
                <NavMiddleList>Causes</NavMiddleList>
            </NavMiddle>
            <NavRight>
                <NavAvatarImage src='https://w7.pngwing.com/pngs/529/832/png-transparent-computer-icons-avatar-user-profile-avatar.png'></NavAvatarImage>
                <NavRightUser>{data}</NavRightUser>
                <Logout onClick={()=>logout()}>Logout</Logout>
              
            </NavRight>
            <ToggleIcon onClick={()=>setMobileSideBar(!mobileSideBar)}>
                <MenuIcon></MenuIcon>
            </ToggleIcon>
        </NavWrapper>
    </NavContainer>
            <MobileSideBar open={mobileSideBar}>
                
                <MobileSideBarWrapper>
                    <CloseButton onClick={()=>setMobileSideBar(false)}>
                        <CloseIcon></CloseIcon>
                    </CloseButton>
                    <MobileUserSection>
                        <img src='https://w7.pngwing.com/pngs/529/832/png-transparent-computer-icons-avatar-user-profile-avatar.png'></img>
                        <h4>{data}</h4>
                    </MobileUserSection>
                    <MobileMenuSection>
                        <li>Home</li>
                        <li>Blogs</li>
                        <li>News</li>
                        <li>Causes</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                    </MobileMenuSection>
                    <MobileLogout onClick={()=>logout()}>Logout</MobileLogout>
                </MobileSideBarWrapper>
            </MobileSideBar>
            </Container>

  )
}
const Container=styled.div`


`
const CloseButton=styled.div`
    position: absolute;
    top: 1%;
    right:4%;
    .MuiSvgIcon-root{
        font-size: 30px !important;
    }
`
const ToggleIcon=styled.div`
    color: white;
    display: none;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: auto;
    cursor: pointer;
    @media (max-width:798px){
        display: block;
    }
`
const NavContainer=styled.div`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:60px;
    background-color:crimson;
    z-index: 10;
    box-shadow: 0px 2px 5px rgba(0,0,0,0.8);
`;
const NavWrapper=styled.div`
    padding:0 20px;
    display:flex;
    height:100%;
`;
const NavLeft=styled.div`
    flex:0.3;
    display:flex;
    align-items:center;
    gap: 20px;
`;
const NavTitle=styled.h3`
    color:white;
    font-size:20px;
`;
const NavImage=styled.img`
    width:50px;
    height:50px;
    border-radius:50%;

`;
const NavMiddle=styled.ul`
    flex:0.5;
    list-style:none;
    display: flex;
    align-items: center;
    justify-content: space-around;
    @media (max-width:798px){
        display: none;
    }
`;
const NavMiddleList=styled.li`
    color: white;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    transition:all 0.2s linear;
    &:hover{
        color: black;
        font-size: 18px;
    }
`;

const NavRight=styled.div`
   display: flex;
   flex:0.2;
   align-items: center;
   justify-content: flex-end;
   gap: 5px;
   @media (max-width:798px){
        display: none;
    }
`;
const NavAvatarImage=styled.img`
    width: 40px;
    height:40px;
    border-radius: 50%;
`;
const NavRightUser=styled.p`
    font-size: 16px;
    font-weight: 600;
    color: whitesmoke;
    width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`
const Logout=styled.p`
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    color: gray;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: aliceblue;
    transition: all 0.2s linear;
    &:hover{
        color: red;
    }   
`
const MobileSideBar=styled.div`
    position: relative;
    width:350px;
    z-index: 100;
    background-color: whitesmoke;
    box-shadow:0px 0px 5px gray;
    top:60px;
    height: calc(100vh - 60px);
    position: fixed;
    transition:all 0.3s linear;
    right: ${props => (props.open) ? "0px" : "-500px"};
`
const MobileSideBarWrapper=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:20px;
    height: 100%;
    padding:40px 0px;

    
`;
const MobileUserSection=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    justify-content: center;
    img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-bottom:20px;
    }
    h4{
        font-size: 20px;
        font-weight: bold;
    }
`
const MobileMenuSection=styled.ul`
    margin-left: auto;
    margin-right: auto;
    width: 60%;
    li{
        width: 100%;
        font-size: 16px;
        list-style: none;
        padding: 0px 0px 0px 20px;
        font-weight: 500;
        margin-bottom: 10px;
        line-height: 40px;
        border-radius: 10px;
        cursor: pointer;
        &:hover{
            background-color:white; 
            color:blue ;
            box-shadow: 0px 0px 5px rgba(0,0,0,0.6);
        }
    }
`

const MobileLogout=styled.div`
    border-radius: 5px;
    width: 80%;
    color:white;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
    padding: 10px 40px;
    background-color: slategrey;

`