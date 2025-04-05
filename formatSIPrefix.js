const PREFIXES = {
        '24': 'Y',
        '21': 'Z',
        '18': 'E',
        '15': 'P',
        '12': 'T',
        '9': 'G',
        '6': 'M',
        '3': 'k',
        '0': '',
        '-3': 'm',
        '-6': 'µ',
        '-9': 'n',
        '-12': 'p',
        '-15': 'f',
        '-18': 'a',
        '-21': 'z',
        '-24': 'y'
    };

function formatSIPrefix(num) {  
    const exponent = Math.floor(Math.log10(num));
    const closestExponent = closest(exponent,3);
    const prefix = PREFIXES[`${closestExponent}`];
    return `${(Math.round( num /( Math.pow(10,closestExponent) )) )} ${prefix}`.trim()
}

function unformatSIPrefix(prefixNumberString) {
    const number = prefixNumberString.split(" ")[0];
    const prefix = prefixNumberString.split(" ")[1];

    let exponent = 0;

    for (let key in PREFIXES) {
        if(PREFIXES[key] == prefix) {
            exponent = Number(key)
            break;
        } 
    };

    return number * Math.pow(10,exponent);

}

function closest(n,k) {
    return Math.round((n % k) / n) * k + (n -  (n % k));
}
