package com.offerzone.offer.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Offer Model - Main entity representing each deal or offer
 * Simple and clean design for microservice architecture
 */
@Entity
@Table(name = "offers")
public class Offer {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Title is required")
    @Size(min = 5, max = 200, message = "Title must be between 5 and 200 characters")
    @Column(nullable = false, length = 200)
    private String title;
    
    @Column(length = 1000)
    private String description;
    
    @NotNull(message = "Original price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Original price must be greater than 0")
    @Column(name = "original_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal originalPrice;
    
    @NotNull(message = "Discounted price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Discounted price must be greater than 0")
    @Column(name = "discounted_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal discountedPrice;
    
    @Column(name = "discount_percentage", precision = 5, scale = 2)
    private BigDecimal discountPercentage;
    
    @Column(name = "image_url", length = 500)
    private String imageUrl;
    
    @NotNull(message = "Retailer ID is required")
    @Column(name = "retailer_id", nullable = false)
    private Long retailerId;
    
    @NotNull(message = "Category ID is required")
    @Column(name = "category_id", nullable = false)
    private Long categoryId;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OfferStatus status = OfferStatus.DRAFT;
    
    @Column(name = "valid_from", nullable = false)
    private LocalDateTime validFrom;
    
    @Column(name = "valid_until", nullable = false)
    private LocalDateTime validUntil;
    
    @Column(name = "terms_conditions", length = 1000)
    private String termsConditions;
    
    @Column(name = "max_redemptions")
    private Integer maxRedemptions;
    
    @Column(name = "current_redemptions")
    private Integer currentRedemptions = 0;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public Offer() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.validFrom = LocalDateTime.now();
    }
    
    public Offer(String title, String description, BigDecimal originalPrice, 
                BigDecimal discountedPrice, Long retailerId, Long categoryId) {
        this();
        this.title = title;
        this.description = description;
        this.originalPrice = originalPrice;
        this.discountedPrice = discountedPrice;
        this.retailerId = retailerId;
        this.categoryId = categoryId;
        calculateDiscountPercentage();
    }
    
    // Calculate discount percentage automatically
    public void calculateDiscountPercentage() {
        if (originalPrice != null && discountedPrice != null && 
            originalPrice.compareTo(BigDecimal.ZERO) > 0) {
            BigDecimal discount = originalPrice.subtract(discountedPrice);
            this.discountPercentage = discount.divide(originalPrice, 4, BigDecimal.ROUND_HALF_UP)
                                              .multiply(new BigDecimal("100"));
        }
    }
    
    // Check if offer is currently valid
    public boolean isValid() {
        LocalDateTime now = LocalDateTime.now();
        return status == OfferStatus.ACTIVE && 
               validFrom.isBefore(now) && 
               validUntil.isAfter(now) &&
               (maxRedemptions == null || currentRedemptions < maxRedemptions);
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
        this.updatedAt = LocalDateTime.now();
    }
    
    public BigDecimal getOriginalPrice() {
        return originalPrice;
    }
    
    public void setOriginalPrice(BigDecimal originalPrice) {
        this.originalPrice = originalPrice;
        calculateDiscountPercentage();
        this.updatedAt = LocalDateTime.now();
    }
    
    public BigDecimal getDiscountedPrice() {
        return discountedPrice;
    }
    
    public void setDiscountedPrice(BigDecimal discountedPrice) {
        this.discountedPrice = discountedPrice;
        calculateDiscountPercentage();
        this.updatedAt = LocalDateTime.now();
    }
    
    public BigDecimal getDiscountPercentage() {
        return discountPercentage;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        this.updatedAt = LocalDateTime.now();
    }
    
    public Long getRetailerId() {
        return retailerId;
    }
    
    public void setRetailerId(Long retailerId) {
        this.retailerId = retailerId;
        this.updatedAt = LocalDateTime.now();
    }
    
    public Long getCategoryId() {
        return categoryId;
    }
    
    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
        this.updatedAt = LocalDateTime.now();
    }
    
    public OfferStatus getStatus() {
        return status;
    }
    
    public void setStatus(OfferStatus status) {
        this.status = status;
        this.updatedAt = LocalDateTime.now();
    }
    
    public LocalDateTime getValidFrom() {
        return validFrom;
    }
    
    public void setValidFrom(LocalDateTime validFrom) {
        this.validFrom = validFrom;
        this.updatedAt = LocalDateTime.now();
    }
    
    public LocalDateTime getValidUntil() {
        return validUntil;
    }
    
    public void setValidUntil(LocalDateTime validUntil) {
        this.validUntil = validUntil;
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getTermsConditions() {
        return termsConditions;
    }
    
    public void setTermsConditions(String termsConditions) {
        this.termsConditions = termsConditions;
        this.updatedAt = LocalDateTime.now();
    }
    
    public Integer getMaxRedemptions() {
        return maxRedemptions;
    }
    
    public void setMaxRedemptions(Integer maxRedemptions) {
        this.maxRedemptions = maxRedemptions;
        this.updatedAt = LocalDateTime.now();
    }
    
    public Integer getCurrentRedemptions() {
        return currentRedemptions;
    }
    
    public void setCurrentRedemptions(Integer currentRedemptions) {
        this.currentRedemptions = currentRedemptions;
        this.updatedAt = LocalDateTime.now();
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}