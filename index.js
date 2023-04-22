const contacts = require("./db");

const program = require("commander");
program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      return allContacts;
    case "get":
      const oneContact = await contacts.getContactById(id);
      console.log(oneContact);
      return oneContact;
    case "add":
      const newContact = await contacts.addContact({
        name,
        email,
        phone,
      });
      console.log(newContact);
      return newContact;
    case "remove":
      const removedContact = await contacts.removeContact(id);
      console.log(removedContact);
      return removedContact;
  }
}

invokeAction(argv);
