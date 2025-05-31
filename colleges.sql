-- SQL for NeonDB: Colleges and Reviews Tables
CREATE TABLE IF NOT EXISTS colleges (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  location TEXT NOT NULL,
  top_package TEXT,
  cutoff TEXT,
  description TEXT,
  image TEXT,
  rating REAL,
  reviews INT
);

CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  college_id INTEGER REFERENCES colleges(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Example data
INSERT INTO colleges (name, type, location, top_package, cutoff, description, image, rating, reviews) VALUES
('Indian Institute of Technology Bombay', 'Government', 'Mumbai, Maharashtra', '3.7 Cr (2024)', 'JEE Advanced: AIR < 3000', 'IIT Bombay is one of India''s premier engineering institutes, known for its academic excellence and vibrant campus life.', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', 4.8, 1200),
('Birla Institute of Technology and Science, Pilani', 'Private', 'Pilani, Rajasthan', '2.5 Cr (2024)', 'BITSAT: > 370/450', 'BITS Pilani is a top private university with a strong focus on innovation and entrepreneurship.', 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80', 4.6, 900);
