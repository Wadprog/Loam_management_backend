CREATE SCHEMA IF NOT EXISTS `prestamo_db`;

-- -----------------------------------------------------
-- Table `prestamo_db`.`SequelizeMeta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`SequelizeMeta` (
  `name` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
; -- ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `prestamo_db`.`address_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`address_types` (
  `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
-- -----------------------------------------------------
-- Table `prestamo_db`.`countries`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`countries` (
  `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `phone_code` VARCHAR(255) NOT NULL,
  `currency` VARCHAR(255) NOT NULL,
  `currency_symbol` VARCHAR(255) NOT NULL,
  `curency_name` VARCHAR(255) NOT NULL,
  `translations` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`states`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`states` (
  `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `country_id` MEDIUMINT UNSIGNED NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `country_id` (`country_id`),
  CONSTRAINT `states_country_id_fk`
    FOREIGN KEY (`country_id`)
    REFERENCES `prestamo_db`.`countries` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
    ; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;
-- -----------------------------------------------------
-- Table `prestamo_db`.`cities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`cities` (
  `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `state_id` MEDIUMINT UNSIGNED NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `state_id` (`state_id`),
  CONSTRAINT `cities_sate_id_fk`
    FOREIGN KEY (`state_id`)
    REFERENCES `prestamo_db`.`states` (`id`)
    ON UPDATE CASCADE)
    ; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;
-- -----------------------------------------------------
-- Table `prestamo_db`.`streets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`streets` (
  `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `city_id` MEDIUMINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `city_id` (`city_id`),
  CONSTRAINT `streets_city_id_fk`
    FOREIGN KEY (`city_id`)
    REFERENCES `prestamo_db`.`cities` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;
-- -----------------------------------------------------
-- Table `prestamo_db`.`addresses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`addresses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `country_id` MEDIUMINT UNSIGNED NOT NULL,
  `state_id` MEDIUMINT UNSIGNED NOT NULL,
  `city_id` MEDIUMINT UNSIGNED NOT NULL,
  `street_id` MEDIUMINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `country_id` (`country_id`),
  INDEX `state_id` (`state_id`),
  INDEX `city_id` (`city_id`),
  INDEX `street_id` (`street_id`),
  CONSTRAINT `addresses_ibfk_1`
    FOREIGN KEY (`country_id`)
    REFERENCES `prestamo_db`.`countries` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `addresses_ibfk_2`
    FOREIGN KEY (`state_id`)
    REFERENCES `prestamo_db`.`states` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `addresses_ibfk_3`
    FOREIGN KEY (`city_id`)
    REFERENCES `prestamo_db`.`cities` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `addresses_ibfk_4`
    FOREIGN KEY (`street_id`)
    REFERENCES `prestamo_db`.`streets` (`id`)
    ON UPDATE CASCADE)
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`tenants`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`tenants` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NULL DEFAULT NULL,
  `active` TINYINT(1) NOT NULL DEFAULT '1',
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
  ; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `prestamo_db`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `custom` TINYINT(1) NOT NULL DEFAULT '0',
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`roles_tenant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`roles_tenant` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tenant_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`, `role_id`),
  INDEX `tenant_id` (`tenant_id`),
  INDEX `role_id` (`role_id`),
  CONSTRAINT `roles_tenant_ibfk_1`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `roles_tenant_ibfk_2`
    FOREIGN KEY (`role_id`)
    REFERENCES `prestamo_db`.`roles` (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `prestamo_db`.`people`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`people` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `given_name` VARCHAR(255) NOT NULL,
  `familly_name` VARCHAR(255) NOT NULL,
  `tenant_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `tenant_id` (`tenant_id`),
  CONSTRAINT `people_ibfk_1`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`employees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`employees` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `active` TINYINT(1) NOT NULL DEFAULT '1',
  `salary` DECIMAL(10,2) NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role_id` INT NOT NULL,
  `tenant_id` INT NULL DEFAULT NULL,
  `person_id` INT NOT NULL,
  `is_primary` TINYINT(1) NOT NULL DEFAULT '0',
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`, `person_id`),
  INDEX `role_id` (`role_id`),
  INDEX `tenant_id` (`tenant_id`),
  INDEX `person_id` (`person_id`),
  CONSTRAINT `employees_ibfk_1`
    FOREIGN KEY (`role_id`)
    REFERENCES `prestamo_db`.`roles_tenant` (`id`),
  CONSTRAINT `employees_ibfk_2`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `employees_ibfk_3`
    FOREIGN KEY (`person_id`)
    REFERENCES `prestamo_db`.`people` (`id`)
    ON UPDATE CASCADE)
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;
-- -----------------------------------------------------
-- Table `prestamo_db`.`borrowers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`borrowers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `person_id` INT NOT NULL,
  `loan_amounts` SMALLINT UNSIGNED NOT NULL DEFAULT '0',
  `active_loans` SMALLINT UNSIGNED NOT NULL DEFAULT '0',
  `global_credit_score` SMALLINT UNSIGNED NULL DEFAULT '0',
  `creator_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`, `person_id`),
  INDEX `person_id` (`person_id`),
  CONSTRAINT `borrowers_person_id_fk`
    FOREIGN KEY (`person_id`)
    REFERENCES `prestamo_db`.`people` (`id`)
    ON UPDATE CASCADE,

  CONSTRAINT `borrowers_creator_id_fk`
    FOREIGN KEY (`creator_id`)
    REFERENCES `prestamo_db`.`employees` (`id`)
    ON UPDATE CASCADE
    )

; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `prestamo_db`.`addresses_borrower`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`addresses_borrower` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `address_id` INT NOT NULL,
  `borrower_id` INT NOT NULL,
  `tenant_id` INT NOT NULL,
  `address_type_id` SMALLINT UNSIGNED NOT NULL,
  `date_address_from` DATETIME NOT NULL,
  `date_address_to` DATETIME NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `address_id` (`address_id`),
  INDEX `borrower_id` (`borrower_id`),
  INDEX `tenant_id` (`tenant_id`),
  INDEX `address_type_id` (`address_type_id`),
  CONSTRAINT `addresses_borrower_ibfk_1`
    FOREIGN KEY (`address_id`)
    REFERENCES `prestamo_db`.`addresses` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `addresses_borrower_ibfk_2`
    FOREIGN KEY (`borrower_id`)
    REFERENCES `prestamo_db`.`borrowers` (`id`),
  CONSTRAINT `addresses_borrower_ibfk_3`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `addresses_borrower_ibfk_4`
    FOREIGN KEY (`address_type_id`)
    REFERENCES `prestamo_db`.`address_types` (`id`)
    ON UPDATE CASCADE)
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`addresses_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`addresses_user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `address_id` INT NOT NULL,
  `person_id` INT NOT NULL,
  `address_type_id` SMALLINT UNSIGNED NOT NULL,
  `date_address_from` DATETIME NOT NULL,
  `date_address_to` DATETIME NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `address_id` (`address_id`),
  INDEX `person_id` (`person_id`),
  INDEX `address_type_id` (`address_type_id`),
  CONSTRAINT `addresses_user_ibfk_1`
    FOREIGN KEY (`address_id`)
    REFERENCES `prestamo_db`.`addresses` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `addresses_user_ibfk_2`
    FOREIGN KEY (`person_id`)
    REFERENCES `prestamo_db`.`people` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `addresses_user_ibfk_3`
    FOREIGN KEY (`address_type_id`)
    REFERENCES `prestamo_db`.`address_types` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;




-- -----------------------------------------------------
-- Table `prestamo_db`.`authorizations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`authorizations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `role_details` VARCHAR(50) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`altered_roles_authorizations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`altered_roles_authorizations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `role_id` INT NOT NULL,
  `tenant_id` INT NOT NULL,
  `modifier_id` INT NOT NULL,
  `authorization_id` INT NOT NULL,
  `action` ENUM('added', 'removed') NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `role_id` (`role_id`),
  INDEX `tenant_id` (`tenant_id`),
  INDEX `modifier_id` (`modifier_id`),
  INDEX `authorization_id` (`authorization_id`),
  CONSTRAINT `altered_roles_authorizations_ibfk_1`
    FOREIGN KEY (`role_id`)
    REFERENCES `prestamo_db`.`roles` (`id`),
  CONSTRAINT `altered_roles_authorizations_ibfk_2`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`),
  CONSTRAINT `altered_roles_authorizations_ibfk_3`
    FOREIGN KEY (`modifier_id`)
    REFERENCES `prestamo_db`.`employees` (`id`),
  CONSTRAINT `altered_roles_authorizations_ibfk_4`
    FOREIGN KEY (`authorization_id`)
    REFERENCES `prestamo_db`.`authorizations` (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`authorizations_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`authorizations_role` (
  `role_id` INT NOT NULL,
  `authorization_id` INT NOT NULL,
  PRIMARY KEY (`role_id`, `authorization_id`),
  INDEX `authorization_id` (`authorization_id`),
  CONSTRAINT `authorizations_role_ibfk_1`
    FOREIGN KEY (`role_id`)
    REFERENCES `prestamo_db`.`roles` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `authorizations_role_ibfk_2`
    FOREIGN KEY (`authorization_id`)
    REFERENCES `prestamo_db`.`authorizations` (`id`)
    ON UPDATE CASCADE)
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`borrower_tenant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`borrower_tenant` (
  `tenant_id` INT NOT NULL,
  `borrower_id` INT NOT NULL,
  `score` SMALLINT UNSIGNED NOT NULL DEFAULT '0',
  `amount_loans` INT UNSIGNED NOT NULL DEFAULT '0',
  `amount_active_loans` INT UNSIGNED NOT NULL DEFAULT '0',
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  INDEX `tenant_id` (`tenant_id`),
  CONSTRAINT `borrower_tenant_ibfk_1`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`)
    ON UPDATE CASCADE)
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`colaterals`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`colaterals` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` JSON NOT NULL,
  `in_active_loan` TINYINT(1) NOT NULL DEFAULT '0',
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `BorrowerId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `prestamo_db`.`loan_plans`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `prestamo_db`.`loan_plans` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tenant_id` INT NOT NULL,
  `creator_id` INT NOT NULL,
  `payment_interval` INT NOT NULL, 
  `payment_frequency` ENUM('daily', 'weekly', 'monthly' ,'yearly') NOT NULL,
  `loan_term` INT NOT NULL,
  `interest_percentage` DOUBLE(2,2) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `tenant_id` (`tenant_id`),
  CONSTRAINT `loan_plans_tenants_id_fk`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`)
    ON UPDATE CASCADE,
    
    CONSTRAINT `loan_plans_creator_id_fk`
    FOREIGN KEY (`creator_id`)
    REFERENCES `prestamo_db`.`employees` (`id`)
    ON UPDATE CASCADE
)
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `prestamo_db`.`loan_requests`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`loan_requests` (
  `request_amount` DOUBLE NOT NULL DEFAULT '0',
  `creator_id` INT NULL DEFAULT NULL,
  `status` VARCHAR(255) NOT NULL DEFAULT 'pending',
  `borrower_id` INT NULL DEFAULT NULL,
  `tenant_id` INT NULL DEFAULT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `tenant_id` (`tenant_id`),
  CONSTRAINT `loan_requests_ibfk_1`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE, 
  CONSTRAINT `loan_requests_creator_id_fk`
    FOREIGN KEY (`creator_id`)
    REFERENCES `prestamo_db`.`employees` (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;
-- -----------------------------------------------------
-- Table `prestamo_db`.`loan_reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`loan_reviews` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `proposed_amount` DOUBLE NOT NULL,
  `reviewer_id` INT NULL DEFAULT NULL,
  `loan_request_id` INT NOT NULL,
  `status` VARCHAR(255) NOT NULL DEFAULT 'pending',
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `loan_plan_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `loan_request_id` (`loan_request_id`),
  CONSTRAINT `loan_reviews_ibfk_1`
    FOREIGN KEY (`loan_request_id`)
    REFERENCES `prestamo_db`.`loan_requests` (`id`),
  CONSTRAINT `loan_reviews_ibfk_2`
    FOREIGN KEY (`reviewer_id`)
    REFERENCES `prestamo_db`.`employees` (`id`),
  CONSTRAINT `loan_reviews_ibfk_3`
    FOREIGN KEY (`loan_plan_id`)
    REFERENCES `prestamo_db`.`loan_plans` (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `prestamo_db`.`loans`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`loans` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `score` INT NOT NULL DEFAULT 0,
  `debt_balance` DOUBLE NOT NULL,
  `interest_balance` DOUBLE NOT NULL,
  `next_payment` DATETIME NOT NULL,
  `issue_date` DATETIME NOT NULL,
  `maturity_date` DATETIME NOT NULL,
  `loan_status` Enum('active', 'paid', 'canceled') NOT NULL DEFAULT 'active',
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `creator_id` INT NOT NULL,
  `amount_payment_made` INT NOT NULL DEFAULT 0,
  `accepted_loan_review_id` INT NULL DEFAULT NULL,
  CONSTRAINT `loans_tenants_reviews_id_fk`
    FOREIGN KEY (`accepted_loan_review_id`)
    REFERENCES `prestamo_db`.`loan_reviews` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `loans_creator_id_fk`
    FOREIGN KEY (`creator_id`)
    REFERENCES `prestamo_db`.`employees` (`id`)
    ON UPDATE CASCADE,
  PRIMARY KEY (`id`));
 -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`colaterals_loan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`colaterals_loan` (
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `colateral_id` INT NOT NULL,
  `loan_id` INT NOT NULL,
  PRIMARY KEY (`colateral_id`, `loan_id`),
  INDEX `loan_id` (`loan_id`),
  CONSTRAINT `colaterals_loan_fk_colateral_id`
    FOREIGN KEY (`colateral_id`)
    REFERENCES `prestamo_db`.`colaterals` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `colaterals_loan_fk_loan_id`
    FOREIGN KEY (`loan_id`)
    REFERENCES `prestamo_db`.`loans` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE); 


-- -----------------------------------------------------
-- Table `prestamo_db`.`colaterals_loan_request`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`colaterals_loan_request` (
  `valuation` INT NOT NULL DEFAULT '0',
  `colateral_id` INT NOT NULL,
  `loan_request_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`colateral_id`, `loan_request_id`),
  INDEX `loan_request_id` (`loan_request_id`),
  CONSTRAINT `colaterals_loan_request_ibfk_1`
    FOREIGN KEY (`colateral_id`)
    REFERENCES `prestamo_db`.`colaterals` (`id`),
  CONSTRAINT `colaterals_loan_request_ibfk_2`
    FOREIGN KEY (`loan_request_id`)
    REFERENCES `prestamo_db`.`loan_requests` (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;





-- -----------------------------------------------------
-- Table `prestamo_db`.`colaterals_loan_review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`colaterals_loan_review` (
  `market_value` DOUBLE NOT NULL DEFAULT '0',
  `max_estimated_value` DOUBLE NOT NULL DEFAULT '0',
  `loan_review_id` INT NOT NULL,
  `colateral_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`loan_review_id`, `colateral_id`),
  INDEX `colateral_id` (`colateral_id`),
  CONSTRAINT `colaterals_loan_review_ibfk_1`
    FOREIGN KEY (`loan_review_id`)
    REFERENCES `prestamo_db`.`loan_reviews` (`id`),
  CONSTRAINT `colaterals_loan_review_ibfk_2`
    FOREIGN KEY (`colateral_id`)
    REFERENCES `prestamo_db`.`colaterals` (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`medias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`medias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`colaterals_media`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`colaterals_media` (
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `ColateralId` INT NOT NULL,
  `MediaId` INT NOT NULL,
  PRIMARY KEY (`ColateralId`, `MediaId`),
  INDEX `MediaId` (`MediaId`),
  CONSTRAINT `colaterals_media_ibfk_1`
    FOREIGN KEY (`ColateralId`)
    REFERENCES `prestamo_db`.`colaterals` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `colaterals_media_ibfk_2`
    FOREIGN KEY (`MediaId`)
    REFERENCES `prestamo_db`.`medias` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`comments` (
  `id` INT NOT NULL,
  `service_id` INT NOT NULL,
  `service_name` VARCHAR(20) NOT NULL,
  `commentor_id` INT NOT NULL,
  `text` TEXT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`, `commentor_id`),
  INDEX `commentor_id` (`commentor_id`),
  CONSTRAINT `comments_ibfk_1`
    FOREIGN KEY (`commentor_id`)
    REFERENCES `prestamo_db`.`employees` (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`settings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`settings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `allow_action` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`configurations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`configurations` (
  `id` INT NOT NULL,
  `tenant_id` INT NOT NULL,
  `setting_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`, `tenant_id`, `setting_id`),
  INDEX `tenant_id` (`tenant_id`),
  INDEX `setting_id` (`setting_id`),
  CONSTRAINT `configurations_ibfk_1`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`),
  CONSTRAINT `configurations_ibfk_2`
    FOREIGN KEY (`setting_id`)
    REFERENCES `prestamo_db`.`settings` (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`contracts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`contracts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tenant_id` INT NOT NULL,
  `media_id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL DEFAULT '0',
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`, `tenant_id`, `media_id`),
  INDEX `tenant_id` (`tenant_id`),
  INDEX `media_id` (`media_id`),
  CONSTRAINT `contracts_ibfk_1`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`),
  CONSTRAINT `contracts_ibfk_2`
    FOREIGN KEY (`media_id`)
    REFERENCES `prestamo_db`.`medias` (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`contracts_loan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`contracts_loan` (
  `contract_id` INT NOT NULL AUTO_INCREMENT,
  `loan_id` INT NOT NULL,
  `signed` TINYINT(1) NOT NULL DEFAULT '0',
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`contract_id`, `loan_id`),
  INDEX `loan_id` (`loan_id`),
  CONSTRAINT `contracts_loan_ibfk_1`
    FOREIGN KEY (`contract_id`)
    REFERENCES `prestamo_db`.`contracts` (`id`),
  CONSTRAINT `contracts_loan_ibfk_2`
    FOREIGN KEY (`loan_id`)
    REFERENCES `prestamo_db`.`loans` (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`discount_periods`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`discount_periods` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` TEXT NOT NULL,
  `from_date` DATETIME NOT NULL,
  `end_date` DATETIME NULL DEFAULT NULL,
  `valid` TINYINT(1) NOT NULL DEFAULT '1',
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`discounts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`discounts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(20) NOT NULL,
  `description` TEXT NOT NULL,
  `percentage` DECIMAL(10,2) NOT NULL DEFAULT '0.00',
  `start_date` DATETIME NOT NULL,
  `end_date` DATETIME NULL DEFAULT NULL,
  `valid` TINYINT(1) NOT NULL DEFAULT '1',
  `reocurring` TINYINT(1) NOT NULL DEFAULT '1',
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `code` (`code` ASC) VISIBLE)
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`features`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`features` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  `status` VARCHAR(20) NOT NULL DEFAULT 'supported',
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`plans`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`plans` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  `description` TEXT NOT NULL,
  `yearly_price` DECIMAL(10,2) NOT NULL DEFAULT '0.00',
  `monthly_price` DECIMAL(10,2) NOT NULL DEFAULT '0.00',
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`features_plan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`features_plan` (
  `feature_id` INT NOT NULL,
  `plan_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`feature_id`, `plan_id`),
  INDEX `plan_id` (`plan_id`),
  CONSTRAINT `features_plan_ibfk_1`
    FOREIGN KEY (`feature_id`)
    REFERENCES `prestamo_db`.`features` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `features_plan_ibfk_2`
    FOREIGN KEY (`plan_id`)
    REFERENCES `prestamo_db`.`plans` (`id`)
    ON UPDATE CASCADE)
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`fraud_logs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`fraud_logs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tenant_id` INT NULL DEFAULT NULL,
  `employee_id` INT NULL DEFAULT NULL,
  `action` VARCHAR(10) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `tenant_id` (`tenant_id`),
  INDEX `employee_id` (`employee_id`),
  CONSTRAINT `fraud_logs_ibfk_1`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`),
  CONSTRAINT `fraud_logs_ibfk_2`
    FOREIGN KEY (`employee_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`instalments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`instalments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `maturity_date` DATETIME NOT NULL,
  `paid_date` DATETIME NOT NULL,
  `amount` INT NOT NULL DEFAULT '0',
  `debt_balance` DOUBLE NOT NULL DEFAULT '0',
  `interest_balance` DOUBLE NOT NULL DEFAULT '0',
  `status` TEXT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `loan_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `loan_id` (`loan_id`),
  CONSTRAINT `instalments_ibfk_1`
    FOREIGN KEY (`loan_id`)
    REFERENCES `prestamo_db`.`loans` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`p_roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`p_roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `role_id` INT NOT NULL,
  `tenant_id` INT NOT NULL,
  `modifier_id` INT NOT NULL,
  `new_role_name` VARCHAR(50) NOT NULL,
  `new_role_description` VARCHAR(255) NOT NULL,
  `previous_role_name` VARCHAR(50) NOT NULL,
  `previous_role_description` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `role_id` (`role_id`),
  INDEX `tenant_id` (`tenant_id`),
  INDEX `modifier_id` (`modifier_id`),
  CONSTRAINT `p_roles_ibfk_1`
    FOREIGN KEY (`role_id`)
    REFERENCES `prestamo_db`.`roles` (`id`),
  CONSTRAINT `p_roles_ibfk_2`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`),
  CONSTRAINT `p_roles_ibfk_3`
    FOREIGN KEY (`modifier_id`)
    REFERENCES `prestamo_db`.`employees` (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`subscriptions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`subscriptions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tenant_id` INT NOT NULL,
  `plan_id` INT NOT NULL,
  `discount_id` INT NULL DEFAULT NULL,
  `status` VARCHAR(10) NOT NULL DEFAULT 'active',
  `price_paid` DECIMAL(10,2) NULL DEFAULT NULL,
  `period` VARCHAR(20) NOT NULL,
  `start_date` DATETIME NULL DEFAULT NULL,
  `end_date` DATETIME NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `tenant_id` (`tenant_id`),
  INDEX `plan_id` (`plan_id`),
  INDEX `discount_id` (`discount_id`),
  CONSTRAINT `subscriptions_ibfk_1`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`),
  CONSTRAINT `subscriptions_ibfk_2`
    FOREIGN KEY (`plan_id`)
    REFERENCES `prestamo_db`.`plans` (`id`),
  CONSTRAINT `subscriptions_ibfk_3`
    FOREIGN KEY (`discount_id`)
    REFERENCES `prestamo_db`.`discounts` (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`payment_intents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`payment_intents` (
  `payment_intent_id` VARCHAR(255) NOT NULL,
  `status` VARCHAR(255) NOT NULL DEFAULT 'incompleted',
  `subscription_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`payment_intent_id`),
  INDEX `payment_intents_subscription_id_index` (`subscription_id`),
  CONSTRAINT `payment_intents_ibfk_1`
    FOREIGN KEY (`subscription_id`)
    REFERENCES `prestamo_db`.`subscriptions` (`id`)
    ON UPDATE CASCADE)
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`payment_methods`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`payment_methods` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`payments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`payments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `payment_method_id` INT NOT NULL,
  `amount_paid` DOUBLE(10,2) NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `payment_method_id` (`payment_method_id`),
  CONSTRAINT `payments_ibfk_1`
    FOREIGN KEY (`payment_method_id`)
    REFERENCES `prestamo_db`.`payment_methods` (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`phone_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`phone_types` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`phones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`phones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `number` VARCHAR(20) NOT NULL,
  `code` VARCHAR(10) NOT NULL,
  `ext` VARCHAR(15) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`phones_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`phones_user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `phone_id` INT NOT NULL,
  `phone_type_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id` (`user_id`),
  INDEX `phone_id` (`phone_id`),
  INDEX `phone_type_id` (`phone_type_id`),
  CONSTRAINT `phones_user_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `prestamo_db`.`people` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `phones_user_ibfk_2`
    FOREIGN KEY (`phone_id`)
    REFERENCES `prestamo_db`.`phones` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `phones_user_ibfk_3`
    FOREIGN KEY (`phone_type_id`)
    REFERENCES `prestamo_db`.`phone_types` (`id`)
    ON UPDATE CASCADE)
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`previous_address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`previous_address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tenant_id` INT NOT NULL,
  `borrower_id` INT NOT NULL,
  `employee_id` INT NOT NULL,
  `old_address_id` INT NOT NULL,
  `new_address_id` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `tenant_id` (`tenant_id`),
  INDEX `borrower_id` (`borrower_id`),
  INDEX `employee_id` (`employee_id`),
  INDEX `old_address_id` (`old_address_id`),
  INDEX `new_address_id` (`new_address_id`),
  CONSTRAINT `previous_address_ibfk_1`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `previous_address_ibfk_2`
    FOREIGN KEY (`borrower_id`)
    REFERENCES `prestamo_db`.`borrowers` (`id`),
  CONSTRAINT `previous_address_ibfk_3`
    FOREIGN KEY (`employee_id`)
    REFERENCES `prestamo_db`.`employees` (`id`),
  CONSTRAINT `previous_address_ibfk_4`
    FOREIGN KEY (`old_address_id`)
    REFERENCES `prestamo_db`.`addresses` (`id`),
  CONSTRAINT `previous_address_ibfk_5`
    FOREIGN KEY (`new_address_id`)
    REFERENCES `prestamo_db`.`addresses` (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`previous_roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`previous_roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tenant_id` INT NOT NULL,
  `employee_id` INT NOT NULL,
  `new_role_id` INT NOT NULL,
  `authorizer_id` INT NOT NULL,
  `previous_role_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `tenant_id` (`tenant_id`),
  INDEX `employee_id` (`employee_id`),
  INDEX `new_role_id` (`new_role_id`),
  INDEX `authorizer_id` (`authorizer_id`),
  INDEX `previous_role_id` (`previous_role_id`),
  CONSTRAINT `previous_roles_ibfk_1`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`),
  CONSTRAINT `previous_roles_ibfk_2`
    FOREIGN KEY (`employee_id`)
    REFERENCES `prestamo_db`.`employees` (`id`),
  CONSTRAINT `previous_roles_ibfk_3`
    FOREIGN KEY (`new_role_id`)
    REFERENCES `prestamo_db`.`roles` (`id`),
  CONSTRAINT `previous_roles_ibfk_4`
    FOREIGN KEY (`authorizer_id`)
    REFERENCES `prestamo_db`.`employees` (`id`),
  CONSTRAINT `previous_roles_ibfk_5`
    FOREIGN KEY (`previous_role_id`)
    REFERENCES `prestamo_db`.`roles` (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`replaced_loans_reviewers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`replaced_loans_reviewers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `new_reviewer_id` INT NOT NULL,
  `previous_reviewer_id` INT NOT NULL,
  `modifier_id` INT NOT NULL,
  `loan_request_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `loan_request_borrower_id` INT NULL DEFAULT NULL,
  `reviewer_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `new_reviewer_id` (`new_reviewer_id`),
  INDEX `previous_reviewer_id` (`previous_reviewer_id`),
  INDEX `modifier_id` (`modifier_id`),
  INDEX `loan_request_id` (`loan_request_id`),
  CONSTRAINT `replaced_loans_reviewers_ibfk_1`
    FOREIGN KEY (`new_reviewer_id`)
    REFERENCES `prestamo_db`.`employees` (`id`),
  CONSTRAINT `replaced_loans_reviewers_ibfk_2`
    FOREIGN KEY (`previous_reviewer_id`)
    REFERENCES `prestamo_db`.`employees` (`id`),
  CONSTRAINT `replaced_loans_reviewers_ibfk_3`
    FOREIGN KEY (`modifier_id`)
    REFERENCES `prestamo_db`.`employees` (`id`),
  CONSTRAINT `replaced_loans_reviewers_ibfk_4`
    FOREIGN KEY (`loan_request_id`)
    REFERENCES `prestamo_db`.`loan_requests` (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`setting_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`setting_history` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `employee_id` INT NOT NULL,
  `action` VARCHAR(10) NOT NULL,
  `setting_id` INT NOT NULL,
  `tenant_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `employee_id` (`employee_id`),
  INDEX `setting_id` (`setting_id`),
  INDEX `tenant_id` (`tenant_id`),
  CONSTRAINT `setting_history_ibfk_1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `prestamo_db`.`employees` (`id`),
  CONSTRAINT `setting_history_ibfk_2`
    FOREIGN KEY (`setting_id`)
    REFERENCES `prestamo_db`.`settings` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `setting_history_ibfk_3`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`settings_tenant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`settings_tenant` (
  `setting_id` INT NOT NULL,
  `tenant_id` INT NOT NULL,
  PRIMARY KEY (`setting_id`, `tenant_id`),
  INDEX `tenant_id` (`tenant_id`),
  CONSTRAINT `settings_tenant_ibfk_1`
    FOREIGN KEY (`setting_id`)
    REFERENCES `prestamo_db`.`settings` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `settings_tenant_ibfk_2`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`tags` (
  `id` INT NOT NULL,
  `name` VARCHAR(20) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `custom` TINYINT(1) NOT NULL DEFAULT '0',
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`tags_service`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`tags_service` (
  `tag_id` INT NOT NULL,
  `tagger_id` INT NOT NULL,
  `service_id` INT NOT NULL,
  `service_name` VARCHAR(20) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`tag_id`, `tagger_id`, `service_id`),
  INDEX `tagger_id` (`tagger_id`),
  CONSTRAINT `tags_service_ibfk_1`
    FOREIGN KEY (`tag_id`)
    REFERENCES `prestamo_db`.`tags` (`id`),
  CONSTRAINT `tags_service_ibfk_2`
    FOREIGN KEY (`tagger_id`)
    REFERENCES `prestamo_db`.`employees` (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`tags_tenant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`tags_tenant` (
  `tag_id` INT NOT NULL,
  `tenant_id` INT NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`tag_id`, `tenant_id`),
  INDEX `tenant_id` (`tenant_id`),
  CONSTRAINT `tags_tenant_ibfk_1`
    FOREIGN KEY (`tag_id`)
    REFERENCES `prestamo_db`.`tags` (`id`),
  CONSTRAINT `tags_tenant_ibfk_2`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`))
; -- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;



-- -----------------------------------------------------
-- function fn_insert_or_get_user_id
-- -----------------------------------------------------


 
CREATE  FUNCTION `fn_insert_or_get_user_id`(user_json JSON, tenant_id INT) RETURNS int
    DETERMINISTIC
BEGIN
    DECLARE user_id INT DEFAULT NULL;
    DECLARE given_name VARCHAR(255);
    DECLARE familly_name VARCHAR(255);
    DECLARE user_email VARCHAR(255);
    -- DECLARE user_age INT;
    
    -- Extract values from JSON
    SET user_email = JSON_UNQUOTE(JSON_EXTRACT(user_json, '$.email'));
    SET given_name = JSON_UNQUOTE(JSON_EXTRACT(user_json, '$.given_name'));
    SET familly_name = JSON_UNQUOTE(JSON_EXTRACT(user_json, '$.familly_name'));
    
    
    -- Check if the user already exists
    IF user_email IS NOT NULL THEN
      SELECT id INTO user_id FROM people WHERE email = user_email;
    END IF;
    
    -- If user doesn't exist, insert it
    IF user_id IS NULL THEN
        IF user_email IS NULL THEN
            INSERT INTO people ( tenant_id, given_name, familly_name, created_at, updated_at) 
            VALUES (tenant_id, given_name, familly_name, current_timestamp, current_timestamp);
            SET user_id = LAST_INSERT_ID();
        ELSE
            INSERT INTO people ( tenant_id, given_name, familly_name, email,created_at, updated_at) 
            VALUES (tenant_id, given_name, familly_name, user_email, current_timestamp, current_timestamp);
            SET user_id = LAST_INSERT_ID();
        END IF;
    END IF;
    
    -- Return the user ID
    RETURN user_id;
END;



-- -----------------------------------------------------
-- procedure proc_create_employee
-- -----------------------------------------------------


 
CREATE  PROCEDURE `proc_create_employee`(p_employe_data JSON , p_tenant_id INT , p_is_primary BOOLEAN)
BEGIN
    DECLARE person_id INT DEFAULT NULL;
    START TRANSACTION;
        SELECT fn_insert_or_get_user_id(p_employe_data, p_tenant_id) INTO person_id;
    
        SET @email = JSON_UNQUOTE(JSON_EXTRACT(p_employe_data, '$.email'));
        SET @userName = JSON_UNQUOTE(JSON_EXTRACT(p_employe_data, '$.username'));
        SET @password = JSON_UNQUOTE(JSON_EXTRACT(p_employe_data, '$.password'));
        SET @role_id = JSON_EXTRACT(p_employe_data, '$.role_id');
        SET @salary = JSON_EXTRACT(p_employe_data, '$.salary');
        
        IF p_is_primary THEN 
			SELECT id from roles_tenant WHERE tenant_id = p_tenant_id and name = 'admin' into @role_id;
			ELSE
				set p_is_primary = false;
        END IF;
        
        IF @salary IS NULL THEN SET @salary =0.0; END IF;

        INSERT INTO employees ( tenant_id, person_id,  role_id, username, password, is_primary, salary,created_at, updated_at) 
        VALUES (p_tenant_id, person_id, @role_id, @username, @password, p_is_primary, @salary, current_timestamp, current_timestamp);
     COMMIT;
END;



-- -----------------------------------------------------
-- procedure proc_create_tenants
-- -----------------------------------------------------


 
CREATE  PROCEDURE `proc_create_tenants`(IN data JSON)
BEGIN
  DECLARE i INT DEFAULT 0;
  DECLARE p_tenant_id INT;
  DECLARE user_id INT;

  -- RETRIEVE VALUES FROM JSON
    SET @plan = JSON_EXTRACT(data, '$.plan');
    SET @admin = JSON_EXTRACT(data, '$.employee');
    SET @tenant = JSON_EXTRACT(data, '$.company');
    SET @settings = JSON_EXTRACT(data, '$.settings');
    SET @company_name = JSON_UNQUOTE(JSON_EXTRACT(@tenant, '$.name'));

    START TRANSACTION; 
    
             INSERT INTO tenants (name, created_at, updated_at)
			 VALUES (@company_name, current_timestamp, current_timestamp);
			 SET p_tenant_id = LAST_INSERT_ID();
             
            SET @plan_id = JSON_EXTRACT(@plan, '$.id');
            IF EXISTS(SELECT id FROM plans WHERE id = @plan_id) THEN
             
				SET @plan_period = JSON_UNQUOTE(JSON_EXTRACT(@plan, '$.period'));
				INSERT INTO subscriptions (tenant_id, plan_id, status,created_at, updated_at, period)
				VALUES(p_tenant_id, @plan_id, 'unpaid', current_timestamp, current_timestamp,@plan_period);
			
            ELSE 
                ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid plan id';
            END IF;
            
            
            INSERT INTO roles_tenant(name , role_id, description, tenant_id, created_at, updated_at )
            SELECT title , id, "empty", p_tenant_id, current_timestamp, current_timestamp FROM roles WHERE custom =false;
            
            CALL proc_create_employee(@admin, p_tenant_id, true);
            
            

            -- Associate setting to tenant ADD
            SET @settings_length = JSON_LENGTH(@settings);
            WHILE i < @settings_length DO
                SET @setting_id = JSON_EXTRACT(@settings, CONCAT('$[', i, ']'));
                
                INSERT INTO settings_tenant (tenant_id, setting_id)
                VALUES (p_tenant_id, @setting_id);
                
                
                SET i = i + 1;
            END WHILE;
    COMMIT;    
    -- add plan period to tenant 
END;



-- -----------------------------------------------------
-- procedure proc_get_employee
-- -----------------------------------------------------


 
CREATE  PROCEDURE `proc_get_employee`( p_tenant_id INT, employee_id INT )
BEGIN


SELECT e.id as id, u.given_name, u.familly_name, 
JSON_OBJECT( 
'id', c.id,
'name', c.name,
'activeSubscription', EXISTS(SELECT 1 FROM subscriptions WHERE  status ='active' AND  tenant_id = 1)
) as company

FROM employees AS e
INNER JOIN people AS u ON e.person_id = u.id
INNER JOIN tenants AS c ON e.tenant_id = c.id
WHERE c.id =p_tenant_id AND e.id=employee_id ;

END;



-- -----------------------------------------------------
-- procedure proc_get_payment_intents
-- -----------------------------------------------------


 
CREATE  PROCEDURE `proc_get_payment_intents`(p_tenant_id INT, p_requester_id INT)
BEGIN 
    IF(NOT EXISTS( SELECT 1 FROM employees WHERE tenant_id = p_tenant_id AND id = p_requester_id) )THEN 
        SIGNAL SQLSTATE '42501' SET MESSAGE_TEXT = 'Unauthorized to see the following paymentIntents';
    ELSE 
        SELECT p.* 
        FROM subscriptions AS s
        INNER JOIN payment_intents AS p ON p.subscription_id = s.id
        WHERE s.tenant_id = p_tenant_id;
    END IF;
END;

-- -----------------------------------------------------
-- trigger tr_payment_intents_after_update
-- -----------------------------------------------------

CREATE TRIGGER tr_payment_intents_after_update 
AFTER UPDATE ON payment_intents 
FOR EACH ROW 
BEGIN 
	IF NEW.status = "completed" THEN 
	UPDATE subscriptions AS s
	SET s.status= "active" 
	WHERE s.id =NEW.subscription_id; 
	END IF; 
END;


-- -----------------------------------------------------
-- procedure proc_manage_setting_tenant
-- -----------------------------------------------------


 
CREATE  PROCEDURE `proc_manage_setting_tenant`(p_tenant_id INT , p_setting_id INT ,action VARCHAR(10), employee_id INT )
BEGIN
    START TRANSACTION;
       
        IF EXISTS
        (SELECT 1 FROM employees WHERE user_id = employee_id AND active=true)
        THEN
            IF action = 'ADD' THEN
                INSERT INTO settings_tenant (tenant_id, setting_id)
                VALUES (p_tenant_id, p_setting_id);

            ELSEIF action = 'REMOVE' THEN
                DELETE FROM settings_tenant WHERE tenant_id = p_tenant_id AND setting_id = p_setting_id;

            ELSE
                ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid action';
            END IF;
        ELSE
            INSERT INTO fraud_log (tenant_id, employee_id, action,  created_at, updated_at, message)
            VALUES (p_tenant_id, employee_id, action, current_timestamp, current_timestamp, CONCAT(employee_id, 'attempted to ', action, 'setting ', p_setting_id, ' for tenant ', p_tenant_id, ' but is not an active or existing employee'));
            ROLLBACK;
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid employee';
        END IF;

     COMMIT;
END;

-- -----------------------------------------------------
-- procedure proc_create_loan
-- -----------------------------------------------------

CREATE PROCEDURE proc_create_loan(IN p_creator_id INT, IN p_accepted_loan_review_id INT,IN p_issue_date DATE)
BEGIN
    DECLARE v_score INT DEFAULT 0;
    DECLARE v_debt_balance DOUBLE;
    DECLARE v_interest_balance DOUBLE;
    DECLARE v_next_payment DATE;
    DECLARE v_maturity_date DATE DEFAULT DATE_ADD(NOW(), INTERVAL 1 YEAR);
	DECLARE v_payment_interval INT;
    DECLARE v_loan_term INT;
    DECLARE v_payment_frequency ENUM('daily', 'weekly', 'monthly', 'yearly');


    -- Handlers for specific errors
    DECLARE EXIT HANDLER FOR 1002
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Loan review not found';
    END;

    DECLARE EXIT HANDLER FOR 1003
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Loan plan not found for the given loan review';
    END;

    DECLARE EXIT HANDLER FOR 1004
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid creator ID';
    END;
    
    DECLARE EXIT HANDLER FOR 1005
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid Loan Plan ID';
    END;

  DECLARE EXIT HANDLER FOR SQLEXCEPTION
     BEGIN
       ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'A generic error occurred';
  END;
    
     DECLARE EXIT HANDLER FOR 1009
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'shit';
    END;

    START TRANSACTION;

    -- Retrieve proposed amount
    SELECT proposed_amount 
    INTO v_debt_balance 
    FROM loan_reviews 
    WHERE id = p_accepted_loan_review_id;

    IF v_debt_balance IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO=1002;
    END IF;
    
     -- Retrieve loan plan details
    SELECT interest_percentage, payment_interval, payment_frequency,loan_term
    INTO v_interest_balance, v_payment_interval, v_payment_frequency, v_loan_term
    FROM loan_plans AS lp
    JOIN loan_reviews AS lr ON lr.loan_plan_id = lp.id
    WHERE lr.id = p_accepted_loan_review_id;
    
    IF v_interest_balance IS NULL OR v_payment_interval IS NULL OR v_payment_frequency IS NULL THEN	
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO=1005;
	END IF;
    
	SET v_next_payment = CASE v_payment_frequency
        WHEN 'daily' THEN DATE_ADD(NOW(), INTERVAL v_payment_interval DAY)
        WHEN 'weekly' THEN DATE_ADD(NOW(), INTERVAL v_payment_interval WEEK)
        WHEN 'monthly' THEN DATE_ADD(NOW(), INTERVAL v_payment_interval MONTH)
        WHEN 'yearly' THEN DATE_ADD(NOW(), INTERVAL v_payment_interval YEAR)
    END;
    
    IF v_next_payment IS NULL THEN
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO=1009;
	END IF;
    
    -- Calculate maturity date based on loan_term, payment_interval and payment_frequency
    IF p_issue_date IS NOT NULL THEN 
		SET v_maturity_date = CASE v_payment_frequency
			WHEN 'daily' THEN DATE_ADD(p_issue_date, INTERVAL v_payment_interval * v_loan_term DAY)
			WHEN 'weekly' THEN DATE_ADD(p_issue_date, INTERVAL v_payment_interval * v_loan_term WEEK)
			WHEN 'monthly' THEN DATE_ADD(p_issue_date, INTERVAL v_payment_interval * v_loan_term MONTH)
			WHEN 'yearly' THEN DATE_ADD(p_issue_date, INTERVAL v_payment_interval * v_loan_term YEAR)
		END;
        IF v_maturity_date IS NULL THEN
			SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO=1009;
		END IF;
	ELSE 
		SET v_maturity_date=NULL;
    END IF;
    
	

    -- Retrieve interest balance based on loan plan
    SELECT lp.interest_percentage * v_debt_balance
    INTO v_interest_balance
    FROM loan_reviews AS lr
    INNER JOIN loan_plans AS lp ON lr.loan_plan_id = lp.id
    WHERE lr.id = p_accepted_loan_review_id;

    IF v_interest_balance IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO=1003;
    END IF;

    -- Check for valid creator_id
    IF NOT EXISTS (SELECT 1 FROM employees WHERE id = p_creator_id) THEN
        SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO=1004;
    END IF;


    INSERT INTO loans(
        score,
        debt_balance,
        interest_balance,
        next_payment,
        issue_date,
        maturity_date,
        creator_id,
        accepted_loan_review_id,
        created_at, 
        updated_at
    ) VALUES (
        v_score,
        v_debt_balance,
        v_interest_balance,
        v_next_payment,
        p_issue_date,
        v_maturity_date,
        p_creator_id,
        p_accepted_loan_review_id,
        current_timestamp(),
        current_timestamp()
        
    );

    COMMIT;
END;
