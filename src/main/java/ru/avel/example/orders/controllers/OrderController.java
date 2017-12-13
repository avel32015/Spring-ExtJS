package ru.avel.example.orders.controllers;

import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ru.avel.example.orders.domains.*;
import ru.avel.example.orders.services.*;

@RestController
@RequestMapping("/api/order")
public class OrderController extends ACrudController<Order, Integer> {
	/*
	@Autowired
	private CustomerRepositoriy customers;
	
	@Autowired
	private StatusRepositoriy statuses;
	*/
	public OrderController(OrderRepositoriy repository) {
		super(repository);
	}
	
}
