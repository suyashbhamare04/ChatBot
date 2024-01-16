package com.chatbot.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chatbot.model.Role;
import com.chatbot.model.UserRole;

public interface RoleRepository extends JpaRepository<Role, Long>{
	Optional<Role> findByName(UserRole name);
}
