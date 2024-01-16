package com.chatbot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chatbot.model.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long>{

}
