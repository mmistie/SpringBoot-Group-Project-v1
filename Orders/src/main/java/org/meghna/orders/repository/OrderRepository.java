package org.meghna.orders.repository;

import org.meghna.orders.model.order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<order, Long> {

}