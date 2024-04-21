INSERT INTO "recipes" (id, image_id, description, title, list_ingredients, steps, category_id, date)
VALUES
  (1, 1, 'Delicious spaghetti recipe', 'Spaghetti Carbonara', 'Spaghetti, Eggs, Bacon, Parmesan Cheese, Black Pepper', '1. Cook spaghetti according to package instructions. 2. In a separate pan, cook bacon until crispy. 3. In a bowl, whisk together eggs and grated Parmesan cheese. 4. Once spaghetti is cooked, drain and toss with bacon fat. 5. Remove pan from heat and quickly stir in egg mixture until creamy. 6. Serve immediately with freshly cracked black pepper.', 1, '2024-04-20'),
  (2, 2, 'Classic chocolate chip cookies', 'Chocolate Chip Cookies', 'Flour, Butter, Sugar, Brown Sugar, Eggs, Vanilla Extract, Baking Soda, Salt, Chocolate Chips', '1. Preheat oven to 350°F (175°C). 2. In a bowl, cream together butter, sugar, and brown sugar. 3. Beat in eggs and vanilla extract. 4. Combine flour, baking soda, and salt in a separate bowl, then gradually add to the wet ingredients. 5. Stir in chocolate chips. 6. Drop spoonfuls of dough onto a baking sheet and bake for 8-10 minutes or until golden brown.', 2, '2024-04-21'),
  (3, 3, 'Healthy and refreshing salad', 'Greek Salad', 'Tomatoes, Cucumbers, Red Onion, Feta Cheese, Kalamata Olives, Olive Oil, Red Wine Vinegar, Oregano, Salt, Pepper', '1. Chop tomatoes, cucumbers, and red onion into bite-sized pieces. 2. Toss together with crumbled feta cheese and Kalamata olives. 3. Drizzle with olive oil and red wine vinegar. 4. Season with oregano, salt, and pepper. 5. Serve chilled.', 3, '2024-04-22');



INSERT INTO "category" (title)
VALUES
  ('Pasta'),
  ('Desserts'),
  ('Salads');