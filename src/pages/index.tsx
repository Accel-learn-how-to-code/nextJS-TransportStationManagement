import SignIn from "../components/SignIn";

export default function Home() {
  return <SignIn />;
}
export const getServerSideProps = async (ctx) => {
  return { props: {} };
};
