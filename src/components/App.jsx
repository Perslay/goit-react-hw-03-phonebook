import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from '../styles/App.module.css';
import { ContactList } from './ContactList';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  handleName = evt => {
    this.setState({ name: evt.target.value });
  };

  handleNumber = evt => {
    this.setState({ number: evt.target.value });
  };

  handleFilter = evt => {
    this.setState({ filter: evt.target.value });
  };

  add = event => {
    event.preventDefault();

    const form = event.currentTarget;
    // const newName = form.elements.name.value;
    // const newNumber = form.elements.number.value;

    // const nameExists = this.state.contacts.some(
    //   contact => contact.name === newName
    // );

    // if (nameExists) {
    //   alert(newName + ' is already in contacts.');
    // } else {
    //   this.setState(prevState => ({
    //     contacts: [
    //       ...prevState.contacts,
    //       {
    //         name: newName,
    //         number: newNumber,
    //         id: nanoid(),
    //       },
    //     ],
    //   }));
    // }

    const newName = this.state.name;
    const newNumber = this.state.number;

    const nameExists = this.state.contacts.some(
      contact => contact.name === newName
    );

    if (nameExists) {
      alert(newName + ' is already in contacts.');
    } else {
      this.setState(prevState => ({
        contacts: [
          ...prevState.contacts,
          {
            name: newName,
            number: newNumber,
            id: nanoid(),
          },
        ],
      }));
    }

    form.reset();
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const { add, deleteContact, handleFilter, handleName, handleNumber } = this;

    return (
      <div className={css.appContainer}>
        <h1 className={css.firstHeading}>Phonebook</h1>
        <ContactForm
          add={add}
          nameInputId={nanoid()}
          numberInputId={nanoid()}
          handleName={handleName}
          handleNumber={handleNumber}
        />
        <h2 className={css.secondHeading}>Contacts</h2>
        <Filter handleFilter={handleFilter} filterInputId={nanoid()} />
        <ContactList
          contacts={contacts}
          filter={filter}
          deleteContact={deleteContact}
        />
      </div>
    );
  }
}
