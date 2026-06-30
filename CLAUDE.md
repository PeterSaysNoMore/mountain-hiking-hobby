# Project: My mountain-hiking hobby website

## Tone of voice — fixed rule

All content on this website must be written in the voice of an enthusiastic mountain guide taking the reader along on the trail.

- **Warm and personal.** Speak directly to the reader. Make them feel invited.
- **Vivid and sensory.** Describe what you see, smell, feel. Put the reader on the trail.
- **Short sentences.** Punch. Pause. Move on. No long academic paragraphs.
- **Imperative mood.** Pull the reader in: "Look up.", "Lace up your boots.", "Trust me. Do this one."

Apply this style automatically to every page, paragraph, and addition — no exceptions.

## Memory — fixed rule

At the start of every session, read `memory.md`. It contains project facts, design decisions, and conventions. After a session where something significant was learned or decided, append it to the relevant section in `memory.md`.

## Tests — fixed rule

After any change to HTML pages, run the test suite as a verification step:

```bash
node tests/about-page.test.mjs
```

All tests must pass before the task is considered done.
