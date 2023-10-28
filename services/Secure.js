import jsonwebtoken from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export const ensureToken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    const decoded = jwtDecode(bearerToken);
    var dateNow = new Date();

    if (decoded?.exp < dateNow.getTime() / 1000 || !decoded?.user_id) {
      res.sendStatus(403);
      return;
    }
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};
