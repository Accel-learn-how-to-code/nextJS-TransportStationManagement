import { AdminMenu } from "../../../database/AdminMenu";

export default function User({}) {
  return <div>HEllo Create </div>;
}

export const getServerSideProps = async (ctx) => {
  return { props: {} };
};

User.AdminMenu = AdminMenu;
