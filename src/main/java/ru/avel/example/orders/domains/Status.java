package ru.avel.example.orders.domains;

import java.io.Serializable;
import java.lang.String;
import javax.persistence.*;

import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import ru.avel.example.orders.services.StatusRepositoriy;

/**
 * Entity implementation class for Entity: Status
 *
 */
@Entity
@Table(name = "T_STATUS")
public class Status implements Serializable {

	@Transient
	@Autowired
	private static StatusRepositoriy statuses;
	
	private static final long serialVersionUID = 1L;
	   
	@Id
	@Column(length = 10, nullable = false)
	private String id;

	@Column(nullable = false)
	private String name;

	public Status() {
		super();
	}   
	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}   
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public static Status valueOf(String id) {
		if (statuses != null) return statuses.findOne(id);
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
