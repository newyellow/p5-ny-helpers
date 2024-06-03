
// this takes 2 parameters, a string and a id
// class NYRandomSystem {
//     constructor(seedStr) {
//     }

//     function cyrb128(str) {
//         let h1 = 1779033703, h2 = 3144134277,
//             h3 = 1013904242, h4 = 2773480762;
//         for (let i = 0, k; i < str.length; i++) {
//             k = str.charCodeAt(i);
//             h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
//             h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
//             h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
//             h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
//         }
//         h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
//         h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
//         h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
//         h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
//         return [(h1 ^ h2 ^ h3 ^ h4) >>> 0, (h2 ^ h1) >>> 0, (h3 ^ h1) >>> 0, (h4 ^ h1) >>> 0];
//     }

//     sfc32 = function (uint128Hex, tokenValues) {
//         let a = parseInt(uint128Hex.substr(0, 8), 16);
//         let b = parseInt(uint128Hex.substr(8, 8), 16);
//         let c = parseInt(uint128Hex.substr(16, 8), 16);
//         let d = parseInt(uint128Hex.substr(24, 8), 16);
//         a += tokenValues[0];
//         b += tokenValues[1];
//         c += tokenValues[2];
//         d += tokenValues[3];
//         return function () {
//             a |= 0;
//             b |= 0;
//             c |= 0;
//             d |= 0;
//             let t = (((a + b) | 0) + d) | 0;
//             d = (d + 1) | 0;
//             a = b ^ (b >>> 9);
//             b = (c + (c << 3)) | 0;
//             c = (c << 21) | (c >>> 11);
//             c = (c + t) | 0;
//             return (t >>> 0) / 4294967296;
//         };
//     };

//     var tokenSeed = cyrb128(token_id);

//     var prngA = new sfc32(ehash.substr(2, 32), tokenSeed);
//     var prngB = new sfc32(ehash.substr(34, 32), tokenSeed);
//     var useA = false;

//     var hashRand = () => {
//         useA = !useA;
//         return useA ? prngA() : prngB();
//     }

//     // true if preview mode active, false otherwise
//     // you can append preview=1 to the URL to simulate preview active
//     var isCatchPreview = search.get('preview') === "1"
//     // call this method to trigger the preview
//     function catchPreview() {
//         console.log("mountains: TRIGGER PREVIEW");
//     }
// }

function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
    return [h1 >>> 0, h2 >>> 0, h3 >>> 0, h4 >>> 0];
}

function sfc32(a, b, c, d) {
    return function () {
        a |= 0; b |= 0; c |= 0; d |= 0;
        let t = (a + b | 0) + d | 0;
        d = d + 1 | 0;
        a = b ^ b >>> 9;
        b = c + (c << 3) | 0;
        c = (c << 21 | c >>> 11);
        c = c + t | 0;
        return (t >>> 0) / 4294967296;
    }
}

class NYRandomSystem {
    constructor(seedStr) {
        this.seedStr = seedStr;

        this.randomData = cyrb128(seedStr);
        this.generator = sfc32(this.randomData[0], this.randomData[1], this.randomData[2], this.randomData[3]);
    }

    rand() {
        return this.generator();
    }

    random(from = 0, to = 1) {
        return this.rand() * (to - from) + from;
    }
}