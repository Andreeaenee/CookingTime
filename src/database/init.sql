-- Table: user
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(100)
);
-- Table: category
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    title VARCHAR(100)
);

-- Table: recipes
CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    image_id INT,
    description TEXT,
    title VARCHAR(100),
    steps TEXT,
    category_id INT REFERENCES category(category_id),
    date DATE,
    user_id INT REFERENCES "user"(id)
);
-- Table: favorites
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "user"(id),
    recipe_id INT REFERENCES recipes(id)
);
-- Table: ingredients
CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);


-- Table: recipes_has_ingredients
CREATE TABLE recipes_has_ingredients (
    id_recipe INT REFERENCES recipes(id),
    id_ingredient INT REFERENCES ingredients(id),
    quantity NUMERIC,
    PRIMARY KEY (id_recipe, id_ingredient)
);


CREATE TABLE shopping_list (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "user"(id),
    ingredients TEXT,
    date_created DATE
);

ALTER TABLE recipes_has_ingredients
ALTER COLUMN quantity TYPE VARCHAR(50);

ALTER TABLE shopping_list
ADD COLUMN name VARCHAR(100);




   INSERT INTO category (category_id, title) VALUES
(4, 'Breakfast'),
(5, 'Appetizers'),
(6, 'Main Dishes'),
(7, 'Soups'),
(8, 'Beverages'),
(9, 'Snacks'),
(10, 'Side Dishes'),
(11, 'Vegetarian'),
(12, 'Vegan'),
(13, 'Gluten-Free');

INSERT INTO category (category_id, title) VALUES
(14, 'Grilled'),
(15, 'Roasted'),
(16, 'Stir-Fried'),
(17, 'Baked'),
(18, 'Fried'),
(19, 'Steamed'),
(20, 'Slow Cooker'),
(21, 'Instant Pot'),
(22, 'Pressure Cooker'),
(23, 'Smoked');

INSERT INTO category (category_id, title) VALUES
(24, 'Vegetarian'),
(25, 'Vegan'),
(26, 'Gluten-Free'),
(27, 'Dairy-Free'),
(28, 'Low-Carb'),
(29, 'Keto'),
(30, 'Paleo'),
(31, 'Mediterranean'),
(32, 'Japanese'),
(33, 'Indian');

INSERT INTO ingredients (name) VALUES
('Penne'),
('Fusilli'),
('Rigatoni'),
('Linguine'),
('Farfalle'),
('Tortellini'),
('Lasagna noodles'),
('Rice noodles'),
('Ramen noodles'),
('Macaroni'),
('Vermicelli'),
('Spaghetti squash'),
('Whole wheat flour'),
('Bread flour'),
('Cake flour'),
('Almond flour'),
('Coconut flour'),
('Cornstarch'),
('Baking powder'),
('Yeast'),
('Olive oil'),
('Vegetable oil'),
('Canola oil'),
('Coconut oil'),
('Sunflower oil'),
('Peanut oil'),
('Sesame oil'),
('Soy sauce'),
('Worcestershire sauce'),
('Oyster sauce');

INSERT INTO ingredients (name) VALUES
('Barbecue sauce'),
('Teriyaki sauce'),
('Honey'),
('Maple syrup'),
('Agave syrup'),
('Molasses'),
('Ketchup'),
('Mayonnaise'),
('Mustard'),
('Hot sauce'),
('Sriracha sauce'),
('Salsa'),
('Pesto sauce'),
('Alfredo sauce'),
('Marinara sauce'),
('Soy milk'),
('Almond milk'),
('Coconut milk'),
('Oat milk'),
('Cashew milk'),
('Whole milk'),
('Skim milk'),
('Heavy cream'),
('Half-and-half'),
('Sour cream'),
('Greek yogurt'),
('Cream cheese'),
('Ricotta cheese'),
('Mozzarella cheese'),
('Cheddar cheese'),
('Parmesan cheese'),
('Feta cheese'),
('Blue cheese'),
('Gorgonzola cheese'),
('Goat cheese'),
('Provolone cheese'),
('Swiss cheese'),
('Cottage cheese'),
('Brie cheese'),
('Gouda cheese'),
('Havarti cheese'),
('Fontina cheese'),
('Camembert cheese'),
('Boursin cheese'),
('Pepperoni'),
('Salami'),
('Ham'),
('Bacon'),
('Ground beef'),
('Ground turkey');

INSERT INTO ingredients (name) VALUES
('Ground chicken'),
('Ground pork'),
('Italian sausage'),
('Pulled pork'),
('Chicken breasts'),
('Chicken thighs'),
('Chicken wings'),
('Chicken drumsticks'),
('Beef steak'),
('Pork chops'),
('Lamb chops'),
('Salmon fillets'),
('Tuna steaks'),
('Shrimp'),
('Scallops'),
('Crab meat'),
('Lobster tails'),
('Mussels'),
('Clams'),
('Squid'),
('Calamari'),
('Octopus'),
('Cod fillets'),
('Haddock fillets'),
('Trout fillets'),
('Bass fillets'),
('Tilapia fillets'),
('Catfish fillets'),
('Anchovies'),
('Sardines'),
('Oysters'),
('Sausages'),
('Bratwurst'),
('Chorizo'),
('Kielbasa'),
('Andouille'),
('Bologna'),
('Turkey bacon'),
('Canadian bacon'),
('Pancetta'),
('Guanciale'),
('Duck breast'),
('Quail'),
('Venison'),
('Elk meat'),
('Buffalo meat'),
('Rabbit'),
('Goose'),
('Pheasant');
