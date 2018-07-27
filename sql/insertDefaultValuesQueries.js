const insertDefaultValuesQueries={
	'tank_type':
	`INSERT INTO tank_type (name,description)
	 VALUES ('SE','Бак с электронагревом'),
			('SV','Бак с косвенным нагревом'),
			('SVE','Бак с комбинированным нагревом'),
			('S','Бак аккумуляторный')`,
	'tank_volume':
	`INSERT INTO tank_volume (volume)
	 VALUES (600),(1000),(1500),(2000),(3000),(5000),(10000)`,
	'tank_elpower':
	`INSERT INTO tank_elpower (elpower)
	 VALUES (10000),(15000),(20000),(25000)`,
	'tank_pressure':
	`INSERT INTO tank_pressure (pressure)
	 VALUES (6),(10)`, 
	'tank_implementation':
	`INSERT INTO tank_implementation (implementation)
	 VALUES ('Оптима'),('Премиум')`,  
	'tank_manage':
	`INSERT INTO tank_manage (code,name)
	 VALUES (1,'Термостат накладной'),
			(2,'Термостат Tense'),
			(3,'Контроллер'),
			(4,'Внешний щит')`,	
	'tank_options':
	`INSERT INTO tank_options (code,name)
	 VALUES (0,'Нет (стандартная позиция)'),
			(1,'Смотровой люк')`,	
	'tank_communication':
	`INSERT INTO tank_communication (code,name)
	 VALUES (0,'Без коммуникации'),
			(100,'Modbus RTU'),
			(200,'Lonworks')`,	
	'tank_eloptions':
	`INSERT INTO tank_eloptions (code,name)
	 VALUES (0,'Нет (стандартная позиция)'),
			(1,'Датчик давления'),
			(2,'Предохрнит. термостат'),
			(3,'Датчик давления и термостат')`,		
	'user_roles':
	`INSERT INTO user_roles (role_name,description)
	 VALUES ('admin','Администратор системы'),
			('manager','Менеджер'),
			('engineer','Инженер'),
			('produce','Производитель')`,
	'users':
	`INSERT INTO users (name,password,user_role_id)
	 VALUES ('admin','111111',1)`,
	'produce_states':
	`INSERT INTO produce_states (state)
	 VALUES ('Новая заявка'),('В работе'),('Отмена'),('Выполнено')
	 `,	 
	'docs_states':
	`INSERT INTO docs_states (state)
	 VALUES ('Новая заявка'),('В работе'),('Отмена'),('Выполнено')
	 `,		 
}

module.exports=insertDefaultValuesQueries