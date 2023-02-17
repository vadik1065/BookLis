import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import ReaderController from '../components/Reader/ReaderController'
import '@babel/runtime/regenerator';

const IndexPage = () => (
  <Layout>
    <>
      <ReaderController/>
    </>
  </Layout>
)

export default IndexPage