import Link from 'next/link'
import LanguageSelector from '../components/LanguageSelector'
import { useTranslation } from 'next-i18next'

function Header() {
  const { t } = useTranslation('header')

  return (
    <header>
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            className="h-16 w-16 cursor-pointer object-contain"
            src="/logopng.png"
            alt=""
          />
        </Link>
        <div className="hidden items-center space-x-5 md:inline-flex">
          <h3>{t('about')}</h3>
          <h3>{t('contact')}</h3>
        </div>
        <h3 className="rounded-full bg-green-600 px-4 py-1 text-white">
          {t('follow')}
        </h3>
        <LanguageSelector />
      </div>
    </header>
  )
}

export default Header
