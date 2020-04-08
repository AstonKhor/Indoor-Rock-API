DROP DATABASE IF EXISTS indoorgyms;

CREATE DATABASE indoorgyms;

\c indoorgyms;

CREATE TABLE gyms (
  Id SERIAL PRIMARY KEY,
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
  Poster VARCHAR(36)
);

CREATE TABLE users (
  Id SERIAL PRIMARY KEY,
  Username VARCHAR(36),
  Password VARCHAR(36),
  Salt INT
);

CREATE TABLE keys (
  Id SERIAL PRIMARY KEY,
  key VARCHAR(36),
  User_Id int,
  FOREIGN KEY (User_Id) REFERENCES users(Id)
);

