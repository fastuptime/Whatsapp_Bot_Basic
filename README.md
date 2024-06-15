# WhatsApp Web Bot

Bu proje, WhatsApp Web üzerinde çalışan basit bir bot uygulamasıdır. Bot, gelen mesajları dinleyerek belirli komutlara cevap verir. Aşağıdaki adımları takip ederek bu botu kendi sisteminizde çalıştırabilirsiniz.

## Başlarken 🚀

### Gereksinimler

- Node.js (v18 veya üstü)
- npm veya yarn
- WhatsApp hesabı

### Kurulum

Projeyi klonlayın:

```bash
git clone https://github.com/fastuptime/Whatsapp_Bot_Basic.git
cd Whatsapp_Bot_Basic
```

Gerekli paketleri yükleyin:

```bash
npm install
```

veya

```bash
yarn install
```

## Kullanım

Uygulamayı başlatın:

```bash
node index.js
```

### QR Kodunu Tarama

Uygulamayı ilk kez başlattığınızda, terminalde bir QR kodu görünecektir. WhatsApp uygulamanızı açın ve Ayarlar > Bağlı Cihazlar > Cihaz Bağla adımlarını takip ederek QR kodunu tarayın.

![QR Kod](images/qr-code-example.png)

### Komutlar

- **`.test`**: Bu komutu gönderdiğinizde bot size `Test` mesajı ile cevap verecektir.

### Kodu Açıklama

```javascript
const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Sistem Aktif!");
});

client.on("message", (message) => {
  const msg = message.body.toLocaleLowerCase();
  if (msg.startsWith(".test")) {
    message.reply("Test");
  }
});

client.initialize();
```

### Açıklama

- **Kendi yazdığınız mesajları okuyamaz**
- **qrcode-terminal**: QR kodunu terminalde görüntülemek için kullanılır.
- **whatsapp-web.js**: WhatsApp Web istemcisi için kullanılan kütüphane.
- **Client**: WhatsApp istemcisini başlatır ve yönetir.
- **LocalAuth**: Kimlik doğrulama stratejisi olarak yerel dosya tabanlı kimlik doğrulamayı kullanır.
- **puppeteer**: Başsız tarayıcıyı yönetir.
- **on("qr")**: QR kodu üretildiğinde tetiklenir.
- **on("ready")**: İstemci başarıyla başlatıldığında tetiklenir.
- **on("message")**: Yeni bir mesaj alındığında tetiklenir.
