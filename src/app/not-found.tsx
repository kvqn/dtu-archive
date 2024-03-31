import { Navbar } from "@/components/Navbar/Navbar"
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Page() {
  return (
    <>
      <Navbar className="fixed top-0" />
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
        <FontAwesomeIcon
          icon={faCircleQuestion}
          className="animate-spin text-4xl"
        />
        <p className="font-geologica text-4xl">Not Found</p>
      </div>
    </>
  )
}
