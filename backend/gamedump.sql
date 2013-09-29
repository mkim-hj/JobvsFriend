CREATE DATABASE game;
CREATE TABLE users (fb_id integer unique, logged_in boolean);
CREATE TABLE duels (id SERIAL PRIMARY KEY, duelid player_fb_id integer NOT NULL, friend_fb_id integer NOT NULL, company_id integer NOT NULL, salary integer NOT NULL, result boolean);
CREATE TABLE companies (id integer PRIMARY KEY, name varchar(50));
INSERT INTO companies VALUES (1, 'Microsoft')
INSERT INTO companies VALUES (2, 'Apple')
INSERT INTO companies VALUES (3, 'Facebook')
INSERT INTO companies VALUES (4, 'LinkedIn')
INSERT INTO companies VALUES (5, 'Google')
INSERT INTO companies VALUES (6, 'Amazon')
INSERT INTO companies VALUES (7, 'Dropbox')
INSERT INTO companies VALUES (8, 'Yahoo')
INSERT INTO companies VALUES (9, 'Yelp')
INSERT INTO companies VALUES (10, 'Twitter')
