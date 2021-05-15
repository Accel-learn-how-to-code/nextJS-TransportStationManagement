import { UsersMenu } from "../../database/UsersMenu";
import { getUsers } from "../testDB";

export default function Users({ users }) {
  return (
    <div>
      <p>Hello users</p>
      <pre>{JSON.stringify(users, null, 4)}</pre>
    </div>
  );
}
Users.UsersMenuu = UsersMenu;

export const getServerSideProps = async (ctx) => {
  const users = await getUsers();
  return { props: { users } };
};