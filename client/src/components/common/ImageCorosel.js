import React, { useEffect } from 'react'
import styled from 'styled-components'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { corouselImages } from './data';
export const ImageCorosel = () => {
    let currentSlide=0;
    let index=0;
    const corouselSize=corouselImages.length;
    const handleCorousel=(side,value)=>{
        const wrapper=document.querySelector(".wrapper");
        if(side=="left"){
            currentSlide--;
        }
        else if(side=="right"){
            currentSlide++;
        }
        if(currentSlide==corouselSize){
            currentSlide=0;
        }
        else if(currentSlide==-1)
        {
            currentSlide=corouselSize-1;
        }
        if(side=="dot"){
            currentSlide=value;
        }
        wrapper.style.transform=`translateX(-${currentSlide*100}vw)`;
        const dots=document.getElementsByClassName("dot");
        for(let dotIndex=0;dotIndex<dots.length;dotIndex++){
            const dot=dots[dotIndex];
            if(dotIndex==currentSlide){
                dot.classList.add("active");
            }
            else{
                dot.classList.remove("active");
            }
        }
    }
    useEffect(()=>{
        document.getElementsByClassName("dot")[0].classList.add("active");
    },[])
    
  return (
    <CorouselContainer>
        <Icon left="0" onClick={()=>handleCorousel("left")}>
            <ChevronLeftIcon></ChevronLeftIcon>
         </Icon>
        <CorouselWrapper className='wrapper' width={corouselSize*100}>
            {
                corouselImages.map((ele)=>{
                    return (
                        <CorouselItemWrapper key={ele.id}>
                            <CorouselItem src={ele.img}></CorouselItem>
                        </CorouselItemWrapper>
                    ) 
                })
            }
        </CorouselWrapper>
        <PageIndicator>
        {
                corouselImages.map((ele)=>{
                    return <p key={ele.id} className=
                    "dot" onClick={()=>handleCorousel("dot",ele.id-1)} data-value={ele.id}></p>
                })
                
        }
        </PageIndicator>
        <Icon right="0" onClick={()=>handleCorousel("right")}>
            <ChevronRightIcon ></ChevronRightIcon>
        </Icon>
    </CorouselContainer>
  )
}

const CorouselContainer =styled.div`
    margin-top: 60px;
    height: 400px;
    width: 100%;
    position: relative;
    overflow: hidden;
    @media (max-width:798px){
        height:200px;
    }
`
const CorouselWrapper=styled.div`
    display:flex;
    height: 100%;
    width: ${props=>props.width}vw;
    transform: translateX(0%);
    transition: all 0.5s ease-in;
`
const CorouselItem=styled.div`
    width: 100%;
    height: 100%;
    background: url(${(props)=>props.src});  
    background-color: white;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border:1px solid lightgray;
    object-fit: contain;
`
const CorouselItemWrapper=styled.div`
    width:100vw;
    height:100%
`
const Icon=styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 70px;
    z-index: 4;
    left:${props => (props.left)};
    right:${props => (props.right)};
    cursor: pointer;
    .MuiSvgIcon-root{
        font-size: 70px !important;
    }
`
const PageIndicator=styled.div`
    position: absolute;
    bottom: 20px;
    display: flex;
    gap: 20px;
    left: 50%;
    z-index:4;
    transform: translateX(-50%);
    p{
        width: 10px;
        height: 10px;
        background-color: gray;
        border-radius: 50%;
        &.active{
            background-color: blue;
        }
    }
    
`