import Custom404 from '@/components/Custom404'
import { getSemesters } from '@/lib/data'
import Link from 'next/link'

type Props = {
    params: {
        batch: string
        branch: string
    }
}


export default async function Page(props: Props) {

    const semesters = await getSemesters(props.params.batch, props.params.branch)
    if (!semesters) return Custom404()

    return (
        <div>
            <h1>Batch {props.params.batch}</h1>
            <h1>Branch {props.params.branch}</h1>
            <h1>Semesters</h1>
            <ul>
            {
                [...Array(semesters)].map((_, index) => (<li><Link href={`/result/${props.params.batch}/${props.params.branch}/${index+1}`}>Sem {index+1}</Link></li>))
            }
            </ul>
        </div>
    )
}
