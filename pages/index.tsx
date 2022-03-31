import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const Home: NextPage = () => {
  const { t } = useTranslation('home')

  return (
    <div className="">
      <Head>
        <title>{t('name')}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
    </div>
  )
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home', 'header'])),
    },
  }
}

export default Home
