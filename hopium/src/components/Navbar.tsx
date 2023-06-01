import Link from "next/link"

type NavbarProps = {
  batch?: string
  branch?: string
  semester?: string
}

export default function Navbar(props: NavbarProps) {
  let { batch, branch, semester } = props
  let links = []

  if (batch) links.push({ href: `/result/${batch}`, name: `BATCH ${batch}` })
  if (branch) links.push({ href: `/result/${batch}/${branch}`, name: `${branch}` })
  if (semester) links.push({ href: `/result/${batch}/${branch}/${semester}`, name: !isNaN(parseInt(semester)) ? `SEM ${semester.toString()}` : "AGGREGATE" })

  let _navs = links.map((link) => (
    <Link className="inline-block align-middle text-center p-4 font-inter font-black text-2xl"
      href={link.href}>{link.name}
    </Link>
  ))

  let navs = []
  for (let i = 0; i < _navs.length; i++) {
    navs.push(_navs[i])
    if (i < _navs.length - 1) navs.push(
        <div className="relative inline-block align-middle text-center p-0 font-thin text-6xl">
        <p className="relative -top-1">/</p>
        </div>
      )
  }

  return (
    <div className="w-auto h-20 border-white rounded-lg m-2 border flex-grow flex items-center">
      <Link className="inline-block align-middle text-center w-32 font-bold" href="/result">HOPIUM</Link>
      <div className="flex-grow flex justify-end">{navs}</div>
    </div>
  )
}
