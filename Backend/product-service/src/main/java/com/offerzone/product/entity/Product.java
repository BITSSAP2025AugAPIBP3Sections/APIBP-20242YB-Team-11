package com.offerzone.product.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Product name is required")
    @Size(max = 200, message = "Product name must not exceed 200 characters")
    @Column(name = "name", nullable = false, length = 200)
    private String name;
    
    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    @Column(name = "description", length = 1000)
    private String description;
    
    @NotNull(message = "Retailer ID is required")
    @Column(name = "retailer_id", nullable = false)
    private Long retailerId;
    
    @NotNull(message = "Brand ID is required")
    @Column(name = "brand_id", nullable = false)
    private Long brandId;
    
    @NotNull(message = "Original price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Original price must be greater than 0")
    @Digits(integer = 10, fraction = 2, message = "Price must be a valid monetary amount")
    @Column(name = "original_price", nullable = false, precision = 12, scale = 2)
    private BigDecimal originalPrice;
    
    @DecimalMin(value = "0.0", inclusive = false, message = "Offer price must be greater than 0")
    @Digits(integer = 10, fraction = 2, message = "Price must be a valid monetary amount")
    @Column(name = "offer_price", precision = 12, scale = 2)
    private BigDecimal offerPrice;
    
    @Column(name = "discount_percentage", precision = 5, scale = 2)
    private BigDecimal discountPercentage;
    
    @Column(name = "offer_start_date")
    private LocalDateTime offerStartDate;
    
    @Column(name = "offer_end_date")
    private LocalDateTime offerEndDate;
    
    @Size(max = 500, message = "Offer terms must not exceed 500 characters")
    @Column(name = "offer_terms", length = 500)
    private String offerTerms;
    
    @Min(value = 0, message = "Stock quantity cannot be negative")
    @Column(name = "stock_quantity")
    private Integer stockQuantity;
    
    @Column(name = "sku", length = 100, unique = true)
    private String sku;
    
    @Size(max = 100, message = "Category must not exceed 100 characters")
    @Column(name = "category", length = 100)
    private String category;
    
    @Column(name = "image_url", length = 500)
    private String imageUrl;
    
    @Column(name = "is_featured")
    private Boolean isFeatured = false;
    
    @Column(name = "is_offer_active")
    private Boolean isOfferActive = false;
    
    @Min(value = 0, message = "Max redemptions cannot be negative")
    @Column(name = "max_redemptions")
    private Integer maxRedemptions;
    
    @Min(value = 0, message = "Current redemptions cannot be negative")
    @Column(name = "current_redemptions")
    private Integer currentRedemptions = 0;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ProductStatus status = ProductStatus.ACTIVE;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public Product() {}
    
    public Product(String name, String description, Long retailerId, Long brandId, 
                   BigDecimal originalPrice) {
        this.name = name;
        this.description = description;
        this.retailerId = retailerId;
        this.brandId = brandId;
        this.originalPrice = originalPrice;
    }
    
    // Business Methods
    public void calculateDiscountPercentage() {
        if (originalPrice != null && offerPrice != null && 
            originalPrice.compareTo(BigDecimal.ZERO) > 0) {
            BigDecimal discount = originalPrice.subtract(offerPrice);
            this.discountPercentage = discount.multiply(BigDecimal.valueOf(100))
                                           .divide(originalPrice, 2, BigDecimal.ROUND_HALF_UP);
        }
    }
    
    public boolean isOfferValid() {
        LocalDateTime now = LocalDateTime.now();
        return isOfferActive && 
               offerStartDate != null && 
               offerEndDate != null &&
               !now.isBefore(offerStartDate) && 
               !now.isAfter(offerEndDate) &&
               (maxRedemptions == null || currentRedemptions < maxRedemptions);
    }
    
    public boolean canRedeem() {
        return isOfferValid() && 
               (stockQuantity == null || stockQuantity > 0) &&
               status == ProductStatus.ACTIVE;
    }
    
    public void incrementRedemption() {
        if (currentRedemptions == null) {
            currentRedemptions = 0;
        }
        currentRedemptions++;
    }
    
    public BigDecimal getEffectivePrice() {
        if (isOfferValid() && offerPrice != null) {
            return offerPrice;
        }
        return originalPrice;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Long getRetailerId() { return retailerId; }
    public void setRetailerId(Long retailerId) { this.retailerId = retailerId; }
    
    public Long getBrandId() { return brandId; }
    public void setBrandId(Long brandId) { this.brandId = brandId; }
    
    public BigDecimal getOriginalPrice() { return originalPrice; }
    public void setOriginalPrice(BigDecimal originalPrice) { 
        this.originalPrice = originalPrice;
        calculateDiscountPercentage();
    }
    
    public BigDecimal getOfferPrice() { return offerPrice; }
    public void setOfferPrice(BigDecimal offerPrice) { 
        this.offerPrice = offerPrice;
        calculateDiscountPercentage();
    }
    
    public BigDecimal getDiscountPercentage() { return discountPercentage; }
    public void setDiscountPercentage(BigDecimal discountPercentage) { 
        this.discountPercentage = discountPercentage; 
    }
    
    public LocalDateTime getOfferStartDate() { return offerStartDate; }
    public void setOfferStartDate(LocalDateTime offerStartDate) { 
        this.offerStartDate = offerStartDate; 
    }
    
    public LocalDateTime getOfferEndDate() { return offerEndDate; }
    public void setOfferEndDate(LocalDateTime offerEndDate) { 
        this.offerEndDate = offerEndDate; 
    }
    
    public String getOfferTerms() { return offerTerms; }
    public void setOfferTerms(String offerTerms) { this.offerTerms = offerTerms; }
    
    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }
    
    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public Boolean getIsFeatured() { return isFeatured; }
    public void setIsFeatured(Boolean isFeatured) { this.isFeatured = isFeatured; }
    
    public Boolean getIsOfferActive() { return isOfferActive; }
    public void setIsOfferActive(Boolean isOfferActive) { this.isOfferActive = isOfferActive; }
    
    public Integer getMaxRedemptions() { return maxRedemptions; }
    public void setMaxRedemptions(Integer maxRedemptions) { this.maxRedemptions = maxRedemptions; }
    
    public Integer getCurrentRedemptions() { return currentRedemptions; }
    public void setCurrentRedemptions(Integer currentRedemptions) { 
        this.currentRedemptions = currentRedemptions; 
    }
    
    public ProductStatus getStatus() { return status; }
    public void setStatus(ProductStatus status) { this.status = status; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}