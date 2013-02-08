-- countries
CREATE TABLE `combo_countries` (
  id_country INT(11) NOT NULL AUTO_INCREMENT,
  `country_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY  (id_country)
) ENGINE=MYISAM  DEFAULT CHARSET=utf8;

INSERT INTO `combo_countries` (`id_country`, `country_name`) VALUES
('1', 'Argentina'),
('2', 'Australia'),
('3', 'Brazil'),
('4', 'United states'), 
('5', 'Venezuela');

-- states
CREATE TABLE `combo_states` (
  `id_state` INT(11) NOT NULL AUTO_INCREMENT,
  `id_country` VARCHAR(3) NOT NULL,
  `state_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_state`)
) ENGINE=MYISAM  DEFAULT CHARSET=utf8;

INSERT INTO `combo_states` (`id_state`, `id_country`, `state_name`) VALUES
(1, 1, 'Formosa'),
(2, 1, 'Chaco'),
(3, 1, 'Corrientes'),
(4, 2, 'Queensland'),
(5, 2, 'Western'),
(6, 2, 'Northern Territory'),
(7, 3, 'Bahia'),
(8, 3, 'Sao Paulo'),
(9, 3, 'Parana'),
(10, 4, 'Illinois'),
(11, 4, 'Florida'),
(12, 4, 'New York');

-- cities
CREATE TABLE `combo_cities` (
  `id_city` INT(11) NOT NULL AUTO_INCREMENT,
  `id_state` INT(11) NOT NULL,
  `city_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_city`)
) ENGINE=MYISAM  DEFAULT CHARSET=utf8;

INSERT INTO `combo_cities` (`id_city`, `id_state`, `city_name`) VALUES
(1, 1, 'Bermejo'),
(2, 1, 'Laishi'),
(3, 1, 'Batacos'),
(4, 2, '12 de Octubre'),
(5, 2, '2 de Abril');
