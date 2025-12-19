INSERT INTO courts (name, type) VALUES
('Indoor Court 1', 'INDOOR'),
('Indoor Court 2', 'INDOOR'),
('Outdoor Court 1', 'OUTDOOR'),
('Outdoor Court 2', 'OUTDOOR');

INSERT INTO equipment (name, total_quantity) VALUES
('Racket', 10),
('Shoes', 6);

INSERT INTO coaches (name) VALUES
('Coach A'),
('Coach B'),
('Coach C');

INSERT INTO coach_availability (coach_id, day, start_time, end_time)
SELECT
  c.id,
  d.day,
  TIME '06:00',
  TIME '22:00'
FROM coaches c
CROSS JOIN generate_series(0, 6) AS d(day);

INSERT INTO pricing_rules (name, rule_type, modifier_type, value) VALUES
('Peak Hour', 'PEAK', 'MULTIPLIER', 1.2),
('Weekend', 'WEEKEND', 'MULTIPLIER', 1.1),
('Indoor Premium', 'COURT', 'ADDITIVE', 100);
