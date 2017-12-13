package ru.avel.example.orders.domains;

import java.io.Serializable;
import java.lang.Integer;
import java.lang.String;
import javax.persistence.*;

import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import ru.avel.example.orders.services.CustomerRepositoriy;

/**
 * Entity implementation class for Entity: Customer
 *
 */
@Entity
@Table(name = "T_CUSTOMER")
public class Customer implements Serializable {

	@Transient
	@Autowired
	private static CustomerRepositoriy customers;
	
	private static final long serialVersionUID = 1L;
	   
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
    @Column(nullable = false)
	private String name;

	public Customer() {
		super();
	}   
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}   
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}
   
	public static Customer valueOf(String id) {
		if ( customers != null ) return customers.findOne( Integer.valueOf(id) );
		return null;
	}

	public String toString() {
		String value = null;
		try {
			value = new ObjectMapper().writeValueAsString(this);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return value; 
	}
}
