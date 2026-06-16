import { Server } from "socket.io";

// Global olarak Socket.IO server referansını tutuyoruz
let io: Server;

export async function GET(req: Request, res: Response) {
  if (!io) {
    const server = res.socket?.server;  // res.socket.server ile server referansını alıyoruz

    // Eğer server referansı yoksa, hata mesajı döndürüyoruz
    if (!server) {
      return new Response("Server is not available", { status: 500 });
    }

    // Socket.IO'yu başlatıyoruz
    io = new Server(server, {
      cors: {
        origin: "*", // Geliştirme için tüm domainlere izin veriyoruz
        methods: ["GET", "POST"],
      },
    });

    // Yeni bağlantı geldiğinde yapılacaklar
    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      // Kullanıcıyı "add-user" event'i ile sunucuya ekliyoruz
      socket.on("add-user", (userId) => {
        console.log(`User ${userId} connected`);
        global.onlineUsers.set(userId, socket.id);
      });

      // Kullanıcı bağlantısı kesildiğinde yapılacaklar
      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        global.onlineUsers.delete(socket.id);
      });
    });

    console.log("Socket.IO server started");
  }

  // Başarılı mesajı dönüyoruz
  return new Response("Socket.IO server is running", { status: 200 });
}
