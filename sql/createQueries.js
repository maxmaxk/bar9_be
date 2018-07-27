const createQueries=[
'CREATE DATABASE IF NOT EXISTS `b9` CHARACTER SET utf8 COLLATE utf8_general_ci;',
'USE b9;',
`CREATE TABLE IF NOT EXISTS user_roles(
	id INT NOT NULL AUTO_INCREMENT,
	role_name CHAR(100) NOT NULL,
	description CHAR(200),
	PRIMARY KEY(id)
)`,
`CREATE TABLE IF NOT EXISTS users(
	id INT NOT NULL AUTO_INCREMENT,
	name CHAR(200) NOT NULL,
	password CHAR(200) NOT NULL,
	user_role_id INT,
	PRIMARY KEY(id),
	FOREIGN KEY (user_role_id) REFERENCES user_roles(id)
		ON UPDATE CASCADE
		ON DELETE RESTRICT
);`,
`CREATE TABLE IF NOT EXISTS tokens(
	id INT NOT NULL AUTO_INCREMENT,
	token CHAR(200) NOT NULL,
	user_id INT NOT NULL,
	token_time DATETIME,
	PRIMARY KEY(id),
	FOREIGN KEY (user_id) REFERENCES users(id)
		ON UPDATE CASCADE
		ON DELETE RESTRICT
);`,
`CREATE TABLE IF NOT EXISTS tank_type(
	id INT NOT NULL AUTO_INCREMENT,
	name CHAR(200) NOT NULL,
	description CHAR(200),
	PRIMARY KEY(id)
);`,
`CREATE TABLE IF NOT EXISTS tank_volume(
	id INT NOT NULL AUTO_INCREMENT,
	volume INT NOT NULL,
	PRIMARY KEY(id)
);`,
`CREATE TABLE IF NOT EXISTS tank_elpower(
	id INT NOT NULL AUTO_INCREMENT,
	elpower INT NOT NULL,
	PRIMARY KEY(id)
);`,
`CREATE TABLE IF NOT EXISTS tank_pressure(
	id INT NOT NULL AUTO_INCREMENT,
	pressure INT NOT NULL,
	PRIMARY KEY(id)
);`,
`CREATE TABLE IF NOT EXISTS tank_implementation(
	id INT NOT NULL AUTO_INCREMENT,
	implementation CHAR(200) NOT NULL,
	PRIMARY KEY(id)
);`,
`CREATE TABLE IF NOT EXISTS tank_manage(
	id INT NOT NULL AUTO_INCREMENT,
	code INT NOT NULL,
	name CHAR(200) NOT NULL,
	PRIMARY KEY(id)
);`,
`CREATE TABLE IF NOT EXISTS tank_options(
	id INT NOT NULL AUTO_INCREMENT,
	code INT NOT NULL,
	name CHAR(200) NOT NULL,
	PRIMARY KEY(id)
);`,
`CREATE TABLE IF NOT EXISTS tank_communication(
	id INT NOT NULL AUTO_INCREMENT,
	code INT NOT NULL,
	name CHAR(200) NOT NULL,
	PRIMARY KEY(id)
);`,
`CREATE TABLE IF NOT EXISTS tank_eloptions(
	id INT NOT NULL AUTO_INCREMENT,
	code INT NOT NULL,
	name CHAR(200) NOT NULL,
	PRIMARY KEY(id)
);`,

`CREATE TABLE IF NOT EXISTS produce_states(
	id INT NOT NULL AUTO_INCREMENT,
	state CHAR(200) NOT NULL,
	PRIMARY KEY(id)
);`,
`CREATE TABLE IF NOT EXISTS docs_states(
	id INT NOT NULL AUTO_INCREMENT,
	state CHAR(200) NOT NULL,
	PRIMARY KEY(id)
);`,



`CREATE TABLE IF NOT EXISTS tank_models(
	id INT NOT NULL AUTO_INCREMENT,
	tank_type_id INT NOT NULL,
	tank_volume_id INT NOT NULL,
	tank_elpower_id INT NOT NULL,
	tank_pressure_id INT NOT NULL,
	tank_implementation_id INT NOT NULL,
	tank_manage_id INT NOT NULL,
	tank_options_id INT NOT NULL,
	tank_communication_id INT NOT NULL,
	tank_eloptions_id INT NOT NULL,
	tank_coil_square INT,
	tank_step1_power INT,
	tank_step1_count INT,
	tank_step2_power INT,
	tank_step2_count INT,
	tank_power_entries_count INT,
	tank_generation INT,
	docs_state_id INT NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (tank_type_id) REFERENCES tank_type(id)
		ON UPDATE CASCADE
		ON DELETE RESTRICT,
	FOREIGN KEY (tank_volume_id) REFERENCES tank_volume(id)
		ON UPDATE CASCADE
		ON DELETE RESTRICT,
	FOREIGN KEY (tank_elpower_id) REFERENCES tank_elpower(id)
		ON UPDATE CASCADE
		ON DELETE RESTRICT,
	FOREIGN KEY (tank_pressure_id) REFERENCES tank_pressure(id)
		ON UPDATE CASCADE
		ON DELETE RESTRICT,
	FOREIGN KEY (tank_implementation_id) REFERENCES tank_implementation(id)
		ON UPDATE CASCADE
		ON DELETE RESTRICT,
	FOREIGN KEY (tank_manage_id) REFERENCES tank_manage(id)
		ON UPDATE CASCADE
		ON DELETE RESTRICT,
	FOREIGN KEY (tank_options_id) REFERENCES tank_options(id)
		ON UPDATE CASCADE
		ON DELETE RESTRICT,
	FOREIGN KEY (tank_communication_id) REFERENCES tank_communication(id)
		ON UPDATE CASCADE
		ON DELETE RESTRICT,	
	FOREIGN KEY (tank_eloptions_id) REFERENCES tank_eloptions(id)
		ON UPDATE CASCADE
		ON DELETE RESTRICT,
	FOREIGN KEY (docs_state_id) REFERENCES docs_states(id)
		ON UPDATE CASCADE
		ON DELETE RESTRICT		
);`,

`CREATE TABLE IF NOT EXISTS tank_instance(
	id INT NOT NULL AUTO_INCREMENT,
	tank_model_id INT NOT NULL,
	serial_number CHAR(100) NOT NULL,
	produce_state_id INT NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (tank_model_id) REFERENCES tank_models(id)
		ON UPDATE CASCADE
		ON DELETE RESTRICT,	
	FOREIGN KEY (produce_state_id) REFERENCES produce_states(id)
		ON UPDATE CASCADE
		ON DELETE RESTRICT
);`,

`CREATE TABLE IF NOT EXISTS produce_orders(
	id INT NOT NULL AUTO_INCREMENT,
	order_id INT NOT NULL,
	tank_instance_id INT NOT NULL,
	quantity INT NOT NULL,
	comment CHAR(200),
	PRIMARY KEY(id),
	FOREIGN KEY (tank_model_id) REFERENCES tank_models(id)
		ON UPDATE CASCADE
		ON DELETE RESTRICT,
	FOREIGN KEY (tank_instance_id) REFERENCES tank_instance(id)
		ON UPDATE CASCADE
		ON DELETE RESTRICT
);`

`CREATE TABLE IF NOT EXISTS docs_orders(
	id INT NOT NULL AUTO_INCREMENT,
	tank_model_id INT NOT NULL,
	comment CHAR(200),
	PRIMARY KEY(id),
	FOREIGN KEY (tank_model_id) REFERENCES tank_models(id)
		ON UPDATE CASCADE
		ON DELETE RESTRICT
);`


]

module.exports=createQueries

