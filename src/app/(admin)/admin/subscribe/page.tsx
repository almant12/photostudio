'use client'
import {useState,useEffect} from 'react'


export default function Subscribe(){


    const [subscribes,setSubscriber] = useState([]);

    const fetchSubscribes = async()=>{
        const response = await fetch('/api/subscribe',{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
              },
        });
        console.log(await response.json())
    }

    useEffect(()=>{
        fetchSubscribes()
    },[])


    return (
        <h1>ckemi</h1>
      );

}