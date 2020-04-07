DROP DATABASE IF EXISTS heroku_a47c644aa249fa2;

CREATE DATABASE heroku_a47c644aa249fa2;

USE heroku_a47c644aa249fa2;

CREATE TABLE Countries(
  CountryName VARCHAR(50) NOT NULL PRIMARY KEY
);

CREATE TABLE Gyms(
  Id INT AUTO_INCREMENT PRIMARY KEY,
  GymName VARCHAR(80) NOT NULL,
  Link VARCHAR(270) NOT NULL,
  Country VARCHAR(50),
  Region VARCHAR(100),
  Subregion VARCHAR(50),
  Website VARCHAR(270),
  Phone VARCHAR(40),
  GymAddress VARCHAR(200),
  Rating DECIMAL(2,1),
  Description TEXT,
  FOREIGN KEY (Country) REFERENCES Countries(CountryName)
);

-- CREATE TABLE Keys(
--   Id INT AUTO_INCREMENT PRIMARY KEY,
--   key VARCHAR(36)
-- );

CREATE TABLE Users(
  Id INT AUTO_INCREMENT PRIMARY KEY,
  Username VARCHAR(36),
  Password VARCHAR(36),
  Salt INT
);
