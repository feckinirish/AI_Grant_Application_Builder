# Git Setup Commands

## After creating a GitHub repository, run these commands:

```bash
# Add your GitHub repository as the remote origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push your code to GitHub
git push -u origin master
```

## Alternative: If you want to use 'main' as the default branch:

```bash
# Rename master to main
git branch -M main

# Add remote origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to main branch
git push -u origin main
```

## Future commits:

```bash
# Stage changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to remote
git push
```

## Check repository status:

```bash
# Check current status
git status

# View commit history
git log --oneline

# View remote repositories
git remote -v
```