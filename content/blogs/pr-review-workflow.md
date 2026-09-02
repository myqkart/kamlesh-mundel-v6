---
title: "A PR Review Workflow That Actually Scales"
description: "Small-team habits for readable diffs, faster reviews, and fewer regressions."
slug: "pr-review-workflow"
date: "2026-08-20"
updated: "2026-08-22"
author: "Kamlesh Mundel"
category: "Engineering"
tags:
  - Git
  - Code Review
  - Workflow
cover: "/images/blogs/pr-review-workflow.svg"
coverAlt: "Pull request review workflow"
featured: false
draft: false
canonical: "https://kamlesh.tech/blog/pr-review-workflow"
---

Code review is not a gate — it is shared ownership. On small teams, the goal is not more comments; it is **fewer surprises in production**. These habits keep reviews fast without lowering the bar.

## Keep PRs small

> A PR should answer one question. If the title needs “and,” split it.

Aim for diffs a reviewer can finish in fifteen minutes. Large changes get summary comments at the top: motivation, risk, and how to test.

## Write for the reviewer

Every PR description should include:

1. **What** changed (one paragraph)
2. **Why** now
3. **How to verify** (steps or screenshots)

```markdown
## What
Add retry wrapper around S3 presign calls.

## Why
Transient 503s were failing uploads in peak hours.

## Test
1. Upload 10 files via the form
2. Confirm no failed File doc rows
```

## Review in layers

| Pass | Focus |
| --- | --- |
| First | Correctness, edge cases |
| Second | Naming, structure, tests |
| Third | Docs and rollout |

Block on correctness and security. Nits can wait for a follow-up if they do not change behavior.

## Automate the boring parts

- Lint and typecheck in CI before human review
- Danger or similar for PR size warnings
- Required status checks on `main`

## When to merge

Merge when:

- [ ] CI is green
- [ ] At least one reviewer understood the change
- [ ] Rollback path is obvious

## Summary

Readable PRs, small scope, and automated checks let a two-person team review like a ten-person one — without the meeting load.
