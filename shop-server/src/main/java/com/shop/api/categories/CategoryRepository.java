package com.shop.api.categories;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


public interface CategoryRepository extends  JpaRepository<Category, Integer> {
    Optional<Category> findByName(String name);
}
