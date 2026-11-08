---
name: security-review
description: "Security review of a diff: map the changed attack surface, report only exploitable findings with an attacker, an action, and a result, and validate each finding with a separate agent. Use when a diff touches auth, sessions, permissions, personal data, payments, file uploads, raw SQL, crypto, secrets, dependencies, or infrastructure, or when the user asks for a security review."
metadata:
  credits:
    skill: security-specialist
    author: Fabricio Telles (ft.ia.br)
    license: Apache-2.0
    url: "https://github.com/fabricioctelles/skills/tree/main/skills/security-specialist"
---

# Security Review

A review of what changed, for security regressions, scoped strictly to the diff and the code it touches. `code-review` runs it as an extra axis when the diff is risky; the user can also call it directly.

## Principles

- **Only report what you can exploit.** Every finding names who the attacker is, what they do, and what they get. "An attacker could theoretically..." is not a finding. "Send this request, get this result" is.
- **Severity is likelihood times impact**, not distance from a checklist. If you cannot describe the damage, it is lower than you think.
- **A missing defence-in-depth layer is not a vulnerability.** If layer A already stops the attack, the absence of layer B is a hardening note.
- **Understand the trust model before judging.** If admins are fully trusted by design, an admin doing admin things is not a finding.
- **The agent that validates a finding is never the agent that found it.**
- **Deleted code matters.** Removed validation, auth checks, or error handling are findings.

## Process

### 1. Pin the diff

Take the fixed point from the caller, or the branch's recorded base (call the Skill tool with "branch-lineage" to resolve it). Use `git diff <fixed-point>...HEAD`. Read all of it, tests included: tests show where the author thinks the boundary is.

### 2. Map the changed attack surface

| Change | Check for |
|--------|-----------|
| New route or endpoint | Auth required, input validated, rate limit where abuse is cheap |
| Auth or permission logic | Bypass, privilege escalation, IDOR (object owned by another tenant or user) |
| New user input | Injection (SQL, NoSQL, command, template), XSS, path traversal, size limits |
| Query changes | Raw SQL, dynamic identifiers, search, anything bypassing the query builder |
| File I/O, uploads | Path traversal, content type trust, size, storage exhaustion |
| Dependency added or bumped | Known CVEs reachable from this code, typosquats, floating versions |
| Config, env, infra | Secrets in code, permissive CORS, debug on, public buckets |
| Errors, logging | Internals or personal data leaking into responses or logs |
| Crypto, tokens | Weak algorithms, missing expiry, key handling, comparison timing |

### 3. Hunt

For each mapped change, trace the data flow from the untrusted source to the sink. Check business logic too: state-machine violations, missing ownership checks, race conditions on money or inventory. Scanners find the standard classes; the value here is the logic bugs scanners miss.

### 4. Validate

Start a fresh subagent with a fresh context window. Give it the candidate findings and the diff command, and ask it to **kill** each one: show why it is not exploitable (an earlier check, a framework guarantee, an unreachable path). Keep only findings that survive. A finding that depends on how a parser or runtime behaves needs a cited spec or a test, not an assumption.

### 5. Report

```markdown
## Security

**Verdict:** APPROVE | APPROVE WITH NOTES | REQUEST CHANGES | BLOCK

### [HIGH] <title>
**Where:** path/to/file.ext L42-48
**Attack:** <who> does <what> and gets <result>
**Evidence:** <the code or a reproduction command and its output>
**Fix:** <concrete change>

### Hardening notes
- <defence-in-depth suggestions, not findings>

### Checked and fine
- <what was examined and holds up>
```

Severities: CRITICAL (unauthenticated, high impact, reachable now), HIGH, MEDIUM, LOW. A finding behind two auth gates is not critical because the pattern looks bad. Say what the change does well: it makes the real findings credible.

## Gotchas

- Never probe anything but localhost or a dev environment the user owns. Active testing of any other host needs the user's explicit authorization first.
- If the diff touches auth or crypto and you cannot judge the impact from the diff alone, say so and recommend a broader review instead of guessing.
- A CVE score means nothing if the vulnerable function is never called. Check reachability before rating a dependency finding.
- Findings that must be fixed later go to the issue tracker as bugs labelled `security`, never only into chat.
