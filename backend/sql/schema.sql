CREATE TABLE courts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('INDOOR', 'OUTDOOR')),
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE equipment (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  total_quantity INT NOT NULL
);

CREATE TABLE coaches (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE coach_availability (
  id SERIAL PRIMARY KEY,
  coach_id INT REFERENCES coaches(id),
  day int CHECK(day BETWEEN 0 AND 6),
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL
);

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  court_id INT REFERENCES courts(id),
  coach_id INT REFERENCES coaches(id),
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  total_price INT NOT NULL,
  status TEXT CHECK (status IN ('CONFIRMED', 'CANCELLED')) DEFAULT 'CONFIRMED',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE booking_equipment (
  booking_id INT REFERENCES bookings(id),
  equipment_id INT REFERENCES equipment(id),
  quantity INT NOT NULL,
  PRIMARY KEY (booking_id, equipment_id)
);

CREATE TABLE pricing_rules (
  id SERIAL PRIMARY KEY,
  name TEXT,
  rule_type TEXT,
  condition JSONB,
  modifier_type TEXT CHECK (modifier_type IN ('MULTIPLIER', 'ADDITIVE')),
  value NUMERIC,
  is_active BOOLEAN DEFAULT true
);
