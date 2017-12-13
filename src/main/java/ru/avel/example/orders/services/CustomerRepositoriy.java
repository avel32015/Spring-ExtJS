package ru.avel.example.orders.services;

import org.springframework.data.repository.CrudRepository;

import ru.avel.example.orders.domains.Customer;

public interface CustomerRepositoriy extends CrudRepository<Customer, Integer> {

}
