package com.chatbot.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;

import com.chatbot.model.Category;





public interface CategoryRepository extends JpaRepository<Category, Long>{

	 
	
}
