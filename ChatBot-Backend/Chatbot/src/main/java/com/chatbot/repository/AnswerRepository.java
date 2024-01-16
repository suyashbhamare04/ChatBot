package com.chatbot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chatbot.model.Answer;
import com.chatbot.model.Question;

public interface AnswerRepository extends JpaRepository<Answer, Long> {

	List<Answer> findByQuestion(Question question);
	
	List<Answer> findByQuestionId(long questionId);
}
