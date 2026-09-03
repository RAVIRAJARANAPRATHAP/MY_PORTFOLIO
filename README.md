# R Ravirajaranaprathap — Portfolio

> Personal portfolio website built with React + Vite, featuring a 3D glassmorphism design.

**Live:** [portfolio link after deploy]

## Tech Stack

- React 18
- Vite 5
- Vanilla CSS (glassmorphism, 3D tilt, animations)
- Web3Forms (contact form)

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Contact Form Setup

1. Visit [web3forms.com](https://web3forms.com) and enter your email
2. Copy your access key
3. Paste it in `src/Portfolio.jsx` line 81:
```js
const WEB3FORMS_KEY = "your-key-here";
```

## Deploy

Deployed on [Vercel](https://vercel.com) — auto-deploys on every `git push`.
