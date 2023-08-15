SELECT 
    JSON_OBJECT(
        'id', people.id,
        'givenName', people.given_name,
        'familyName', people.familly_name,
        'fullName', CONCAT(people.given_name, " ", people.familly_name)
    )
    FROM people
    WHERE people.id = Employees.person_id