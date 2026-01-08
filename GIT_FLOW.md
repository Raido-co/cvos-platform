# cvOS Git Flow

## Branch Strategy

```
main (production)
  │
  ├── develop (staging/pre-production)
  │     │
  │     ├── feature/auth
  │     ├── feature/premium
  │     └── feature/templates
  │
  └── hotfix/urgent-fix
```

## Branches

| Branch | Purpose | Deploys To |
|--------|---------|------------|
| `main` | Production-ready code | Vercel (production), Railway (production) |
| `develop` | Integration branch for features | Vercel (preview), Railway (staging - optional) |
| `feature/*` | New features in development | Vercel (preview) |
| `hotfix/*` | Urgent production fixes | Merge directly to main |

## Workflow

### 1. Starting New Feature
```bash
git checkout develop
git pull origin develop
git checkout -b feature/my-feature
```

### 2. Working on Feature
```bash
# Make changes
git add .
git commit -m "feat: description"
git push origin feature/my-feature
```

### 3. Create Pull Request
- Open PR from `feature/my-feature` → `develop`
- Vercel automatically creates preview deployment
- Review and merge when ready

### 4. Release to Production
- Open PR from `develop` → `main`
- Review all changes
- Merge to deploy to production

## Deployment Setup

### Vercel (Frontend)
- **Production**: Deploys automatically from `main`
- **Preview**: Auto-deploys for all branches and PRs
- No configuration needed - already working

### Railway (Backend)
- **Option A (Simple)**: Keep single environment on `main`
  - Feature branches test with production backend
  - Risk: Feature code can't test backend changes

- **Option B (Recommended)**: Add staging environment
  1. Go to Railway Dashboard
  2. Click "Environments" → "Add Environment"
  3. Create "staging" connected to `develop`
  4. Set `NEXT_PUBLIC_API_URL` in Vercel to switch based on branch

## Commit Convention

```
feat: new feature
fix: bug fix
docs: documentation
style: formatting, no code change
refactor: code restructuring
test: adding tests
chore: maintenance
```

## Quick Commands

```bash
# Create develop branch (one-time)
git checkout main
git checkout -b develop
git push -u origin develop

# Start new feature
git checkout develop && git checkout -b feature/name

# Sync feature with develop
git checkout feature/name
git merge develop

# Finish feature (create PR instead of direct merge)
# Go to GitHub → Pull Requests → New PR
```
