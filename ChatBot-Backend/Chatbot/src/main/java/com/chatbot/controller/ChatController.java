package com.chatbot.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import com.chatbot.model.Answer;
import com.chatbot.model.Question;
import com.chatbot.model.SubCategory;
import com.chatbot.model.User;
import com.chatbot.model.UserFeedback;
import com.chatbot.repository.QuestionRepository;
import com.chatbot.repository.UserRepository;
import com.chatbot.security.AuthRequest;
import com.chatbot.security.JwtService;
import com.chatbot.security.UserInfoService;
import com.chatbot.service.ChatService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Locale.Category;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class ChatController {

    @Autowired
    private ChatService chatService;
    
      
    // Endpoint to get all questions
    @GetMapping("/questions")
    @PreAuthorize("hasAuthority('ROLE_USER')") 
    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> questions = chatService.getAllQuestions();
        return ResponseEntity.ok(questions);
    }
    
    @GetMapping("/answers/{questionId}")
    @PreAuthorize("hasAuthority('ROLE_USER')") 
    public ResponseEntity<List<Answer>> getAnswersByQuestionId(@PathVariable long questionId) {
        List<Answer> answers = chatService.getAnswersByQuestionId(questionId);
        return ResponseEntity.ok(answers);
    }
    
    // Endpoint to get all answers
    @GetMapping("/answers") 
    @PreAuthorize("hasAuthority('ROLE_USER')") 
    public ResponseEntity<List<Answer>> getAllAnswers() {
        List<Answer> answers = chatService.getAllAnswers();
        return ResponseEntity.ok(answers);
    }

    // Endpoint to get all user feedback
    @GetMapping("/user-feedback")
    @PreAuthorize("hasAuthority('ROLE_USER')") 
    public ResponseEntity<List<UserFeedback>> getAllUserFeedback() {
        List<UserFeedback> userFeedback = chatService.getAllUserFeedback();
        return ResponseEntity.ok(userFeedback);
    }

    // Endpoint to get all users
    @GetMapping("/users")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')") 
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = chatService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Endpoint to handle user satisfaction
    @PostMapping("/user-satisfaction")
    @PreAuthorize("hasAuthority('ROLE_USER')") 
    public ResponseEntity<Void> handleUserSatisfaction(@RequestParam long userId, @RequestParam boolean satisfied) {
        chatService.handleUserSatisfaction(userId, satisfied);
        return ResponseEntity.ok().build();
    }

    // Endpoint to initiate one-to-one chat
    @PostMapping("/initiate-chat")
    @PreAuthorize("hasAuthority('ROLE_USER')") 
    public ResponseEntity<Void> initiateOneToOneChat(@RequestParam long userId, @RequestParam long selectedPersonId) {
        chatService.initiateOneToOneChat(userId, selectedPersonId);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/category")
    @PreAuthorize("hasAuthority('ROLE_USER')")
   public ResponseEntity<List<Category>>getAllCategorys(){
	  List<com.chatbot.model.Category> categories = chatService.getAllCategorys();
	return new ResponseEntity<List<Category>>(HttpStatus.OK) ;
   
   }
    
    @GetMapping("/subcategory")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<List<SubCategory>>getAllSubCategorys(){
    	List<SubCategory>subCategories = chatService.getAllSubCategorys();
		return new ResponseEntity<List<SubCategory>>(subCategories, HttpStatus.OK);
    	
    }
    
    @GetMapping("/subcategories/{categoryName}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<List<SubCategory>> getSubCategoriesByCategoryName(@PathVariable String categoryName) {
        List<SubCategory> subCategories = chatService.getSubCategoriesByCategoryName(categoryName);
        return ResponseEntity.ok(subCategories);
    }
    
    // Endpoint to get questions by subcategory
    @GetMapping("/questions/{subCategoryId}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<List<Question>> getQuestionsBySubCategory(@PathVariable Long subCategoryId) {
        List<Question> questions = chatService.getQuestionsBySubCategory(subCategoryId);
        return ResponseEntity.ok(questions);
    }
    
    
    
 
}






