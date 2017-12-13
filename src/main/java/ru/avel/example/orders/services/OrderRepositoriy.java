package ru.avel.example.orders.services;

import org.springframework.data.repository.CrudRepository;

import ru.avel.example.orders.domains.Order;

public interface OrderRepositoriy extends CrudRepository<Order, Integer> {

}
