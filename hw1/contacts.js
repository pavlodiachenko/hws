const fs = require("fs");
const path = require("path");
const contactsPath = path.join("./db", "contacts.json");

function listContacts() {
  return JSON.parse(
    fs.readFileSync(contactsPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      } else {
        return data;
      }
    })
  );
}

function getContactById(contactId) {
  return listContacts().find((item) => {
    return item["id"] === contactId;
  });
}

function removeContact(contactId) {
  return fs.writeFile(
    contactsPath,
    JSON.stringify(
      listContacts().filter((item) => {
        return item["id"] !== contactId;
      })
    ),
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
}

function addContact(name, email, phone) {
  let newObj = {
    id: (+listContacts()[listContacts().length - 1].id + 1).toString(),
    name: name,
    email: email,
    phone: phone,
  };
  let list = listContacts();
  list.push(newObj);
  fs.writeFile(contactsPath, JSON.stringify(list), (err) => {
    if (err) {
      throw err;
    }
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
