import { useRouter } from 'next/router'

function LanguageSelector() {
  const router = useRouter()
  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    router.push(router.route, router.asPath, {
      locale: value,
    })
  }

  return (
    <div className="flex justify-center">
      <div>
        <select
          onChange={handleLocaleChange}
          value={router.locale}
          className="form-select m-0
      block
      w-full
      appearance-none
      rounded
      border
      border-solid
      border-gray-300
      bg-white bg-clip-padding bg-no-repeat
      px-3 py-1.5 text-base
      font-normal
      text-gray-700
      transition
      ease-in-out
      focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
        >
          <option value="en-US">English</option>
          <option value="pt-BR">Português</option>
        </select>
      </div>
    </div>
  )
}

export default LanguageSelector
