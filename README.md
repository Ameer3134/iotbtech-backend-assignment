# IOTBTech Backend Assignment — Products Inventory CLI → API

## What this is
A three-phase pipeline: a Node CLI generates and aggregates a products
CSV using streams (Phase A), an Express + TypeScript API serves that
data through a three-layer architecture (Phase B), and middleware
wraps it with logging, auth, and error handling (Phase C).

## How to run it

```bash
cd mini-project
npm install

# Phase A — generate the CSV, then aggregate it
npx tsx scripts/generate.ts
npx tsx scripts/aggregate.ts

# Phase B


## One-line takeaway per class

**Class 31 (Node CLI & Streams):** Ran `aggregate.ts` at 10,000 rows
(64.6ms) and again at 1,000,000 rows (1072.7ms) — a 100x increase in
data only cost about 16 to 17x the time, and memory never crashed, because
the stream only ever holds one line at a time instead of loading the
whole file into RAM.


**Class 32 (Express & TypeScript):**
 Hit this directly when my routes file
imported from the wrong controller filename after a rename and got
"Cannot find module" — it drove home that the three-layer split isn't
just organization, it's a real dependency chain: routes depend on
controllers, controllers depend on services, and TypeScript will not
let a broken link between them pass silently.


**Class 33 (Middleware & Error Handling):** 
The `return` in `requireApiKey`
looked optional until I traced through what actually happens without
it — sending a response doesn't stop a function from running, only
`return` does, so a missing `return` after a 401 means the write still
goes through to the service layer even though the client sees a
rejection.