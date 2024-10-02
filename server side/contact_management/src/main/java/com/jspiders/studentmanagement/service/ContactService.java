package com.jspiders.studentmanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jspiders.studentmanagement.pojo.Contact;
import com.jspiders.studentmanagement.repository.ContactRepository;

@Service
public class ContactService {
	@Autowired
	private ContactRepository repository;

	public Contact addcontact(Contact contact) {

		Contact contactper = repository.save(contact);
		return contactper;
	}

	public List<Contact> findallContact() {

		List<Contact> contacts = repository.findAll();
		return contacts;
	}



	public Contact editContact(Contact contact) {
		
		Contact person=repository.findById(contact.getId()).orElse(null);
		if (person != null ) {
			
			person.setName(contact.getName());
			person.setEmail(contact.getEmail());
			person.setPhoto(contact.getPhoto());
			person.setCompanyName(contact.getCompanyName());
			person.setGroupName(contact.getGroupName());
			person.setMobile(contact.getMobile());
			person.setTitle(contact.getTitle());
			person =repository.save(person);
			return person;
		}
		
		return null;
	}

	public Contact deleteContact(int id) {
		Contact contact=repository.findById(id).orElse(null);
		if(contact != null) {
		repository.deleteById(id);
		return contact;
		}
		return contact;
		
	}
	public Contact findContactById(int id) {
		Contact contact =repository.findById(id).orElse(null);
		return contact;
	}
//	public List<Contact> findContactByName(String name) {
//
//		List<Contact> contact = repository.findByNameContainingIgnoreCase(name);
//		return contact;
//
//	}
//
//	public List<Contact> findContactByContact(long contact) {
//
//		long max=9999999999L;
//		List<Contact> cont = repository.findByMobileBetween(contact,max);
//
//		return cont;
//	}

	
}
