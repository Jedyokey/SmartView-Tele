# 📺 SmartView Télé

A modern e-commerce platform for high-end smart TVs and accessories, built with React and Vite. The platform serves customers in Abidjan, Côte d'Ivoire, offering a seamless shopping experience with multilingual support (English and French).

## 🌟 Features

- **Multilingual Support**: Full English and French language support using i18next
- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Modern UI/UX**: Clean and intuitive interface with smooth animations
- **Product Catalog**: Comprehensive display of smart TVs with detailed specifications
- **Contact Form**: Integrated contact form with WhatsApp integration
- **Performance Optimized**: 
  - Lazy loading for components
  - Image optimization with Cloudinary
  - Service worker for offline support
  - Efficient caching strategies

## 🛠️ Tech Stack

### Core Technologies
- React 19
- Vite 6
- React Router DOM 7
- Bootstrap 5
- i18next for internationalization

### UI Components
- React Bootstrap
- React Icons
- Font Awesome
- Custom CSS with modern design principles

### Development Tools
- ESLint for code quality
- SWC for fast refresh
- TypeScript support
- Source maps for debugging

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/smartview.git
cd smartview
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## 🏗️ Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable components
├── context/         # React context providers
├── locales/         # Translation files
├── pages/          # Page components
├── TV_Data/        # Product data
├── utils/          # Utility functions
├── App.jsx         # Main application component
├── i18n.js         # i18next configuration
└── main.jsx        # Application entry point
```

## 🌐 Internationalization

The application supports both English and French languages. Translation files are located in `src/locales/` directory. The language can be switched using the language selector in the navigation bar.

## 🚀 Performance Optimizations

- **Code Splitting**: Components are lazy-loaded for better initial load time
- **Image Optimization**: 
  - Cloudinary integration for responsive images
  - Automatic format selection (WebP/AVIF)
  - Lazy loading for images
- **Caching**:
  - Service worker for offline support
  - Efficient asset caching
  - Browser cache optimization

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Mobile devices
- Tablets
- Desktop screens
- Large displays

## 🔧 Configuration

### Vite Configuration
The project uses Vite for development and building. Key configurations include:
- SWC for fast refresh
- Production optimizations
- Asset handling
- Environment variables

### i18next Configuration
Located in `src/i18n.js`, handles:
- Language detection
- Translation loading
- Fallback languages
- Namespace management

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contact

For any inquiries, please contact:
- Email: jedyokey29@gmail.com
- WhatsApp: +225 05 7618 3285
- Location: Adjame, Abidjan, Côte d'Ivoire

## 🙏 Acknowledgments

- All contributors who have helped shape this project
- The React and Vite communities for their excellent documentation
- Cloudinary for image optimization services
