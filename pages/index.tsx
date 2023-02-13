import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import ReaderController from '../components/Reader/ReaderController'
import '@babel/runtime/regenerator';

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <>
    <h1>Hello Next.js 👋</h1>
      <ReaderController/>
    </>
  </Layout>
)

export default IndexPage