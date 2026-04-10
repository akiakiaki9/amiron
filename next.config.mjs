/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Включаем статический экспорт для Netlify
  images: {
    unoptimized: true, // Отключаем оптимизацию изображений для статики
  },
  trailingSlash: true, // Добавляем слеши в конце URL
  distDir: 'out', // Папка для экспорта (опционально, по умолчанию 'out')
};

export default nextConfig;