class Base62Str {

    public static getBytes(str: string) {
        const bytes = [];
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            // tslint:disable-next-line:no-bitwise
            bytes.push(char & 0xFF);
        }
        return bytes;
    }

    public static getString(arr: number[]) {
        return String.fromCharCode.apply(this, arr)
    }

    /**
     * Creates a {@link Base62} instance. Defaults to the GMP-style character set.
     *
     * @return a {@link Base62} instance.
     */
    public static createInstance():Base62Str {
        return this.createInstanceWithGmpCharacterSet();
    }

    /**
     * Creates a {@link Base62} instance using the GMP-style character set.
     *
     * @return a {@link Base62} instance.
     */
    public static createInstanceWithGmpCharacterSet():Base62Str {
        return new Base62Str(Base62Str.CharacterSets.GMP);
    }

    /**
     * Creates a {@link Base62} instance using the inverted character set.
     *
     * @return a {@link Base62} instance.
     */
    public static createInstanceWithInvertedCharacterSet():Base62Str {
        return new Base62Str(Base62Str.CharacterSets.INVERTED);
    }

    private static CharacterSets = {
        GMP: [
            '0'.charCodeAt(0), '1'.charCodeAt(0), '2'.charCodeAt(0), '3'.charCodeAt(0), '4'.charCodeAt(0), '5'.charCodeAt(0), '6'.charCodeAt(0), '7'.charCodeAt(0),
            '8'.charCodeAt(0), '9'.charCodeAt(0), 'A'.charCodeAt(0), 'B'.charCodeAt(0), 'C'.charCodeAt(0), 'D'.charCodeAt(0), 'E'.charCodeAt(0), 'F'.charCodeAt(0),
            'G'.charCodeAt(0), 'H'.charCodeAt(0), 'I'.charCodeAt(0), 'J'.charCodeAt(0), 'K'.charCodeAt(0), 'L'.charCodeAt(0), 'M'.charCodeAt(0), 'N'.charCodeAt(0),
            'O'.charCodeAt(0), 'P'.charCodeAt(0), 'Q'.charCodeAt(0), 'R'.charCodeAt(0), 'S'.charCodeAt(0), 'T'.charCodeAt(0), 'U'.charCodeAt(0), 'V'.charCodeAt(0),
            'W'.charCodeAt(0), 'X'.charCodeAt(0), 'Y'.charCodeAt(0), 'Z'.charCodeAt(0), 'a'.charCodeAt(0), 'b'.charCodeAt(0), 'c'.charCodeAt(0), 'd'.charCodeAt(0),
            'e'.charCodeAt(0), 'f'.charCodeAt(0), 'g'.charCodeAt(0), 'h'.charCodeAt(0), 'i'.charCodeAt(0), 'j'.charCodeAt(0), 'k'.charCodeAt(0), 'l'.charCodeAt(0),
            'm'.charCodeAt(0), 'n'.charCodeAt(0), 'o'.charCodeAt(0), 'p'.charCodeAt(0), 'q'.charCodeAt(0), 'r'.charCodeAt(0), 's'.charCodeAt(0), 't'.charCodeAt(0),
            'u'.charCodeAt(0), 'v'.charCodeAt(0), 'w'.charCodeAt(0), 'x'.charCodeAt(0), 'y'.charCodeAt(0), 'z'.charCodeAt(0)
        ],
        INVERTED: [
            '0'.charCodeAt(0), '1'.charCodeAt(0), '2'.charCodeAt(0), '3'.charCodeAt(0), '4'.charCodeAt(0), '5'.charCodeAt(0), '6'.charCodeAt(0), '7'.charCodeAt(0),
            '8'.charCodeAt(0), '9'.charCodeAt(0), 'a'.charCodeAt(0), 'b'.charCodeAt(0), 'c'.charCodeAt(0), 'd'.charCodeAt(0), 'e'.charCodeAt(0), 'f'.charCodeAt(0),
            'g'.charCodeAt(0), 'h'.charCodeAt(0), 'i'.charCodeAt(0), 'j'.charCodeAt(0), 'k'.charCodeAt(0), 'l'.charCodeAt(0), 'm'.charCodeAt(0), 'n'.charCodeAt(0),
            'o'.charCodeAt(0), 'p'.charCodeAt(0), 'q'.charCodeAt(0), 'r'.charCodeAt(0), 's'.charCodeAt(0), 't'.charCodeAt(0), 'u'.charCodeAt(0), 'v'.charCodeAt(0),
            'w'.charCodeAt(0), 'x'.charCodeAt(0), 'y'.charCodeAt(0), 'z'.charCodeAt(0), 'A'.charCodeAt(0), 'B'.charCodeAt(0), 'C'.charCodeAt(0), 'D'.charCodeAt(0),
            'E'.charCodeAt(0), 'F'.charCodeAt(0), 'G'.charCodeAt(0), 'H'.charCodeAt(0), 'I'.charCodeAt(0), 'J'.charCodeAt(0), 'K'.charCodeAt(0), 'L'.charCodeAt(0),
            'M'.charCodeAt(0), 'N'.charCodeAt(0), 'O'.charCodeAt(0), 'P'.charCodeAt(0), 'Q'.charCodeAt(0), 'R'.charCodeAt(0), 'S'.charCodeAt(0), 'T'.charCodeAt(0),
            'U'.charCodeAt(0), 'V'.charCodeAt(0), 'W'.charCodeAt(0), 'X'.charCodeAt(0), 'Y'.charCodeAt(0), 'Z'.charCodeAt(0)
        ]
    };

    private static STANDARD_BASE = 256;

    private static TARGET_BASE = 62;

    /**
     * Uses the elements of a byte array as indices to a dictionary and returns the corresponding values
     * in form of a byte array.
     */
    private static translate(indices: number[], dictionary: number[]) {
        const translation = [];

        for (const indicesi of indices) {
            translation.push(dictionary[indicesi]);
        }
        return translation;
    }


    /**
     * Converts a byte array from a source base to a target base using the alphabet.
     */
    private static convert(message: number[], sourceBase: number, targetBase: number) {
        /**
         * This algorithm is inspired by: http://codegolf.stackexchange.com/a/21672
         */

        const out: number[] = [];

        let source = message;

        while (source.length > 0) {
            const quotient: number[] = [];

            let remainder = 0;

            for (const sourcei of source) {
                // tslint:disable-next-line:no-bitwise
                const accumulator = (sourcei & 0xFF) + remainder * sourceBase;
                const digit = (accumulator - (accumulator % targetBase)) / targetBase;

                remainder = accumulator % targetBase;

                if (quotient.length > 0 || digit > 0) {
                    quotient.push(digit);
                }
            }
            out.push(remainder);
            source = quotient;
        }

        // pad output with zeroes corresponding to the number of leading zeroes in the message
        for (let i = 0; i < message.length - 1 && message[i] === 0; i++) {
            out.push(0);
        }

        return out.reverse();
    }

    private readonly alphabet: number[];

    private lookup: number[];

    constructor(alphabet: number[]) {
        this.alphabet = alphabet;
        this.lookup = this.createLookupTable();
    }

    /**
     * Encodes a sequence of bytes in Base62 encoding.
     *
     * @param message a byte sequence.
     * @return a sequence of Base62-encoded bytes.
     */
    public encode(message: number[]): number[] {
        const indices = Base62Str.convert(message, Base62Str.STANDARD_BASE, Base62Str.TARGET_BASE);
        return Base62Str.translate(indices, this.alphabet);
    }

    /**
     * Decodes a sequence of Base62-encoded bytes.
     *
     * @param encoded a sequence of Base62-encoded bytes.
     * @return a byte sequence.
     */
    public decode(encoded: number[]): number[] {
        const prepared = Base62Str.translate(encoded, this.lookup);
        return Base62Str.convert(prepared, Base62Str.TARGET_BASE, Base62Str.STANDARD_BASE);
    }

    public encodeStr(input:string): string {
        return Base62Str.getString(this.encode(Base62Str.getBytes(input)));
    }

    public decodeStr(input:string): string {
        return Base62Str.getString(this.decode(Base62Str.getBytes(input)));
    }

    /**
     * Creates the lookup table from character to index of character in character set.
     */
    private createLookupTable() {
        const lookup = new Array<number>(256);

        for (let i = 0; i < 256; i++) {
            // tslint:disable-next-line:no-bitwise
            lookup[this.alphabet[i]] = (i & 0xFF);
        }
	return lookup;
    }

}

export default Base62Str;
