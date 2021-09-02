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

ac.grant("admin")
    .extend(["fan", "pro"])
    .updateAny("team")
    .updateAny("pro")
    .updateAny("dance")
    .deleteAny("profile")
    .deleteAny("team")
    .deleteAny("pro")
    .deleteAny("dance")

    export default ac;

// exports.roles = (function() {
// ac.grant("fan")
//     .readAny("profile")
//     .readAny("team")
//     .readAny("pro")
//     .readAny("dance")
//     .updateOwn("profile")

// ac.grant("pro")
//     .extend("fan")
//     .updateOwn("pro")
//     .updateOwn("team")

// ac.grant("admin")
//     .extend("fan")
//     .extend("pro")
//     .updateAny("team")
//     .updateAny("pro")
//     .updateAny("dance")
//     .deleteAny("profile")
//     .deleteAny("team")
//     .deleteAny("pro")
//     .deleteAny("dance")

// })();