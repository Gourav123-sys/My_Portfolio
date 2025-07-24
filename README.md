# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- Responsive design that works on all devices
- Dark/Light mode toggle
- Smooth animations with Framer Motion
- Interactive UI components
- Contact form with EmailJS integration
- SEO optimized

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies
   ```bash
   npm install
   ```
3. Set up environment variables
   - Copy `.env.example` to `.env`
   - Fill in your EmailJS credentials (see [EmailJS Setup](#emailjs-setup))
4. Start the development server
   ```bash
   npm run dev
   ```

## EmailJS Setup

The contact form uses EmailJS to send emails directly from the client-side without a backend server.

1. Create a free account at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template with the following variables:
   - `from_name`: Sender's name
   - `from_email`: Sender's email
   - `subject`: Email subject
   - `message`: Email message
4. Get your EmailJS credentials:
   - Service ID: Found in the "Email Services" section
   - Template ID: Found in the "Email Templates" section
   - Public Key: Found in the "Account" > "API Keys" section
5. Add these credentials to your `.env` file:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_USER_ID=your_public_key  # This is your Public Key
   ```

## Building for Production

```bash
npm run build
```

This will generate optimized files in the `dist` directory.

## Deployment

This project is configured for easy deployment on Vercel. Simply connect your GitHub repository to Vercel for automatic deployments.

## License

MIT