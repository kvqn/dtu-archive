import Custom404 from "@/components/Custom404";
import GradientLink from "@/components/GradientLink/GradientLink";
import { Navbar, NavbarItem } from "@/components/Navbar/Navbar";
import { getBatches, getBranches, getSemesters } from "@/lib/data";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";

export const getStaticProps = async ({ params }: any) => {
  const batch = params.batch as string;
  const branch = params.branch as string;
  const semesters = await getSemesters(batch, branch);
  return {
    props: {
      batch: batch,
      branch: branch,
      semesters: semesters,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = [];
  const batches = await getBatches();
  for (const batch of batches) {
    const branches = await getBranches(batch);
    if (!branches) continue;
    for (const branch of branches) {
      paths.push({ params: { batch: batch, branch: branch } });
    }
  }

  return { paths: paths, fallback: false };
};

export default function Page(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { batch, branch, semesters } = props;

  if (!semesters) return Custom404();

  const title = `${branch} ${batch}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar
        left={[
          <NavbarItem name="Result" href="/result" key="result" />,
          <NavbarItem name={batch} href={`/result/${batch}`} key="batch" />,
          <NavbarItem
            name={branch}
            href={`/result/${batch}/${branch}`}
            key="branch"
          />,
        ]}
      />

      <div>
        <h1 className="heading-select">Select semester</h1>
        <GradientLink
          href={`/result/${batch}/${branch}/aggregate`}
          name="Aggregate"
        />
        <ul>
          {semesters.map((semester) => (
            <GradientLink
              href={`/result/${batch}/${branch}/${semester}`}
              name={`Sem ${semester}`}
              key={semester}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
