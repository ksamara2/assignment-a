"use client"
import styles from './page.module.css'
import { useState,useEffect } from 'react';



export default function Home() {
  const [gas,setgas]=useState();
  const [eth,seteth]=useState();
  
  useEffect(()=>{
    const ws = new WebSocket('ws://localhost:3001');
    ws.onopen = function () {
      console.log('WebSocket connection established');
      ws.send('Hello, server!');
  };
    ws.onmessage = function (event) {
      const json = JSON.parse(`${event.data}`);
      setgas(json.ethergas);
      seteth(json.etherprice);
      console.log('Message from server:', event.data);
};
    // Event listener for error handling
    ws.onerror = function (error) {
      console.error('WebSocket error:', error);
  };

  // Clean up function to close the WebSocket connection when the component unmounts
    return () => {
        ws.close();
  };

  },[]);
  

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p>Ethereum Gas: {gas} Gwei</p>
        <p>Ethereum Price: ${eth} USD</p>
      </div>
    </div>


  )
}
