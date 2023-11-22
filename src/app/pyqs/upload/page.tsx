import { useServerSession } from "@/lib/utils"
import { isAllowedToUpload } from "@/server/isAllowedToUpload"
import uploadPYQ from "@/server/uploadPyq"
import toast from "react-hot-toast"

export default async function Page() {
  // const { data:session } = useSession()
  const session = await useServerSession()

  if (!(await isAllowedToUpload(session)))
    return <>You are not allowed to do this.</>

  async function upload(data: FormData) {
    "use server"
    data.append("user_email", session?.user?.email || "")
    const result = await uploadPYQ(data)
    if (result?.error) toast.error(result.error)
  }

  return (
    <div className="mx-[25%] my-40 border p-8">
      <div className="flex justify-center text-xl p-4">Upload PYQ</div>
      <form action={upload} className="flex flex-col gap-2">
        <input
          className="border p-4 rounded-xl hover:border-slate-500 transition-all"
          type="file"
          name="file"
        />
        <input
          className="border p-4 transition-all hover:border-slate-500 rounded-xl"
          type="text"
          name="subject_code"
          placeholder="Subject Code"
        />
        <input
          className="border p-4 transition-all hover:border-slate-500 rounded-xl"
          type="text"
          name="subject_name"
          placeholder="Subject Name"
        />
        <input
          className="border p-4 transition-all hover:border-slate-500 rounded-xl"
          type="number"
          name="year"
          placeholder="Year"
        />
        <select
          name="type"
          className="p-4 rounded-xl border hover:border-slate-500 transition-all"
        >
          <option value="MID_TERM_QUESTIONS">Mid Term Questions</option>
          <option value="END_TERM_QUESTIONS">End Term Questions</option>
          <option value="MID_TERM_ANSWERS">Mid Term Answers</option>
          <option value="END_TERM_ANSWERS">End Term Answers</option>
        </select>
        <div className="flex justify-center">
          <button
            className="border py-2 px-4 w-fit rounded-xl bg-blue-200 hover:bg-blue-300 transition-colors"
            type="submit"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  )
}
