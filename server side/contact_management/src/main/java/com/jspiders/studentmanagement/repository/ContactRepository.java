package com.jspiders.studentmanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jspiders.studentmanagement.pojo.Contact;

public interface ContactRepository extends JpaRepository<Contact, Integer> {

//	List<Contact> findByNameContainingIgnoreCase(String name);

//	List<Contact> findByMobileBetween(long min, long max);

//     List<Contact> findByMobile(long contact);
  

}
