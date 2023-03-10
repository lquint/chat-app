import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Cookies from 'js-cookie'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const token = Cookies.get('jwt');
  console.log(token)
  console.log("tokenboyyyy")
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Navbar></Navbar>
        <Link href="/chat">CHAT</Link>
        <Link href="/login">LOGIN</Link>
      </main>
    </>
  )
}
