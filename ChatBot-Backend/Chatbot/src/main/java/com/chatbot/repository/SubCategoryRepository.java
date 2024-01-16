package com.chatbot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chatbot.model.SubCategory;

public interface SubCategoryRepository extends JpaRepository<SubCategory, Long>{

	 List<SubCategory> findByCategory_CategoryName(String categoryName);
	
}
