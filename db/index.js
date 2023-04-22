const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const allContacts = await fs.readFile(contactsPath);
  return JSON.parse(allContacts);
};
const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const oneContact = allContacts.find((contact) => contact.id === contactId);
  return oneContact || null;
};
const addContact = async (data) => {
  const allContacts = await listContacts();
  const newContact = { id: nanoid(), ...data };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};
const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  console.log(contactId);
  const contactIndex = allContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    return null;
  }
  const removedContact = allContacts.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return removedContact;
};

module.exports = { listContacts, getContactById, addContact, removeContact };
