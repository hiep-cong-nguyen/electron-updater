# Chạy lệnh npm dist để electron builder xây dựng 1 bản installer cho app (pnpm gây lỗi electron-builder khi install app)

# Upload files trong file dist (trừ folder win-unpacked) lên 1 bản release của git (đổi toàn bộ dấu cách trong tên file thành dấu -, electron-updater chỉ quét theo dấu -)

# Sau khi chạy exe của app thì electron-updater sẽ tự động check version của package.json với version release để check latest 

# Electron-updater sẽ tải và cài bản cập nhật theo cấu hình trong main.js  