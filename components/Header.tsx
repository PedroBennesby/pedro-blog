import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

function Header() {
  const router = useRouter()
  const { t } = useTranslation('header')
  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    router.push(router.route, router.asPath, {
      locale: value,
    })
  }
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
          <h3 className="rounded-full bg-green-600 px-4 py-1 text-white">
            {t('follow')}
          </h3>
        </div>
        <select onChange={handleLocaleChange} value={router.locale}>
          <option value="en-US">English</option>
          <option value="pt-BR">Português</option>
        </select>
      </div>
    </header>
  )
}

export default Header
