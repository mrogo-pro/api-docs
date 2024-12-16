# Aşama 1: Uygulamayı derle
FROM node:20-alpine as build

# 2. Çalışma dizinini ayarlayın
WORKDIR /app

# 3. package.json ve package-lock.json dosyalarını ekleyin
COPY package*.json ./

# 4. Bağımlılıkları yükleyin
RUN npm install

# 5. Uygulamayı production modunda derleyin
COPY . .
RUN npm run build

# Aşama 2: Uygulamayı serve ile sunmak için gerekli görüntüyü oluştur
FROM node:20-alpine

# 6. Uygulama dosyalarını kopyalayın
WORKDIR /app
COPY --from=build /app/build ./build

# 7. Serve'i yükleyin
RUN npm install -g serve

# 8. Uygulamayı başlat
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
