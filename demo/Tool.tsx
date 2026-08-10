import { useState } from "react";
import Base62Str from "base62str";

type Charset = "gmp" | "inverted";

function getInstance(charset: Charset): Base62Str {
    return charset === "inverted"
        ? Base62Str.createInstanceWithInvertedCharacterSet()
        : Base62Str.createInstanceWithGmpCharacterSet();
}

export default function Tool() {
    const [charset, setCharset] = useState<Charset>("gmp");
    const [plain, setPlain] = useState("Hello World!");
    const [encoded, setEncoded] = useState(() => getInstance("gmp").encodeStr("Hello World!"));
    const [status, setStatus] = useState("");
    const [statusIsError, setStatusIsError] = useState(false);

    function announce(message: string, isError = false): void {
        setStatus(message);
        setStatusIsError(isError);
    }

    function encode(): void {
        try {
            setEncoded(getInstance(charset).encodeStr(plain));
            announce("Encoded.");
        } catch (e) {
            announce(`Could not encode: ${(e as Error).message}`, true);
        }
    }

    function decode(): void {
        try {
            setPlain(getInstance(charset).decodeStr(encoded));
            announce("Decoded.");
        } catch (e) {
            announce(`Could not decode: ${(e as Error).message}`, true);
        }
    }

    function swap(): void {
        setPlain(encoded);
        setEncoded(plain);
        announce("Swapped.");
    }

    function clear(): void {
        setPlain("");
        setEncoded("");
        announce("");
    }

    async function copy(text: string, label: string): Promise<void> {
        try {
            await navigator.clipboard.writeText(text);
            announce(`Copied ${label} to clipboard.`);
        } catch {
            announce(`Could not copy ${label} — copy it manually.`, true);
        }
    }

    return (
        <section className="tool" aria-label="Base62 encoder and decoder">
            <div className="tool-toolbar">
                <label className="charset-label" htmlFor="charset">Character set</label>
                <select id="charset" value={charset} onChange={(e) => setCharset(e.target.value as Charset)}>
                    <option value="gmp">GMP (0-9, A-Z, a-z)</option>
                    <option value="inverted">Inverted (0-9, a-z, A-Z)</option>
                </select>
            </div>

            <div className="field">
                <div className="field-header">
                    <label htmlFor="plain">Plain text</label>
                    <button type="button" className="link-btn" onClick={() => copy(plain, "plain text")}>Copy</button>
                </div>
                <textarea
                    id="plain"
                    rows={6}
                    spellCheck={false}
                    placeholder="Type or paste text here…"
                    value={plain}
                    onChange={(e) => setPlain(e.target.value)}
                />
                <p className="count">{plain.length} characters</p>
            </div>

            <div className="tool-actions">
                <button type="button" className="btn btn-primary" onClick={encode}>Encode ↓</button>
                <button type="button" className="btn btn-primary" onClick={decode}>Decode ↑</button>
                <button type="button" className="btn" onClick={swap}>Swap ⇄</button>
                <button type="button" className="btn btn-ghost" onClick={clear}>Clear</button>
            </div>

            <div className="field">
                <div className="field-header">
                    <label htmlFor="encoded">Base62</label>
                    <button type="button" className="link-btn" onClick={() => copy(encoded, "Base62")}>Copy</button>
                </div>
                <textarea
                    id="encoded"
                    rows={6}
                    spellCheck={false}
                    placeholder="Base62 result appears here…"
                    value={encoded}
                    onChange={(e) => setEncoded(e.target.value)}
                />
                <p className="count">{encoded.length} characters</p>
            </div>

            <p className={`status${statusIsError ? " status-error" : ""}`} role="status" hidden={!status}>
                {status}
            </p>
        </section>
    );
}
