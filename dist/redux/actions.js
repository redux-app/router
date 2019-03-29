export var ROUTER;
(function (ROUTER) {
    ROUTER["NAVIGATE"] = "@router::navigate";
    ROUTER["SET_MATCH"] = "@router::setMatch";
})(ROUTER || (ROUTER = {}));
export function navigate(payload) {
    const type = ROUTER.NAVIGATE;
    return { type, payload };
}
export function setMatch(payload) {
    const type = ROUTER.SET_MATCH;
    return { type, payload };
}
