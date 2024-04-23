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
    date DATE
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
    quantity NUMERIC
    PRIMARY KEY (recipe_id, ingredient_id)
);

ALTER TABLE favorites
ADD COLUMN user_id INT REFERENCES "user"(id);

CREATE TABLE shopping_list (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "user"(id),
    ingredients TEXT,
    date_created DATE
);



