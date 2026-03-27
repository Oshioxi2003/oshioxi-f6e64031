-- Use the railway database (from DATABASE_URL)
USE railway;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Raw candles from Twelve Data API
CREATE TABLE IF NOT EXISTS candles (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  symbol VARCHAR(20) NOT NULL DEFAULT 'XAU/USD',
  `interval` VARCHAR(10) NOT NULL DEFAULT '5min',
  time DATETIME NOT NULL,
  open DECIMAL(12, 4) NOT NULL,
  high DECIMAL(12, 4) NOT NULL,
  low DECIMAL(12, 4) NOT NULL,
  close DECIMAL(12, 4) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_symbol_interval_time (symbol, `interval`, time),
  INDEX idx_time (time),
  INDEX idx_symbol_interval (symbol, `interval`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Computed MACD/FOMO data (one row per candle after engine processing)
CREATE TABLE IF NOT EXISTS computed_data (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  candle_id BIGINT NOT NULL,
  symbol VARCHAR(20) NOT NULL DEFAULT 'XAU/USD',
  `interval` VARCHAR(10) NOT NULL DEFAULT '5min',
  time DATETIME NOT NULL,
  price DECIMAL(12, 4) NOT NULL,
  open DECIMAL(12, 4) NOT NULL,
  high DECIMAL(12, 4) NOT NULL,
  low DECIMAL(12, 4) NOT NULL,
  ema_fast DECIMAL(16, 8) NOT NULL,
  ema_slow DECIMAL(16, 8) NOT NULL,
  macd DECIMAL(16, 8) NOT NULL,
  signal_line DECIMAL(16, 8) NOT NULL,
  histogram DECIMAL(16, 8) NOT NULL,
  compression DECIMAL(16, 8) NOT NULL,
  fomo_smoothed DECIMAL(16, 8) NOT NULL,
  m DECIMAL(16, 8) NOT NULL,
  n DECIMAL(16, 8) NOT NULL,
  trend VARCHAR(20) NOT NULL,
  trade_signal VARCHAR(10) NOT NULL DEFAULT 'NONE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_candle (candle_id),
  INDEX idx_symbol_interval_time (symbol, `interval`, time),
  INDEX idx_time (time),
  FOREIGN KEY (candle_id) REFERENCES candles(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
