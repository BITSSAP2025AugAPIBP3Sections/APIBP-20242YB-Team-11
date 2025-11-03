package com.offerzone.interaction.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

/**
 * Interaction Model - Tracks user actions with products
 * Updated to work with simplified microservice architecture
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
    
    @NotNull(message = "Product ID is required")
    @Column(name = "product_id", nullable = false)
    private Long productId;
    
    @Column(name = "retailer_id")
    private Long retailerId;
    
    @Column(name = "brand_id")
    private Long brandId;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "interaction_type", nullable = false)
    private InteractionType interactionType;
    
    @Column(name = "interaction_data", length = 500)
    private String interactionData;
    
    @Column(name = "device_info", length = 200)
    private String deviceInfo;
    
    @Column(name = "ip_address", length = 45)
    private String ipAddress;
    
    @Column(name = "session_id", length = 100)
    private String sessionId;
    
    @Column(name = "user_agent", length = 500)
    private String userAgent;
    
    @Column(name = "referrer_url", length = 500)
    private String referrerUrl;
    
    @Column(name = "page_url", length = 500)
    private String pageUrl;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    // Constructors
    public Interaction() {}
    
    public Interaction(Long consumerId, Long productId, InteractionType interactionType) {
        this.consumerId = consumerId;
        this.productId = productId;
        this.interactionType = interactionType;
    }
    
    // Business Methods
    public boolean isViewInteraction() {
        return interactionType == InteractionType.VIEW;
    }
    
    public boolean isRedeemInteraction() {
        return interactionType == InteractionType.REDEEM;
    }
    
    public boolean isSaveInteraction() {
        return interactionType == InteractionType.SAVE;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getConsumerId() { return consumerId; }
    public void setConsumerId(Long consumerId) { this.consumerId = consumerId; }
    
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    
    public Long getRetailerId() { return retailerId; }
    public void setRetailerId(Long retailerId) { this.retailerId = retailerId; }
    
    public Long getBrandId() { return brandId; }
    public void setBrandId(Long brandId) { this.brandId = brandId; }
    
    public InteractionType getInteractionType() { return interactionType; }
    public void setInteractionType(InteractionType interactionType) { this.interactionType = interactionType; }
    
    public String getInteractionData() { return interactionData; }
    public void setInteractionData(String interactionData) { this.interactionData = interactionData; }
    
    public String getDeviceInfo() { return deviceInfo; }
    public void setDeviceInfo(String deviceInfo) { this.deviceInfo = deviceInfo; }
    
    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }
    
    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }
    
    public String getUserAgent() { return userAgent; }
    public void setUserAgent(String userAgent) { this.userAgent = userAgent; }
    
    public String getReferrerUrl() { return referrerUrl; }
    public void setReferrerUrl(String referrerUrl) { this.referrerUrl = referrerUrl; }
    
    public String getPageUrl() { return pageUrl; }
    public void setPageUrl(String pageUrl) { this.pageUrl = pageUrl; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}