Implemented a phone book that allows adding contacts with the following information for each
contact:
- Name
- Phone number
- E-mail address
The phone book should allow listing available contacts and searching through them. Listed
contacts should be sorted alphabetically by Name. A user should be able to search for a contact
using a query that represents either a contact name or a contact phone number. A user should also
be able to remove a contact from the phone book. The phone book can hold up to 10,000 contacts.

Methods add and remove should add and remove a single contact, respectively, where
contactInfo is an object as follows:
{
name: String,
phone: String,
email: String
}

Name should be less than 100 characters, phone number should be a number and should be in the
following format xx-xxx-xxxx and email should be a valid email address.
Method search accepts a query string as a single parameter and returns an array of all contacts
that satisfy the passed query. The query represents a contact name or a contact phone number.
Method list accepts two parameters: contactsPerPage and page and returns a list of
contacts based on the passed parameters and ordered alphabetically by name. For example, calling
list(10, 0) should return the first ten contacts. Calling list(15, 2) should return
contacts from the 30th to the 45th.