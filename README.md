# sharetime

See the time right now in any timezone, and share a time with others easily.

## Features

The purpose of `sharetime` is to make it easy to share a time with people in different timezones.

### Website

There are 2 main use cases:

1. Check the time right now in a given timezone
    - Visit `/IST/now`
    - This shows the current time in IST (India Standard Time)
2. Convert a time in another timezone to your timezone
    - Visit `/IST/1200`
    - This shows 12:00 PM IST translated to your timezone
    - If you live in India and want to say "Let's meet at 12:00 PM IST", share this link with a friend in a different timezone, and they will see the time in their own timezone

Timezones can be abbreviations (`IST`, `PST`) or full IANA names (`/Europe/London/14:30`). If an abbreviation is ambiguous, you can pick the timezone you meant.

**Flexible time formats:** the URL accepts several formats:

- Military time: `/PST/1800`
- 24-hour with colon: `/PST/18:00`
- 12-hour format: `/PST/6pm` or `/PST/6:30pm`
- With leading zeros: `/PST/06:30AM`

### cURL

cURL is supported. Requests are answered in plain text by Vercel Routing Middleware, and _your timezone_ is detected automatically from your request.

Behaviour is the same as the website, and time formats are just as flexible.

```bash
# Usage help
❯ curl <your-domain>

# 1. Get the time now
❯ curl <your-domain>/IST/now
Your timezone detected is Asia/Kolkata
Time right now in (IST) Asia/Kolkata is 12:41 AM

# 2. Convert a specific time (supports multiple formats)
❯ curl <your-domain>/PST/4pm
Your timezone detected is Asia/Kolkata
4pm in (PST) America/Los_Angeles at your timezone will be 05:30 AM (+1 day)

❯ curl <your-domain>/Europe/London/14:30
Your timezone detected is Asia/Kolkata
14:30 in (Europe/London) Europe/London at your timezone will be 08:00 PM
```

> **Note:** For cURL, your timezone is detected from your IP address, so it will be wrong if you are on a VPN. The website uses your device's timezone instead, so it is not affected.

## Setup

Requires Node.js 20 or newer. Install the dependencies:

```bash
npm install
```

## Development server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Tests

```bash
npm test           # run once
npm run typecheck  # TypeScript checks
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview the production build:

```bash
npm run preview
```

