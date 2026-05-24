-- Cloud ERP System Database Initialization SQL

-- 1. Create Database (if running manually, run this first or create it via PgAdmin / psql)
-- CREATE DATABASE localhost_mvo8;

-- 2. Create products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    price DECIMAL(10, 2) NOT NULL
);

-- 3. Insert some initial mockup data for testing
INSERT INTO products (sku, name, quantity, price) VALUES
('SKU-001', 'Logitech MX Master 3S', 15, 99.99),
('SKU-002', 'Keychron K2 V2 Keyboard', 8, 89.00),
('SKU-003', 'Sony WH-1000XM5 Headphones', 5, 349.99),
('SKU-004', 'Dell UltraSharp 27" Monitor', 12, 450.00)
ON CONFLICT (sku) DO NOTHING;
