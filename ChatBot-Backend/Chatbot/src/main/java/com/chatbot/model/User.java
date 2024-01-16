package com.chatbot.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;

    private String password;
    
	@Column(unique = true)
    private String email;
	
	private String roles; 

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<UserFeedback> feedback;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<ChatMessage> chatMessages;
    
	public String getRoles() {
		return roles;
	}

	public void setRoles(String roles) {
		this.roles = roles;
	}
    
	public String getEmail() {
 		return email;
 	}

 	public void setEmail(String email) {
 		this.email = email;
 	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<UserFeedback> getFeedback() {
		return feedback;
	}

	public void setFeedback(Set<UserFeedback> feedback) {
		this.feedback = feedback;
	}

	public Set<ChatMessage> getChatMessages() {
		return chatMessages;
	}

	public void setChatMessages(Set<ChatMessage> chatMessages) {
		this.chatMessages = chatMessages;
	}

   
}
