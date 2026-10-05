# ELIZA

Rules-based AI · Developed by Simonas Cepenas, inspired by Joseph Weizenbaum's ELIZA.

ELIZA was written by Joseph Weizenbaum at MIT between 1964 and 1966. Its most famous script, DOCTOR, simulated a Rogerian psychotherapist by reflecting the user's statements back as non-directional, open-ended questions.

This site runs that original DOCTOR script, as published in Weizenbaum's 1966 paper in *Communications of the ACM*, next to an animated pixel-art portrait. The engine is written in Python and runs in the browser through [PyScript](https://pyscript.net), so it works on GitHub Pages without a server.

## Files

| File | What it does |
| --- | --- |
| `eliza.py` | The original DOCTOR script, unchanged, plus the engine that runs it |
| `main.py` | Connects ELIZA to the page |
| `index.html` | Page layout |
| `face.js` | Draws the pixel portrait (blinking, talking), reads replies aloud when Voice is on, and runs the chat log |
| `style.css` | Styles |

## How ELIZA answers

1. The input is split into words. Commas, periods and the word BUT split it into clauses.
2. Pronouns are swapped (I → YOU, MY → YOUR, ME → YOU…), and keywords go on a stack ranked by importance (COMPUTER 50, NAME 15, ALIKE 10, REMEMBER 5…).
3. The top keyword's decomposition patterns are tried in order. The first match picks the next of its reassembly rules, which are used in turn.
4. Rules can jump to another keyword (`=WHAT`), give up and try the next keyword (`NEWKEY`), or rebuild the sentence first (`PRE`).
5. Sentences containing MY are also saved to memory, and ELIZA brings them up later when nothing else matches ("EARLIER YOU SAID YOUR …").

## Voice

Press **Voice** under the portrait and ELIZA reads her replies aloud while her mouth moves. It uses the browser's built-in speech, so there are no accounts or keys. It's off by default, and each browser remembers the choice.

ELIZA picks an English female voice when one is installed. Voices differ between browsers and devices, and some (for example Firefox on Linux) have none; the button only appears where speech works. Browsers don't allow speech before you've interacted with the page, so after a reload she starts speaking from your first message.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Publish on GitHub Pages

Push these files to a repository, then go to **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, and save.
