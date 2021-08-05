import { verify } from "jsonwebtoken";
import { secret } from "../../api/secret";

export function Authorization(ctx) {
  //lấy cookie nhưng ở dạng object {auth: abc123}
  const { cookies } = ctx.req;

  var decoded = verify(cookies.auth, secret);

  if (decoded.accountType !== "AD" && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: "http://localhost:3000/error",
    });
    ctx.res?.end();
    return;
  }
}
