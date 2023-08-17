SELECT CONCAT(p.given_name, " ", p.familly_name)
 FROM loans AS l
 INNER JOIN loan_reviews AS lrw on  lrw.id = l.accepted_loan_review_id
 INNER JOIN loan_requests AS lr ON lr.id = lrw.loan_request_id
 INNER JOIN borrowers AS b ON lr.borrower_id = b.id
 INNER JOIN people AS p ON p.id = b.person_id
 WHERE l.id = Loans.id
