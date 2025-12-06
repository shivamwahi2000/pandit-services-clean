# GitHub Actions Setup for Oracle Cloud Deployment

This repository is configured to automatically deploy to Oracle Cloud whenever you push to the `main` branch.

## Required GitHub Secrets

You need to configure the following secrets in your GitHub repository:

### 1. SSH_PRIVATE_KEY

This is your private SSH key used to connect to the Oracle Cloud server.

**To get the key:**

```bash
cat ~/.ssh/id_rsa
```

Copy the entire output, including the `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----` lines.

### 2. SSH_HOST

The IP address of your Oracle Cloud server.

**Value:**
```
152.67.163.163
```

### 3. SSH_USER

The username to connect to the Oracle Cloud server.

**Value:**
```
opc
```

## How to Add Secrets to GitHub

1. Go to your GitHub repository
2. Click on **Settings** tab
3. In the left sidebar, click on **Secrets and variables** → **Actions**
4. Click on **New repository secret**
5. Add each secret:
   - Name: `SSH_PRIVATE_KEY`
     Value: (paste your private key from `~/.ssh/id_rsa`)

   - Name: `SSH_HOST`
     Value: `152.67.163.163`

   - Name: `SSH_USER`
     Value: `opc`

## How the Deployment Works

1. When you push to the `main` branch, GitHub Actions automatically triggers
2. The workflow connects to your Oracle Cloud server via SSH
3. It pulls the latest code from GitHub
4. Installs dependencies
5. Builds the Next.js application
6. Restarts the PM2 process to serve the updated application

## Manual Deployment

You can also trigger a deployment manually:

1. Go to the **Actions** tab in your GitHub repository
2. Click on **Deploy to Oracle Cloud** workflow
3. Click **Run workflow**
4. Select the `main` branch
5. Click **Run workflow**

## Prerequisites on Oracle Cloud Server

Make sure your Oracle Cloud server has:

1. Node.js and npm installed
2. PM2 installed globally (`npm install -g pm2`)
3. Git configured with access to your repository
4. The project cloned at `~/pandit-services-clean`
5. SSH access enabled for the `opc` user

## Viewing Deployment Logs

1. Go to the **Actions** tab in your GitHub repository
2. Click on the latest workflow run
3. Click on the **deploy** job
4. Expand the steps to see detailed logs

## Troubleshooting

### SSH Connection Failed

- Verify the SSH_PRIVATE_KEY secret matches your `~/.ssh/id_rsa` file
- Ensure the SSH key is authorized on the Oracle Cloud server (check `~/.ssh/authorized_keys`)
- Verify the SSH_HOST and SSH_USER values are correct

### Build Failed

- Check the build logs in the GitHub Actions workflow
- Ensure all dependencies are listed in `package.json`
- Verify the build script in `package.json` is correct

### PM2 Process Not Starting

- SSH into the server and check PM2 status: `pm2 status`
- Check PM2 logs: `pm2 logs pandit-services`
- Manually restart PM2: `pm2 restart pandit-services`

## Security Notes

- Never commit your private SSH key to the repository
- Keep your GitHub secrets secure
- Regularly rotate your SSH keys
- Use a dedicated deployment key instead of your personal SSH key for better security

## Alternative: Using Deploy Keys

For better security, you can create a dedicated deploy key:

1. On your Oracle Cloud server:
   ```bash
   ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy_key
   ```

2. Add the public key to your server's `~/.ssh/authorized_keys`:
   ```bash
   cat ~/.ssh/github_deploy_key.pub >> ~/.ssh/authorized_keys
   ```

3. Add the private key to GitHub secrets:
   ```bash
   cat ~/.ssh/github_deploy_key
   ```

4. Update the `SSH_PRIVATE_KEY` secret in GitHub with this new key
