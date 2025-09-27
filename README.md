# CareerAI

![CareerAI Logo](apps/client/public/screenshots/careerai.png)

**🚀 Elevate Your Job Hunt with AI-Powered CVs, Interviews, and Job Matches!**

[![Stars](https://img.shields.io/github/stars/nrl-ai/career-ai?style=social)](https://github.com/nrl-ai/career-ai/stargazers)
[![License](https://img.shields.io/github/license/nrl-ai/career-ai)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-77.3%25-blue)](https://github.com/nrl-ai/career-ai)

[📺 Watch Demo](https://youtu.be/8Hq5oe0tmD8) • [🚀 Quick Start](#quick-start) • [📖 Documentation](#documentation) (Coming soon) • [🤝 Contributing](#contributing)

## ✨ Features

CareerAI transforms your job search experience with powerful AI-driven tools:

- **🎯 AI-Powered Resume Builder** - Create professional resumes with intelligent writing assistance, grammar fixes, and tone adjustments
- **📊 Resume Analysis & Optimization** - Get expert feedback and scoring with personalized improvement suggestions
- **🎤 Mock Interview Practice** - Practice with AI interview experts across different roles and receive detailed feedback
- **🔗 OAuth Authentication** - Seamless login with Google and GitHub accounts
- **📱 Responsive Design** - Works perfectly on desktop and mobile devices
- **🌐 Multi-language Support** - Built with internationalization in mind

## 🚀 Quick Start

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/) (recommended: install via [nvm](https://github.com/nvm-sh/nvm))
- [pnpm](https://pnpm.io/installation)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/nrl-ai/career-ai.git
   cd career-ai
   ```

2. **Install dependencies and build**

   ```bash
   npm install -g pnpm
   pnpm install
   pnpm run build
   ```

3. **Configure environment**

   ```bash
   cp .env.example .env
   # Edit .env with your database, OAuth, and infrastructure configuration
   # Note: AI API keys are configured through the application Settings UI
   ```

4. **Start the application**
   ```bash
   bash build-and-restart.sh
   ```

Your CareerAI instance will be available at `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

Key environment variables to configure in your `.env` file:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/careerai"

# OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Authentication
ACCESS_TOKEN_SECRET="your-access-token-secret"
REFRESH_TOKEN_SECRET="your-refresh-token-secret"
```

### AI Services Configuration

**Important:** AI API keys are now configured through the application Settings UI for enhanced security:

- **OpenAI API Key** - Used for LLM (ChatGPT) and Speech-to-Text services
- **ElevenLabs API Key** - Used for Text-to-Speech functionality

After deployment, navigate to **Settings > AI Configuration** to configure these services.

## 🏗️ Tech Stack

### Frontend

- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **React Query** - Data fetching and caching
- **React Router** - Client-side routing

### Backend

- **NestJS** - Progressive Node.js framework
- **Prisma** - Next-generation ORM
- **PostgreSQL** - Robust relational database
- **MinIO** - S3-compatible object storage
- **Chrome (Browserless)** - Headless browser for PDF generation

### AI & Integrations

- **OpenAI ChatGPT** - Conversational AI and Speech-to-Text
- **ElevenLabs** - Text-to-Speech synthesis
- **OAuth 2.0** - Secure authentication

### DevOps

- **Docker & Docker Compose** - Containerization
- **GitHub Actions** - CI/CD pipeline
- **ESLint & Prettier** - Code quality tools

## 📖 Documentation

- [Development Guide](DEVELOPMENT.md) - Detailed setup for contributors
- [API Documentation](#) - Backend API reference
- [Deployment Guide](#) - Production deployment instructions

## 🐛 Troubleshooting

### Common Issues

**PDF Download Not Working**

- Ensure the Chrome container has internet access
- Try disabling UFW on the host machine: `sudo ufw disable`
- Check Docker network configuration

**Build Failures**

- Clear node modules: `rm -rf node_modules && pnpm install`
- Update dependencies: `pnpm update`
- Check Node.js version compatibility

**Database Connection Issues**

- Verify PostgreSQL is running
- Check DATABASE_URL in `.env`
- Ensure database exists and migrations are applied

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and commit: `git commit -m 'Add amazing feature'`
4. Push to your branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Support

If you find CareerAI helpful, please:

- ⭐ Star this repository
- 🐛 Report bugs in [Issues](https://github.com/nrl-ai/career-ai/issues)
- 💡 Suggest features in [Discussions](https://github.com/nrl-ai/career-ai/discussions)
- 📢 Share with your network

## References

- This project was developed from [Reactive Resume - Resume Editor](https://github.com/AmruthPillai/Reactive-Resume).

Made with ❤️ by the CareerAI Team
