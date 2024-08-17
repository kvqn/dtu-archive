import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function NotFound() {
  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
        <FontAwesomeIcon
          icon={faCircleQuestion}
          className="h-8 w-8 animate-spin"
        />
        <p className="text-4xl">Not Found</p>
      </div>
    </>
  )
}
