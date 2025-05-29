# 🛒 SmartShop AI - Akıllı Fiyat Karşılaştırma Platformu

> Türkiye'nin en kapsamlı fiyat karşılaştırma ve akıllı alışveriş platformu

![SmartShop AI](https://img.shields.io/badge/SmartShop-AI-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🌟 Özellikler

### 🎯 **Ana Özellikler**
- 🔍 **Gerçek Zamanlı Fiyat Karşılaştırma** - 50+ mağazadan anlık fiyat güncellemeleri
- 🤖 **AI Destekli Öneriler** - Kişiselleştirilmiş ürün önerileri
- 🛒 **Akıllı Sepet Sistemi** - Mağaza bazında organize alışveriş
- ❤️ **Favoriler** - Beğendiğiniz ürünleri takip edin
- 📝 **Alışveriş Listeleri** - Bütçe takipli liste yönetimi
- 📱 **Responsive Tasarım** - Tüm cihazlarda mükemmel deneyim

### 💡 **Gelişmiş Özellikler**
- 🔔 **Fiyat Alarmları** - Hedef fiyata ulaştığında bildirim
- 📊 **Tasarruf Takibi** - Ne kadar tasarruf ettiğinizi görün
- 🎨 **Modern UI/UX** - Tailwind CSS ile güzel tasarım
- ⚡ **Hızlı Performans** - Next.js 14 ile optimize edilmiş

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Node.js 18+ 
- npm veya yarn
- Python 3.8+ (AI Engine için)

### Kurulum

1. **Repository'yi klonlayın**
```bash
git clone https://github.com/[USERNAME]/smartshop-ai.git
cd smartshop-ai
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

4. **Tarayıcınızda açın**
```
http://localhost:3000
```

## 📁 Proje Yapısı

```
smartshop-ai/
├── src/
│   ├── frontend/          # Next.js React uygulaması
│   │   ├── app/           # App Router sayfaları
│   │   ├── components/    # Yeniden kullanılabilir bileşenler
│   │   ├── contexts/      # React Context (State Management)
│   │   ├── data/          # Mock data ve tiplar
│   │   └── public/        # Statik dosyalar
│   ├── backend/           # Express.js API server
│   └── ai-engine/         # Python AI/ML servisleri
├── package.json           # Ana proje bağımlılıkları
└── README.md
```

## 🛠️ Teknoloji Stack'i

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Lucide React** - Modern ikonlar
- **React Context API** - State management

### Backend
- **Express.js** - Node.js framework
- **TypeScript** - Type safety
- **CORS** - Cross-origin resource sharing

### AI Engine
- **Python** - AI/ML servisleri
- **Flask** - Lightweight web framework

## 📱 Sayfa Yapısı

- 🏠 **Ana Sayfa** (`/`) - Hero section, kategoriler, öne çıkan ürünler
- 🛍️ **Ürünler** (`/products`) - Filtreleme, sıralama, grid/list görünüm
- 📋 **Ürün Detay** (`/products/detail/[id]`) - Fiyat karşılaştırma, sepete ekleme
- 🛒 **Sepet** (`/cart`) - Sepet yönetimi, sipariş özeti
- ❤️ **Favoriler** (`/favorites`) - Favori ürünler
- 📝 **Alışveriş Listeleri** (`/shopping-lists`) - Liste yönetimi

## 🎨 UI/UX Özellikleri

- ✨ **Modern Gradientler** - Mavi-indigo renk paleti
- 🎯 **Smooth Animasyonlar** - Hover efektleri ve geçişler
- 📱 **Mobile-First** - Responsive tasarım
- 🎭 **Consistent Icons** - Lucide React icon library
- 🎨 **Professional Shadows** - Depth ve hierarchy

## 🔧 Development

### Scripts
```bash
npm run dev          # Tüm servisleri başlat (frontend + backend + AI)
npm run dev:frontend # Sadece frontend (port 3000)
npm run dev:backend  # Sadece backend (port 5000)
npm run dev:ai       # Sadece AI engine (port 8000)
npm run build        # Production build
```

### State Management
Proje React Context API kullanır:
- `useCart()` - Sepet işlemleri
- `useFavorites()` - Favori işlemleri
- `useApp()` - Genel uygulama state'i

### Veri Persistance
- localStorage kullanılarak browser'da veri saklanır
- Sayfa yenileme sonrası veriler korunur

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- 🌐 **Website**: [localhost:3000](http://localhost:3000)
- 📧 **Email**: smartshop@example.com
- 🐛 **Issues**: GitHub Issues

---

⭐ **Projeyi beğendiyseniz yıldız vermeyi unutmayın!** 