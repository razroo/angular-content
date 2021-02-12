---
title: Ticket Creation - Component Design
---
We have discussed the two initial steps with regards to creating a
ticket - technical design notes and acceptance criteria. The third and
final step to a good ticket is design. The chapter regarding talking to
UI/UX is not here, but you should be using JIRA as your ticketing
system.

Within a JIRA setting, two things should happen so you have a clear idea
of how a component should be designed within a PWA setting:

1. Description
2. Invision Link within JIRA

## Component Design Quirk

When creating a ticket in a PWA environment, there is a need to create a
specify the specific functionality around mobile, and desktop. Many
times, the functionality is not the same. In addition, while we develop
from a mobile first perspective, it is not the case for business and
product. For engineers, there is an understanding that whatever is not
used for mobile, is used for desktop. This is not the case for business.
They look at the two as two separate entities.

In addition, understandably for design, they also look at mobile and
desktop as two different entities.

It is therefore recommended that you will have to create two separate
tickets.