import {getEditDistance} from "./lib/Levenshtein";

export default class SyntaxError extends Error {
    private readonly subject: string | undefined;
    private readonly proposals: string[] | undefined;

    constructor(message: string, cursor, expression, subject: string | undefined = undefined, proposals: string[] | undefined = undefined) {
        message = `${message} around position ${cursor}`;
        if (expression) {
            message = message + ` for expression \`${expression}\``;
        }
        message += ".";

        super(message);
        this.name = "SyntaxError";
        this.subject = subject;
        this.proposals = proposals;
    }

    toString() {
        let message = this.message;

        if (this.subject && this.proposals) {
            let minScore = Number.MAX_SAFE_INTEGER,
                guess = null;
            for (const proposal of this.proposals) {
                const distance = getEditDistance(this.subject, proposal);
                if (distance < minScore) {
                    guess = proposal;
                    minScore = distance;
                }
            }

            if (guess !== null && minScore < 3) {
                message += ` Did you mean "${guess}"?`;
            }
        }

        return message;
    }
}