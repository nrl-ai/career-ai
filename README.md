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
   # Edit .env with your configuration
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

# OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# AI Services
OPENAI_API_KEY="your-openai-key"
GEMINI_API_KEY="your-gemini-key"
```

### AI Proxy Setup (Optional)

For Gemini AI integration, you can set up a proxy server:

1. **Create `litellm_config.yaml`**
   ```yaml
   model_list:
     - model_name: gemini-pro
       litellm_params:
         model: gemini/gemini-pro
         api_key: os.environ/GEMINI_API_KEY
         api_base: os.environ/GEMINI_API_BASE
   ```

2. **Start the proxy server**
   ```bash
   docker run -d \
     -v $(pwd)/litellm_config.yaml:/app/config.yaml \
     -e LITELLM_MASTER_KEY=<your-litellm-key> \
     -e GEMINI_API_KEY=<your-gemini-key> \
     -p 4000:4000 \
     ghcr.io/berriai/litellm:main-latest \
     --config /app/config.yaml --detailed_debug
   ```

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
- **Google Gemini** - Advanced AI language model
- **OpenAI ChatGPT** - Conversational AI
- **Azure APIs** - Cloud AI services
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
