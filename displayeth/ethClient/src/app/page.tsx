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
    
    ws.onerror = function (error) {
      console.error('WebSocket error:', error);
  };

  
    return () => {
        ws.close();
  };

  },[]);
  

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.ethInfo}>
          <div className={styles.priceWithImage}>
            <a href="https://github.com/ksamara2" target="_blank" className={styles.githubButton}>
            <img src="github.png" alt="GitHub" />
            </a>
          </div>
          <div className={styles.priceWithImage}>
            <img src="ether.png" alt="Ethereum" className={styles.ethImage} />
            <span>Ethereum Price: ${eth} USD</span>
          </div>
          <div className={styles.priceWithImage}>
            <img src="ethgas.png" alt="Ethereum" className={styles.ethImage} />
            <span>{gas} GWEI</span>
          </div>
        </div>
      </div>
    </div>


  )
}
