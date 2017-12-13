package ru.avel.example.orders.domains;

import java.io.Serializable;
import java.lang.Integer;
import java.lang.String;
import java.util.Date;

import javax.persistence.*;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Entity implementation class for Entity: Order
 *
 */

@Entity
@Table(name = "T_ORDER")
public class Order implements Serializable {

	private static final long serialVersionUID = 1L;
	   
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	@Column(length = 10, nullable = false, unique = true)
	private String num;
	
	@Column
	private String name;
	
	@Column
	@Temporal(TemporalType.DATE)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date date;
	
	@ManyToOne
	@JoinColumn(name = "source_id")
	//@JsonFormat(shape = JsonFormat.Shape.NUMBER)
	private Customer source;
	
	@ManyToOne
	@JoinColumn(name = "dest_id")
	private Customer destination;
	
	@ManyToOne
	@JoinColumn(name = "status_id", nullable = false)
	private Status status;
	
	public Order() {
		super();
	}   
	
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}   
	public String getNum() {
		return this.num;
	}

	public void setNum(String num) {
		this.num = num;
	}   
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}   
	public Customer getSource() {
		return this.source;
	}

	public void setSource(Customer source) {
		this.source = source;
	}   
	public Customer getDestination() {
		return this.destination;
	}

	public void setDestination(Customer destination) {
		this.destination = destination;
	}   
	public Status getStatus() {
		return this.status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
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
