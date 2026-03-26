# 📊 Hệ thống Công thức MACD & Chuẩn hóa (Fomo Chart)

Dưới đây là hệ thống tính toán hoàn chỉnh đã được tối ưu với tham số.

---

# 🔹 PHẦN 1: TÍNH TOÁN CƠ BẢN (TỪ GIÁ)

## Tham số đầu vào

- **Fast period (n_fast)**: Chu kỳ nhanh (mặc định = 5, có thể chỉnh)
- **Slow period (n_slow)**: Chu kỳ chậm (mặc định = 13, có thể chỉnh)
- **Signal period (n_signal)**: Chu kỳ tín hiệu (mặc định = 9, có thể chỉnh)
- **Price (P)**: Giá tại thời điểm hiện tại

---

## 1. Hệ số làm mượt (Smoothing Factor)

- α_fast = 2 / (n_fast + 1)
- α_slow = 2 / (n_slow + 1)
- α_signal = 2 / (n_signal + 1)

---

## 2. Đường Trung bình Động lũy thừa (EMA)

- EMA_fast = EMA_fast_prev + α_fast × (P - EMA_fast_prev)
- EMA_slow = EMA_slow_prev + α_slow × (P - EMA_slow_prev)

---

## 3. Đường MACD và Tín hiệu

- **MACD** = EMA_fast - EMA_slow
- **Signal Line** = Signal_prev + α_signal × (MACD - Signal_prev)
- **Histogram (Δ)** = MACD - Signal

---

## 4. Bước Chuẩn hóa (Lực nén)

- Compression (C) = Normalize(Δ)

> (Chuẩn hóa theo biên độ, thường dùng min-max hoặc scaling cố định)

---

# 🔹 PHẦN 2: CÔNG THỨC FOMO (THAM SỐ CỐ ĐỊNH)

Giả sử hệ số làm mượt FOMO:

- k = 0.005 (0.5%)

---

## 5. Điểm FOMO hiện tại

- FOMO = FOMO_prev × (1 - k) + k × C

**Ý nghĩa:**
- Giữ lại **99.5% giá trị cũ**
- Cộng thêm **0.5% ảnh hưởng từ lực nén hiện tại**

---

# 🔹 PHẦN 3: CHỈ SỐ DÒNG TIỀN / ĐỒ THỊ (M, N)

## 6. Chỉ số tích lũy (M)

- M = M_prev + FOMO

---

## 7. Chỉ số xu hướng (N)

- N = EMA(M)

Giả sử:
- α_M ≈ α_signal (để độ mượt đồng nhất)

---

# 🔹 TỔNG KẾT KHỞI TẠO (VIEW TODAY)

Khi bắt đầu phiên mới:

1. EMA_fast = P
2. EMA_slow = P
3. Signal = 0
4. FOMO = 0
5. M = 0

---

# 🔹 DỮ LIỆU ĐẦU VÀO

Mỗi khi có:
- Nến mới hoặc
- Tick mới

👉 Chỉ cần cập nhật:
- Price (P)

Và chạy lại toàn bộ chuỗi công thức trên.

---

# ✅ TÓM TẮT FLOW
