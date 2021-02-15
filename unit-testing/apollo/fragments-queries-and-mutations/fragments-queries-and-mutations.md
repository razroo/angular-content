---
title: Fragments Queries and Mutations
---

An important part of architecture with regards to using GraphQL, is
splitting up data requests into fragments + queries/mutations. It
greatly simpifies the architecture. The closest resemblance of how to
describe using fragments in GraphQL, is functional composition.

 Example Fragment 
-----------------

    export const GridFragment = `
      fragment gridFields on GridSize {
        rowSize
        columnSize
        pixelSize
      }
    `;

 Using Fragment in Query 
------------------------

Now in our query, we have the ability to include our fragment.

    export const GridSizeQuery = gql`
      query gridSize($projectId: ID!, $id: ID!) {
        gridSize(projectId: $projectId, id: $id) {
          ...gridFields
        }
      }
      ${GridFragment}
    `;

###  Using Fragment as interface 

It also helps when creating an interface. We have the ability to keep a
one to one relationship between our fragments and interfaces as well. If
we want to make sure that our interfaces are up to date for a specific
data type, we can just look at our fragments file, and make sure that
they are both up to date with each other. For instance:

    export interface GridSize {
      rowSize: string;
      columnSize: string;
      pixelSize: string;
    }

 Using Fragment in Mutation 
---------------------------

We can now use the same fragment that we used for the GridSizeQuery, for
the AddGridSizeMutation.

    export const AddGridSizeMutation = gql`
      mutation addGridSize($projectId: ID!, $gridSize: GridSizeInput!) {
        addGridSize(projectId: $projectId, gridSize: $gridSize) {
          ...gridFields
        }
      }
      ${GridFragment}
    `;
