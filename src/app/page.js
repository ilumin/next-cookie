'use client'

import { useEffect, useState } from 'react';
import browserCookies from 'browser-cookies';

import styles from "./page.module.css";

export default function Home() {
  const [state, setState] = useState('IDLE')
  const [cookies, setCookies] = useState([])
  const [serverCookies, setServerCookies] = useState([])

  const getAllCookies = () => browserCookies.all()
  const createCookie = (type) => {
    setState('PENDING...')
    fetch(
      '/cookies', 
      { 
        method: 'POST', 
        body: JSON.stringify({ type }) 
      }
    )
      .then(async res => {
        setCookies(getAllCookies)
        setState(`Cookie (${type}) created!`)
      })
  }
  const fetchCookie = () => {
    fetch('/cookies').then(async res => {
      const {items} = await res.json()
      setServerCookies(items)
    })
  }

  useEffect(() => {
    setCookies(getAllCookies)
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <button onClick={() => createCookie('simple')}>Simple Cookie</button>
        <button onClick={() => createCookie('http')}>HttpOnly Cookie</button>
        <button onClick={() => createCookie('secure')}>Secure Cookie</button>
        <button onClick={() => createCookie('http+secure')}>HttpOnly + Secure Cookie</button>
        <h2>State</h2>
        <p>
          {state}
        </p>
        <h2>Browser Cookies</h2>
        <pre>
          {JSON.stringify(cookies, null, 2)}
        </pre>
        <button onClick={() => fetchCookie()}>Fetch Server Cookie</button>
        <pre>
          {JSON.stringify(serverCookies, null, 2)}
        </pre>
      </div>
    </main>
  );
}
