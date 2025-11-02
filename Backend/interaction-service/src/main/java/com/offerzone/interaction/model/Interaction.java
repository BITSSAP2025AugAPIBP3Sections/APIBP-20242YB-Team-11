package main.java.com.offerzone.interaction.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

/**
 * Interaction Model - Tracks user actions (view, save, redeem)
 * Simple and clean design for microservice architecture
 */
@Entity
@Table(name = "interactions")
public class Interaction {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull(message = "Consumer ID is required")
    @Column(name = "consumer_id", nullable = false)
    private Long consumerId;
    
    @NotNull(message = "Offer ID is required")
    @Column(name = "offer_id", nullable = false)
    private Long offerId;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "interaction_type", nullable = false)
    private InteractionType interactionType;
    
    @Column(name = "interaction_data", length = 500)
    private String interactionData; // JSON string for additional data
    
    @Column(name = "device_info", length = 200)
    private String deviceInfo; // Browser, mobile app, etc.
    
    @Column(name = "ip_address", length = 45)
    private String ipAddress;
    
    @Column(name = "session_id", length = 100)
    private String sessionId;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    // Constructors
    public Interaction() {
        this.createdAt = LocalDateTime.now();
    }
    
    public Interaction(Long consumerId, Long offerId, InteractionType interactionType) {
        this();
        this.consumerId = consumerId;
        this.offerId = offerId;
        this.interactionType = interactionType;
    }
    
    public Interaction(Long consumerId, Long offerId, InteractionType interactionType, 
                      String deviceInfo, String sessionId) {
        this(consumerId, offerId, interactionType);
        this.deviceInfo = deviceInfo;
        this.sessionId = sessionId;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getConsumerId() {
        return consumerId;
    }
    
    public void setConsumerId(Long consumerId) {
        this.consumerId = consumerId;
    }
    
    public Long getOfferId() {
        return offerId;
    }
    
    public void setOfferId(Long offerId) {
        this.offerId = offerId;
    }
    
    public InteractionType getInteractionType() {
        return interactionType;
    }
    
    public void setInteractionType(InteractionType interactionType) {
        this.interactionType = interactionType;
    }
    
    public String getInteractionData() {
        return interactionData;
    }
    
    public void setInteractionData(String interactionData) {
        this.interactionData = interactionData;
    }
    
    public String getDeviceInfo() {
        return deviceInfo;
    }
    
    public void setDeviceInfo(String deviceInfo) {
        this.deviceInfo = deviceInfo;
    }
    
    public String getIpAddress() {
        return ipAddress;
    }
    
    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }
    
    public String getSessionId() {
        return sessionId;
    }
    
    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}