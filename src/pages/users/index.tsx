import { UsersMenu } from "../../database/UsersMenu";
import { secret } from "../../../api/secret";
import { verify } from "jsonwebtoken";

export default function Users({ users }) {
  return (
    <div>
      <p>Hello users</p>
      <pre>{JSON.stringify(users, null, 4)}</pre>
    </div>
  );
}
Users.UsersMenu = UsersMenu;

export const getServerSideProps = async (ctx) => {
  const { cookies } = ctx.req;
  var decoded = verify(cookies.auth, secret);
  return { props: { users: decoded } };
};
