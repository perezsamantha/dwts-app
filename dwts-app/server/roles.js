import { AccessControl } from "accesscontrol";

const ac = new AccessControl();

//export const roles = () => {
ac.grant("fan")
    .readAny("profile")
    .readAny("team")
    .readAny("pro")
    .readAny("dance")
    .updateOwn("profile")

ac.grant("pro")
    .extend("fan")
    .updateOwn("pro")
    .updateOwn("team")

ac.grant("moderator")
    .extend(["fan", "pro"])
    .updateAny("team")
    .updateAny("pro")
    .updateAny("dance")

ac.grant("admin")
    .extend(["fan", "pro", "moderator"])
    .deleteAny("profile")
    .deleteAny("team")
    .deleteAny("pro")
    .deleteAny("dance")

    export default ac;