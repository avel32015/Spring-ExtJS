package ru.avel.example.orders.services;

import org.springframework.data.repository.CrudRepository;

import ru.avel.example.orders.domains.Status;

public interface StatusRepositoriy extends CrudRepository<Status, String> {

}
