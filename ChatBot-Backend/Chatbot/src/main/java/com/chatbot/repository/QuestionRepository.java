package com.chatbot.repository;

import java.util.List;
import java.util.Locale.Category;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chatbot.model.Question;
import com.chatbot.model.SubCategory;

public interface QuestionRepository extends JpaRepository<Question, Long> {

	 List<Question> findByCategory(Category category);

	List<Question> findByContentContainingIgnoreCase(String name);
	
	List<Question> findBySubCategory(Category subCategory);
	
	List<Question> findBySubCategory(SubCategory subCategory);

}
