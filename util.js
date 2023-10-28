import { githubToken } from "./env";
import {constants} from "./constants.js"

export const generateOptions = (_path) => {
  return (options = {
    hostname: constants.hostname,
    path: _path,
    headers: {
      "User-Agent": constants.user_agent,
    },
    OAUth: githubToken,
  });
};
