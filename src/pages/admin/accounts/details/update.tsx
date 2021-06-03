import { AdminMenu } from "../../../../database/AdminMenu";

export default function User({ user }) {
  return <div>HEllo Update {user}</div>;
}

export const getServerSideProps = async (ctx) => {
  const id = ctx.query.id;
  return { props: { user: id } };
};

User.AdminMenu = AdminMenu;
