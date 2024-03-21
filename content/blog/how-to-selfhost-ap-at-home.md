---
external: false
title: "How to self-host Activepieces at home"
description: "A guide to self-host Activepieces at home"
date: 2024-03-21
draft: false
tags: ["docker", "raspberry"]
---

In this guide, we will show you how to self-host Activepieces at home using a Raspberry Pi and Docker (with [Compose](https://docs.docker.com/compose/)).

Optionally, we will show you how to access your AP instance from the Internet using Cloudflare Tunnels. For this, you will need a Cloudflare account and a domain configured and using Cloudflare's nameservers.
Adding a domain to Cloudflare is free but it can take hours in order to be fully usable.

## Step 1: Install Docker

First, you need to install Docker on your Raspberry Pi. You can do this by running the following the tutorial on Docker's website: [How to install Docker](https://docs.docker.com/engine/install/). Once there, select the OS of your Raspberry Pi and follow the instructions. I will be using a Raspberry Pi 400 with Ubuntu.

## Step 2: Install Activepieces

Once you have Docker installed, you can install Activepieces. Run the following command in your terminal in order to clone the AP repository:

```bash
git clone https://github.com/activepieces/activepieces.git
```

Go to the `activepieces` directory and run the following command to start the server:

```bash
cd activepieces
```

Generate all the Environment variables needed:

```bash
sh tools/deploy.sh
```

Note: If this doesn't work, you can try renaming the `.env.example` file to `.env` and fill in the variables manually.

Now, you can start the containers using Docker Compose (this step will take a while, depending on your internet connection and your server's performance):

```bash
docker-compose up -d
```

### Notes

- If you want to use a different port, you can change the left side of the `ports` key in the `docker-compose.yml` file for the `activepieces` service (probably line #10).
- You can change the `AP_TRIGGER_DEFAULT_POLL_INTERVAL` variable in the `.env` file to change the default poll interval (in minutes) for the triggers.

## Step 3: Access Activepieces

Now you can access Activepieces by going to `http://<your-ip>:8080` in your browser.

- If you changed the port in the `docker-compose.yml` file, you will need to use that port instead of `8080`.

## Step 4: How to access your AP instance from the Internet (optional)

For this, I'll be using Cloudflare Tunnels. You can find more information about this [here](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/).

**Please note: You need to have a Cloudflare account and a domain configred to use this service. To configure a new domain, you can follow the instructions [here](https://developers.cloudflare.com/fundamentals/setup/manage-domains/connect-your-domain/).**

### These are the steps

1. Create a Cloudflare account [here](https://dash.cloudflare.com/login).
1. Add your domain to Cloudflare. Follow the instructions [here](https://developers.cloudflare.com/fundamentals/setup/manage-domains/add-site/). This is free.
1. Once you have your domain added, go to the `Zero Trust` tab.
1. You are gonna be asked for a plan and payment method. You can choose the free plan, but you will need to add a payment method, still.
1. Being in the `Zero Trust` area, go to the `Network` tab and click on `Tunnels`.
1. Select `Cloudflared` and then press Next.
1. Name your tunnel. I named mine `activepieces` (shocking). Then press `Save Tunnel`.
1. Choose your environment. Please, note that this `Environment` is the OS where you are running your Docker containers. In my case is my Raspberry Pi 400 with Ubuntu. Also, if your are using Ubuntu, select `Debian` as Ubuntu is based on Debian. Please do NOT select "Docker" as the environment.
1. Choose your architecture. In my case, I selected `arm64`. You can use the command `arch` or `uname -m` to know your architecture. Please note that `aarch64` is the same as `arm64`.
1. The section `Install and run a connector` is going to show you the commands to install the `cloudflared` package. Run those commands in your terminal. Just copy the whole command block and paste into your terminal:
1. After running the commands, you are going to notice the `Connectors` section in the Cloudflare dashboard updated with your new Connector ID. Just press `Next`.
1. Select your domain from the dropdown list. You can also add a subdomain (I recommend this) and a path if you want. I added `ap` as a subdomain.
1. Select `HTTP` as your `Type`.
1. For the `URL`, put `localhost:8080` (or the port you are using). Note the `localhost`, this is important. Do NOT include `http://`.
1. Press `Save Tunnel`.
1. Now you can access your AP instance from the Internet by going to `https://ap.yourdomain.com`.

### How to receive webhooks

If you configured AP to be accessible from the internet, you probably want to receive webhooks from external services. In order to do this, you need to configure the `AP_FRONTEND_URL` environment variable in the `.env` file as stated [here](https://www.activepieces.com/docs/install/configurations/environment-variables#environment-variables). This variable should contain the URL where the webhooks will be sent (the same on the step #16). Example: `https://ap.yourdomain.com`.

## Conclusion

You have successfully self-hosted Activepieces at home. You can now start creating your flows. If you have any questions, feel free to comment down below. I'll be happy to help you.
