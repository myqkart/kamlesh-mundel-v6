---
title: "Deploy React + Frappe on AWS with CI/CD"
description: "Production deployment with Amplify, EC2, Nginx and GitHub Actions."
slug: "deploy-react-frappe-aws"
date: "2026-08-27"
updated: "2026-08-27"
author: "Kamlesh Mundel"
category: "DevOps"
tags:
  - React
  - Frappe
  - AWS
cover: "/images/blogs/deploy-react-frappe-aws.svg"
coverAlt: "AWS deployment architecture"
featured: true
draft: false
canonical: "https://kamlesh.tech/blog/deploy-react-frappe-aws"
---

Shipping a split-stack product — React on the front, Frappe on the back — means two deploy surfaces, one domain, and zero tolerance for “works on my machine.” This walkthrough covers the production layout I use: Amplify for the SPA, EC2 for Frappe, Nginx as the reverse proxy, and GitHub Actions tying it together.

## Architecture overview

The browser talks to **Amplify** for static assets and client routes. API traffic hits **Nginx** on EC2, which forwards `/api` to the Frappe bench. TLS terminates at the load balancer; Nginx handles path-based routing.

| Layer | Service | Responsibility |
| --- | --- | --- |
| Frontend | AWS Amplify | Build & host React |
| Backend | EC2 + bench | Frappe / ERPNext |
| Edge | ALB + Nginx | TLS, routing, gzip |
| CI | GitHub Actions | Test, build, deploy |

## Frontend on Amplify

Connect the React repo to Amplify, set the build spec, and map environment variables for the API base URL:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
```

Point `VITE_API_URL` (or your bundler equivalent) at `https://kamlesh.tech/api`.

## Frappe on EC2

Provision Ubuntu, install bench, and run Frappe behind Gunicorn. Keep the site in production mode:

```bash
bench setup production ubuntu
bench restart
```

Nginx site config forwards API traffic:

```nginx
location /api {
    proxy_pass http://127.0.0.1:8000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

## GitHub Actions pipeline

A minimal workflow runs tests, builds the frontend, and triggers Amplify deploy on merge to `main`:

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci && npm test && npm run build
```

## Checklist before go-live

- [ ] Health check on `/api/method/ping`
- [ ] CORS allows the Amplify origin
- [ ] Secrets in SSM Parameter Store, not `.env` in the repo
- [ ] Database backups scheduled

## Summary

Split deployments do not have to be fragile. Amplify handles the React surface; EC2 + bench owns the API; Nginx and Actions keep routing and releases predictable.
