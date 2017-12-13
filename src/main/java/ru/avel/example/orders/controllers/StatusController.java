package ru.avel.example.orders.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ru.avel.example.orders.domains.Status;
import ru.avel.example.orders.services.StatusRepositoriy;

@RestController
@RequestMapping("/api/status")
public class StatusController extends ACrudController<Status, String> {

	public StatusController(StatusRepositoriy repository) {
		super(repository);
	}

}
