CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    premium BOOLEAN DEFAULT TRUE,
    public_key TEXT, -- To store the RSA public key
    private_key TEXT, -- To store the RSA private key
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_google (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    google_refresh_token TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
