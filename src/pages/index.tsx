export default function Home({ queryParams }) {
  return (
    <div>
      Hello Index
      <pre>{JSON.stringify(queryParams, null, 4)}</pre>
    </div>
  );
}
export const getServerSideProps = async (ctx) => {
  const queryParams = ctx.query;
  return { props: { queryParams } };
};
