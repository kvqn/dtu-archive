import { isAdmin } from "@/lib/actions/is-admin"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const allowed = await isAdmin()
  if (!allowed) {
    return <div>Access Denied</div>
  }
  return <>{children}</>
}
