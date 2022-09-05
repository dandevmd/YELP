CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  rating INTEGER NOT NULL,
  price_range INTEGER NOT NULL check(
    price_range >= 1
    AND price_range <= 5
  )
);


INSERT INTO restaurants (name, location, rating, price_range) VALUES ('McDonalds', 'NYC', 4, 3);


ALTER TABLE restaurants ALTER COLUMN rating DROP NOT NULL;

CREATE TABLE reviews (
  id SERIAL NOT NULL PRIMARY KEY,
  name  VARCHAR(50) NOT NULL,
  body VARCHAR(255),
  rating INTEGER check(rating >=1 and rating <= 5)
);

ALTER TABLE reviews
ADD COLUMN  restaurant_id;

ALTER TABLE reviews ADD FOREIGN KEY (restaurant_id) REFERENCES restaurants(id);

ALTER TABLE reviews ALTER COLUMN restaurant_id SET NOT NULL;

CREATE TABLE users (
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(50) NOT NULL
);

ALTER TABLE restaurants
ADD CONSTRAINT user_id_fk
FOREIGN KEY (user_id) 
REFERENCES users (user_id);
