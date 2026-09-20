
## CLASS 31: Node.js Runtime, Buffer, Streams & Bun


### Q1. 
**console.log(process.argv);**
[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\USER\\Documents\\BACK  END ASSIGNMENTS\\git-hub-BE-first\\Testing-Folder\\app.js',
  '--port',
  '8080',
  '--host',
  'localhost'
]
**console.log(process.argv.slice(2));**
[ '--port', '8080', '--host', 'localhost' ]

argv[0] is the path to the Node.js\\node.exe. executable that's running the script, argv[1] is the path to the script file itself which is app.js, and everything from index 2 downward is the actual arguments passed in the command line."


### Q2.

Because argv[0] and argv[1] shift depending on how the script is called. Different Node versions, absolute vs.code relative paths, or a wrapper like bun run app.js instead of node app.js  but the actual CLI arguments always start at index 2. Meanwhile .slice(2) gives you just the arguments you actually care about, immune to how the script was launched.


### Q3.
The result afer running it are:
10
5
5

**WHY:**
Arabic letters takes 2 bytes in UTF-8 while English letters take two words in UTF-8

"مرحبا".length is a plain java script string so it will count the characters only

### Q4.
readFileSync("huge.log", "utf8") tries to load the entire 5GB file into RAM as one single string. Node typically follows that with something like .split("\n"), which creates a second, nearly-identical copy of that data in memory just to break it into lines, the process needs upwards of 10GB, which exceeds the 8GB available and crashes the machine.
createReadStream avoids this because it never holds the whole file at once, it reads in small sizes, processes each one, and discards it before reading the next. Memory usage stays flat no matter how large the file is. I saw this directly when I ran aggregate.ts on 10,000 rows (took 64.6ms) and then on 1,000,000 rows (took 1072.7ms) a 100x increase in data only cost about a 16-17x increase in time, and the process never crashed, because at any given moment it was only ever holding one line in memory.

### Q5.
readable.pipe(writable) sends data from source to destination, but doesn't handle failure, if the destination errors out partway through, the source stream is left open with no cleanup, silently leaking a file descriptor and any buffered data. pipeline(readable, writable) does the same data transfer, but wraps it with automatic error handling: if either stream fails, pipeline() destroys both streams and gives you one clear signal (a rejected promise or an error callback) telling you it failed.

**Failure scenario:** copying a large file to a destination on a network drive, and the network connection drops halfway through. With .pipe(), the read stream on the source file stays open indefinitely since nothing ever closes it — it just leaks memory and a file handle with no indication anything went wrong. With pipeline(), the moment the write side errors, both streams are destroyed immediately and the promise rejects, so the program knows right away that the copy failed and can retry or alert the user instead of silently leaking resources.


### Q6.
buf.toString("hex") gives 4e6f64652e6a73, and buf.toString("base64") gives Tm9kZS5qcw==. Both didn't matched what I expected before running it.  toString("hex") represents each byte of the buffer as two hexadecimal digits, and toString("base64") re-encodes the raw bytes into base64's 64-character alphabet, which is why the two representations look completely different.

### Q7.
Streams keep memory flat. "Flat" means memory usage stays roughly constant regardless of input size processing a 10-row file and a 10,000,000-row file both use about the same amount of RAM, because the stream only ever holds one small chunk at a time.

Contrast: the "bucket" approach (readFileSync,load-everything-then-process) has memory that grows linearly with file size — 10,000 rows might use a few MB, 10,000,000 rows uses proportionally more, scaling up in direct proportion to the data. The "pipe"/stream approach stays flat — 10,000 rows and 10,000,000 rows both use roughly the same small, constant amount of memory, because at any instant you're only holding one chunk, not the whole dataset

### 8.
Three things Bun does out of the box that Node doesn't: it runs .ts files directly with no separate build; it has a much faster package installer that uses a binary lockfile format instead of Node's text-based one; and it ships a built-in test runner and bundler, so you don't need to add separate tools like Jest or Webpack. For a real team project today, I'd lean toward Node — it has a much larger, more battle-tested ecosystem and more mature enterprise tooling support, which matters more on a team than raw install/build speed. For a solo or small side project where iteration speed matters more than ecosystem maturity, Bun would be the better fit.

## Class 32 Express & TypeScript

### 9.

