# Kubernetes Production Issues Explorer

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/tuladhars-projects/v0-k8s-issue-website)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/1u09BrRG1jt)

> ### 💪 Inspired by an amazing work of [Vijay](https://github.com/vijay2181/k8s-500-prod-issues) — I've ✨ sprinkled a bit of sugar on top with a website to make exploring real-world Kubernetes production issues 🔥 a little more fun 🤩
> https://k8s-issues.purutuladhar.com

https://github.com/user-attachments/assets/5116538d-b8bc-448e-a2eb-85d3943a3246

## How I built this?
- Used v0 to build the UX with few prompts, see [v0 prompts](prompts/v0.txt)
- Deployed to Vercel directly from v0, with custom domain.
- All scenarios (500 of them) converted to array by prompting Cursor and using Agents to write/run the script, [see the script here](scripts/convertScenarios.js).
- Updated the scenarios [array here](lib/data.ts).
- Replaced logo from unused logo collection of prometheus-operator, [see here](https://github.com/prometheus-operator/prometheus-operator/issues/3389#issuecomment-2879799832). Converted png to svg and placed it in [here](./components/icons.tsx).
- Converted logo to favicon, and uploaded in [apps/](apps/) directory.
