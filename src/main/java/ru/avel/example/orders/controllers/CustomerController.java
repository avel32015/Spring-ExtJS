package ru.avel.example.orders.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ru.avel.example.orders.domains.Customer;
import ru.avel.example.orders.services.CustomerRepositoriy;

@RestController
@RequestMapping("/api/customer")
public class CustomerController extends ACrudController<Customer, Integer> {

	public CustomerController(CustomerRepositoriy repository) {
		super(repository);
	}

}
