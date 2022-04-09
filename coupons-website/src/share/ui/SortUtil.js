// this function is used to sort cards or coupons titles inside cards alphabetically 

export function sortByString(s1, s2) {
    let stringA = s1.toLowerCase(),
        stringB = s2.toLowerCase();
    if (stringA < stringB) {
        return -1;
    };
    if (stringA > stringB) {
        return 1;
    };
    return 0;
};