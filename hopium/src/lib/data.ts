import { existsSync, } from "fs";
import { readdir, readFile} from "fs/promises";


const DATA_DIR = "public/data"


export async function isValidBatch(
  batch: string
) : Promise<boolean> {
  return existsSync(`${DATA_DIR}/${batch}`)
}

export async function getBatches()
: Promise<string[]> {
  const files = await readdir(DATA_DIR)
  return files.filter(file => !file.endsWith(".json"))
}

export async function isValidBranch(
  batch: string,
  branch: string
): Promise<boolean> {
  return existsSync(`${DATA_DIR}/${batch}/${branch}`)
}

export async function getBranches(
  batch: string
) : Promise<string[]|null> {
  if (!await isValidBatch(batch)) return null
  const files = await readdir(`${DATA_DIR}/${batch}`)
  return files.filter(file => !file.endsWith(".json"))
}

export async function isValidSemester(
  batch: string,
  branch: string,
  semester: string
): Promise<boolean> {
  return existsSync(`${DATA_DIR}/${batch}/${branch}/sem-${semester}/result.json`)
}

export async function getSemesters(
  batch: string,
  branch: string
) : Promise<number|null> {
  if (!await isValidBranch(batch, branch)) return null
  const files = await readdir(`${DATA_DIR}/${batch}/${branch}`)
  return files.filter(file => !file.endsWith(".json")).length
}

export async function getSemesterResult(
  batch: string,
  branch: string,
  semester: string
): Promise<SemesterResult|null> {
  if (!await isValidSemester(batch, branch, semester)) return null
  const text = await readFile(`${DATA_DIR}/${batch}/${branch}/sem-${semester}/result.json`, "utf-8")
  const result = JSON.parse(text)
  return result
}

export async function getAggregateResult(
  batch: string,
  branch: string
): Promise<AggregateResult|null> {
  if (!await isValidBranch(batch, branch)) return null
  const text = await readFile(`${DATA_DIR}/${batch}/${branch}/aggregate-result.json`, "utf-8")
  const result = JSON.parse(text)
  return result
}

