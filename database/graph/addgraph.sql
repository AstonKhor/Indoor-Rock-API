DROP TABLE IF EXISTS ascents;
DROP TABLE IF EXISTS climbers;

CREATE Table ascents (
  id INT NOT NULL PRIMARY KEY,
  date INT,
  user_id INT,
  year INT,
  usa_boulders VARCHAR(8),
  name VARCHAR(70),
  climb_type BOOLEAN
);

CREATE TABLE climbers (
  id INT NOT NULL,
  v0- REAL,
  v0 REAL,
  v1 REAL,
  v2 REAL,
  v3 REAL,
  v4 REAL,
  v5 REAL,
  v6 REAL,
  v7 REAL,
  v8 REAL,
  v9 REAL,
  v10 REAL
);