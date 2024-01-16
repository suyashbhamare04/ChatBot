package com.chatbot.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chatbot.model.User;
import java.util.List;


public interface UserRepository  extends JpaRepository<User, Long>{

	Optional<User> findByUsername(String username);
	
	
}
