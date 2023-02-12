# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

## Ticket 1: Add a custom id field for each Agent in the database

### Acceptance Criteria:

A new field called `customId` is added to the Agents table in the database.
The field should be able to store a string of any length up to a maximum of 255 characters.
The field should be nullable and default to null.

## Implementation Details:

Create a new migration to add the `customId` field to the Agents table in the database.
Test the new field by creating a new Agent and verifying that the `customId` field is correctly added and stored.

Time/Effort Estimate: 2 hours

## Ticket 2: Update the generateReport function to use the custom id for Agents

### Acceptance Criteria:

The generateReport function should use the `customId` for each Agent if it exists, otherwise use the internal database id.
The custom id should be correctly displayed on the generated report.

### Implementation Details:

Modify the generateReport function to use the customId field of each Agent, if it exists, when generating the report.
Test the updated function by generating a report and verifying that the correct custom id or database id is displayed for each Agent.

Time/Effort Estimate: 2 hours

## Ticket 3: Update the UI to allow Facilities to enter custom ids for Agents

### Acceptance Criteria:

A new field called Custom Id is added to the Agent creation and editing forms in the UI.
The new field should allow Facilities to enter their own custom id for each Agent.
The custom id should be correctly stored in the database and displayed on the generated report.

### Implementation Details:

Add a new Custom Id field to the Agent creation and editing forms in the UI.
Update the form submissions to store the custom id in the database.
Test the updated forms by creating a new Agent and verifying that the custom id is correctly stored and displayed on the generated report.

Time/Effort Estimate: 4 hours

## Ticket 4: Add validation for the custom id field

### Acceptance Criteria:

The custom id field should only accept strings of any length up to a maximum of 255 characters.
An error message should be displayed if the custom id is not a valid string.

### Implementation Details:

Add client-side validation for the Custom Id field in the Agent creation and editing forms in the UI.
Test the validation by attempting to submit the form with an invalid custom id and verifying that an error message is displayed.

Time/Effort Estimate: 2 hours
