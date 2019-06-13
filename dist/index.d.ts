declare class Base62Str {
    static getBytes(str: string): number[];
    static getString(arr: number[]): string;
    /**
     * Creates a {@link Base62} instance. Defaults to the GMP-style character set.
     *
     * @return a {@link Base62} instance.
     */
    static createInstance(): Base62Str;
    /**
     * Creates a {@link Base62} instance using the GMP-style character set.
     *
     * @return a {@link Base62} instance.
     */
    static createInstanceWithGmpCharacterSet(): Base62Str;
    /**
     * Creates a {@link Base62} instance using the inverted character set.
     *
     * @return a {@link Base62} instance.
     */
    static createInstanceWithInvertedCharacterSet(): Base62Str;
    private static CharacterSets;
    private static STANDARD_BASE;
    private static TARGET_BASE;
    /**
     * Uses the elements of a byte array as indices to a dictionary and returns the corresponding values
     * in form of a byte array.
     */
    private static translate;
    /**
     * Converts a byte array from a source base to a target base using the alphabet.
     */
    private static convert;
    private readonly alphabet;
    private lookup;
    constructor(alphabet: number[]);
    /**
     * Encodes a sequence of bytes in Base62 encoding.
     *
     * @param message a byte sequence.
     * @return a sequence of Base62-encoded bytes.
     */
    encode(message: number[]): number[];
    /**
     * Decodes a sequence of Base62-encoded bytes.
     *
     * @param encoded a sequence of Base62-encoded bytes.
     * @return a byte sequence.
     */
    decode(encoded: number[]): number[];
    encodeStr(input: string): string;
    decodeStr(input: string): string;
    /**
     * Creates the lookup table from character to index of character in character set.
     */
    private createLookupTable;
}
export default Base62Str;
