

-- -----------------------------------------------------
-- Table `prestamo_db`.`address_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`address_types` (
  `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`states`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`states` (
  `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `country_id` MEDIUMINT UNSIGNED NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `country_id` (`country_id` ASC) VISIBLE,
  CONSTRAINT `states_ibfk_1`
    FOREIGN KEY (`country_id`)
    REFERENCES `prestamo_db`.`countries` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`cities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`cities` (
  `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `state_id` MEDIUMINT UNSIGNED NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `state_id` (`state_id` ASC) VISIBLE,
  CONSTRAINT `cities_ibfk_1`
    FOREIGN KEY (`state_id`)
    REFERENCES `prestamo_db`.`states` (`id`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`streets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`streets` (
  `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `city_id` MEDIUMINT UNSIGNED NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `city_id` (`city_id` ASC) VISIBLE,
  CONSTRAINT `streets_ibfk_1`
    FOREIGN KEY (`city_id`)
    REFERENCES `prestamo_db`.`cities` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`addresses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`addresses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `country_id` MEDIUMINT UNSIGNED NOT NULL,
  `state_id` MEDIUMINT UNSIGNED NOT NULL,
  `city_id` MEDIUMINT UNSIGNED NOT NULL,
  `street_id` MEDIUMINT UNSIGNED NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `country_id` (`country_id` ASC) VISIBLE,
  INDEX `state_id` (`state_id` ASC) VISIBLE,
  INDEX `city_id` (`city_id` ASC) VISIBLE,
  INDEX `street_id` (`street_id` ASC) VISIBLE,
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
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
  INDEX `tenant_id` (`tenant_id` ASC) VISIBLE,
  CONSTRAINT `people_ibfk_1`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`borrowers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`borrowers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `person_id` INT NOT NULL,
  `loan_amounts` SMALLINT UNSIGNED NOT NULL DEFAULT '0',
  `active_loans` SMALLINT UNSIGNED NOT NULL DEFAULT '0',
  `global_credit_score` SMALLINT UNSIGNED NULL DEFAULT '0',
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `person_id` (`person_id` ASC) VISIBLE,
  CONSTRAINT `borrowers_ibfk_1`
    FOREIGN KEY (`person_id`)
    REFERENCES `prestamo_db`.`people` (`id`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
  INDEX `address_id` (`address_id` ASC) VISIBLE,
  INDEX `borrower_id` (`borrower_id` ASC) VISIBLE,
  INDEX `tenant_id` (`tenant_id` ASC) VISIBLE,
  INDEX `address_type_id` (`address_type_id` ASC) VISIBLE,
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
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
  INDEX `address_id` (`address_id` ASC) VISIBLE,
  INDEX `person_id` (`person_id` ASC) VISIBLE,
  INDEX `address_type_id` (`address_type_id` ASC) VISIBLE,
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
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
  INDEX `tenant_id` (`tenant_id` ASC) VISIBLE,
  INDEX `role_id` (`role_id` ASC) VISIBLE,
  CONSTRAINT `roles_tenant_ibfk_1`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `roles_tenant_ibfk_2`
    FOREIGN KEY (`role_id`)
    REFERENCES `prestamo_db`.`roles` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`employees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`employees` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `active` TINYINT(1) NOT NULL DEFAULT '1',
  `salary` DOUBLE NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role_id` INT NOT NULL,
  `tenant_id` INT NULL DEFAULT NULL,
  `person_id` INT NOT NULL,
  `is_primary` TINYINT(1) NOT NULL DEFAULT '0',
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`, `person_id`),
  INDEX `role_id` (`role_id` ASC) VISIBLE,
  INDEX `tenant_id` (`tenant_id` ASC) VISIBLE,
  INDEX `person_id` (`person_id` ASC) VISIBLE,
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
    REFERENCES `prestamo_db`.`people` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`authorizations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`authorizations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `role_details` VARCHAR(50) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
  INDEX `role_id` (`role_id` ASC) VISIBLE,
  INDEX `tenant_id` (`tenant_id` ASC) VISIBLE,
  INDEX `modifier_id` (`modifier_id` ASC) VISIBLE,
  INDEX `authorization_id` (`authorization_id` ASC) VISIBLE,
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
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`authorizations_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`authorizations_role` (
  `role_id` INT NOT NULL,
  `authorization_id` INT NOT NULL,
  PRIMARY KEY (`role_id`, `authorization_id`),
  INDEX `authorization_id` (`authorization_id` ASC) VISIBLE,
  INDEX `role_id` (`role_id` ASC) VISIBLE,
  CONSTRAINT `authorizations_role_ibfk_1`
    FOREIGN KEY (`role_id`)
    REFERENCES `prestamo_db`.`roles` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `authorizations_role_ibfk_2`
    FOREIGN KEY (`authorization_id`)
    REFERENCES `prestamo_db`.`authorizations` (`id`)
    ON UPDATE CASCADE
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
  INDEX `tenant_id` (`tenant_id` ASC) VISIBLE,
  CONSTRAINT `borrower_tenant_ibfk_1`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`loans`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`loans` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `original_amount` DOUBLE NOT NULL,
  `score` INT NOT NULL DEFAULT '0',
  `debt_balance` DOUBLE NOT NULL,
  `interest_balance` DOUBLE NOT NULL,
  `next_payment` DATETIME NOT NULL DEFAULT '2023-07-24 16:07:04',
  `issue_date` DATETIME NOT NULL,
  `maturity_date` DATETIME NOT NULL,
  `active` TINYINT(1) NOT NULL DEFAULT '1',
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `borrower_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`colaterals_loan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`colaterals_loan` (
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `colateral_id` INT NOT NULL,
  `LoanId` INT NOT NULL,
  PRIMARY KEY (`colateral_id`, `LoanId`),
  INDEX `LoanId` (`LoanId` ASC) VISIBLE,
  CONSTRAINT `colaterals_loan_ibfk_1`
    FOREIGN KEY (`colateral_id`)
    REFERENCES `prestamo_db`.`colaterals` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `colaterals_loan_ibfk_2`
    FOREIGN KEY (`LoanId`)
    REFERENCES `prestamo_db`.`loans` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`loan_requests`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`loan_requests` (
  `request_amount` DOUBLE NOT NULL DEFAULT '0',
  `reviewer_id` INT NULL DEFAULT NULL,
  `status` VARCHAR(255) NOT NULL DEFAULT 'pending',
  `borrower_id` INT NULL DEFAULT NULL,
  `tenant_id` INT NULL DEFAULT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `tenant_id` (`tenant_id` ASC) VISIBLE,
  CONSTRAINT `loan_requests_ibfk_1`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
  INDEX `loan_request_id` (`loan_request_id` ASC) VISIBLE,
  CONSTRAINT `colaterals_loan_request_ibfk_1`
    FOREIGN KEY (`colateral_id`)
    REFERENCES `prestamo_db`.`colaterals` (`id`),
  CONSTRAINT `colaterals_loan_request_ibfk_2`
    FOREIGN KEY (`loan_request_id`)
    REFERENCES `prestamo_db`.`loan_requests` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
  `loan_request_borrower_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `loan_request_id` (`loan_request_id` ASC) VISIBLE,
  CONSTRAINT `loan_reviews_ibfk_1`
    FOREIGN KEY (`loan_request_id`)
    REFERENCES `prestamo_db`.`loan_requests` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
  INDEX `colateral_id` (`colateral_id` ASC) VISIBLE,
  CONSTRAINT `colaterals_loan_review_ibfk_1`
    FOREIGN KEY (`loan_review_id`)
    REFERENCES `prestamo_db`.`loan_reviews` (`id`),
  CONSTRAINT `colaterals_loan_review_ibfk_2`
    FOREIGN KEY (`colateral_id`)
    REFERENCES `prestamo_db`.`colaterals` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`medias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`medias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`colaterals_media`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`colaterals_media` (
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `ColateralId` INT NOT NULL,
  `MediaId` INT NOT NULL,
  PRIMARY KEY (`ColateralId`, `MediaId`),
  INDEX `MediaId` (`MediaId` ASC) VISIBLE,
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
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
  INDEX `commentor_id` (`commentor_id` ASC) VISIBLE,
  CONSTRAINT `comments_ibfk_1`
    FOREIGN KEY (`commentor_id`)
    REFERENCES `prestamo_db`.`employees` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
  INDEX `tenant_id` (`tenant_id` ASC) VISIBLE,
  INDEX `setting_id` (`setting_id` ASC) VISIBLE,
  CONSTRAINT `configurations_ibfk_1`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`),
  CONSTRAINT `configurations_ibfk_2`
    FOREIGN KEY (`setting_id`)
    REFERENCES `prestamo_db`.`settings` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
  INDEX `tenant_id` (`tenant_id` ASC) VISIBLE,
  INDEX `media_id` (`media_id` ASC) VISIBLE,
  CONSTRAINT `contracts_ibfk_1`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`),
  CONSTRAINT `contracts_ibfk_2`
    FOREIGN KEY (`media_id`)
    REFERENCES `prestamo_db`.`medias` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
  INDEX `loan_id` (`loan_id` ASC) VISIBLE,
  CONSTRAINT `contracts_loan_ibfk_1`
    FOREIGN KEY (`contract_id`)
    REFERENCES `prestamo_db`.`contracts` (`id`),
  CONSTRAINT `contracts_loan_ibfk_2`
    FOREIGN KEY (`loan_id`)
    REFERENCES `prestamo_db`.`loans` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`features`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`features` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  `status` VARCHAR(20) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`features_plan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`features_plan` (
  `feature_id` INT NOT NULL,
  `plan_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`feature_id`, `plan_id`),
  INDEX `plan_id` (`plan_id` ASC) VISIBLE,
  CONSTRAINT `features_plan_ibfk_1`
    FOREIGN KEY (`feature_id`)
    REFERENCES `prestamo_db`.`features` (`id`)
    ON UPDATE CASCADE,
  CONSTRAINT `features_plan_ibfk_2`
    FOREIGN KEY (`plan_id`)
    REFERENCES `prestamo_db`.`plans` (`id`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
  INDEX `tenant_id` (`tenant_id` ASC) VISIBLE,
  INDEX `employee_id` (`employee_id` ASC) VISIBLE,
  CONSTRAINT `fraud_logs_ibfk_1`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`),
  CONSTRAINT `fraud_logs_ibfk_2`
    FOREIGN KEY (`employee_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
  INDEX `loan_id` (`loan_id` ASC) VISIBLE,
  CONSTRAINT `instalments_ibfk_1`
    FOREIGN KEY (`loan_id`)
    REFERENCES `prestamo_db`.`loans` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
  INDEX `role_id` (`role_id` ASC) VISIBLE,
  INDEX `tenant_id` (`tenant_id` ASC) VISIBLE,
  INDEX `modifier_id` (`modifier_id` ASC) VISIBLE,
  CONSTRAINT `p_roles_ibfk_1`
    FOREIGN KEY (`role_id`)
    REFERENCES `prestamo_db`.`roles` (`id`),
  CONSTRAINT `p_roles_ibfk_2`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`),
  CONSTRAINT `p_roles_ibfk_3`
    FOREIGN KEY (`modifier_id`)
    REFERENCES `prestamo_db`.`employees` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`payment_methods`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`payment_methods` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
  INDEX `payment_method_id` (`payment_method_id` ASC) VISIBLE,
  CONSTRAINT `payments_ibfk_1`
    FOREIGN KEY (`payment_method_id`)
    REFERENCES `prestamo_db`.`payment_methods` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  INDEX `phone_id` (`phone_id` ASC) VISIBLE,
  INDEX `phone_type_id` (`phone_type_id` ASC) VISIBLE,
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
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
  INDEX `tenant_id` (`tenant_id` ASC) VISIBLE,
  INDEX `borrower_id` (`borrower_id` ASC) VISIBLE,
  INDEX `employee_id` (`employee_id` ASC) VISIBLE,
  INDEX `old_address_id` (`old_address_id` ASC) VISIBLE,
  INDEX `new_address_id` (`new_address_id` ASC) VISIBLE,
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
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
  INDEX `tenant_id` (`tenant_id` ASC) VISIBLE,
  INDEX `employee_id` (`employee_id` ASC) VISIBLE,
  INDEX `new_role_id` (`new_role_id` ASC) VISIBLE,
  INDEX `authorizer_id` (`authorizer_id` ASC) VISIBLE,
  INDEX `previous_role_id` (`previous_role_id` ASC) VISIBLE,
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
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
  INDEX `new_reviewer_id` (`new_reviewer_id` ASC) VISIBLE,
  INDEX `previous_reviewer_id` (`previous_reviewer_id` ASC) VISIBLE,
  INDEX `modifier_id` (`modifier_id` ASC) VISIBLE,
  INDEX `loan_request_id` (`loan_request_id` ASC) VISIBLE,
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
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`settings_tenant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`settings_tenant` (
  `setting_id` INT NOT NULL,
  `tenant_id` INT NOT NULL,
  PRIMARY KEY (`setting_id`, `tenant_id`),
  INDEX `tenant_id` (`tenant_id` ASC) VISIBLE,
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
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `prestamo_db`.`subscriptions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prestamo_db`.`subscriptions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tenant_id` INT NOT NULL,
  `plan_id` INT NOT NULL,
  `discount_id` INT NULL DEFAULT NULL,
  `payment_id` INT NULL DEFAULT NULL,
  `status` VARCHAR(10) NOT NULL DEFAULT 'active',
  `price_paid` DECIMAL(10,2) NULL DEFAULT NULL,
  `period` VARCHAR(20) NOT NULL,
  `start_date` DATETIME NULL DEFAULT NULL,
  `end_date` DATETIME NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `tenant_id` (`tenant_id` ASC) VISIBLE,
  INDEX `plan_id` (`plan_id` ASC) VISIBLE,
  INDEX `discount_id` (`discount_id` ASC) VISIBLE,
  INDEX `payment_id` (`payment_id` ASC) VISIBLE,
  CONSTRAINT `subscriptions_ibfk_1`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`),
  CONSTRAINT `subscriptions_ibfk_2`
    FOREIGN KEY (`plan_id`)
    REFERENCES `prestamo_db`.`plans` (`id`),
  CONSTRAINT `subscriptions_ibfk_3`
    FOREIGN KEY (`discount_id`)
    REFERENCES `prestamo_db`.`discounts` (`id`),
  CONSTRAINT `subscriptions_ibfk_4`
    FOREIGN KEY (`payment_id`)
    REFERENCES `prestamo_db`.`payments` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
  INDEX `tagger_id` (`tagger_id` ASC) VISIBLE,
  CONSTRAINT `tags_service_ibfk_1`
    FOREIGN KEY (`tag_id`)
    REFERENCES `prestamo_db`.`tags` (`id`),
  CONSTRAINT `tags_service_ibfk_2`
    FOREIGN KEY (`tagger_id`)
    REFERENCES `prestamo_db`.`employees` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
  INDEX `tenant_id` (`tenant_id` ASC) VISIBLE,
  CONSTRAINT `tags_tenant_ibfk_1`
    FOREIGN KEY (`tag_id`)
    REFERENCES `prestamo_db`.`tags` (`id`),
  CONSTRAINT `tags_tenant_ibfk_2`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `prestamo_db`.`tenants` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci; 


-- SET SQL_MODE=@OLD_SQL_MODE;
-- SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
-- SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
