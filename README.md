# Bug Golf :space_invader::golf:

[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/nolanwelch/bug-golf/main.svg)](https://results.pre-commit.ci/latest/github/nolanwelch/bug-golf/main)

A daily minimum‑moves code debugging game that challenges you to fix broken code in as few keystrokes, edits, and as little time as possible. Built with a modern JAMstack:

- **Frontend:** React, Vite, Tailwind CSS, Monaco Editor
- **Backend:** Cloudflare Workers + Hono, KV storage
- **Validation:** Zod & @hono/zod‑validator
- **Deploy & Dev:** Wrangler & `@cloudflare/vite‑plugin`

---

## Features

- **Daily Kata Pool**  
  Randomly assign an unplayed challenge each day.
- **In‑Browser Editor**  
  Monaco editor powered with starter code and real‑time editing.
- **Scoring Metrics**  
  Tracks keystrokes, edit‑distance diff, and time‑to‑solve.

---

## Getting Started

### Prerequisites

- Node.js >=16
- npm
- Cloudflare account & Wrangler CLI

### Installation

```bash
git clone https://github.com/nolanwelch/bug-golf.git
cd bug-golf
npm install
```

### Configuration

Vite will serve both your React app and embed the Worker runtime:

```bash
npm run dev
```

- Frontend -> http://localhost:5173
- Worker endpoints (e.g. `/api/katas/today`) are served in‑process.

### Available Scripts

- **`npm run dev`**  
  Start Vite in development mode (uses `ENVIRONMENT=dev`).
- **`npm run build`**  
  Compile TypeScript and bundle the production build.
- **`npm run preview`**  
  Serve the production bundle locally.
- **`npm run deploy`**  
  Build & deploy your Worker via Wrangler.
- **`npm run lint`**  
  Run ESLint across your codebase.
- **`npm run prettier`**  
  Format all source files with Prettier.

---

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feat/xyz`)
3. Commit your changes (`git commit -m 'feat: add xyz'`)
4. Push (`git push origin feat/xyz`)
5. Open a Pull Request

See [issues](https://github.com/nolanwelch/bug-golf/issues) for ideas & bug reports.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for more.
