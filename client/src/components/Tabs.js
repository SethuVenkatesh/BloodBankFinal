import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { tabData } from './common/data';
export const Tabs = () => {
    const tabHandler=(index)=>{
        const tabs=document.getElementsByClassName("tabContainer");
        const tabTitle=document.getElementsByClassName("tabTitle");
        for(let i=0;i<tabs.length;i++){
            tabs[i].style.display="none";
            tabTitle[i].classList.remove("active");
        }
        document.getElementsByClassName("tabContainer")[index].style.display="flex"
        document.getElementsByClassName("tabTitle")[index].classList.add("active")
    }
  return (
    <TabsContainer>
        <TabTitle >
            {
                tabData.map((tab)=>[
                    <h4 className={`tabTitle ${(tab.id=="1")?"active":""}`} onClick={()=>tabHandler(tab.id-1)}>{tab.title}</h4>
                ])
            }
        </TabTitle>
        <TabContents>
           {
            tabData.map((tab)=>{
                return (
                    <div className={`tabContainer tab${tab.id} ${(tab.id=="1")?"active":""}`} >
                    <div class="infoContent text-1">
                        <h3>What is it?</h3>
                        <p>{tab.what_it_is}</p>
                        <h3>Who can donate?</h3>
                        <p>{tab.who_can_donate}</p>
                    </div>
                    <div class="infoContent text-2">
                    <h3>User For?</h3>
                    <p>{tab.used_for}</p>
                    <h3>Lasts For?</h3>
                    <p>{tab.last_for}</p>
                    </div>
                    <div class="infoContent text-3">
                        <h3>How does it work?</h3>
                        <p>{tab.how_it_works}</p>
                        <h3>How long does it take?</h3>
                        <p>{tab.how_long}</p>
                        <h3>How often can I donate?</h3>
                        <p>{tab.how_often_donate}</p>
                    </div>
                </div>
                )
            })
           
           }
        </TabContents>
        
    </TabsContainer>
  )
}

const TabsContainer =styled.div`
    width:100%;
    position: relative;
`

const TabTitle=styled.div`
    display: flex;
    width:70%;
    margin: auto;
    align-items: center;
    justify-content: space-around;
    padding: 20px 0px 0px 0px ;
    h4{
        font-size: 16px;
        color: rgba(0,0,0,0.7);
        padding: 10px;
        text-align: center;
        font-weight: bold;
        border-bottom: 1px solid gray;
        flex: 1;
        border-bottom: none;
        cursor: pointer;
        &:hover{
            color: crimson;
        }
    }
    .tabTitle.active{
        color: crimson;
        border: 1px solid gray;
        border-radius: 10px 10px 0px 0px;
        border-bottom: 3px solid crimson;
    }
`
const TabContents=styled.div`
     width: 95%;
    margin: auto;
    min-height: 250px;
    border: 1px solid gray;
    border-radius:10px ;
    .tabContainer{
        display: none;
        justify-content: space-around;
        padding: 20px;
        height: 100%;
        @media (max-width:700px){
            flex-direction: column;
        }
    }
    .tab1{
        display: flex;
    }
    .text-1{
        flex:0.35;
        border-right: 1px solid lightgray;
        @media (max-width:700px){
            border-right: none;
            border-bottom: 1px solid lightgray;
        }
      
    }
    .text-2{
        margin-left: 10px;
        flex:0.35;
        border-right: 1px solid lightgray;
        @media (max-width:700px){
            border-right: none;
            border-bottom: 1px solid lightgray;
        }
    }
    .text-3{
        margin-left: 10px;
        flex:0.3;
    }
    .infoContent{
        height: 100%;
        color: rgba(0,0,0,0.8);
        padding: 10px;
        h3{
            font-weight:bold; 
            margin-bottom:5px;
            color: rgba(0,0,0,0.7);
        }
        p{
            font-size:16px;
            line-height: 30px;
            letter-spacing: 0.2px;
        }
    }
    
`
