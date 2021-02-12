---
title: Acceptance Criteria
---
Acceptance Criteria should generally not be in the court of the software
engineer. However, as is quite common in software engineering, product
will need a bit of prodding from engineering, in order to discuss what
it is that they are looking for.

## Real Quick - What are Acceptance Criteria?

They are the conditions that a software product must satisfy to be
accepted by a user, customer, or in the case of system level
functionality, the consuming system.

## Ideal Syntax for Acceptance Criteria?

After being in a number of settings, the ideal way to create acceptance
criteria is to use Cucumber/Gherkin syntax.

## What Gherkin Syntax?

Gherkin is a syntax which supports BDD. It is aimed at making executable
specifications written in plain language:

```
  Scenario: eat 5 out of 12
  Given there are 12 cucumbers
  When I eat 5 cucumbers
  Then I should have 7 cucumbers
```

## Why is it important that we use Gherkin Syntax?

Gherkin syntax is designed to be succinct, and easily understandable
which it is. In addition, it is a syntax that the entire company can
rally around, being that it will be used by Automation Engineers as
well. It is also in my experience, the only way to convince product to
write acceptance criteria that actually stays the same from ticket from
ticket, but don't tell them I said that!

## Sample Ticket Creation for Choose Size Form.

```
Scenario: When Using the Choose Size picker
  Given I enter pixel size
  Given I enter column size
  Given I enter row size
  When I  click on the Create Pixel Grid button
  Then I should see grid created
```

Note that this is the ticket for creating a component for the choose
size picker. However, we still do now know what the design will look.
This we leave for the next chapter.