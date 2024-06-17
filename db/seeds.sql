INSERT INTO departments (id, name)
VALUES (1, "Product"),
       (2, "Engineering"),
       (3, "Marketing"),
       (4, "Creative"),
       (5, "Sales");
      
INSERT INTO roles (title, salary, departments_id)      
VALUES ("UX Designer", 80000, 1),      
       ("Senior Software Engineer", 211000, 2),
        ("Digital Marketer", 70000, 3),
        ("Creative Director", 80000, 4),
        ("Account Executive", 60000, 5);
     


INSERT INTO employees ( first_name, last_name, role_id, manager_id)
VALUES ('John', 'Smith', 1, 1),
('Jane', 'Doe', 2, 1),
('Joe', 'Bloggs', 3, 1),
('John', 'Doe', 4, 1),
('Jane', 'Smith', 5, 1),
('Joe', 'Doe', 6, 1),
('John', 'Bloggs', 7, 1),
('Jane', 'Bloggs', 8, 1),
('Joe', 'Smith', 9, 1),
('John', 'Doe', 10, 1),
('Jane', 'Doe', 11, 1),
('Joe', 'Bloggs', 12, 1),
('John', 'Smith', 13, 1),
('Jane', 'Smith', 14, 2),
('Joe', 'Doe', 15, 4),
('John', 'Doe', 16, 5),
('Jane', 'Bloggs', 17, 6),
('Joe', 'Bloggs', 18, 7),
('John', 'Bloggs', 19, 8),
('Jane', 'Doe', 20, 9),
('Joe', 'Smith', 21, 10),
('John', 'Smith', 22, 11),
('Jane', 'Bloggs', 23, 12),
('Joe', 'Bloggs', 24, 13),
('John', 'Doe', 25, 2),
('Jane', 'Doe', 26, 3),
('Joe', 'Smith', 27, 4),
      ;
       


